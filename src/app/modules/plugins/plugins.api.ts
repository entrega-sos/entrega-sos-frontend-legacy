export class DataPaginationEvent {
  page?: number;
  pageSize?: number;
  idTable?: string;
}

export class SelectItemEvent<T> {
  item?: T;
}