import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { ROUTES } from '@global-types';
export function withSSRAuth<P>(fn: GetServerSideProps<P>) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);

    // We could validaty with session on next/auth, but this way works for all back end
    // autenticated by tokens

    if (!cookies[`next-auth.session-token`]) {
      return {
        redirect: {
          destination: ROUTES.LOGIN,
          permanent: false,
        },
      };
    } else {
      setCookie(undefined, `next-auth.session-token`, cookies[`next-auth.session-token`], {
        maxAge: 60 * 60 * 24 * 30, // 60 days,
        path: ROUTES.LOGIN, // Represents that all app routes can be access our token
      });
    }

    try {
      return fn(ctx);
    } catch (err) {
      destroyCookie(ctx, `next-auth.session-token`);
      return {
        redirect: {
          destination: ROUTES.LOGIN,
          permanent: false,
        },
      };
    }
  };
}
