import { useCallback, useMemo, useState } from 'react';

import { Box, Button, Divider, Tag, TagLabel, Text } from '@chakra-ui/react';

import { GitContributorsCards } from '@global-components/GitContributorsCards';
import { Modal } from '@global-components/Modal';
import { Skeleton } from '@global-components/Skeleton';

import { useModal } from '@global-stores/useModal';

import { useGetContributors } from '@services/useRepos';
import { searchRepoByCompany } from '@services/useRepos/types';

export const GitRepositorysCard = ({
  full_name,
  private: repoType,
  id,
  name,
  created_at,
  homepage,
  languages_url,
  node_id,
  pushed_at,
  teams_url,
  updated_at,
  url,
  organization,
}: searchRepoByCompany) => {
  const [page, setPage] = useState(1);

  const nextPage = useCallback(() => {
    setPage(page + 1);
  }, [page]);

  const beforePag = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);
  const { isOpen, setOpenModal } = useModal();

  const { data, isLoading, isFetching } = useGetContributors(page, organization.login, name, {
    enabled: isOpen,
    retry: false,
  });

  const returnInformations = (
    label: string,
    value: string | number,
    onPressValue?: (value: string | number) => void,
  ) => {
    const onPress = useCallback(() => {
      if (onPressValue) {
        onPressValue(value);
      }
    }, [value]);

    return (
      <Box padding="5px" display="flex" justifyContent="flex-start" alignItems="center">
        <Text marginRight="5px" colorScheme="gray" fontWeight="bold" fontSize="small">
          {label}:
        </Text>

        <Text
          cursor={onPressValue ? `pointer` : `auto`}
          textDecoration={onPressValue ? `underline` : `Menu`}
          colorScheme="gray"
          fontWeight="bold"
          fontSize="small"
          onClick={onPress}
        >
          {value}
        </Text>
      </Box>
    );
  };

  const returnContributors = async () => {
    setOpenModal(true);
  };

  const renderContributors = useMemo(() => {
    if (isLoading || isFetching) {
      return (
        <Box width="100%" height="100%">
          <Box>
            <Skeleton heigth={50} number={10} />
          </Box>
        </Box>
      );
    }

    if (data?.length) {
      return (
        <Box>
          <Box
            maxH="500px"
            overflowY="scroll"
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
            {data.map((contributors) => (
              <GitContributorsCards
                key={contributors.id}
                avatar_url={contributors.avatar_url}
                html_url={contributors.html_url}
                login={contributors.login}
              />
            ))}
          </Box>
          <Box display="flex" justifyContent="space-between" alignItems="center" marginTop="40px">
            <Button variant="outline" size="sm" onClick={beforePag}>
              Before
            </Button>
            <Button variant="solid" size="sm" onClick={nextPage}>
              Next
            </Button>
          </Box>
        </Box>
      );
    }

    return (
      <Box>
        <Text>Not found</Text>
      </Box>
    );
  }, [isLoading, isOpen, data, isFetching]);

  return (
    <>
      <Modal>{renderContributors}</Modal>
      <Box>
        <Box padding="20px" borderRadius="md" display="grid" background="blackAlpha.300">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            paddingBottom="20px"
          >
            <Box>
              <Text colorScheme="gray" fontWeight="bold" fontSize="medium">
                {full_name}
              </Text>
            </Box>
            <Box paddingY="5px">
              <Tag size="sm" variant="subtle" colorScheme={repoType ? `red` : `green`}>
                <TagLabel>{repoType ? `Private` : `Free`}</TagLabel>
              </Tag>
            </Box>
          </Box>
          <Divider />
          <Box>
            <Box>{returnInformations(`ID`, id)}</Box>
            <Box>{returnInformations(`Name`, name)}</Box>
            <Box>
              {returnInformations(
                `Show contributors`,
                `Click here to show contributors`,
                returnContributors,
              )}
            </Box>
            <Box>{returnInformations(`created_at`, created_at)}</Box>
            <Box>{returnInformations(`homepage`, homepage)}</Box>
            <Box>{returnInformations(`languages_url`, languages_url)}</Box>
            <Box>{returnInformations(`node_id`, node_id)}</Box>
            <Box>{returnInformations(`pushed_at`, pushed_at)}</Box>
            <Box>{returnInformations(`teams_url`, teams_url)}</Box>
            <Box>{returnInformations(`updated_at`, updated_at)}</Box>
            <Box>{returnInformations(`url`, url)}</Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
