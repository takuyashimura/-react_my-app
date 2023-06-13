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
  Text,
} from '@chakra-ui/react';
import { VFC, memo, useState } from 'react';
import { CustomButton, CustomNonButton } from '../tags/buttom';
import axios from 'axios';
const _ = require('lodash');

type Props = {
  isOpen: boolean;
  onClose: () => void;
  getCategoryData: any;
  setGetCategories: any;
  getCategories: any;
};

type GetCategories = {
  id: number;
  name: string;
}[];

type Category = string;

const NewCategory: VFC<Props> = memo((props) => {
  const { isOpen, onClose, getCategoryData, getCategories } = props;

  const [category, setCategory] = useState<Category>('カテゴリー名');
  //編集後のカテゴリーを格納する変数
  const [editCategories, seteditCategories] = useState<
    GetCategories | undefined
  >(undefined);

  const OnAddCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };

  //カテゴリーを編集した際にgetCategoriesを更新する関数
  const onEditCategories = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
    name: string
  ) => {
    const upDataeditCategories = getCategories.map((g: any) =>
      g.id === id ? { id, name: e.target.value } : g
    );
    seteditCategories(upDataeditCategories);
  };

  const handleSubmit = () => {
    axios
      .post('api/addCategory', { category, userId: localStorage.auth_userId })
      .then((response) => {
        if (response.data === '成功') {
          onClose();
          getCategoryData();
          setCategory('カテゴリー名');
          seteditCategories(undefined);

          toast({
            title: '登録されました',
            position: 'top',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
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
  // 編集したカテゴリーをAPIリクエストする関数
  const postEditCategories = () => {
    (async () => {
      try {
        await axios
          .post('/api/categoryEdit', { editCategories })
          .then((response) => {
            getCategoryData();
            seteditCategories(undefined);
            setCategory('カテゴリー名');
            onClose();
            toast({
              title: '変更されました',
              position: 'top',
              status: 'success',
              duration: 3000,
              isClosable: true,
            });
          });
      } catch (error) {
        return error;
      }
    })();
  };

  const toast = useToast();
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>カテゴリー編集</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            flexDirection={'column'}
          >
            <Box mb={'5px'} width={'100%'} justifyContent="left">
              <Text fontWeight={'bold'}>カテゴリー追加</Text>
            </Box>{' '}
            <Flex
              width={'100%'}
              mb={'5px'}
              justify="space-between"
              alignItems="center"
            >
              <Box mr={'5px'}>
                <Input
                  type="text"
                  name="name"
                  placeholder="新規カテゴリー名"
                  onChange={OnAddCategory}
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
            {getCategories && (
              <>
                <Box mb={'5px'} width={'100%'} justifyContent="left">
                  <Text fontWeight={'bold'}>カテゴリー名の編集</Text>
                </Box>

                <Box>
                  {' '}
                  {getCategories.map((g: any) => (
                    <Input
                      mb={'5px'}
                      mr={'10px'}
                      key={g.id}
                      type="text"
                      name="name"
                      placeholder={g.name}
                      onChange={(e) => {
                        onEditCategories(e, g.id, g.name);
                      }}
                    />
                  ))}
                  {editCategories &&
                  !editCategories.some((g: any) => g.name === '') &&
                  !_.isEqual(getCategories, editCategories) ? (
                    <Box
                      width={'100%'}
                      display={'flex'}
                      justifyContent="flex-end"
                    >
                      {' '}
                      <CustomButton onClick={postEditCategories}>
                        変更
                      </CustomButton>
                    </Box>
                  ) : (
                    <Box
                      width={'100%'}
                      display={'flex'}
                      justifyContent="flex-end"
                    >
                      <CustomNonButton>変更</CustomNonButton>
                    </Box>
                  )}
                </Box>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
});

export default NewCategory;
