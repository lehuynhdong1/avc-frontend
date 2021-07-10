import {
  TrainByImagesState,
  SetSelectedImageId,
  TransferUploadedImages,
  DonwloadLabelFiles
} from '@admin/train-model/train-by-images/data-access';
import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { TuiDialogService } from '@taiga-ui/core';
import { TuiStepState } from '@taiga-ui/kit';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { map, shareReplay, tap, take } from 'rxjs/operators';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { LabelImageFile, SelectedLabelImageFile } from '@admin/train-model/train-by-images/util';
import { ShowNotification } from '@shared/util';
import { RxState } from '@rx-angular/state';

@Component({
  templateUrl: './label-image.page.html',
  styleUrls: ['./label-image.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDestroyService, RxState]
})
export class LabelImagePage {
  readonly TUI_STEPPER_PASS = TuiStepState.Pass;

  readonly imageFiles$ = this.store.select(TrainByImagesState.labelledImages).pipe(
    map((labelledImages) => Object.values(labelledImages)),
    shareReplay()
  );

  readonly whenDownloadSuccess$ = this.actions.pipe(ofActionSuccessful(DonwloadLabelFiles)).pipe(
    tap(() =>
      this.store.dispatch(
        new ShowNotification({
          message: 'Your zip downloads successfully. Please check your Download folder!',
          options: {
            label: 'Download succeed'
          }
        })
      )
    )
  );

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private store: Store,
    private actions: Actions,
    private injector: Injector,
    private dialogService: TuiDialogService,
    private state: RxState<{ data: string }>
  ) {
    state.hold(this.whenDownloadSuccess$);
    this.store.dispatch(new TransferUploadedImages());
  }

  goTo(path: string[]) {
    this.router.navigate(path, { relativeTo: this.activatedRoute });
  }

  downloadLabelFile() {
    this.store.dispatch(new DonwloadLabelFiles());
  }

  showDialog(labelImageFile: LabelImageFile) {
    this.store.dispatch(new SetSelectedImageId(labelImageFile.id));
    const imageFile = this.store.selectSnapshot(TrainByImagesState.selectedImage);
    const imageDialogParams: SelectedLabelImageFile = {
      id: labelImageFile.id,
      adcImage: labelImageFile.adcImage,
      name: imageFile?.name ?? ''
    };
    this.dialogService
      .open<number>(new PolymorpheusComponent(ImageDialogComponent, this.injector), {
        size: 'l',
        label: imageFile?.name,
        data: imageDialogParams
      })
      .pipe(take(1))
      .subscribe();
  }
}
