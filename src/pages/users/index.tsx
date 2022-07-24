import { withSSRAuth } from '@global-utils/withSSRAuth';

import { UsersLits } from '@modules/Users';

const Users = () => {
  return <UsersLits />;
};

export default Users;

export const getServerSideProps = withSSRAuth(async () => {
  return {
    props: {},
  };
});
