import { useQuery, UseQueryOptions } from 'react-query';

import { parseResponseData } from '@api/parseResponse';
import { RawResponse } from '@api/response';

import { api } from '@api';

import { createUseUsersKey } from '@services/useUsers/keys';
import { User } from '@services/useUsers/types';

export const useUsers = (page: number, options?: UseQueryOptions<User[]>) => {
  return useQuery<User[]>(
    createUseUsersKey(page),
    () => api.get<RawResponse<User[]>>(`/users?since=${page}&per_page=50`).then(parseResponseData),
    options,
  );
};
