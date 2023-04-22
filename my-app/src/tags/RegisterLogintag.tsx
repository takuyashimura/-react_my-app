import { Box, Input } from '@chakra-ui/react';

export const RegisterTag = (props: any) => {
  return (
    <Box display="flex" alignItems="center" {...props}>
      {props.children}
    </Box>
  );
};

export const InformationInputError = (props: any) => {
  return (
    <Input
      textAlign={'center'}
      type=""
      placeholder="name"
      name="name"
      {...props}
    />
  );
};

export const InformationInput = (props: any) => {
  return (
    <Input
      textAlign={'center'}
      type=""
      mb={'24px'}
      placeholder="name"
      name="name"
      {...props}
    />
  );
};
