import { State, Selector, Action, StateContext } from '@ngxs/store';
import { STATE_NAME, StateModel, INITIAL_STATE } from './state.model';
import { LoadIssues, LoadIssueById } from './actions';
import { IssueService } from '@shared/api';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@State<StateModel>({
  name: STATE_NAME,
  defaults: INITIAL_STATE
})
@Injectable()
export class IssueState {
  @Selector()
  static issues({ listing }: StateModel) {
    return listing;
  }
  @Selector()
  static selectedIssue({ detail }: StateModel) {
    return detail;
  }
  @Selector()
  static errorMessage({ errorMessage }: StateModel) {
    return errorMessage;
  }

  constructor(private issuesService: IssueService) {}

  @Action(LoadIssues, { cancelUncompleted: true }) loadIssues(
    { patchState }: StateContext<StateModel>,
    { params }: LoadIssues
  ) {
    return this.issuesService.apiIssueGet(params).pipe(tap((listing) => patchState({ listing })));
  }

  @Action(LoadIssueById) loadIssueById(
    { patchState }: StateContext<StateModel>,
    { params }: LoadIssueById
  ) {
    return this.issuesService.apiIssueIdGet(params).pipe(tap((detail) => patchState({ detail })));
  }
}
