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
  Text,
} from '@chakra-ui/react';

import axios from 'axios';
import { VFC, memo, useEffect, useState } from 'react';

type Props = { isOpen: boolean; onClose: () => void };

type Nonfood = {
  id: number;
  name: string;
  amount: number;
};
type ShoppingItem = {
  food_id: number;
  name: string;
  amount: number;
};

export const EditBuyListModal: VFC<Props> = memo((props) => {
  const { isOpen, onClose } = props;
  const [nonFood, setNonFood] = useState<Nonfood[] | undefined>(undefined);
  const [sList, setSList] = useState<ShoppingItem[] | undefined>(undefined);
  const toast = useToast();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `api/edit_buy_list/${localStorage.auth_userId}`
        );
        console.log('modalRes.data', res.data);
        setSList(res.data.shopping_item);
        const nonFoodArray = res.data.nonFood?.flat();
        const updatedNonFoodArray = nonFoodArray?.map((item: any) => ({
          ...item,
          amount: 0,
        }));
        setNonFood(updatedNonFoodArray as [Nonfood]);
        return;
      } catch (e) {
        return e;
      }
    })();
  }, []);
  console.log('nonFood', nonFood);
  console.log('sList', sList);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post('api/reply_buy_list', {
        sList,
        nonFood,
        userId: localStorage.auth_userId,
      })
      .then((response) => {
        console.log('posts', response.data);
        onClose();
        toast({
          title: 'カートを更新しました',
          position: 'top',
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

  const onChangeNonFoodNumber = (e: string, name: string, id: number) => {
    if (nonFood) {
      const updatedNonfood = nonFood.map((list) =>
        list.id === id ? { id, name, amount: Number(e) } : list
      );
      setNonFood(updatedNonfood);
    }
    console.log('nonFood', nonFood);
  };
  const onChangeSlistNumber = (e: string, name: string, food_id: number) => {
    if (sList) {
      const updatedsList = sList.map((list) =>
        list.food_id === food_id ? { food_id, name, amount: Number(e) } : list
      );
      setSList(updatedsList);
    }
  };

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
              {nonFood &&
                nonFood.map((f) => (
                  <>
                    <Flex justify="space-between">
                      <Box
                        display={'flex'}
                        alignItems={'center'}
                        width={'50%'}
                        key={f.id}
                        h="40px"
                      >
                        <Text>{f.name}</Text>
                      </Box>
                      <Box width={'50%'}>
                        <NumberInput
                          min={0}
                          defaultValue={f.amount}
                          onChange={(e) =>
                            onChangeNonFoodNumber(e, f.name, f.id)
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
              {sList &&
                sList.map((l) => (
                  <>
                    <Flex justify="space-between">
                      <Box
                        display={'flex'}
                        alignItems={'center'}
                        width={'50%'}
                        key={l.food_id}
                        h="40px"
                      >
                        <Text>{l.name}</Text>
                      </Box>
                      <Box width={'50%'}>
                        <NumberInput
                          min={0}
                          defaultValue={l.amount}
                          onChange={(e) =>
                            onChangeSlistNumber(e, l.name, l.food_id)
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
