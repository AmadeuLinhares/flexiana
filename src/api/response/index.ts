import { AxiosError } from 'axios';

type RawError = {
  error: {
    code: number;
    http_code?: number;
    message: string;
    detail?: {
      message: string;
    };
  };
};

export type ErrorRequest = AxiosError<RawError>;

type DefaultResponse<Data> = {
  data: Data;
};

export type RawResponse<Data> = DefaultResponse<Data>;
