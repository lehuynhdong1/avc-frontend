import { Component, ChangeDetectionStrategy } from '@angular/core';

import { FormControl } from '@angular/forms';
import { Observable, zip } from 'rxjs';
import { tap, shareReplay, withLatestFrom, takeUntil } from 'rxjs/operators';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import {
  UpdateImages,
  TrainByImagesState,
  IMAGE_TYPES,
  MAXIMUM_IMAGE_SIZE
} from '@admin/train-model/train-by-images/data-access';
import { ShowNotification } from '@shared/util';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { TuiStatus } from '@taiga-ui/kit';

@Component({
  templateUrl: './upload-zip.page.html',
  styleUrls: ['./upload-zip.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadZipPage {
  TUI_SUCCESS = TuiStatus.Success;
  ACCEPTED_FILE_TYPES = IMAGE_TYPES.join(',');
  MAX_FILE_SIZE = MAXIMUM_IMAGE_SIZE;

  readonly files = new FormControl([]);
  private readonly filesChanged$: Observable<ReadonlyArray<File>> = this.files.valueChanges.pipe(
    tap((files) => this.store.dispatch(new UpdateImages(files))),
    shareReplay()
  );

  private readonly whenShowError$ = this.actions.pipe(ofActionSuccessful(ShowNotification));

  // readonly setFilesWhenError$ = zip(this.whenShowError$, this.whenUpdateImages$).pipe(
  //   withLatestFrom(this.store.select(TrainByImagesState.uploadedImages)),
  //   tap(([, uploadedImages]) => this.files.patchValue(uploadedImages.map((image) => image.file)))
  // );

  constructor(private store: Store, private actions: Actions, private destroy$: TuiDestroyService) {
    // this.setFilesWhenError$.pipe(takeUntil(this.destroy$)).subscribe();
  }
}
