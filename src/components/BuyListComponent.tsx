import { Flex, StackDivider, VStack, Text, Box } from '@chakra-ui/react';
import { VFC, memo } from 'react';
import Icon from '../icon/mapper';
import { MainButton } from '../tags/buttom';

type Props = {
  onEdit: any;
  HnadleSubmit1: any;
  shoppingItems: any;
};

const BuyListComponent: VFC<Props> = memo((props) => {
  const { onEdit, HnadleSubmit1, shoppingItems } = props;

  return (
    <>
      {' '}
      <Box w={'100%'} textAlign={'right'}>
        <MainButton bg={'gray.200'} onClick={onEdit}>
          <Icon name="pencil" />{' '}
        </MainButton>
      </Box>
      <form onSubmit={HnadleSubmit1}>
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
                <Text>{shoppingItem.total_amount}個</Text>
              </Flex>
            ))}
        </VStack>
        {shoppingItems && shoppingItems.length > 0 && (
          <Box w={'100%'} textAlign={'right'}>
            <MainButton type="submit">購入する</MainButton>
          </Box>
        )}
      </form>
    </>
  );
});

export default BuyListComponent;
