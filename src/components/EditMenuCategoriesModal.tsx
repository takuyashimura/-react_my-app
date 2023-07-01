import { VFC, memo, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  RadioGroup,
  Stack,
  Radio,
  Box,
  Flex,
  Input,
  Text,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { CustomButton, CustomNonButton } from '../tags/buttom';
import Icon from '../icon/mapper';
import axios from 'axios';
import MenuCatagoryDelete from './MenuCatagoryDelete';

const _ = require('lodash');

type Props = {
  isEditCategories: boolean;
  endEditCategories: () => void;
  menuCategories: any;
  toast: any;
  getMenuCatagories: any;
  getMenuData: any;
};

type Category = string;

type GetCategories = {
  id: number;
  name: string;
}[];

type DeleteCategory = {
  id: number;
  name: string;
};

const EditMenuCategoriesModal: VFC<Props> = memo((props) => {
  const {
    isEditCategories,
    endEditCategories,
    menuCategories,
    toast,
    getMenuCatagories,
    getMenuData,
  } = props;
  const [category, setCategory] = useState<Category>('カテゴリー名');
  //編集後のカテゴリーを格納する変数
  const [editCategories, seteditCategories] = useState<
    GetCategories | undefined
  >(undefined);

  // 新規カテゴリー名テキストに入力する際に処理するメソッド
  const OnAddCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };
  //削除するカテゴリーIDを格納するstate
  const [categoryId, setCategoryId] = useState<DeleteCategory | undefined>(
    undefined
  );
  //削除確認モーダルの開閉に伴うもの
  const {
    isOpen: isCatagoryDeleteConfirmationModal,
    onOpen: onCatagoryDeleteConfirmationModal,
    onClose: endCatagoryDeleteConfirmationModal,
  } = useDisclosure();

  //新規カテゴリーの追加メソッド
  const handleSubmit = () => {
    axios
      .post('api/addMenuCategory', {
        category,
        userId: localStorage.auth_userId,
      })
      .then((response) => {
        if (response.data === '成功') {
          endEditCategories();
          getMenuCatagories();
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

  //カテゴリーを編集した際にgetCategoriesを更新する関数
  const EditCategoriesMethod = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
    name: string
  ) => {
    const upDataeditCategories = menuCategories.map((g: any) =>
      g.id === id ? { id, name: e.target.value } : g
    );
    seteditCategories(upDataeditCategories);
  };

  // 編集したカテゴリーをAPIリクエストする関数
  const postEditCategories = () => {
    (async () => {
      try {
        await axios
          .post('/api/menuCategoryEdit', { editCategories })
          .then((response) => {
            getMenuCatagories();
            seteditCategories(undefined);
            setCategory('カテゴリー名');
            endEditCategories();
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

  const categoryDelete = (id: number, name: string) => {
    setCategoryId({ id, name });
    onCatagoryDeleteConfirmationModal();
  };

  return (
    <>
      <Modal isOpen={isEditCategories} onClose={endEditCategories}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>カテゴリー編集</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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
            {menuCategories && menuCategories.length !== 0 && (
              <>
                <Box mb={'5px'} width={'100%'} justifyContent="left">
                  <Text fontWeight={'bold'}>カテゴリー名の編集</Text>
                </Box>

                <Box width={'100%'}>
                  {' '}
                  {menuCategories.map((g: any) => (
                    <Flex>
                      <Input
                        mb={'5px'}
                        mr={'10px'}
                        key={g.id}
                        type="text"
                        name="name"
                        placeholder={g.name}
                        onChange={(e) => {
                          EditCategoriesMethod(e, g.id, g.name);
                        }}
                      />
                      <Button
                        colorScheme="red"
                        onClick={(e) => categoryDelete(g.id, g.name)}
                        _hover={{
                          cursor: 'pointer',

                          opacity: 0.8,
                        }}
                      >
                        <Icon name="trashcan" />
                      </Button>
                    </Flex>
                  ))}
                  {editCategories &&
                  !editCategories.some((g: any) => g.name === '') &&
                  !_.isEqual(menuCategories, editCategories) ? (
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
            )}{' '}
          </ModalBody>
        </ModalContent>
      </Modal>
      <MenuCatagoryDelete
        endEditCategories={endEditCategories}
        categoryId={categoryId}
        toast={toast}
        isCatagoryDeleteConfirmationModal={isCatagoryDeleteConfirmationModal}
        endCatagoryDeleteConfirmationModal={endCatagoryDeleteConfirmationModal}
        getMenuData={getMenuData}
        getMenuCatagories={getMenuCatagories}
      />
    </>
  );
});

export default EditMenuCategoriesModal;
