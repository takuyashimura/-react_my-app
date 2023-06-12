import { VFC, memo, useEffect, useState } from 'react';
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
  } = props;

  //食材のカテゴリーを変更するメソッド
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
            console.log('post', response.data);
            return;
          });
      } catch (e) {
        return e;
      }
    })();
    getFoodData();
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
