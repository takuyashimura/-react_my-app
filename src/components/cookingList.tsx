import {
  Box,
  Flex,
  StackDivider,
  Text,
  VStack,
  useToast,
  NumberInput,
  NumberInputStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainButton, MainNonButton } from '../tags/buttom';

type StocksData = {
  id: number;
  food_name: string;
  amount: number;
};

type NameCount = {
  count: number;
  name: string;
  menu_id: number;
};

const CookingList = () => {
  const [nonStocksData, setnonStocksData] = useState<StocksData[] | undefined>(
    undefined
  );
  const [onStocksData, setOonStocksData] = useState<StocksData[] | undefined>(
    undefined
  );
  const [toBuyList, settoBuyList] = useState([nonStocksData, onStocksData]);
  const [useList, setUseList] = useState<StocksData[] | undefined>(undefined);
  const [nameCount, setNameCount] = useState<NameCount[] | undefined>(
    undefined
  );
  const [nameCountBase, setNameCountBase] = useState<NameCount[] | undefined>(
    undefined
  );
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `api/cooking_list/${localStorage.auth_userId}`
        );
        setnonStocksData(res.data.non_stocks_data);
        setOonStocksData(res.data.on_stocks_data);
        setUseList(res.data.cooking_list_food_name_amount);
        setNameCount(res.data.cooking_list_name_counts);
        setNameCountBase(res.data.cooking_list_name_counts);

        return;
      } catch (e) {
        return e;
      }
    })();
  }, []);

  //post↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

  useEffect(() => {
    settoBuyList([nonStocksData, onStocksData]);
  }, [nonStocksData, onStocksData]);

  const HandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post('api/addBuyListByCoookingList', {
        toBuyList,
        userId: localStorage.auth_userId,
      })
      .then((response) => {
        toast({
          title: '不足している食材をカートに追加しました。',
          position: 'top',
          description: 'カートへ移動します',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        navigate('/buylist/');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const HandlePost = () => {
    axios
      .post('api/cooking', {
        useList,
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
        navigate('/food/');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const length = onStocksData?.length || nonStocksData?.length;

  const onChange = (e: string, name: string, menu_id: number) => {
    if (nameCount) {
      const upDataNameCount = nameCount.map((c) =>
        c.menu_id === menu_id ? { name, count: Number(e), menu_id } : c
      );
      setNameCount(upDataNameCount);
    }
    axios
      .post('api/editCookingList', {
        nameCount,
        userId: localStorage.auth_userId,
      })
      .then((response) => {})
      .catch((error) => {
        console.error(error);
      });
  };

  const editFood = () => {
    (async () => {
      try {
        const res = await axios.get(
          `api/cooking_list/${localStorage.auth_userId}`
        );
        setnonStocksData(res.data.non_stocks_data);
        setOonStocksData(res.data.on_stocks_data);
        setUseList(res.data.cooking_list_food_name_amount);
        setNameCount(res.data.cooking_list_name_counts);
        setNameCountBase(res.data.cooking_list_name_counts);

        return;
      } catch (e) {
        return e;
      }
    })();
  };

  return (
    <>
      {nameCount && nameCount.length > 0 ? (
        <>
          <Flex justify={'space-between'}>
            <Text m={2} fontSize={30} fontWeight={800}>
              メニュー
            </Text>
          </Flex>
          <VStack
            divider={<StackDivider borderColor="gray.200" />}
            spacing={2}
            align="stretch"
          >
            {nameCount.map((c) => (
              <Flex ml={2} mr={2} justify="space-between" key={c.menu_id}>
                <Flex
                  alignItems={'center'}
                  width={'100%'}
                  justify="space-between"
                >
                  <Text>{c.name}</Text>
                  <NumberInput
                    onChange={(e) => onChange(e, c.name, c.menu_id)}
                    value={`${c.count}人前`}
                    min={1}
                  >
                    <NumberInputField
                      textAlign={'right'}
                      pr={'30px'}
                      border={'none'}
                      _focus={{ boxShadow: 'none' }}
                      _active={{ borderColor: 'transparent' }}
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper border={'none'} />
                      <NumberDecrementStepper border={'none'} />
                    </NumberInputStepper>
                  </NumberInput>
                </Flex>
              </Flex>
            ))}
            {JSON.stringify(nameCountBase) !== JSON.stringify(nameCount) ? (
              <Box w={'100%'} textAlign={'right'}>
                <MainButton onClick={editFood}>使用食材を再計算</MainButton>{' '}
              </Box>
            ) : (
              <Box w={'100%'} textAlign={'right'}>
                <MainNonButton>使用食材を再計算</MainNonButton>{' '}
              </Box>
            )}
          </VStack>{' '}
          <Text m={2} fontSize={30} fontWeight={700}>
            使用食材
          </Text>
          {useList && (
            <VStack
              divider={<StackDivider borderColor="gray.200" />}
              spacing={2}
              align="stretch"
            >
              {useList.map((u) => (
                <Flex ml={2} mr={2} justify="space-between" key={u.id}>
                  <Text>{u.food_name}</Text>
                  <Text>{u.amount}個</Text>
                </Flex>
              ))}{' '}
            </VStack>
          )}
        </>
      ) : (
        <Box mt={'30px'} justifyContent="center" alignItems="center">
          <Text fontSize={25} textAlign="center">
            調理リストが空です
          </Text>
          <Text fontSize={25} textAlign="center">
            メニューを追加してください
          </Text>
        </Box>
      )}
      <form onSubmit={HandleSubmit}>
        {nonStocksData && onStocksData && !!length ? (
          <>
            <Text m={2} fontSize={30} fontWeight={700}>
              不足食材
            </Text>
            <VStack
              divider={<StackDivider borderColor="gray.200" />}
              spacing={2}
              align="stretch"
            >
              {nonStocksData.map((d) => (
                <Flex justify="space-between" bg="red.200" key={d.id}>
                  <Text>{d.food_name}</Text>
                  <Flex>
                    <Text color={'red'}>{d.amount}</Text>
                    <Text>個</Text>
                  </Flex>{' '}
                </Flex>
              ))}
              {onStocksData.map((d) => (
                <Flex justify="space-between" bg="red.200" key={d.id}>
                  <Text>{d.food_name}</Text>
                  <Flex>
                    <Text color={'red'}>{d.amount}</Text>
                    <Text>個</Text>
                  </Flex>
                </Flex>
              ))}
            </VStack>

            {JSON.stringify(nameCountBase) === JSON.stringify(nameCount) ? (
              <Box w={'100%'} textAlign={'right'}>
                <MainButton type="submit">不足分をカートに追加する</MainButton>
              </Box>
            ) : (
              <Box w={'100%'} textAlign={'right'}>
                <MainNonButton>不足分をカートに追加する</MainNonButton>
              </Box>
            )}
          </>
        ) : (
          <>
            {useList && useList.length > 0 && (
              <>
                {JSON.stringify(nameCountBase) === JSON.stringify(nameCount) ? (
                  <Box w={'100%'} textAlign={'right'}>
                    <MainButton onClick={HandlePost}>調理をする</MainButton>{' '}
                  </Box>
                ) : (
                  <Box w={'100%'} textAlign={'right'}>
                    <MainNonButton>調理をする</MainNonButton>{' '}
                  </Box>
                )}
              </>
            )}
          </>
        )}
      </form>
    </>
  );
};

export default CookingList;
