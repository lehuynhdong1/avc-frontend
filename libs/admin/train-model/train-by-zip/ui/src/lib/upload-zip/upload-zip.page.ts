import { Component, ChangeDetectionStrategy } from '@angular/core';

import { FormControl } from '@angular/forms';
import { withLatestFrom } from 'rxjs/operators';
import { Actions, ofActionErrored, ofActionSuccessful, Store } from '@ngxs/store';
import { UpdateZip, TrainByZipState } from '@admin/train-model/train-by-zip/data-access';
import { MAXIMUM_IMAGE_SIZE } from '@admin/train-model/train-by-images/data-access';
import { Empty, ShowNotification } from '@shared/util';
import { TuiStatus } from '@taiga-ui/kit';
import { RxState } from '@rx-angular/state';
import { TuiNotification } from '@taiga-ui/core';
import * as prettyBytes from 'pretty-bytes';
import { Subject } from 'rxjs';

@Component({
  templateUrl: './upload-zip.page.html',
  styleUrls: ['./upload-zip.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class UploadZipPage {
  TUI_STATUS = { Success: TuiStatus.Success, Error: TuiStatus.Error, Primary: TuiStatus.Primary };
  MAX_FILE_SIZE = MAXIMUM_IMAGE_SIZE * 100;

  readonly file = new FormControl();

  private readonly whenShowError$ = this.actions.pipe<UpdateZip>(ofActionErrored(UpdateZip));
  private readonly whenShowSuccess$ = this.actions.pipe<UpdateZip>(ofActionSuccessful(UpdateZip));

  rejectFile$ = new Subject();

  constructor(private store: Store, private actions: Actions, private state: RxState<Empty>) {
    state.hold(
      this.whenShowSuccess$.pipe(withLatestFrom(this.store.select(TrainByZipState.uploadedZip))),
      ([, zip]) =>
        this.store.dispatch(
          new ShowNotification({
            message: `${zip?.name} (${prettyBytes(zip?.size || 0)}) has accepted`,
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

    state.hold(this.rejectFile$, console.warn);
    state.hold(this.file.valueChanges, (file) => {
      this.store.dispatch(new UpdateZip(file));
    });
  }
}
