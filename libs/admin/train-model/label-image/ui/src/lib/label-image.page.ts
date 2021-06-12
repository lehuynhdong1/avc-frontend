import {
  LabelImageFile,
  LabelImageState,
  SetSelectedImageId,
  TransferUploadedImages
} from '@admin/train-model/label-image/data-access';
import { UploadImageState } from '@admin/train-model/upload-image/data-access';
import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, Store } from '@ngxs/store';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { TuiDialogService } from '@taiga-ui/core';
import { TuiStepState } from '@taiga-ui/kit';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { map, shareReplay } from 'rxjs/operators';
import { ImageDialogComponent } from './image-dialog/image-dialog.component';
import { ImageDialogParams } from '@admin/train-model/label-image/util';

@Component({
  templateUrl: './label-image.page.html',
  styleUrls: ['./label-image.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDestroyService]
})
export class LabelImagePage {
  readonly TUI_STEPPER_PASS = TuiStepState.Pass;

  readonly imageFiles$ = this.store.select(LabelImageState.images).pipe(
    map((images) => Object.values(images)),
    shareReplay()
  );

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private store: Store,
    private actions: Actions,
    private destroy$: TuiDestroyService,
    private injector: Injector,
    private dialogService: TuiDialogService
  ) {
    this.store.dispatch(new TransferUploadedImages());
  }

  goTo(path: string[]) {
    this.router.navigate(path, { relativeTo: this.activatedRoute });
  }

  showDialog(labelImageFile: LabelImageFile) {
    this.store.dispatch(new SetSelectedImageId(labelImageFile.id));
    const imageFile = this.store.selectSnapshot(UploadImageState.getImageById(labelImageFile.id));
    const imageDialogParams: ImageDialogParams = {
      id: labelImageFile.id,
      dataUrl: labelImageFile.dataUrl,
      name: imageFile?.file.name ?? ''
    };
    this.dialogService
      .open<number>(new PolymorpheusComponent(ImageDialogComponent, this.injector), {
        size: 'l',
        label: imageFile?.file.name,
        data: imageDialogParams
      })
      .subscribe();
  }
}
