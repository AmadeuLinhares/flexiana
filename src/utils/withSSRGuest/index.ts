import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { parseCookies } from 'nookies';

export function withSSRGuest<P>(fn: GetServerSideProps<P>) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);
    if (cookies[`next-auth.session-token`]) {
      return {
        redirect: {
          destination: `/users`,
          permanent: false,
        },
      };
    }
    return fn(ctx);
  };
}
