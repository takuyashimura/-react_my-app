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
import React, { VFC, memo, useRef } from 'react';

type Props = {
  isOpen: boolean;
  endcategoryDeleteConfirmationModal: () => void;
  categoryId: any;
  getFoodData: any;
  getCategoryData: any;
  toast: any;
  closeCategoryEditModal: any;
};

const CategoryDeleteConfirmation: VFC<Props> = memo((props) => {
  const {
    isOpen,
    endcategoryDeleteConfirmationModal,
    categoryId,
    getFoodData,
    getCategoryData,
    toast,
    closeCategoryEditModal,
  } = props;
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  const categoryDeleteDedision = () => {
    (async () => {
      try {
        await axios
          .post('/api/categoryDelete', {
            categoryId: categoryId.id,
            userId: localStorage.auth_userId,
          })
          .then((response) => {
            toast({
              title: '使用する食材を消費しました。',
              position: 'top',
              description: '在庫数をご確認ください',
              status: 'success',
              duration: 3000,
              isClosable: true,
            });
            endcategoryDeleteConfirmationModal();
            closeCategoryEditModal();
          });
      } catch (error) {
        return error;
      }
    })();
    setTimeout(() => {
      getFoodData();
      getCategoryData();
    }, 500);
  };

  return (
    <>
      {categoryId && (
        <>
          <AlertDialog
            motionPreset="slideInBottom"
            leastDestructiveRef={cancelRef}
            onClose={endcategoryDeleteConfirmationModal}
            isOpen={isOpen}
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
                <Button onClick={endcategoryDeleteConfirmationModal}>
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

export default CategoryDeleteConfirmation;
