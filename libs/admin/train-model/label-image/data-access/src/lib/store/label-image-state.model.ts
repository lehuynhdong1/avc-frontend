const MEGA_BYTE = 1024 * 1024;
export const MAXIMUM_IMAGE_SIZE = 2 * MEGA_BYTE;
export const IMAGE_TYPES = ['image/png', 'image/jpeg'];

export const ADD_IMAGE_ERRORS = {
  ADC201_EXCEED_MAXSIZE: `File size can not exceed <b>${MAXIMUM_IMAGE_SIZE / MEGA_BYTE} MB</b>`,
  ADC202_INVALID_FILE_TYPE: `File type can only [${IMAGE_TYPES.join(',')}]`,
  ADC203_DUPLICATE_FILE: `File already uploaded.`,
  ADC204_FILE_NOT_FOUND: `File's not found.`
};

export const STATE_NAME = 'Admin_TrainModel_LabelImage';
export const INITIAL_STATE: StateModel = { images: [] };

export interface ImageFile {
  id: string;
  file: File;
}

export interface StateModel {
  images: ImageFile[];
}

function hashCode(text: string): number {
  var hash = 0,
    i,
    chr;
  if (text.length === 0) return hash;
  for (i = 0; i < text.length; i++) {
    chr = text.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}
export function generateId(file: File): string {
  return hashCode(file.lastModified + '' + file.size).toString();
}
export function preCheckFile(file: File, currentIds: string[]): { error?: string; id?: string } {
  if (!file) return { error: ADD_IMAGE_ERRORS.ADC204_FILE_NOT_FOUND };
  if (!IMAGE_TYPES.includes(file.type)) return { error: ADD_IMAGE_ERRORS.ADC202_INVALID_FILE_TYPE };
  if (file.size > MAXIMUM_IMAGE_SIZE) return { error: ADD_IMAGE_ERRORS.ADC201_EXCEED_MAXSIZE };
  const id = generateId(file);
  if (currentIds.includes(id)) return { error: ADD_IMAGE_ERRORS.ADC203_DUPLICATE_FILE };
  return { id };
}
