import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { VFC, memo, useRef } from 'react';

type Props = { isOpen: boolean; onClose: () => void; deleteMenu: any };

export const AlertDialogPageMenu: VFC<Props> = memo((props) => {
  const { isOpen, onClose, deleteMenu } = props;
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const toast = useToast();

  const handlePost2 = (deleteMenu: any) => {
    axios.post('api/menu_delete', { deleteMenu }).then((response) => {
      console.log('response', response.data);
      onClose();
      toast({
        title: '削除されました。3秒後にリロードされます',
        description: 'メニューページを確認してください',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    });
  };

  // console.log("modaldata", modaldata);

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>削除確認</AlertDialogHeader>
          <AlertDialogBody>
            {deleteMenu &&
              `${deleteMenu.name}を削除します。
                        よろしいでしょうか？`}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              キャンセル
            </Button>
            <Button
              colorScheme="red"
              ml={3}
              onClick={() => handlePost2(deleteMenu)}
            >
              削除
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
});
