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
import { take, withLatestFrom } from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';
import {
  SelectedLabelImageFile,
  ImageDialog,
  Annotation,
  AnnotoriousLayer,
  joinStringsToSentence
} from '@admin/train-model/train-by-images/util';
import { LabelImageById, TrainByImagesState } from '@admin/train-model/train-by-images/data-access';
import { ShowNotification } from '@shared/util';
import { TuiNotification } from '@taiga-ui/core';

@Component({
  selector: 'adca-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class ImageDialogComponent implements AfterViewInit, OnDestroy {
  @Select(TrainByImagesState.selectedImage) selectedImage$: Observable<SelectedLabelImageFile>;
  private annoLayer: AnnotoriousLayer;
  annotations$ = this.state.select('annotations');

  private createAnnotation$ = new Subject<Annotation>();

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    readonly context: TuiDialog<{ data: SelectedLabelImageFile }, number>,
    private store: Store,
    private state: RxState<ImageDialog>
  ) {
    state.hold(this.createAnnotation$, (annotation) =>
      this.state.set((oldState) =>
        patch(oldState, { annotations: insert(oldState.annotations, annotation) })
      )
    );
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
      .pipe(withLatestFrom(this.selectedImage$), take(1))
      .subscribe(([annotations, selectedImage]) => {
        const action = selectedImage.annotations?.length ? 'updated' : 'created';
        const tags = annotations.map((annotation) => annotation.body[0].value);
        const tagsToString = joinStringsToSentence(tags);
        this.store.dispatch([
          new ShowNotification({
            message: `You've ${action} ${annotations.length} labels with tags ${tagsToString}.`,
            options: { label: `Labels ${action} successfully`, status: TuiNotification.Success }
          }),
          new LabelImageById(this.context.data.id, annotations)
        ]);
      });
  }

  complete(response: number) {
    this.context.completeWith(response);
  }
}
