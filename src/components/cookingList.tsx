import {
  Box,
  Flex,
  StackDivider,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomButtom } from '../tags/buttom';

type cookingList = {
  id: number;
  name: string;
};

type StocksData = {
  id: number;
  food_name: string;
  amount: number;
};

type NameCount = {
  count: number;
  name: string;
};

const CookingList = () => {
  const [cookingList, setCookingList] = useState<[cookingList] | undefined>(
    undefined
  );
  const [nonStocksData, setnonStocksData] = useState<[StocksData] | undefined>(
    undefined
  );
  const [onStocksData, setOonStocksData] = useState<[StocksData] | undefined>(
    undefined
  );
  const [toBuyList, settoBuyList] = useState([nonStocksData, onStocksData]);
  const [useList, setUseList] = useState<[StocksData] | undefined>(undefined);
  const [nameCount, setNameCount] = useState<NameCount[] | undefined>(
    undefined
  );
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('api/cooking_list');
        console.log('res.data', res.data);
        setCookingList(res.data.cooking_list);
        setnonStocksData(res.data.non_stocks_data);
        setOonStocksData(res.data.on_stocks_data);
        setUseList(res.data.cooking_list_food_name_amount);
        setNameCount(res.data.cooking_list_name_count);
        console.log('nameCount', nameCount);

        return;
      } catch (e) {
        return e;
      }
    })();
  }, []);
  // console.log("nonStocksData", nonStocksData);

  //post↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

  useEffect(() => {
    settoBuyList([nonStocksData, onStocksData]);
  }, [nonStocksData, onStocksData]);

  const HandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post('api/addBuyListByCoookingList', toBuyList)
      .then((response) => {
        toast({
          title: '不足している食材をカートに追加しました。',
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
      .post('api/cooking', { useList, cookingList })
      .then((response) => {
        console.log('帰ってきたお', response.data);
        toast({
          title: '使用する食材を消費しました。',
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

  return (
    <>
      {nameCount && nameCount.length > 0 ? (
        <>
          {' '}
          <Text m={2} fontSize={30} fontWeight={800}>
            メニュー
          </Text>
          <VStack
            divider={<StackDivider borderColor="gray.200" />}
            spacing={2}
            align="stretch"
          >
            {nameCount.map((c, index) => (
              <Flex ml={2} mr={2} justify="space-between" key={index}>
                <Text>{c.name}</Text>
                <Text>{c.count}人前</Text>
              </Flex>
            ))}{' '}
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
                <Flex justify="space-between" bg="yellow.200" key={d.id}>
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
            <Box w={'100%'} textAlign={'right'}>
              <CustomButtom mt={5} ml={2} type="submit">
                <Text>不足分をカートに追加する</Text>
              </CustomButtom>
            </Box>
          </>
        ) : (
          <>
            {cookingList && cookingList.length > 0 && (
              <Box w={'100%'} textAlign={'right'}>
                <CustomButtom mt={2} ml={2} onClick={HandlePost}>
                  調理をする
                </CustomButtom>{' '}
              </Box>
            )}
          </>
        )}
      </form>
    </>
  );
};

export default CookingList;
