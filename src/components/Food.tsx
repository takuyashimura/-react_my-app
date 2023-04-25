import {
  Button,
  useDisclosure,
  useToast,
  Text,
  VStack,
  StackDivider,
  Box,
  Flex,
} from '@chakra-ui/react';
import Icon from '../icon/mapper';

import axios from 'axios';
import { useEffect, useState } from 'react';

import NewFood from './NewFood';
import { FoodToMenusModal } from './FoodToMenusModal';
import { AlertDialogPage } from './AlertDialogPage';
import { CustomButtom } from '../tags/buttom';
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

const Food = () => {
  const [foodStocks, setFoodStocks] = useState<FoodStocks[] | undefined>(
    undefined
  );
  const [modalFoodStocks, setModalFoodStocks] = useState<
    ModalFoodStocks[] | undefined
  >(undefined);

  const [modaldata, setModalData] = useState<Modal[] | undefined>(undefined);

  const {
    isOpen: isOpenAddFoodModal,
    onOpen: onOpenAddFoodModal,
    onClose: CloseAddFoodModal,
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
    (async () => {
      try {
        const res = await axios.get('/api/home');

        setFoodStocks(res.data.food_stocks);

        return;
      } catch (e) {
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
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        } else {
          setModalData(food_stock);
          console.log('modaldata', modaldata);
          onCheck();
        }
        console.log('post', response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handlePostModal = (food_stock: any) => {
    axios
      .post('/api/foodToMenu', { food_stock })
      .then((response) => {
        console.log('post', response.data);
        setModalFoodStocks(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    onOpenFoodToMenuModal();
  };

  const toast = useToast();

  return (
    <div className="Food">
      {/* <Button as={Link} to="/newFood/"> */}
      <Box w={'100%'} textAlign={'right'}>
        {' '}
        <CustomButtom m={2} onClick={onOpenAddFoodModal}>
          新規食材追加
        </CustomButtom>
      </Box>

      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={2}
        align="stretch"
      >
        {' '}
        {foodStocks &&
          foodStocks.map((food_stock) => (
            <Flex
              ml={2}
              mr={2}
              justify="space-between"
              height={'40px'}
              key={food_stock.id}
              alignItems="center"
            >
              <Text>{food_stock.name}</Text>

              <Box display={'flex'} alignItems={'center'}>
                <Box mr={1}>
                  <Text>
                    {food_stock.total_amount === null
                      ? 0
                      : food_stock.total_amount}
                    個
                  </Text>
                </Box>

                <Button
                  colorScheme="teal"
                  mr={1}
                  onClick={() => handlePostModal(food_stock)}
                  _hover={{
                    cursor: 'pointer',
                    opacity: 0.8,
                  }}
                >
                  <Icon name="pot" />
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => onCheckOpen(food_stock)}
                  _hover={{
                    cursor: 'pointer',

                    opacity: 0.8,
                  }}
                >
                  <Icon name="trashcan" />
                </Button>
              </Box>
            </Flex>
          ))}
      </VStack>
      <NewFood isOpen={isOpenAddFoodModal} onClose={CloseAddFoodModal} />
      <FoodToMenusModal
        isOpen={isOpenFoodToMenuModal}
        onClose={CloseFoodToMenuModal}
        modalFoodStocks={modalFoodStocks}
      />
      <AlertDialogPage
        isOpen={isCheck}
        onClose={endCheck}
        modaldata={modaldata}
      />
    </div>
  );
};

export default Food;
