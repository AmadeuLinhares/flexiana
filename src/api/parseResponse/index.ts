import { AxiosResponse } from 'axios';

import { RawResponse } from '@api/response';

export function parseResponseData<T>(
  response: AxiosResponse<RawResponse<T>> | AxiosResponse<T>,
): T {
  if (typeof response.data === `object` && `data` in response.data) {
    return response.data.data;
  }
  return response.data;
}
