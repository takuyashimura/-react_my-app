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

type Props = { isOpen: boolean; onClose: () => void; modaldata: any };

export const AlertDialogPage: VFC<Props> = memo((props) => {
  const { isOpen, onClose, modaldata } = props;
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const toast = useToast();

  const handlePost1 = (modaldata: any) => {
    axios
      .post('api/food_delete', { modaldata })
      .then((response) => {
        console.log('response', response.data);
        onClose();
        toast({
          title: '削除しました',
          position: 'top',
          description: '3秒後にリロードされます',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });

        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  console.log('modaldata', modaldata);

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
            {modaldata &&
              `${modaldata.name}を削除します。
                        よろしいでしょうか？`}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              キャンセル
            </Button>
            <Button
              colorScheme="red"
              ml={3}
              onClick={() => handlePost1(modaldata)}
            >
              削除
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
});
