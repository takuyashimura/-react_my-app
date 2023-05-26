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
  Center,
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CookingListComponent from './cookingListComponent';
import SpinnerIcon from './loading';

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

type Loading = boolean;

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
  const [loading, setLoading] = useState<Loading>(true);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    setLoading(false);
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
        setLoading(true);

        return;
      } catch (e) {
        setLoading(true);

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
    <div>
      {loading ? (
        <>
          <CookingListComponent
            nameCount={nameCount}
            onChange={onChange}
            nameCountBase={nameCountBase}
            editFood={editFood}
            useList={useList}
            HandleSubmit={HandleSubmit}
            nonStocksData={nonStocksData}
            length={length}
            onStocksData={onStocksData}
            HandlePost={HandlePost}
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

export default CookingList;
