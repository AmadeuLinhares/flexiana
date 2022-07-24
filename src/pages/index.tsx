import type { LayoutPage } from 'next';

import { withSSRGuest } from '@global-utils/withSSRGuest';

import { SignIn } from '@modules/SignIn';

import { WithoutSession } from '@layouts/WithoutSession';

const Home: LayoutPage = () => {
  return <SignIn />;
};

export default Home;

Home.getLayout = (page) => <WithoutSession>{page}</WithoutSession>;
export const getServerSideProps = withSSRGuest(async () => {
  return {
    props: {},
  };
});
