import {
  Box,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react';
import { VFC, memo, useState } from 'react';
import { CustomButton, CustomNonButton } from '../tags/buttom';
import axios from 'axios';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  getCategoryData: any;
};

type Category = string;

const NewCategory: VFC<Props> = memo((props) => {
  const { isOpen, onClose, getCategoryData } = props;

  const [category, setCategory] = useState<Category>('カテゴリー名');

  const OnChangeCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };

  const handleSubmit = () => {
    axios
      .post('api/addCategory', { category, userId: localStorage.auth_userId })
      .then((response) => {
        console.log('post', response.data);
        if (response.data === '成功') {
          onClose();
          getCategoryData();
        } else {
          toast({
            title: '既に登録されています',
            position: 'top',
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
          <ModalHeader>新規カテゴリー追加</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            flexDirection={'column'}
          >
            <Flex justify="space-between" alignItems="center">
              <Box mr={'5px'}>
                <Input
                  type="text"
                  name="name"
                  placeholder="カテゴリー名"
                  onChange={OnChangeCategory}
                />
              </Box>
              {category === 'カテゴリー名' ||
              category === '' ||
              category.length === 0 ? (
                <CustomNonButton>新規カテゴリー追加</CustomNonButton>
              ) : (
                <CustomButton onClick={handleSubmit} isDisabled={!category}>
                  新規カテゴリー追加
                </CustomButton>
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
});

export default NewCategory;
