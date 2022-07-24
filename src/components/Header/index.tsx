import { memo, useCallback } from 'react';

import { Avatar, Box, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { ROUTES } from '@global-types';

const HeaderComponent = () => {
  const { data } = useSession();

  const router = useRouter();
  const logout = useCallback(() => {
    signOut({
      callbackUrl: `/`,
      redirect: true,
    });
  }, []);

  const routerPush = useCallback(
    (routerName: string) => {
      router.push(routerName);
    },
    [router],
  );

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding="20px"
      height="auto"
    >
      <Box>
        <Text fontWeight="bold" color="gray.500" letterSpacing="tighter" fontSize="md">
          Auth with Github :)
        </Text>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box marginRight="20px" display="grid">
          <Text fontWeight="bold" color="gray.500" letterSpacing="tighter" fontSize="md">
            @{data?.user?.name}
          </Text>
          <Text fontWeight="bold" color="gray.500" letterSpacing="tighter" fontSize="md">
            {data?.user?.email}
          </Text>
        </Box>
        <Box>
          <Menu>
            <MenuButton>
              <Avatar size="sm" src={data?.user?.image ?? ``} />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => routerPush(ROUTES.HOME)}>Home</MenuItem>
              <MenuItem onClick={() => routerPush(ROUTES.SEARCH_REPOSITORY)}>
                Search company repositorys
              </MenuItem>
              <MenuItem onClick={() => routerPush(ROUTES.SEARCH_REPO_BY_REPOSITORY)}>
                Search especific repo by company
              </MenuItem>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>
    </Box>
  );
};

export const Header = memo(HeaderComponent);
