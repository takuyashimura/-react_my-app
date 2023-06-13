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
  Text,
} from '@chakra-ui/react';

import axios from 'axios';
import { VFC, memo } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  getBuyListData: any;
  nonFood: any;
  getNonFoodData: any;
  onChangeNonFoodNumber: any;
};

export const EditBuyListModal: VFC<Props> = memo((props) => {
  const {
    isOpen,
    onClose,
    getBuyListData,
    nonFood,
    getNonFoodData,
    onChangeNonFoodNumber,
  } = props;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    (async () => {
      try {
        axios
          .post('api/reply_buy_list', {
            nonFood,
            userId: localStorage.auth_userId,
          })
          .then((response) => {
            onClose();
            getBuyListData();
          });
      } catch (error) {
        console.error(error);
      }
    })();
    setTimeout(() => {
      getNonFoodData();
    }, 500);
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
                カートに追加する{' '}
              </Button>
            </Box>

            <VStack
              divider={<StackDivider borderColor="gray.200" />}
              spacing={4}
              align="stretch"
            >
              {nonFood &&
                nonFood.map((f: any) => (
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
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});
