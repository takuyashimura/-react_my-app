import { Button } from '@chakra-ui/react';

export const CustomButton = (props: any) => {
  return (
    <Button
      bg={'red.400'}
      color={'white'}
      width={'50%'}
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
      m={'5px'}
      _hover={{
        opacity: 0.8,
      }}
      {...props}
    >
      {props.children}
    </Button>
  );
};
export const MainCategoryButton = (props: any) => {
  return (
    <Button
      bg={'green.300'}
      color={'white'}
      m={'5px'}
      _hover={{
        opacity: 0.8,
      }}
      {...props}
    >
      {props.children}
    </Button>
  );
};
export const MainNonButton = (props: any) => {
  return (
    <Button
      bg={'gray.400'}
      color={'white'}
      m={'5px'}
      _hover={{
        opacity: 1,
      }}
      {...props}
    >
      {props.children}
    </Button>
  );
};
export const CustomNonButton = (props: any) => {
  return (
    <Button bg={'gray.400'} color={'white'} width={'50%'} {...props}>
      {props.children}
    </Button>
  );
};
