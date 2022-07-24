import { memo } from 'react';

import { Box, Skeleton as SkeletonChakra } from '@chakra-ui/react';

import { SkeletonProps } from '@global-components/Skeleton/types';

export const SkeletonComponent = ({ heigth, number }: SkeletonProps) => {
  const mockArray = Array(number).fill(number);
  return (
    <Box display="grid" gridAutoRows="min-content" rowGap="5px">
      {mockArray.map(() => (
        <SkeletonChakra key={Math.random()} height={heigth} />
      ))}
    </Box>
  );
};

export const Skeleton = memo(SkeletonComponent);
