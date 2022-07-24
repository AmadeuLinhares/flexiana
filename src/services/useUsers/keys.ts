import { QueryKey } from 'react-query';

export const createUseUsersKey = (page: number): QueryKey => [`users`, page];
