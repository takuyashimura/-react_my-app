import { useDisclosure, useToast, Box, Center, Flex } from '@chakra-ui/react';

import axios from 'axios';
import { useEffect, useState } from 'react';

import NewFood from './NewFood';
import { FoodToMenusModal } from './FoodToMenusModal';
import { AlertDialogPage } from './AlertDialogPage';
import { MainButton, MainCategoryButton } from '../tags/buttom';
import SpinnerIcon from './loading';
import FoodComponent from './FoodComponent';
import NewCategory from './NewCategory';
type FoodStocks = {
  id: number;
  name: string;
  total_amount: number;
};

type ModalFoodStocks = {
  id: number;
  name: string;
  total_amount: number;
  length: number;
};

type Modal = {
  id: number;
  name: string;
  total_amount: number;
};

type Loading = boolean;

const Food = () => {
  const [foodStocks, setFoodStocks] = useState<FoodStocks[] | undefined>(
    undefined
  );
  const [modalFoodStocks, setModalFoodStocks] = useState<
    ModalFoodStocks[] | undefined
  >(undefined);

  const [modaldata, setModalData] = useState<Modal[] | undefined>(undefined);

  const [loading, setLoading] = useState<Loading>(true);

  const {
    isOpen: isOpenAddFoodModal,
    onOpen: onOpenAddFoodModal,
    onClose: CloseAddFoodModal,
  } = useDisclosure();

  const {
    isOpen: isOpenAddCategory,
    onOpen: onOpenAddCategory,
    onClose: CloseAddCategory,
  } = useDisclosure();
  const {
    isOpen: isOpenFoodToMenuModal,
    onOpen: onOpenFoodToMenuModal,
    onClose: CloseFoodToMenuModal,
  } = useDisclosure();
  const {
    isOpen: isCheck,
    onOpen: onCheck,
    onClose: endCheck,
  } = useDisclosure();

  // 先ほど作成したLaravelのAPIのURL
  useEffect(() => {
    setLoading(false);
    (async () => {
      try {
        const res = await axios.get(`/api/home/${localStorage.auth_userId}`);
        setFoodStocks(res.data.food_stocks);
        setLoading(true);
        return;
      } catch (e) {
        setLoading(true);
        return e;
      }
    })();
  }, []);

  const onCheckOpen = (food_stock: any) => {
    axios
      .post('api/foodCheck', food_stock)
      .then((response) => {
        if (
          response.data ===
          'メニューの材料として登録されているため削除できません'
        ) {
          toast({
            title: `${response.data}`,
            position: 'top',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        } else {
          setModalData(food_stock);
          onCheck();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handlePostModal = (food_stock: any) => {
    axios
      .post('/api/foodToMenu', { food_stock, userId: localStorage.auth_userId })
      .then((response) => {
        setModalFoodStocks(response.data);
        onOpenFoodToMenuModal();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getFoodData = () => {
    (async () => {
      try {
        const res = await axios.get(`/api/home/${localStorage.auth_userId}`);
        setFoodStocks(res.data.food_stocks);
        setLoading(true);
        return;
      } catch (e) {
        setLoading(true);
        return e;
      }
    })();
  };

  const toast = useToast();

  return (
    <div className="Food">
      {loading ? (
        <>
          <Flex>
            <Box w={'100%'} textAlign={'left'}>
              <MainCategoryButton onClick={onOpenAddCategory}>
                カテゴリー追加
              </MainCategoryButton>
            </Box>
            <Box w={'100%'} textAlign={'right'}>
              <MainButton onClick={onOpenAddFoodModal}>新規食材追加</MainButton>
            </Box>
          </Flex>

          <FoodComponent
            handlePostModal={handlePostModal}
            onCheckOpen={onCheckOpen}
            foodStocks={foodStocks}
          />
          <NewFood
            isOpen={isOpenAddFoodModal}
            onClose={CloseAddFoodModal}
            getFoodData={getFoodData}
          />
          <NewCategory isOpen={isOpenAddCategory} onClose={CloseAddCategory} />
          <FoodToMenusModal
            isOpen={isOpenFoodToMenuModal}
            onClose={CloseFoodToMenuModal}
            modalFoodStocks={modalFoodStocks}
          />
          <AlertDialogPage
            isOpen={isCheck}
            onClose={endCheck}
            modaldata={modaldata}
            getFoodData={getFoodData}
          />
        </>
      ) : (
        <Center pt={'50px'}>
          <SpinnerIcon />
        </Center>
      )}
    </div>
  );
};

export default Food;
