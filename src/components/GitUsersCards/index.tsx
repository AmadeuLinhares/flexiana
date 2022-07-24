import { Avatar, Box, Text } from '@chakra-ui/react';

import { User } from '@services/useUsers/types';

export const GitUsersCards = ({
  avatar_url,
  html_url,
  login,
}: Pick<User, 'avatar_url' | 'login' | 'html_url'>) => {
  return (
    <Box>
      <Box padding="10px" borderRadius="md" display="flex" background="blackAlpha.300">
        <Box marginRight="9" display="flex" justifyContent="center" alignItems="center">
          <Avatar size="sm" src={avatar_url} />
        </Box>
        <Box>
          <Text colorScheme="gray" fontWeight="bold" fontSize="small">
            {login}
          </Text>
          <Text
            as="a"
            href={html_url}
            colorScheme="gray"
            fontWeight="bold"
            fontSize="small"
            target="_blank"
            textDecoration="underline"
          >
            {html_url}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
