import { ReactElement } from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import type { LayoutAppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';

import { Auth } from '@layouts/Auth';

import { theme } from '@theme/styles';

const getLayoutDefault = (page: ReactElement) => {
  return <Auth>{page}</Auth>;

  // Here we can use Default Layout in place instead of the other and stylize page like we want
};

const App = ({ Component, pageProps }: LayoutAppProps) => {
  const { session } = pageProps;
  const queryClient = new QueryClient();
  const getLayout = Component.getLayout || getLayoutDefault;
  // Here it checks if the page has a **getLayout** property, if so
  // will render with page layout, if not, render with layout
  // default for other pages
  // Link to doc on next ** https://nextjs.org/docs/basic-features/layouts **
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          {getLayout(<Component {...pageProps} />)}
        </QueryClientProvider>
      </ChakraProvider>
    </SessionProvider>
  );
};

export default App;
