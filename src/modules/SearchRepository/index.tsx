import { useCallback, useMemo, useState } from 'react';

import { SearchIcon } from '@chakra-ui/icons';
import { Box, Input, IconButton, Text, Button } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { GitCompanyCards } from '@global-components/GitCompanyCards';
import { Skeleton } from '@global-components/Skeleton';

import { SearchRepositoryProps } from '@modules/SearchRepository/types';

import { useRepos } from '@services/useRepos';

export const SearchRepository = () => {
  const [page, setPage] = useState<number>(0);
  const [enableReq, setEnableReq] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<SearchRepositoryProps>();
  const watchCompanyName = watch(`company_name`);

  const onSubmit = () => {
    setEnableReq(true);
  };

  const { data, isLoading, isRefetching } = useRepos(page, watchCompanyName, {
    enabled: enableReq,
    onSettled: () => {
      setEnableReq(false);
      reset();
    },
  });

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
      return data?.map((repos) => (
        <GitCompanyCards
          full_name={repos.full_name}
          id={repos.id}
          name={repos.name}
          node_id={repos.node_id}
          private={repos.private}
          key={repos.id}
        />
      ));
    }

    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Text fontSize="large" fontWeight="bold">
          No company selected
        </Text>
      </Box>
    );
  }, [data, isLoading, isRefetching]);

  return (
    <Box height="90vh" width="100%" display="grid" rowGap="40px" padding="20px">
      <Box as="form" display="flex" width="100%" onSubmit={handleSubmit(onSubmit)}>
        <Box marginRight="10px" width="inherit">
          <Input
            {...register(`company_name`, {
              required: {
                message: `This field is require`,
                value: true,
              },
              minLength: 3,
            })}
            placeholder="Search by company name"
            colorScheme="blackAlpha"
          />
          {errors.company_name && (
            <Box marginTop="10px">
              <Text color="red.300" fontSize="sm" fontWeight="semibold">
                {errors.company_name?.message}
              </Text>
            </Box>
          )}
        </Box>
        <Box>
          <IconButton
            aria-label="Search repos by company name"
            type="submit"
            icon={<SearchIcon />}
          />
        </Box>
      </Box>
      <Box>
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
      </Box>
      {!!data?.length && (
        <Box display="flex" justifyContent="space-between" alignItems="center" paddingBottom="20px">
          <Button variant="outline" size="sm" onClick={beforePag}>
            Before
          </Button>
          <Button variant="solid" size="sm" onClick={nextPage}>
            Next
          </Button>
        </Box>
      )}
    </Box>
  );
};
