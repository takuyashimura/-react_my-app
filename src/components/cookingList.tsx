import {
  Box,
  Button,
  Flex,
  StackDivider,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainButton } from '../tags/buttom';
import Icon from '../icon/mapper';
import { CookingListEdit } from './CookingListModal';

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
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen: isEdit, onOpen: onEdit, onClose: endEdit } = useDisclosure();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `api/cooking_list/${localStorage.auth_userId}`
        );
        console.log('res.data', res.data);
        setnonStocksData(res.data.non_stocks_data);
        setOonStocksData(res.data.on_stocks_data);
        setUseList(res.data.cooking_list_food_name_amount);
        setNameCount(res.data.cooking_list_name_counts);

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
        // cookingList,
        userId: localStorage.auth_userId,
      })
      .then((response) => {
        console.log('帰ってきたお', response.data);
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

  const clickEdit = () => {
    onEdit();
  };

  const length = onStocksData?.length || nonStocksData?.length;

  return (
    <>
      {nameCount && nameCount.length > 0 ? (
        <>
          <Flex justify={'space-between'}>
            <Text m={2} fontSize={30} fontWeight={800}>
              メニュー
            </Text>
            <Button
              m={1}
              onClick={() => clickEdit()}
              _hover={{
                cursor: 'pointer',
                opacity: 0.8,
              }}
            >
              <Text>
                <Icon name="setting" />
              </Text>
            </Button>
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
                  <Text mr={'5px'}>{c.count}人前</Text>
                </Flex>
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
            <Box w={'100%'} textAlign={'right'}>
              <MainButton type="submit">
                <Text>不足分をカートに追加する</Text>
              </MainButton>
            </Box>
          </>
        ) : (
          <>
            {useList && useList.length > 0 && (
              <Box w={'100%'} textAlign={'right'}>
                <MainButton onClick={HandlePost}>調理をする</MainButton>{' '}
              </Box>
            )}
          </>
        )}
      </form>
      <CookingListEdit
        isOpen={isEdit}
        onClose={endEdit}
        nameCount={nameCount}
      />
    </>
  );
};

export default CookingList;
