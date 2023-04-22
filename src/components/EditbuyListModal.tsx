import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  StackDivider,
  VStack,
  useToast,
} from '@chakra-ui/react';

import axios from 'axios';
import { VFC, memo, useEffect, useState } from 'react';

type Props = { isOpen: boolean; onClose: () => void };

type Nonfood = {
  id: number;
  name: string;
};
type ShoppingItem = {
  food_id: number;
  name: string;
  amount: number;
};

export const EditBuyListModal: VFC<Props> = memo((props) => {
  const { isOpen, onClose } = props;
  const [nonFood, setNonFood] = useState<[Nonfood] | undefined>(undefined);
  const [sList, setSList] = useState<ShoppingItem[] | undefined>(undefined);
  const toast = useToast();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('http://localhost:8888/api/edit_buy_list');
        console.log('res.data', res.data);
        setNonFood(res.data.nonFood);
        setSList(res.data.shopping_item);
        return;
      } catch (e) {
        return e;
      }
    })();
  }, []);
  const nonFoodArray = nonFood?.flat();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post('http://localhost:8888/api/reply_buy_list', sList)
      .then((response) => {
        console.log('post', response.data);
        onClose();
        toast({
          title: 'カートを更新しました',
          description: '3秒後にリロードします',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const onChangeFoodNumber = (e: string, name: string, food_id: number) => {
    if (sList?.some((d) => d.food_id === food_id)) {
      const updatedsList = sList.map((list) =>
        list.food_id === food_id ? { food_id, name, amount: Number(e) } : list
      );
      setSList(updatedsList);
    } else {
      setSList([
        ...(sList ? sList : []),
        {
          food_id,
          name,
          amount: Number(e),
        },
      ]);
    }
  };
  console.log('sList', sList);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>購入リストの編集</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {' '}
          <form onSubmit={handleSubmit}>
            <Box w={'100%'} textAlign={'right'}>
              <Button
                bg={'red.400'}
                color={'white'}
                mb={2}
                _hover={{
                  opacity: 0.8,
                }}
                type="submit"
              >
                カートを更新する{' '}
              </Button>
            </Box>

            <VStack
              divider={<StackDivider borderColor="gray.200" />}
              spacing={4}
              align="stretch"
            >
              {nonFoodArray &&
                nonFoodArray.map((f) => (
                  <>
                    <Flex justify="space-between">
                      <Box width={'50%'} key={f.id} h="40px">
                        <p>{f.name}</p>
                      </Box>
                      <Box width={'50%'}>
                        <NumberInput
                          min={0}
                          onChange={(e) => onChangeFoodNumber(e, f.name, f.id)}
                        >
                          <NumberInputField textAlign={'right'} />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </Box>
                    </Flex>
                  </>
                ))}
              {sList &&
                sList.map((l) => (
                  <>
                    <Flex justify="space-between">
                      <Box width={'50%'} key={l.food_id} h="40px">
                        <p>{l.name}</p>
                      </Box>
                      <Box width={'50%'}>
                        <NumberInput
                          defaultValue={l.amount}
                          onChange={(e) =>
                            onChangeFoodNumber(e, l.name, l.food_id)
                          }
                        >
                          <NumberInputField textAlign={'right'} />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </Box>
                    </Flex>
                  </>
                ))}
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});
