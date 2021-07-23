import { Component, ChangeDetectionStrategy } from '@angular/core';

import { FormControl } from '@angular/forms';
import { withLatestFrom, filter } from 'rxjs/operators';
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
import { TuiDialogService, TuiHintMode, TuiNotification } from '@taiga-ui/core';
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

  clickTrain$ = new Subject<void>();
  clickDownload$ = new Subject<HTMLTextAreaElement>();

  constructor(
    router: Router,
    store: Store,
    actions: Actions,
    state: RxState<Empty>,
    private dialog: TuiDialogService
  ) {
    const whenShowSuccess$ = actions
      .pipe<UpdateZip>(ofActionSuccessful(UpdateZip))
      .pipe(withLatestFrom(store.select(TrainByZipState.uploadedZip)))
      .pipe(filter(([, zip]) => !!zip));
    state.hold(whenShowSuccess$, ([, zip]) =>
      store.dispatch(
        new ShowNotification({
          message: `${zip?.file.name} (${prettyBytes(zip?.file.size || 0)}) has accepted`,
          options: { label: 'Upload ZIP Success', status: TuiNotification.Success }
        })
      )
    );

    const whenShowError$ = actions
      .pipe<UpdateZip>(ofActionErrored(UpdateZip))
      .pipe(withLatestFrom(store.select(TrainByZipState.errorMessage)));
    state.hold(whenShowError$, ([, errorMessage]) => {
      store.dispatch(
        new ShowNotification({
          message: errorMessage || '',
          options: { label: 'Upload ZIP Error', status: TuiNotification.Error }
        })
      );
      this.file.setValue(null);
    });

    state.hold(this.file.valueChanges, (file) => store.dispatch(new UpdateZip(file)));
    state.hold(this.clickDownload$, () => store.dispatch(new DownloadClassesTxt()));
    state.hold(this.clickTrain$, () => {
      // dialog.open()
      store.dispatch(new Train());
    });

    state.hold(actions.pipe(ofActionSuccessful(Train)), () =>
      router.navigateByUrl('/training/history')
    );
  }
}
