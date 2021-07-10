export interface Annotation {
  '@context': string;
  id: string;
  type: string;
  body: Array<{
    type: string;
    value: string;
  }>;
  target: {
    selector: {
      type: string;
      conformsTo: string;
      value: string;
    };
  };
}

export type Annotations = Array<Annotation>;
