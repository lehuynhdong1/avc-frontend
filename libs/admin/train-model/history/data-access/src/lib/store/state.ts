import { Injectable } from '@angular/core';
import { Selector, State, Action, StateContext } from '@ngxs/store';
import { StateModel, INITIAL_STATE, STATE_NAME } from './state.model';
import { ModelService } from '@shared/api';
import { LoadModelById, LoadModels, ApplyModelById } from './actions';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@State<StateModel>({
  name: STATE_NAME,
  defaults: INITIAL_STATE
})
@Injectable()
export class TrainHistoryState {
  @Selector()
  static models({ listing }: StateModel) {
    return listing;
  }
  @Selector()
  static selectedModel({ detail }: StateModel) {
    return detail;
  }

  constructor(private modelService: ModelService) {}

  @Action(LoadModels, { cancelUncompleted: true })
  LoadModels({ patchState }: StateContext<StateModel>, { params }: LoadModels) {
    return this.modelService.apiModelGet(params).pipe(
      tap((models) => patchState({ listing: models })),
      catchError((error) => {
        // console.warn(`[${STATE_NAME}] LoadModels failed with error: `, error);
        const errorMessage = 'Load models failed. Sorry, please try again later.';
        patchState({ errorMessage });
        return throwError(errorMessage);
      })
    );
  }

  @Action(LoadModelById, { cancelUncompleted: true })
  LoadModelById({ patchState }: StateContext<StateModel>, { params }: LoadModelById) {
    return this.modelService.apiModelIdGet(params).pipe(
      tap((modelById) => patchState({ detail: modelById })),
      catchError((error) => {
        // console.warn(`[${STATE_NAME}] LoadModelById failed with error: `, error);
        const errorMessage = 'Load model by ID failed. Sorry, please try again later.';
        patchState({ errorMessage });
        return throwError(errorMessage);
      })
    );
  }

  @Action(ApplyModelById, { cancelUncompleted: true })
  ApplyModelById({ patchState }: StateContext<StateModel>, { params }: ApplyModelById) {
    return this.modelService.apiModelIdApplyingPut(params).pipe(
      catchError((error) => {
        // console.warn(`[${STATE_NAME}] ApplyModelById failed with error: `, error);
        const errorMessage = 'Apply model failed. Sorry, please try again later.';
        patchState({ errorMessage });
        return throwError(errorMessage);
      })
    );
  }
}
