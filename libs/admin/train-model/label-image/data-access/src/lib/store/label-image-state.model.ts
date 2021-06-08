export const STATE_NAME = 'Admin_TrainModel_LabelImage';
export const INITIAL_STATE: StateModel = { images: {} };

export interface LabelImageFile {
  id: string;
  dataUrl: string;
}

export interface StateModel {
  images: {
    [id: string]: LabelImageFile;
  };
}

export function encodeDataUrl(file: File): Promise<string> {
  return new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = function () {
      resolve(reader.result as string);
    };
    reader.readAsDataURL(file);
  });
}
