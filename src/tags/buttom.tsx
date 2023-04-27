import { Button } from '@chakra-ui/react';

export const CustomButton = (props: any) => {
  return (
    <Button
      bg={'red.400'}
      color={'white'}
      width={'45%'}
      _hover={{
        opacity: 0.8,
      }}
      {...props}
    >
      {props.children}
    </Button>
  );
};
export const MainButton = (props: any) => {
  return (
    <Button
      bg={'red.400'}
      color={'white'}
      _hover={{
        opacity: 0.8,
      }}
      {...props}
    >
      {props.children}
    </Button>
  );
};
export const CustomNonButton = (props: any) => {
  return (
    <Button bg={'gray.400'} color={'white'} width={'45%'} {...props}>
      {props.children}
    </Button>
  );
};
