import { VFC, memo } from 'react';
import {
  Flex,
  StackDivider,
  VStack,
  Text,
  Box,
  Button,
} from '@chakra-ui/react';
import Icon from '../icon/mapper';

type Props = {
  handlePostModal: any;
  onCheckOpen: any;
  foodStocks: any;
  getCategories: any;
};
type CategoryProps = {
  handlePostModal: any;
  onCheckOpen: any;
  foodStocks: any;
  getCategories: any;
  g: any;
};

export const AllFood: VFC<Props> = memo((props) => {
  const { handlePostModal, onCheckOpen, foodStocks, getCategories } = props;
  return (
    <>
      {' '}
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
    </>
  );
});

export const CategoryFood: VFC<CategoryProps> = memo((props) => {
  const { handlePostModal, onCheckOpen, foodStocks, getCategories, g } = props;
  return (
    <>
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={2}
        align="stretch"
      >
        {foodStocks &&
          foodStocks
            .filter((f: any) => f.category_id === g.id)
            .map((matchingFood: any) => (
              <Flex
                ml={2}
                mr={2}
                justify="space-between"
                height={'40px'}
                key={matchingFood.id}
                alignItems="center"
              >
                <Text>{matchingFood.name}</Text>

                <Box display={'flex'} alignItems={'center'}>
                  <Box mr={1}>
                    <Text>
                      {matchingFood.total_amount === null
                        ? 0
                        : matchingFood.total_amount}
                      個
                    </Text>
                  </Box>

                  <Button
                    colorScheme="teal"
                    mr={1}
                    flexDirection="column"
                    onClick={() => handlePostModal(matchingFood)}
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
                    onClick={() => onCheckOpen(matchingFood)}
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
    </>
  );
});

export const NullFood: VFC<Props> = memo((props) => {
  const { handlePostModal, onCheckOpen, foodStocks, getCategories } = props;
  return (
    <>
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={2}
        align="stretch"
      >
        {foodStocks &&
          foodStocks
            .filter((f: any) => f.category_id === null)
            .map((matchingFood: any) => (
              <Flex
                ml={2}
                mr={2}
                justify="space-between"
                height={'40px'}
                key={matchingFood.id}
                alignItems="center"
              >
                <Text>{matchingFood.name}</Text>

                <Box display={'flex'} alignItems={'center'}>
                  <Box mr={1}>
                    <Text>
                      {matchingFood.total_amount === null
                        ? 0
                        : matchingFood.total_amount}
                      個
                    </Text>
                  </Box>

                  <Button
                    colorScheme="teal"
                    mr={1}
                    flexDirection="column"
                    onClick={() => handlePostModal(matchingFood)}
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
                    onClick={() => onCheckOpen(matchingFood)}
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
    </>
  );
});
