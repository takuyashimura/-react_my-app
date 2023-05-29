import {
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
  Box,
  Input,
} from '@chakra-ui/react';
import axios from 'axios';
import { memo, useState, VFC } from 'react';
import { CustomButton, CustomNonButton } from '../tags/buttom';

type FoodData = string;

type Props = { isOpen: boolean; onClose: () => void; getFoodData: any };

const NewFood: VFC<Props> = memo((props) => {
  const [foodData, setFoodData] = useState<FoodData>('食品名');
  const { isOpen, onClose, getFoodData } = props;

  const OnChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFoodData(e.target.value);
  };

  const HandleSubmit = () => {
    axios
      .post('api/add', { foodData, userId: localStorage.auth_userId })
      .then((response) => {
        if (response.data === '登録完了') {
          onClose();
          getFoodData();
        } else {
          toast({
            title: '既に登録されています',
            position: 'top',
            description: '食材ページを確認してください',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const toast = useToast();

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>新規食材追加</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Flex justify="space-between" alignItems="center">
              <Box>
                <Input
                  type="text"
                  name="name"
                  placeholder="食品名"
                  onChange={OnChangeName}
                />
              </Box>

              {foodData === '食品名' ||
              foodData === '' ||
              foodData.length === 0 ? (
                <CustomNonButton>新規食材追加</CustomNonButton>
              ) : (
                <CustomButton onClick={HandleSubmit} isDisabled={!foodData}>
                  新規食材追加
                </CustomButton>
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
});

export default NewFood;
