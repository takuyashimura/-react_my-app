import { VFC, memo, useEffect, useState } from 'react';
import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Box,
  StackDivider,
  useToast,
} from '@chakra-ui/react';
import { CustomButton, CustomNonButton } from '../tags/buttom';
import axios from 'axios';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  nameCount: any;
};

type EditCookingList = {
  menu_id: number;
  name: string;
  count: number;
};

export const CookingListEdit: VFC<Props> = memo((props) => {
  const { isOpen, onClose, nameCount } = props;

  const [editCookingList, setEditCookingList] = useState<
    EditCookingList[] | undefined
  >(undefined);
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `api/cooking_list/${localStorage.auth_userId}`
        );
        setEditCookingList(res.data.cooking_list_name_counts);
        return;
      } catch (e) {
        return e;
      }
    })();
  }, []);

  const onChange = (e: string, name: string, menu_id: number) => {
    if (editCookingList) {
      const upDataEditCookingList = editCookingList.map((n) =>
        n.menu_id === menu_id ? { name, count: Number(e), menu_id } : n
      );
      setEditCookingList(upDataEditCookingList);
    }
  };
  const toast = useToast();
  const editButton = () => {
    axios
      .post('api/editCookingList', {
        editCookingList,
        userId: localStorage.auth_userId,
      })
      .then((response) => {
        toast({
          title: '調理リストを更新しました',
          position: 'top',
          description: '3秒後にリロードします',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        onClose();
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })

      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>調理リストの分量を編集</ModalHeader>
          <ModalCloseButton />
          <VStack
            align="stretch"
            divider={<StackDivider borderColor="gray.200" />}
            spacing={4}
            mr={'10px'}
            ml={'10px'}
          >
            {editCookingList &&
              editCookingList.map((c: any) => (
                <Flex key={c.menu_id} justify={'space-between'}>
                  <Box width={'50%'}>
                    {' '}
                    <Text
                      display={'flex'}
                      alignItems={'center'}
                      height={'100%'}
                    >
                      {c.name}
                    </Text>
                  </Box>
                  <Box width={'50%'}>
                    {' '}
                    <NumberInput
                      min={0}
                      defaultValue={c.count}
                      onChange={(e) => onChange(e, c.name, c.menu_id)}
                    >
                      <NumberInputField textAlign={'right'} />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </Box>
                </Flex>
              ))}
          </VStack>
          <ModalBody></ModalBody>
          <ModalFooter>
            {JSON.stringify(editCookingList) !== JSON.stringify(nameCount) &&
            editCookingList ? (
              <CustomButton onClick={editButton} isDisabled={!nameCount}>
                分量を変更する
              </CustomButton>
            ) : (
              <CustomNonButton>分量を変更する</CustomNonButton>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
});
