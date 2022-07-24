import { Box, Button } from '@chakra-ui/react';
import { signIn as signInGit } from 'next-auth/react';
import Image from 'next/image';

import { ROUTES } from '@global-types';

import GitLogo from '@public/github-logo.png';

const singInWithGit = async () => {
  signInGit(`github`, {
    callbackUrl: ROUTES.HOME,
    redirect: true,
  });
};

export const SignIn = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="95vh" width="100%">
      <Box>
        <Button
          leftIcon={<Image src={GitLogo} width={20} height={20} />}
          colorScheme="gray"
          onClick={singInWithGit}
        >
          Login with Github
        </Button>
      </Box>
    </Box>
  );
};
