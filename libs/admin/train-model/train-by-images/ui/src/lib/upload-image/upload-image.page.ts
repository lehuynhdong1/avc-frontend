import { TuiNotification } from '@taiga-ui/core';
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap, withLatestFrom, filter, shareReplay, delay } from 'rxjs/operators';
import { Actions, ofActionErrored, Store } from '@ngxs/store';
import {
  UpdateImages,
  TrainByImagesState,
  IMAGE_TYPES,
  MAXIMUM_IMAGE_SIZE
} from '@admin/train-model/train-by-images/data-access';
import { ShowNotification, Empty } from '@shared/util';
import { TuiStatus } from '@taiga-ui/kit';
import { RxState } from '@rx-angular/state';
import * as prettyBytes from 'pretty-bytes';

@Component({
  templateUrl: './upload-image.page.html',
  styleUrls: ['./upload-image.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class UploadImagePage {
  TUI_SUCCESS = TuiStatus.Success;
  ACCEPTED_FILE_TYPES = IMAGE_TYPES.join(',');
  MAX_FILE_SIZE = MAXIMUM_IMAGE_SIZE;

  readonly files = new FormControl([]);
  private readonly filesChanged$: Observable<ReadonlyArray<File>> = this.files.valueChanges.pipe(
    shareReplay({ refCount: true, bufferSize: 1 }),
    tap(console.warn)
  );
  readonly fileLengthChanged$ = this.filesChanged$.pipe(map((files) => files.length));
  readonly uploadedImages$ = this.store.select(TrainByImagesState.uploadedImages);

  constructor(private store: Store, private actions: Actions, private state: RxState<Empty>) {
    this.fileChangedEffect();
    this.uploadedImagesChangedEffect();
    this.uploadFailedEffect();
  }

  private uploadFailedEffect() {
    const whenHasError$ = this.actions.pipe<UpdateImages>(ofActionErrored(UpdateImages));
    this.state.hold(whenHasError$, () => {
      const rejectedFiles = this.store.selectSnapshot(TrainByImagesState.rejectedFiles);

      this.store.dispatch(
        rejectedFiles?.map(
          (file) =>
            new ShowNotification({
              message: `${file.file.name} (${prettyBytes(file.file.size)}) ${file.error}`,
              options: { label: 'Oops! Invalid Image', status: TuiNotification.Error }
            })
        )
      );
    });
  }

  private fileChangedEffect() {
    this.state.hold(
      this.filesChanged$.pipe(
        withLatestFrom(this.uploadedImages$),
        filter(([files, uploadedImages]) => files.length !== uploadedImages?.length)
      ),
      ([files]) => {
        let max50Files = files;
        if (files?.length > 50) {
          this.store.dispatch(
            new ShowNotification({
              message: 'We only accept first 50 images at max for to give you best experience.',
              options: { label: 'Upload Images', status: TuiNotification.Error }
            })
          );
          max50Files = files.slice(0, 50);
        }
        this.store.dispatch(new UpdateImages(max50Files));
      }
    );
  }

  private uploadedImagesChangedEffect() {
    const filesFromStore$ = this.uploadedImages$.pipe(
      filter((files) => files.length !== this.files.value?.length),
      map((files) => files.map((imageFile) => imageFile.file)),
      delay(500)
    );
    this.state.hold(filesFromStore$, (filesFromStore) => this.files.patchValue(filesFromStore));
  }
}
