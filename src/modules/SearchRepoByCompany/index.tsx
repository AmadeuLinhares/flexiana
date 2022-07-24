import { useMemo, useState } from 'react';

import { Box, Input, Button, Text } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { GitRepositorysCard } from '@global-components/GitSearchedRepositorys';
import { Skeleton } from '@global-components/Skeleton';

import { SearchRepoByCompanyProps } from '@modules/SearchRepoByCompany/types';

import { useGetRepoByCompany } from '@services/useRepos';

export const SearchRepoByCompany = () => {
  const [enableReq, setEnableReq] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SearchRepoByCompanyProps>();
  const watchCompanyName = watch(`company_name`);
  const watchRepoName = watch(`repo_name`);

  const onSubmit = () => {
    setEnableReq(true);
  };

  const { data, isLoading, isRefetching, error } = useGetRepoByCompany(
    watchCompanyName,
    watchRepoName,
    {
      enabled: enableReq,
      onSettled: () => {
        setEnableReq(false);
      },
      retry: false,
    },
  );

  const renderInfoRepo = useMemo(() => {
    if (error) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center">
          <Text fontSize="large" fontWeight="bold">
            Not found
          </Text>
        </Box>
      );
    }
    if (isLoading || isRefetching) {
      return <Skeleton heigth={50} number={10} />;
    }

    if (data) {
      return <GitRepositorysCard {...data} />;
    }

    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Text fontSize="large" fontWeight="bold">
          No company selected
        </Text>
      </Box>
    );
  }, [data, isLoading, isRefetching, error]);

  return (
    <Box height="90vh" width="100%" display="grid" rowGap="40px" padding="20px">
      <Box as="form" display="flex" width="100%" onSubmit={handleSubmit(onSubmit)}>
        <Box
          marginRight="10px"
          width="inherit"
          display="grid"
          gridAutoRows="min-content"
          rowGap="5px"
        >
          <Box>
            <Input
              {...register(`company_name`, {
                required: {
                  message: `This field is require`,
                  value: true,
                },
                minLength: 3,
              })}
              placeholder="Company name"
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
            <Input
              {...register(`repo_name`, {
                required: {
                  message: `This field is require`,
                  value: true,
                },
                minLength: 3,
              })}
              placeholder="Repository name"
              colorScheme="blackAlpha"
            />
            {errors.repo_name && (
              <Box marginTop="10px">
                <Text color="red.300" fontSize="sm" fontWeight="semibold">
                  {errors.repo_name?.message}
                </Text>
              </Box>
            )}
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center" marginTop="20px">
            <Button aria-label="Search repos by company name" type="submit">
              Search
            </Button>
          </Box>
        </Box>
      </Box>
      <Box>
        <Box
          maxH="max-content"
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          flexDirection="column"
        >
          {renderInfoRepo}
        </Box>
      </Box>
    </Box>
  );
};
