import {
  Flex,
  StackDivider,
  VStack,
  Text,
  Box,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Center,
} from '@chakra-ui/react';
import { VFC, memo } from 'react';
import Icon from '../icon/mapper';
import { MainButton } from '../tags/buttom';
import SpinnerIcon from './loading';

type Props = {
  onEdit: any;
  HnadleSubmit1: any;
  shoppingItems: any;
  onChangeSlistNumber: any;
  buttomLoading: boolean;
};

const BuyListComponent: VFC<Props> = memo((props) => {
  const {
    onEdit,
    HnadleSubmit1,
    shoppingItems,
    onChangeSlistNumber,
    buttomLoading,
  } = props;

  return (
    <>
      {' '}
      <Box w={'100%'} textAlign={'right'}>
        <MainButton bg={'gray.200'} onClick={onEdit}>
          <Icon name="pencil" />{' '}
        </MainButton>
      </Box>
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={2}
        align="stretch"
        mr={2}
        ml={2}
      >
        {shoppingItems &&
          shoppingItems.map((shoppingItem: any, index: any) => (
            <Flex key={index} justify="space-between">
              <Text>{shoppingItem.name}</Text>

              <NumberInput
                onChange={(e) =>
                  onChangeSlistNumber(
                    e,
                    shoppingItem.name,
                    shoppingItem.food_id
                  )
                }
                value={`${shoppingItem.total_amount}個`}
                min={0}
              >
                <NumberInputField
                  textAlign={'right'}
                  pr={'30px'}
                  border={'none'}
                  _focus={{ boxShadow: 'none' }}
                  _active={{ borderColor: 'transparent' }}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper border={'none'} />
                  <NumberDecrementStepper border={'none'} />
                </NumberInputStepper>
              </NumberInput>
            </Flex>
          ))}
      </VStack>
      {buttomLoading ? (
        <>
          {shoppingItems && shoppingItems.length > 0 && (
            <Box w={'100%'} textAlign={'right'}>
              <MainButton onClick={HnadleSubmit1}>購入する</MainButton>
            </Box>
          )}
        </>
      ) : (
        <Center p={'50px'}>
          <SpinnerIcon />
        </Center>
      )}
    </>
  );
});

export default BuyListComponent;
