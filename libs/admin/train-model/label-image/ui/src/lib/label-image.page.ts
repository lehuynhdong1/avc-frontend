import { Component, ChangeDetectionStrategy } from '@angular/core';

import { FormControl } from '@angular/forms';
import { TuiFileLike } from '@taiga-ui/kit';
import { Observable, zip } from 'rxjs';
import { map, tap, shareReplay, withLatestFrom, takeUntil } from 'rxjs/operators';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import {
  UpdateImages,
  LabelImageState,
  IMAGE_TYPES,
  MAXIMUM_IMAGE_SIZE
} from '@admin/train-model/label-image/data-access';
import { ShowNotification } from '@shared/auth/util';
import { TuiDestroyService } from '@taiga-ui/cdk';

class RejectedFile {
  constructor(readonly file: TuiFileLike, readonly reason: string) {}
}

function convertRejected({ file, reason }: RejectedFile): TuiFileLike {
  return {
    name: file.name,
    size: file.size,
    type: file.type,
    content: reason
  };
}

@Component({
  templateUrl: './label-image.page.html',
  styleUrls: ['./label-image.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDestroyService]
})
export class LabelImagePage {
  ACCEPTED_FILE_TYPES = IMAGE_TYPES.join(',');
  MAX_FILE_SIZE = MAXIMUM_IMAGE_SIZE;

  readonly files = new FormControl([]);
  private readonly filesChanged$: Observable<ReadonlyArray<File>> = this.files.valueChanges.pipe(
    tap((files) => this.store.dispatch(new UpdateImages(files))),
    shareReplay()
  );

  private readonly whenShowError$ = this.actions.pipe(ofActionSuccessful(ShowNotification));
  private readonly whenUpdateImages$ = this.actions.pipe(ofActionSuccessful(UpdateImages));

  readonly fileLengthChanged$: Observable<number> = this.filesChanged$.pipe(
    map((files) => files.length)
  );

  readonly setFilesWhenError$ = zip(this.whenShowError$, this.whenUpdateImages$).pipe(
    withLatestFrom(this.store.select(LabelImageState.images)),
    tap(([_, images]) => {
      console.log('T chay sau nha nha');

      this.files.patchValue(images.map((image) => image.file));
    })
  );

  constructor(private store: Store, private actions: Actions, private destroy$: TuiDestroyService) {
    this.setFilesWhenError$.pipe(takeUntil(this.destroy$)).subscribe();
  }
}
