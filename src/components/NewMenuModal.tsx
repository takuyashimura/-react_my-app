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
  Spacer,
} from '@chakra-ui/react';
import axios from 'axios';
import { VFC, memo, useEffect, useState } from 'react';
import { CustomButton, CustomNonButton } from '../tags/buttom';

type Props = { isOpen: boolean; onClose: () => void };

type Food = {
  id: number;
  name: string;
};

type MenuName = string;

type MenuFood = {
  foodId: number;
  amount: number;
};

export const NewMenuModal: VFC<Props> = memo((props) => {
  const { isOpen, onClose } = props;

  const [food, setFood] = useState<Food[] | undefined>(undefined);

  const [menuName, setMenuName] = useState<MenuName>();

  const [menuData, setMenuData] = useState<MenuFood[] | undefined>(undefined);

  const [postData, setPostData] = useState([menuName, menuData]);

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
    axios
      .post('api/add_menu_register', {
        postData,
        userId: localStorage.auth_userId,
      })
      .then((response) => {
        console.log('response', response);
        if (response.data === '登録完了') {
          onClose();
          toast({
            title: 'メニューが登録さてました。3秒後にリロードされます',
            description: 'メニューページを確認してください',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        } else {
          HandleAddFood2();
        }
      })
      .catch((error) => {
        console.error(error);
      });
    const HandleAddFood2 = () => {
      toast({
        title: '既に登録されています',
        description: 'メニューページを確認してください',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    };
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
        >
          <form onSubmit={HandleSubmit}>
            <Flex width={'100%'}>
              <Box width={'60%'}>
                <Input
                  type="text"
                  name="name"
                  placeholder={menuName || 'メニュー名'}
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

            {food &&
              food.map((f) => (
                <div key={f.id}>
                  <p>{f.name}</p>
                  <NumberInput
                    min={0}
                    onChange={(e) => onChangeFoodNumber(e, f.id)}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </div>
              ))}
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});
