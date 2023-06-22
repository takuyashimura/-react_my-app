import {
  Box,
  Input,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  useToast,
  VStack,
  Text,
  StackDivider,
} from '@chakra-ui/react';
import axios from 'axios';
import { VFC, memo, useEffect, useState } from 'react';
import { CustomButton, CustomNonButton } from '../tags/buttom';
import SelectMenuCategoryMenu from './selectMenuCategoryMenu';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  getMenuData: any;
  menuCategories: any;
};

type Food = {
  id: number;
  name: string;
};

type MenuName = string;

type MenuFood = {
  foodId: number;
  amount: number;
};

type CategoryName = string;

export const NewMenuModal: VFC<Props> = memo((props) => {
  const { isOpen, onClose, getMenuData, menuCategories } = props;

  const [food, setFood] = useState<Food[] | undefined>(undefined);

  const [menuName, setMenuName] = useState<MenuName>();

  const [menuData, setMenuData] = useState<MenuFood[] | undefined>(undefined);

  const [postData, setPostData] = useState([menuName, menuData]);

  //選択中のカテゴリーを格納
  const [postCategory, setPostCategory] = useState<CategoryName>('null');

  const toast = useToast();

  //↓GET受信関係 ----------------------------------------------------------------------------------------------

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`api/add_menu/${localStorage.auth_userId}`);

        setFood(res.data.food);

        return;
      } catch (e) {
        return e;
      }
    })();
  }, []);
  //↑GET受信関係 ----------------------------------------------------------------------------------------------

  useEffect(() => {
    setPostData([menuName, menuData]);
  }, [menuName, menuData]);

  const OnChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMenuName(e.target.value);
  };

  const onChangeFoodNumber = (e: string, foodId: number) => {
    // foodの存在チェック
    if (menuData?.some((d) => d.foodId === foodId)) {
      const updatedMenuData = menuData.map((menu) =>
        menu.foodId === foodId ? { foodId, amount: Number(e) } : menu
      );
      setMenuData(updatedMenuData);

      // 存在しない場合
    } else {
      setMenuData([
        ...(menuData ? menuData : []),
        {
          foodId,
          amount: 1,
        },
      ]);
    }
  };

  const HandleSubmit = () => {
    (async () => {
      try {
        axios
          .post('api/add_menu_register', {
            postData,
            postCategory,
            userId: localStorage.auth_userId,
          })
          .then((response) => {
            console.log('response', response.data);
            if (response.data === '登録完了') {
              toast({
                title: '登録完了',
                position: 'top',
                status: 'success',
                duration: 3000,
                isClosable: true,
              });
              onClose();
              getMenuData();
            } else {
              toast({
                title: '既に登録されています',
                position: 'top',
                description: 'メニューページを確認してください',
                status: 'error',
                duration: 3000,
                isClosable: true,
              });
            }
          });
      } catch (error) {
        console.error(error);
      }
    })();
    setMenuData([]);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>新しいメニュー追加</ModalHeader>
        <ModalCloseButton />
        <ModalBody
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          flexDirection={'column'}
        >
          <Box width={'100%'} justifyContent="left">
            {' '}
            <SelectMenuCategoryMenu
              setPostCategory={setPostCategory}
              postCategory={postCategory}
              menuCategories={menuCategories}
            />
          </Box>
          <Flex
            width={'100%'}
            justify="space-between"
            alignItems="center"
            p={0}
          >
            <Box width={'50%'} mr={'5px'}>
              <Input
                mr={'5px'}
                type="text"
                name="name"
                placeholder="メニュー名"
                onChange={OnChangeName}
              />
            </Box>
            {menuName === 'メニュー名' ||
            menuName === '' ||
            menuName === undefined ? (
              <CustomNonButton>新規メニュー追加</CustomNonButton>
            ) : (
              <CustomButton onClick={HandleSubmit} isDisabled={!menuName}>
                新規メニュー追加
              </CustomButton>
            )}
          </Flex>
          <VStack
            divider={<StackDivider borderColor="gray.200" />}
            spacing={4}
            align="stretch"
            mt={'10px'}
          >
            {food &&
              food.map((f) => (
                <Flex justify={'space-between'}>
                  {' '}
                  <Box key={f.id} display={'flex'} alignItems={'center'}>
                    <Text>{f.name}</Text>
                  </Box>
                  <NumberInput
                    min={0}
                    width={'50%'}
                    onChange={(e) => onChangeFoodNumber(e, f.id)}
                  >
                    <NumberInputField textAlign={'right'} />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Flex>
              ))}{' '}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});
