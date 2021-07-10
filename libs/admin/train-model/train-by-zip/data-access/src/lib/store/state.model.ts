export interface StateModel {
  uploadedZip?: File;
  errorMessage?: string;
}

export const STATE_NAME = 'Shared_TrainModel_Zip';
export const INITIAL_STATE: StateModel = {};

export const ACCEPTED_FOLDER_NAMES = ['imgs', 'labels'];
export const ACCEPTED_LABEL_FILE_NAME = 'classes.txt';
