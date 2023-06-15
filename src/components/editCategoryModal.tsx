import { VFC, memo } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';
import axios from 'axios';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  categoryEditFood: any;
  getCategories: any;
  nowFoodCategory: any;
  setNowFoodCategory: any;
  getFoodData: any;
  toast: any;
};

const EditCategoryModal: VFC<Props> = memo((props) => {
  const {
    isOpen,
    onClose,
    categoryEditFood,
    getCategories,
    nowFoodCategory,
    setNowFoodCategory,
    getFoodData,
    toast,
  } = props;

  //食材のカテゴリーを変更するメソッドし、変更後の食品のカテゴリー分類結果を取得
  const changeCategory = (value: any) => {
    setNowFoodCategory(value);
    (async () => {
      try {
        await axios
          .post('/api/changeCategory', {
            value,
            categoryEditFood,
          })
          .then((response) => {
            if (response.data === 'ok') {
              toast({
                title: 'カテゴリーを変更しました',
                position: 'top',
                status: 'success',
                duration: 3000,
                isClosable: true,
              });
            }
            return;
          });
      } catch (e) {
        return e;
      }
    })();
    setTimeout(() => {
      getFoodData();
    }, 500);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {categoryEditFood && (
            <ModalHeader>{categoryEditFood.name}のカテゴリー編集</ModalHeader>
          )}

          <ModalCloseButton />
          <ModalBody>
            {nowFoodCategory && (
              <RadioGroup
                onChange={(value) => changeCategory(value)}
                value={nowFoodCategory.toString()}
                overflowX={'scroll'}
              >
                <Stack direction="row">
                  <Radio value="null">未分類</Radio>
                  {getCategories &&
                    getCategories.map((g: any) => (
                      <Radio key={g.id} value={g.id.toString()}>
                        {g.name}
                      </Radio>
                    ))}
                </Stack>
              </RadioGroup>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
});

export default EditCategoryModal;
