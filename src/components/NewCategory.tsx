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
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { VFC, memo, useState } from 'react';
import { CustomButton, CustomNonButton } from '../tags/buttom';
import axios from 'axios';
import Icon from '../icon/mapper';
import CategoryDeleteConfirmation from './categoryDeleteConfirmation';

const _ = require('lodash');

type Props = {
  isOpen: boolean;
  onClose: () => void;
  getCategoryData: any;
  setGetCategories: any;
  getCategories: any;
  getFoodData: any;
};

type GetCategories = {
  id: number;
  name: string;
}[];
type DeleteCategory = {
  id: number;
  name: string;
};

type Category = string;

const NewCategory: VFC<Props> = memo((props) => {
  const { isOpen, onClose, getCategoryData, getCategories, getFoodData } =
    props;
  const {
    isOpen: iscategoryDeleteConfirmationModal,
    onOpen: oncategoryDeleteConfirmationModal,
    onClose: endcategoryDeleteConfirmationModal,
  } = useDisclosure();

  const [category, setCategory] = useState<Category>('カテゴリー名');
  //編集後のカテゴリーを格納する変数
  const [editCategories, seteditCategories] = useState<
    GetCategories | undefined
  >(undefined);
  //削除するカテゴリーIDを格納するstate
  const [categoryId, setCategoryId] = useState<DeleteCategory | undefined>(
    undefined
  );

  const OnAddCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };
  const toast = useToast();

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

  //カテゴリーを削除する関数
  const categoryDelete = (id: number, name: string) => {
    setCategoryId({ id, name });
    oncategoryDeleteConfirmationModal();
  };

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
            {getCategories && getCategories.length !== 0 && (
              <>
                <Box mb={'5px'} width={'100%'} justifyContent="left">
                  <Text fontWeight={'bold'}>カテゴリー名の編集</Text>
                </Box>

                <Box width={'100%'}>
                  {' '}
                  {getCategories.map((g: any) => (
                    <Flex>
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
      <CategoryDeleteConfirmation
        isOpen={iscategoryDeleteConfirmationModal}
        endcategoryDeleteConfirmationModal={endcategoryDeleteConfirmationModal}
        categoryId={categoryId}
        getFoodData={getFoodData}
        getCategoryData={getCategoryData}
        toast={toast}
        closeCategoryEditModal={onClose}
      />
    </>
  );
});

export default NewCategory;
