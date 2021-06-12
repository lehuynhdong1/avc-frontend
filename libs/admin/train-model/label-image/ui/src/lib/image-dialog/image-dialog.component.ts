import {
  Component,
  ChangeDetectionStrategy,
  Inject,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { TuiDialog } from '@taiga-ui/cdk';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { Annotorious } from '@recogito/annotorious';
import { insert, RxState, patch } from '@rx-angular/state';
import { Observable, Subject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';
import {
  ImageDialogParams,
  ImageDialog,
  Annotation,
  AnnotoriousLayer
} from '@admin/train-model/label-image/util';
import {
  LabelImageById,
  LabelImageState,
  SelectedLabelImageFile
} from '@admin/train-model/label-image/data-access';

@Component({
  selector: 'adca-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class ImageDialogComponent implements AfterViewInit, OnDestroy {
  @Select(LabelImageState.selectedImage()) selectedImage$: Observable<SelectedLabelImageFile>;
  private annoLayer: AnnotoriousLayer;
  annotations$ = this.state.select('annotations');

  private createAnnotation$ = new Subject<Annotation>();

  createAnnotationEffect$ = this.createAnnotation$.pipe(
    tap((annotation) =>
      this.state.set((oldState) =>
        patch(oldState, { annotations: insert(oldState.annotations, annotation) })
      )
    )
  );

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    readonly context: TuiDialog<{ data: ImageDialogParams }, number>,
    private store: Store,
    private state: RxState<ImageDialog>
  ) {
    state.hold(this.createAnnotationEffect$);
  }

  ngAfterViewInit() {
    this.annoLayer = new Annotorious({ image: 'currentImage', readonly: true });
    this.selectedImage$.pipe(take(1)).subscribe(({ annotations }) => {
      this.state.set({ annotations });
      for (const annotation of annotations ?? []) {
        this.annoLayer.addAnnotation(annotation);
      }
    });
    this.annoLayer.on('createAnnotation', (annotation: Annotation) => {
      this.createAnnotation$.next(annotation);
    });
  }

  ngOnDestroy() {
    this.annotations$
      .pipe(take(1))
      .subscribe((annotations) =>
        this.store.dispatch(new LabelImageById(this.context.data.id, annotations))
      );
  }

  complete(response: number) {
    this.context.completeWith(response);
  }
}
