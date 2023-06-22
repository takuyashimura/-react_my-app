import { VFC, memo, useRef } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  AlertDialogCloseButton,
} from '@chakra-ui/react';
import axios from 'axios';

type Props = {
  isCatagoryDeleteConfirmationModal: boolean;
  endEditCategories: () => void;
  categoryId: any;
  toast: any;
  getMenuData: any;
  getMenuCatagories: any;
  endCatagoryDeleteConfirmationModal: () => void;
};

const MenuCatagoryDelete: VFC<Props> = memo((props) => {
  const {
    isCatagoryDeleteConfirmationModal,
    endEditCategories,
    categoryId,
    toast,
    endCatagoryDeleteConfirmationModal,
    getMenuData,
    getMenuCatagories,
  } = props;
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  //カテゴリーを削除するメソッド
  const categoryDeleteDedision = () => {
    (async () => {
      try {
        await axios
          .post('/api/menuCategoryDelete', {
            categoryId: categoryId.id,
            userId: localStorage.auth_userId,
          })
          .then((response) => {
            console.log('response', response.data);
            toast({
              title: '使用する食材を消費しました。',
              position: 'top',
              description: '在庫数をご確認ください',
              status: 'success',
              duration: 3000,
              isClosable: true,
            });
            endEditCategories();
            endCatagoryDeleteConfirmationModal();
          });
      } catch (error) {
        return error;
      }
    })();
    setTimeout(() => {
      getMenuData();
      getMenuCatagories();
    }, 500);
  };

  return (
    <>
      {categoryId && (
        <>
          <AlertDialog
            motionPreset="slideInBottom"
            leastDestructiveRef={cancelRef}
            isOpen={isCatagoryDeleteConfirmationModal}
            onClose={endCatagoryDeleteConfirmationModal}
            isCentered
          >
            <AlertDialogOverlay />

            <AlertDialogContent>
              <AlertDialogHeader>削除確認</AlertDialogHeader>
              <AlertDialogCloseButton />
              <AlertDialogBody>
                {categoryId.name}を削除します。よろしいでしょうか？
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button onClick={endCatagoryDeleteConfirmationModal}>
                  キャンセル
                </Button>
                <Button
                  colorScheme="red"
                  ml={3}
                  onClick={categoryDeleteDedision}
                >
                  削除
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </>
  );
});

export default MenuCatagoryDelete;
