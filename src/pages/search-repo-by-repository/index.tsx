import { withSSRAuth } from '@global-utils/withSSRAuth';

import { SearchRepoByCompany } from '@modules/SearchRepoByCompany';

export default function search_repo_by_repository() {
  return <SearchRepoByCompany />;
}

export const getServerSideProps = withSSRAuth(async () => {
  return {
    props: {},
  };
});
