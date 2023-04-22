import { Box, Input } from '@chakra-ui/react';

export const ContainerBox = (props: any) => {
  return (
    <Box
      mt={'50px'}
      className="container"
      display={'flex'}
      justifyContent={'center'}
      {...props}
    >
      {props.children}
    </Box>
  );
};
export const ContentBox = (props: any) => {
  return (
    <Box
      display={'flex'}
      borderRadius={'8px'}
      justifyContent={'center'}
      width={'75%'}
      {...props}
    >
      {props.children}
    </Box>
  );
};

export const RegisterTag = (props: any) => {
  return (
    <Box display="flex" alignItems="center" {...props}>
      {props.children}
    </Box>
  );
};

export const InformationNameInputError = (props: any) => {
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

export const InformationNameInput = (props: any) => {
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
export const InformationEmailInputError = (props: any) => {
  return (
    <Input
      textAlign={'center'}
      type=""
      placeholder="email"
      name="email"
      {...props}
    />
  );
};

export const InformationEmailInput = (props: any) => {
  return (
    <Input
      textAlign={'center'}
      type=""
      mb={'24px'}
      placeholder="email"
      name="email"
      {...props}
    />
  );
};
export const InformationPasswordInputError = (props: any) => {
  return (
    <Input
      textAlign={'center'}
      type=""
      placeholder="password"
      name="password"
      email
      {...props}
    />
  );
};

export const InformationPasswordInput = (props: any) => {
  return (
    <Input
      textAlign={'center'}
      type=""
      mb={'24px'}
      placeholder="password"
      name="password"
      {...props}
    />
  );
};
