import { Annotation } from './annotation.model';

export interface AnnotoriousLayer {
  on: (event: string, callback: (value: Annotation) => void) => void;
  addAnnotation: (annotation: Annotation) => void;
}
