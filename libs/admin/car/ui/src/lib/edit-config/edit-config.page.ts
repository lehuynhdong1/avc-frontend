import { HttpClient } from '@angular/common/http';
import { CAR_CONFIG_SCHEMA, CarConfig } from './config.model';
import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { Actions, ofActionErrored, ofActionSuccessful, Store } from '@ngxs/store';
import { CarState, LoadCarById, UpdateCar } from '@shared/features/car/data-access';
import { ActivatedRoute } from '@angular/router';
import { map, shareReplay, switchMap, filter, withLatestFrom } from 'rxjs/operators';
import { Empty, hasValue, ShowNotification } from '@shared/util';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';
import { TuiNotification } from '@taiga-ui/core';

@Component({
  templateUrl: './edit-config.page.html',
  styleUrls: ['./edit-config.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class EditConfigPage {
  readonly EDITOR_OPTIONS: JsonEditorOptions = {
    ...new JsonEditorOptions(),
    enableSort: false,
    enableTransform: false,
    sortObjectKeys: false,
    history: false,
    name: 'Car Configuration',
    schema: CAR_CONFIG_SCHEMA,
    expandAll: true
  };

  @ViewChild(JsonEditorComponent) editor: JsonEditorComponent;

  selectedCar$ = this.store
    .select(CarState.selectedCar)
    .pipe(hasValue(), shareReplay({ refCount: true, bufferSize: 1 }));

  config$ = this.selectedCar$.pipe(
    filter((car) => !!car?.configUrl),
    switchMap((car) => this.http.get<CarConfig>(car.configUrl || ''))
  );

  /* Actions */
  save$ = new Subject();

  constructor(
    private store: Store,
    private actions: Actions,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    state: RxState<Empty>
  ) {
    const id$ = this.activatedRoute.params.pipe(map(({ id }) => parseInt(id)));
    state.hold(id$, (id) => this.store.dispatch(new LoadCarById({ id })));

    state.hold(this.save$.pipe(withLatestFrom(this.selectedCar$)), ([, car]) => {
      const editorJson = this.editor.getEditor();
      editorJson.validate();
      const errors = editorJson.validateSchema.errors;
      if (errors && errors.length > 0)
        this.store.dispatch(
          new ShowNotification({
            message:
              'Your configuration is in wrong format. Please fix the warning and submit again.',
            options: { label: 'Update Configuration failed', status: TuiNotification.Error }
          })
        );
      else {
        const content = editorJson.getText();
        const blob = new Blob([content], { type: 'text/plain' });
        const file = new File([blob], 'config.json', { type: 'application/json' });
        this.store.dispatch(new UpdateCar({ config: { id: car?.id || 0, configFile: file } }));
      }
    });

    const whenUpdateSuccess$ = this.actions.pipe<UpdateCar>(ofActionSuccessful(UpdateCar));
    state.hold(whenUpdateSuccess$, () =>
      this.store.dispatch(
        new ShowNotification({
          message: 'Your configuration has been updated successful.',
          options: { label: 'Update Configuration successful', status: TuiNotification.Success }
        })
      )
    );

    const whenUpdateFailed$ = this.actions.pipe<UpdateCar>(ofActionErrored(UpdateCar));
    state.hold(whenUpdateFailed$, () =>
      this.store.dispatch(
        new ShowNotification({
          message: 'Our server has been maintainance.',
          options: { label: 'Update Configuration failed', status: TuiNotification.Error }
        })
      )
    );
  }
}
