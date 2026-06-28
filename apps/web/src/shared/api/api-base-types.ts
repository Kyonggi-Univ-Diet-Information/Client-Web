export type BasePagedResponse<T> = {
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  size: number;
  content: T;
  number: number;
  sort: [
    {
      direction: string;
      nullHandling: string;
      ascending: boolean;
      property: string;
      ignoreCase: boolean;
    },
  ];
  numberOfElements: number;
  pageable: {
    offset: number;
    sort: [
      {
        direction: string;
        nullHandling: string;
        ascending: boolean;
        property: string;
        ignoreCase: boolean;
      },
    ];
    paged: boolean;
    pageNumber: number;
    pageSize: number;
    unpaged: boolean;
  };
  empty: boolean;
};

export type BaseResponse<T> = {
  result: T;
};
