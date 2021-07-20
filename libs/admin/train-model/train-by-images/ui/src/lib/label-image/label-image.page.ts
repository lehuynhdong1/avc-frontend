import {
  TrainByImagesState,
  SetSelectedImageId,
  TransferUploadedImages,
  DonwloadLabelFiles,
  Train
} from '@admin/train-model/train-by-images/data-access';
import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { TuiDestroyService, tuiPure } from '@taiga-ui/cdk';
import { TuiDialogService } from '@taiga-ui/core';
import { TuiStepState, TuiMarkerIconMode, TuiStatus } from '@taiga-ui/kit';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { map, tap, take } from 'rxjs/operators';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import {
  LabelImageFile,
  SelectedLabelImageFile,
  labels
} from '@admin/train-model/train-by-images/util';
import { ShowNotification, Empty } from '@shared/util';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';

@Component({
  templateUrl: './label-image.page.html',
  styleUrls: ['./label-image.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDestroyService, RxState]
})
export class LabelImagePage {
  readonly TUI_STEPPER_PASS = TuiStepState.Pass;
  readonly TUI_STATUS_SUCCESS = TuiMarkerIconMode.Success;
  readonly TUI_SUCCESS = TuiStatus.Success;
  readonly TUI_BADGE_ERROR = TuiStatus.Error;
  readonly LABELS = labels;

  readonly imageFiles$ = this.store
    .select(TrainByImagesState.labelledImages)
    .pipe(map((labelledImages) => Object.values(labelledImages)));

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

  clickTrain$ = new Subject<void>();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store,
    private actions: Actions,
    private injector: Injector,
    private dialogService: TuiDialogService,
    private state: RxState<Empty>
  ) {
    this.store.dispatch(new TransferUploadedImages());
    state.hold(this.whenDownloadSuccess$);
    state.hold(this.clickTrain$, () => this.store.dispatch(new Train()));
    this.trainSuccessEffect();
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
        dismissible: false,
        closeable: false,
        size: 'l',
        label: imageFile?.name,
        data: imageDialogParams
      })
      .pipe(take(1))
      .subscribe();
  }

  private trainSuccessEffect() {
    const whenTrainSuccess$ = this.actions.pipe<Train>(ofActionSuccessful(Train));
    this.state.hold(whenTrainSuccess$, () => this.router.navigateByUrl('/training/history'));
  }

  @tuiPure
  allMarked(imageFiles: LabelImageFile[] | null) {
    if (!imageFiles) return false;
    return imageFiles.every((imageFile) => imageFile.annotations?.length);
  }
}
