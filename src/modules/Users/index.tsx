import { useCallback, useMemo, useState } from 'react';

import { Box, Button, Text } from '@chakra-ui/react';

import { GitUsersCards } from '@global-components/GitUsersCards';
import { Skeleton } from '@global-components/Skeleton';

import { useUsers } from '@services/useUsers';

export const UsersLits = () => {
  const [page, setPage] = useState<number>(0);
  const { data, isLoading, isRefetching } = useUsers(page);

  const nextPage = useCallback(() => {
    setPage(page + 1);
  }, [page]);

  const beforePag = useCallback(() => {
    if (page > 0) {
      setPage(page - 1);
    }
  }, [page]);

  const renderGitUsers = useMemo(() => {
    if (isLoading || isRefetching) {
      return <Skeleton heigth={50} number={10} />;
    }

    if (data?.length) {
      return data?.map((user) => (
        <GitUsersCards
          avatar_url={user.avatar_url}
          html_url={user.html_url}
          login={user.login}
          key={user.id}
        />
      ));
    }

    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Text>Not found</Text>
      </Box>
    );
  }, [data, isLoading, isRefetching]);

  return (
    <Box height="90vh" width="100%" display="grid" rowGap="40px" padding="20px">
      <Box
        overflowY="scroll"
        maxH="max-content"
        display="grid"
        rowGap="10px"
        css={{
          '&::-webkit-scrollbar': {
            display: `none`,
          },
          '&::-webkit-scrollbar-track': {
            display: `none`,
          },
          '&::-webkit-scrollbar-thumb': {
            display: `none`,
          },
        }}
      >
        {renderGitUsers}
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Button variant="outline" size="sm" onClick={beforePag}>
          Before
        </Button>
        <Button variant="solid" size="sm" onClick={nextPage}>
          Next
        </Button>
      </Box>
    </Box>
  );
};
