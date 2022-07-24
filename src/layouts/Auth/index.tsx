import { AuthProps } from '@layouts/Auth/types';
import { Box } from '@chakra-ui/react';
import { Header } from '@global-components/Header';

export const Auth = ({ children }: AuthProps) => {
  return (
    <Box width={'100%'} height={'100%'}>
      <Box>
        <Header />
      </Box>
      <Box>{children}</Box>
    </Box>
  );
};
