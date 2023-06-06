import { Center, Textarea, useDisclosure, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { EditBuyListModal } from './EditbuyListModal';
import BuyListComponent from './BuyListComponent';
import SpinnerIcon from './loading';
import { RxPencil1 } from 'react-icons/rx';

type shopingItem = {
  food_id: number;
  name: string;
  total_amount: number;
};
type text = string;

type input = boolean;

type Nonfood = {
  id: number;
  name: string;
  amount: number;
};

const BuyList = () => {
  const [shoppingItems, setShoppingItems] = useState<shopingItem[] | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<input>(true);
  const [buttomLoading, setButtomLoading] = useState<input>(true);
  const [text, setText] = useState<text>();
  const [Inputting, setIsInputting] = useState<input>(false);
  const [deleting, setDeleting] = useState<input>(false);
  const [resulting, setResulting] = useState<input>(false);
  const [nonFood, setNonFood] = useState<Nonfood[] | undefined>(undefined);

  const { isOpen: isEdit, onOpen: onEdit, onClose: endEdit } = useDisclosure();
  const toast = useToast();

  const getNonFoodData = () => {
    (async () => {
      try {
        const res = await axios.get(
          `api/edit_buy_list/${localStorage.auth_userId}`
        );
        const nonFoodArray = res.data.nonFood?.flat();
        const updatedNonFoodArray = nonFoodArray?.map((item: any) => ({
          ...item,
          amount: 0,
        }));
        setNonFood(updatedNonFoodArray as [Nonfood]);
        return;
      } catch (e) {
        return e;
      }
    })();
  };

  const BuyData = () => {
    (async () => {
      try {
        const res = await axios.get(`api/buy_list/${localStorage.auth_userId}`);
        setShoppingItems(res.data.shopping_items);
        setText(res.data.texts[0].text);
        setLoading(true);
        setButtomLoading(true);
        return;
      } catch (e) {
        setLoading(true);
        setButtomLoading(true);
        return e;
      }
    })();
  };

  useEffect(() => {
    setLoading(false);
    BuyData();
    getNonFoodData();
  }, []);

  const getBuyListData = () => {
    setButtomLoading(false);
    setTimeout(() => {
      BuyData();
      getNonFoodData();
    }, 500);
  };

  const HnadleSubmit1 = () => {
    axios
      .post('api/boughtFood', {
        shoppingItems,
        userId: localStorage.auth_userId,
      })
      .then((response) => {
        toast({
          title: `${response.data}`,
          position: 'top',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        getBuyListData();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onChangeSlistNumber = (e: string, name: string, food_id: number) => {
    if (shoppingItems) {
      const upDataShoppingItems = shoppingItems.map((s) =>
        s.food_id === food_id ? { name, total_amount: Number(e), food_id } : s
      );
      setShoppingItems(upDataShoppingItems);
      if (upDataShoppingItems.some((item) => item.total_amount === 0)) {
        setButtomLoading(false);
      }
      axios
        .post('api/reply_buy_list1', {
          upDataShoppingItems,
          userId: localStorage.auth_userId,
        })
        .then((response) => {
          if (response.data === 0) {
            getBuyListData();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const onChangeNonFoodNumber = (e: string, name: string, id: number) => {
    if (nonFood) {
      const updatedNonfood = nonFood.map((list) =>
        list.id === id ? { id, name, amount: Number(e) } : list
      );
      setNonFood(updatedNonfood);
    }
  };

  const keyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code === 'Backspace') {
      setDeleting(true);
    }
  };
  const result = () => {
    axios
      .post('api/text', { text, userId: localStorage.auth_userId })
      .then((response) => {})
      .catch((error) => {
        console.error(error);
      });
  };

  const changeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const upDataText = e.target.value;
    setText(upDataText);

    if (deleting) {
      axios
        .post('api/text', { text, userId: localStorage.auth_userId })
        .then((response) => {})
        .catch((error) => {
          console.error(error);
        });
      setDeleting(false);
    }
  };

  return (
    <>
      {loading ? (
        <>
          <BuyListComponent
            onEdit={onEdit}
            HnadleSubmit1={HnadleSubmit1}
            shoppingItems={shoppingItems}
            onChangeSlistNumber={onChangeSlistNumber}
            buttomLoading={buttomLoading}
          />
          <Textarea
            bgColor={'gray.50'}
            resize="vertical"
            minH="200px"
            maxH="400px"
            placeholder="その他買い物メモ"
            value={text}
            onChange={(e) => changeText(e)}
            // onCompositionStart={() => {
            //   setIsInputting(true);
            // }}
            onCompositionEnd={result}
            onKeyDown={(e) => keyDown(e)}
          />
        </>
      ) : (
        <Center pt={'50px'}>
          <SpinnerIcon />
        </Center>
      )}

      <EditBuyListModal
        isOpen={isEdit}
        onClose={endEdit}
        getBuyListData={getBuyListData}
        nonFood={nonFood}
        getNonFoodData={getNonFoodData}
        onChangeNonFoodNumber={onChangeNonFoodNumber}
      />
    </>
  );
};
export default BuyList;
