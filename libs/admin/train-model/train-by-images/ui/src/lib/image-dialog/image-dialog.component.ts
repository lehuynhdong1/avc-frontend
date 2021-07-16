import { Component, ChangeDetectionStrategy, Inject, AfterViewInit } from '@angular/core';
import { TuiDialog } from '@taiga-ui/cdk';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { Annotorious } from '@recogito/annotorious';
import { insert, RxState, patch, update } from '@rx-angular/state';
import { Observable, Subject } from 'rxjs';
import { take, withLatestFrom } from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';
import {
  SelectedLabelImageFile,
  Annotation,
  AnnotoriousLayer,
  joinStringsToSentence
} from '@admin/train-model/train-by-images/util';
import { ImageDialog } from './image-dialog.model';
import { LabelImageById, TrainByImagesState } from '@admin/train-model/train-by-images/data-access';
import { ShowNotification } from '@shared/util';
import { TuiNotification } from '@taiga-ui/core';
import { TuiStatus } from '@taiga-ui/kit';
import { labels } from '@admin/train-model/train-by-images/util';

@Component({
  selector: 'adca-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class ImageDialogComponent implements AfterViewInit {
  readonly TUI_BADGE_ERROR = TuiStatus.Error;
  readonly LABELS = labels;

  @Select(TrainByImagesState.selectedImage) selectedImage$: Observable<SelectedLabelImageFile>;
  private annoLayer: AnnotoriousLayer;
  annotations$ = this.state.select('annotations');
  changed$ = this.state.select('changed');

  clickSave$ = new Subject<void>();
  clickDiscard$ = new Subject<void>();

  private createAnnotation$ = new Subject<Annotation>();
  private updateAnnotation$ = new Subject<Annotation>();

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    readonly context: TuiDialog<{ data: SelectedLabelImageFile }, number>,
    private store: Store,
    private state: RxState<ImageDialog>
  ) {
    this.state.set({ changed: false });
    state.hold(this.createAnnotation$, (annotation) =>
      this.state.set((oldState) =>
        patch(oldState, { annotations: insert(oldState.annotations, annotation) })
      )
    );
    state.hold(this.updateAnnotation$, (annotation) =>
      this.state.set((oldState) =>
        patch(oldState, {
          annotations: update(
            oldState.annotations,
            annotation,
            (oldAnno, newAnno) => oldAnno.id === newAnno.id
          )
        })
      )
    );
    state.hold(this.clickDiscard$, () => this.context.completeWith(1));
    this.clickSaveEffect();
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
      this.state.set({ changed: true });
    });
    this.annoLayer.on('updateAnnotation', (annotation: Annotation) => {
      this.updateAnnotation$.next(annotation);
      this.state.set({ changed: true });
    });
  }

  clickSaveEffect() {
    this.state.hold(
      this.clickSave$.pipe(withLatestFrom(this.annotations$, this.selectedImage$)),
      ([, annotations, selectedImage]) => {
        const action = selectedImage.annotations?.length ? 'updated' : 'created';
        const tags = annotations.map((annotation) => annotation.body[0].value);
        const invalidTags = tags.filter((tag) => !labels.includes(tag));
        if (invalidTags.length) {
          this.store.dispatch(
            new ShowNotification({
              message: `There are ${invalidTags.length} invalid tags (${joinStringsToSentence(
                invalidTags
              )}), please make sure all of those match the accepted labels above.`,
              options: { label: `Invalid tags`, status: TuiNotification.Error }
            })
          );
          return;
        }

        const tagsToString = joinStringsToSentence(tags);
        this.store.dispatch(new LabelImageById(this.context.data.id, annotations));
        this.store.dispatch(
          new ShowNotification({
            message: `You've ${action} ${annotations.length} labels with tags ${tagsToString}.`,
            options: { label: `Labels ${action} successfully`, status: TuiNotification.Success }
          })
        );
        this.context.completeWith(1);
      }
    );
  }
}
