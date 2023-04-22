import { Box } from '@chakra-ui/react';

export const FooterTagu = (props: any) => {
  return (
    <Box
      bg={'red.100'}
      display={'flex'}
      position={'fixed'}
      width={'100%'}
      bottom={0}
      height={'50px'}
      {...props}
    >
      {props.children}
    </Box>
  );
};
