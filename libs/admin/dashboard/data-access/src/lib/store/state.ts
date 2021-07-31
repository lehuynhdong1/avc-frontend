import { Injectable } from '@angular/core';
import { Selector, State, Action, StateContext } from '@ngxs/store';
import { StateModel, INITIAL_STATE, STATE_NAME } from './state.model';
import { DashBoardService } from '@shared/api';
import { LoadDashboard } from './actions';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@State<StateModel>({
  name: STATE_NAME,
  defaults: INITIAL_STATE
})
@Injectable()
export class DashboardState {
  @Selector()
  static dashboard({ dashboard }: StateModel) {
    return dashboard;
  }

  constructor(private dashboardService: DashBoardService) {}

  @Action(LoadDashboard, { cancelUncompleted: true })
  LoadDashboard({ patchState }: StateContext<StateModel>) {
    return this.dashboardService.apiDashboardGet().pipe(
      tap((dashboard) => patchState({ dashboard })),
      catchError((error) => {
        // console.warn(`[${STATE_NAME}] LoadDashboard failed with error: `, error);
        const errorMessage = 'Load dashboard failed. Sorry, please try again later.';
        patchState({ errorMessage });
        return throwError(errorMessage);
      })
    );
  }
}
