export interface Column {
  id: string;
  name: string;
  isFilterable: boolean;
  filterAmount: number;
  filterOperator: string;
  shouldDisplay: boolean;
}

export interface ColumnSettings {
  [propName: string]: Column;
}
