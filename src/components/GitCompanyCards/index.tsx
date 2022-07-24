import { Tag, Box, Divider, Text, TagLabel } from '@chakra-ui/react';

import { ReposProps } from '@services/useRepos/types';

export const GitCompanyCards = ({ full_name, name, node_id, private: repoType }: ReposProps) => {
  return (
    <Box>
      <Box padding="10px" borderRadius="md" display="grid" background="blackAlpha.300">
        <Box display="flex" justifyContent="flex-end" alignItems="center">
          <Tag size="sm" variant="subtle" colorScheme={repoType ? `red` : `green`}>
            <TagLabel>{repoType ? `Private` : `Free`}</TagLabel>
          </Tag>
        </Box>
        <Box padding="5px" display="flex" justifyContent="flex-start" alignItems="center">
          <Text marginRight="5px" colorScheme="gray" fontWeight="bold" fontSize="small">
            Name:
          </Text>
          <Text colorScheme="gray" fontWeight="bold" fontSize="small">
            {name}
          </Text>
        </Box>
        <Divider />
        <Box padding="5px" display="flex" justifyContent="flex-start" alignItems="center">
          <Text marginRight="5px" colorScheme="gray" fontWeight="bold" fontSize="small">
            Full Name:
          </Text>
          <Text colorScheme="gray" fontWeight="bold" fontSize="small">
            {full_name}
          </Text>
        </Box>
        <Divider />
        <Box padding="5px" display="flex" justifyContent="flex-start" alignItems="center">
          <Text marginRight="5px" colorScheme="gray" fontWeight="bold" fontSize="small">
            Node Id:
          </Text>
          <Text colorScheme="gray" fontWeight="bold" fontSize="small">
            {node_id}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
