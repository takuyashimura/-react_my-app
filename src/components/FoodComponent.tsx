import {
  Flex,
  StackDivider,
  VStack,
  Text,
  Box,
  Button,
} from '@chakra-ui/react';
import { VFC, memo } from 'react';
import Icon from '../icon/mapper';

type Props = {
  handlePostModal: any;
  onCheckOpen: any;
  foodStocks: any;
};

const FoodComponent: VFC<Props> = memo((props) => {
  const { handlePostModal, onCheckOpen, foodStocks } = props;
  return (
    <>
      {foodStocks && foodStocks.length > 0 ? (
        <VStack
          divider={<StackDivider borderColor="gray.200" />}
          spacing={2}
          align="stretch"
        >
          {' '}
          {foodStocks.map((food_stock: any) => (
            <Flex
              ml={2}
              mr={2}
              justify="space-between"
              height={'40px'}
              key={food_stock.id}
              alignItems="center"
            >
              <Text>{food_stock.name}</Text>

              <Box display={'flex'} alignItems={'center'}>
                <Box mr={1}>
                  <Text>
                    {food_stock.total_amount === null
                      ? 0
                      : food_stock.total_amount}
                    個
                  </Text>
                </Box>

                <Button
                  colorScheme="teal"
                  mr={1}
                  flexDirection="column"
                  onClick={() => handlePostModal(food_stock)}
                  _hover={{
                    cursor: 'pointer',
                    opacity: 0.8,
                  }}
                >
                  <Box>
                    <Icon name="pot" />
                  </Box>
                  <Text fontSize={'0.5px'}>メニュー</Text>
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => onCheckOpen(food_stock)}
                  _hover={{
                    cursor: 'pointer',

                    opacity: 0.8,
                  }}
                >
                  <Icon name="trashcan" />
                </Button>
              </Box>
            </Flex>
          ))}
        </VStack>
      ) : (
        <Box textAlign={'center'}>
          <Text mt={'50px'} fontSize={'20px'}>
            新規食材追加ボタンから
            <br />
            食材を追加してください
          </Text>
        </Box>
      )}
    </>
  );
});

export default FoodComponent;
