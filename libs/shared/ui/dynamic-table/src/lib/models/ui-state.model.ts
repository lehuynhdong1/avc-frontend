interface KeyValue<K, Type> {
  key: K;
  title: string;
  type: Type;
  /**
   * @description template for a cell. Supported #FIELD_OF_T
   * @example "#firstName #lastName  #person.name.surname"
   */
  cellTemplate?: string;
}

export type Id = string | number;
export type HasId = { id?: Id };

export interface BooleanField<Dto extends HasId> extends KeyValue<keyof Dto, 'boolean'> {
  trueMessage: string;
  falseMessage: string;
}

export type ColumnType<Dto extends HasId> = Readonly<
  | KeyValue<keyof Dto, 'string'>
  | KeyValue<keyof Dto, 'date'>
  | KeyValue<keyof Dto, 'number'>
  | BooleanField<Dto>
>;
export type DynamicTableColumns<Dto extends HasId> = ReadonlyArray<ColumnType<Dto>>;

export interface DynamicTableUiState {
  isOpened: boolean;
  selectedId: Id;
}
