import { withSSRAuth } from '@global-utils/withSSRAuth';

import { SearchRepository } from '@modules/SearchRepository';

export default function search_repository() {
  return <SearchRepository />;
}
export const getServerSideProps = withSSRAuth(async () => {
  return {
    props: {},
  };
});
