import { useQuery, UseQueryOptions } from 'react-query';

import { parseResponseData } from '@api/parseResponse';
import { RawResponse } from '@api/response';

import { api } from '@api';

import { ContributorsProps, ReposProps, searchRepoByCompany } from '@services/useRepos/types';
import {
  createUseContributorsKey,
  createUseReposKey,
  createUseSearchRepoByCompanyKey,
} from '@services/useRepos/keys';

export const useRepos = (
  page: number,
  companyName: string,
  options?: UseQueryOptions<ReposProps[]>,
) => {
  return useQuery<ReposProps[]>(
    createUseReposKey(page),
    () =>
      api
        .get<RawResponse<ReposProps[]>>(`/orgs/${companyName}/repos?since=${page}&per_page=50`)
        .then(parseResponseData),
    options,
  );
};

export const useGetRepoByCompany = (
  companyName: string,
  repositoryName: string,
  options?: UseQueryOptions<searchRepoByCompany>,
) => {
  return useQuery<searchRepoByCompany>(
    createUseSearchRepoByCompanyKey(),
    () =>
      api
        .get<RawResponse<searchRepoByCompany>>(`repos/${companyName}/${repositoryName}`)
        .then(parseResponseData),
    options,
  );
};

export const useGetContributors = (
  page: number,
  companyName: string,
  repositoryName: string,
  options?: UseQueryOptions<ContributorsProps[]>,
) => {
  return useQuery<ContributorsProps[]>(
    createUseContributorsKey(page),
    () =>
      api
        .get<RawResponse<ContributorsProps[]>>(
          `repos/${companyName}/${repositoryName}/contributors?page=${page}&per_page=10`,
        )
        .then(parseResponseData),
    options,
  );
};
