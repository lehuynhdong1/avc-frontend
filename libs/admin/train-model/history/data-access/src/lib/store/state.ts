import { Injectable } from '@angular/core';
import { Selector, State, Action, StateContext } from '@ngxs/store';
import { StateModel, INITIAL_STATE, STATE_NAME } from './state.model';
import { ModelService } from '@shared/api';
import {
  LoadModelById,
  LoadModels,
  ApplyModelById,
  LoadLogModelById,
  DownloadImages
} from './actions';
import { tap, catchError, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { GitlabApiService, hasValue } from '@shared/util';
import { saveAs } from 'file-saver';
import { DownloadLog } from './actions';

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
    return detail?.model;
  }
  @Selector()
  static selectedModelLog({ detail }: StateModel) {
    return detail?.jobLog;
  }

  constructor(private modelService: ModelService, private gitlabApi: GitlabApiService) {}

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
      tap((modelById) => patchState({ detail: { model: modelById } })),
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

  @Action(LoadLogModelById, { cancelUncompleted: true })
  LoadLogModelById({ patchState, getState }: StateContext<StateModel>) {
    const modelId = getState().detail?.model?.id;
    if (!modelId) return;
    return this.gitlabApi
      .getLatestPipelineIdByModelId(modelId)

      .pipe(
        hasValue(),
        switchMap((pipelineId) => this.gitlabApi.getJobIdByPipelineId(pipelineId)),
        hasValue(),
        switchMap((jobId) => this.gitlabApi.getLogByJobId(jobId)),
        tap((log) => patchState({ detail: { ...getState().detail, jobLog: log } })),
        catchError((error) => {
          // console.warn(`[${STATE_NAME}] LoadLogModelById failed with error: `, error);
          const errorMessage = 'Load log model failed. Sorry, please try again later.';
          patchState({ errorMessage });
          return throwError(errorMessage);
        })
      );
  }

  @Action(DownloadImages, { cancelUncompleted: true })
  DownloadImages({ getState }: StateContext<StateModel>) {
    const modelId = getState().detail?.model?.id;
    if (!modelId) return;
    return this.gitlabApi
      .getDatasetZipByModelId(modelId)
      .pipe(
        tap((zip) =>
          saveAs(`data:application/octet-stream;base64,${zip.content}`, `traindata-${modelId}.zip`)
        )
      );
  }

  @Action(DownloadLog, { cancelUncompleted: true })
  DownloadLog({ getState }: StateContext<StateModel>) {
    const { detail } = getState();
    if (!detail) return;
    const { model, jobLog } = detail;
    if (!model || !jobLog) return;
    const file = new Blob([jobLog]);
    return saveAs(file, `train-logs-${model?.id}.txt`);
  }
}
