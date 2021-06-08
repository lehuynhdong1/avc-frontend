import { Component, ChangeDetectionStrategy, Injector } from '@angular/core';

import { TuiStepState } from '@taiga-ui/kit';
import { Actions, Store } from '@ngxs/store';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import {
  LabelImageState,
  TransferUploadedImages
} from '@admin/train-model/label-image/data-access';
import { PolymorpheusTemplate, PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { LabelImageFile } from '../../../data-access/src/lib/store/label-image-state.model';
import { UploadImageState } from '../../../../upload-image/data-access/src/lib/store/upload-image.state';
import {
  ImageDialogComponent,
  ImageDialogComponentParams
} from './image-dialog/image-dialog.component';

@Component({
  templateUrl: './label-image.page.html',
  styleUrls: ['./label-image.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDestroyService]
})
export class LabelImagePage {
  TUI_STEPPER_PASS = TuiStepState.Pass;

  readonly imageFiles$ = this.store
    .select(LabelImageState.images)
    .pipe(map((images) => Object.values(images)));

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
    const imageFile = this.store.selectSnapshot(UploadImageState.getImageById(labelImageFile.id));
    const imageDialogParams: ImageDialogComponentParams = {
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
