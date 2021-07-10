import { LabelImageFile } from '@admin/train-model/train-by-images/util';

export interface StateModel {
  uploadedImages: ImageFile[];
  labelledImages: {
    [id: string]: LabelImageFile;
  };
  selectedImageId: string | null;
  errorMessage?: string;
}

export const STATE_NAME = 'Shared_TrainModel_Images';

export const INITIAL_STATE: StateModel = {
  uploadedImages: [],
  labelledImages: {},
  selectedImageId: null
};
const KB = 1024;
export const MAXIMUM_IMAGE_SIZE = 500 * KB;
export const IMAGE_TYPES = ['image/png', 'image/jpeg'];

export const ADD_IMAGE_ERRORS = {
  ADC201_EXCEED_MAXSIZE: `File size can not exceed <b>${MAXIMUM_IMAGE_SIZE / KB} KB</b>`,
  ADC202_INVALID_FILE_TYPE: `File type can only [${IMAGE_TYPES.join(',')}]`,
  ADC203_DUPLICATE_FILE: `File already uploaded.`,
  ADC204_FILE_NOT_FOUND: `File's not found.`
};

export interface ImageFile {
  id: string;
  file: File;
}

export function generateId(file: File): string {
  return btoa(file.lastModified + '' + file.size);
}
export function preCheckFile(file: File, currentIds: string[]): { error?: string; id?: string } {
  if (!file) return { error: ADD_IMAGE_ERRORS.ADC204_FILE_NOT_FOUND };
  if (!IMAGE_TYPES.includes(file.type)) return { error: ADD_IMAGE_ERRORS.ADC202_INVALID_FILE_TYPE };
  if (file.size > MAXIMUM_IMAGE_SIZE) return { error: ADD_IMAGE_ERRORS.ADC201_EXCEED_MAXSIZE };
  const id = generateId(file);
  if (currentIds.includes(id)) return { error: ADD_IMAGE_ERRORS.ADC203_DUPLICATE_FILE };
  return { id };
}
