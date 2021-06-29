import { STATE_NAME } from './state.model';
import { ApiIssueGetRequestParams, ApiIssueIdGetRequestParams } from '@shared/api';

const ACTIONS = {
  LOAD_ISSUES: `[${STATE_NAME}] Load issues`,
  LOAD_ISSUE_BY_ID: `[${STATE_NAME}] Load issue by ID`
};

export class LoadIssues {
  static readonly type = ACTIONS.LOAD_ISSUES;
  constructor(public readonly params: ApiIssueGetRequestParams) {}
}

export class LoadIssueById {
  static readonly type = ACTIONS.LOAD_ISSUE_BY_ID;
  constructor(public readonly params: ApiIssueIdGetRequestParams) {}
}
