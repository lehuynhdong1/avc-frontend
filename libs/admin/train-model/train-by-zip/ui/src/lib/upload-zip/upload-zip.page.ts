import { Component, ChangeDetectionStrategy } from '@angular/core';

import { FormControl } from '@angular/forms';
import { withLatestFrom } from 'rxjs/operators';
import { Actions, ofActionErrored, ofActionSuccessful, Store } from '@ngxs/store';
import {
  UpdateZip,
  TrainByZipState,
  DownloadClassesTxt,
  Train
} from '@admin/train-model/train-by-zip/data-access';
import { MAXIMUM_IMAGE_SIZE } from '@admin/train-model/train-by-images/data-access';
import { Empty, ShowNotification } from '@shared/util';
import { TuiStatus } from '@taiga-ui/kit';
import { RxState } from '@rx-angular/state';
import { TuiHintMode, TuiNotification } from '@taiga-ui/core';
import * as prettyBytes from 'pretty-bytes';
import { Subject } from 'rxjs';
import { labels } from '@admin/train-model/train-by-images/util';
import { Router } from '@angular/router';

@Component({
  templateUrl: './upload-zip.page.html',
  styleUrls: ['./upload-zip.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class UploadZipPage {
  TUI_STATUS = { Success: TuiStatus.Success, Error: TuiStatus.Error, Primary: TuiStatus.Primary };
  TUI_HINT_DARK = TuiHintMode.OnDark;
  MAX_FILE_SIZE = MAXIMUM_IMAGE_SIZE * 100;
  LABELS = labels;

  readonly file = new FormControl();

  private readonly whenShowError$ = this.actions.pipe<UpdateZip>(ofActionErrored(UpdateZip));
  private readonly whenShowSuccess$ = this.actions.pipe<UpdateZip>(ofActionSuccessful(UpdateZip));

  clickTrain$ = new Subject<void>();
  clickDownload$ = new Subject<HTMLTextAreaElement>();

  constructor(
    private router: Router,
    private store: Store,
    private actions: Actions,
    private state: RxState<Empty>
  ) {
    state.hold(
      this.whenShowSuccess$.pipe(withLatestFrom(this.store.select(TrainByZipState.uploadedZip))),
      ([, zip]) =>
        this.store.dispatch(
          new ShowNotification({
            message: `${zip?.file.name} (${prettyBytes(zip?.file.size || 0)}) has accepted`,
            options: { label: 'Upload ZIP Success', status: TuiNotification.Success }
          })
        )
    );
    state.hold(
      this.whenShowError$.pipe(withLatestFrom(this.store.select(TrainByZipState.errorMessage))),
      ([, errorMessage]) =>
        this.store.dispatch(
          new ShowNotification({
            message: errorMessage || '',
            options: { label: 'Upload ZIP Error', status: TuiNotification.Error }
          })
        )
    );

    state.hold(this.file.valueChanges, (file) => this.store.dispatch(new UpdateZip(file)));
    state.hold(this.clickDownload$, () => this.store.dispatch(new DownloadClassesTxt()));
    state.hold(this.clickTrain$, () => this.store.dispatch(new Train()));
    this.trainSuccessEffect();
  }

  private trainSuccessEffect() {
    const whenTrainSuccess$ = this.actions.pipe<Train>(ofActionSuccessful(Train));
    this.state.hold(whenTrainSuccess$, () => this.router.navigateByUrl('/training/history'));
  }
}
