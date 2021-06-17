import { Labels } from '../models';
/**
 * @param boxInString - Location of the annotation on the image in format `xywh=pixel:16.5,56,113,40` from [Annotation.target.selector.value]
 * @param label - label of this annotation from [Annotation.body[0].value]
 * @param image - Width and height of the image which contains label
 */
export function stringifyBox(boxInString: string, label: Labels, image: Image) {
  const cordinateInString = boxInString.slice(boxInString.indexOf(':') + 1);
  const [x, y, width, height] = cordinateInString.split(',').map((item) => parseInt(item));
  const box = convertCoordinates(image, { x, y, width, height });
  return toString(label, box);
}

interface Image {
  width: number;
  height: number;
}

interface Box {
  x: number;
  y: number;
  width: number;
  height: number;
}

function convertCoordinates(image: Image, box: Box): Box {
  const dw = 1.0 / image.width;
  const dh = 1.0 / image.height;
  const centerBoxX = box.x + box.width / 2.0;
  const centerBoxY = box.y + box.height / 2.0;
  return { x: centerBoxX * dw, y: centerBoxY * dh, width: box.width * dw, height: box.height * dh };
}

function toString(label: Labels, box: Box): string {
  return `${label} ${box.x} ${box.y} ${box.width} ${box.height}`;
}
