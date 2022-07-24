import { QueryKey } from 'react-query';

export const createUseReposKey = (page: number): QueryKey => [`repos`, page];
export const createUseSearchRepoByCompanyKey = (): QueryKey => [`especifyc_repo`];
export const createUseContributorsKey = (page: number): QueryKey => [`contributors`, page];
