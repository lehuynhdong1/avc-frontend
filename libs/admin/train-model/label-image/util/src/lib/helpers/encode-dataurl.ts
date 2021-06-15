import { AdcImage } from '../models/adc-image.model';

export function encodeDataUrl(file: File): Promise<AdcImage> {
  return new Promise<AdcImage>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const image = new Image();
      image.onload = () => {
        resolve({ mimeType: file.type, width: image.width, height: image.height, dataUrl: reader.result as string });
      };

      image.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}
