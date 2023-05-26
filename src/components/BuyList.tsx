import {
  Box,
  Center,
  Flex,
  StackDivider,
  Text,
  Textarea,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EditBuyListModal } from './EditbuyListModal';
import BuyListComponent from './BuyListComponent';
import SpinnerIcon from './loading';

type shopingItem = {
  food_id: number;
  name: string;
  total_amount: number;
};
type text = string;

type input = boolean;

const BuyList = () => {
  const [shoppingItems, setShoppingItems] = useState<shopingItem[] | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<input>(true);
  const [text, setText] = useState<text>();
  const [Inputting, setIsInputting] = useState<input>(false);
  const { isOpen: isEdit, onOpen: onEdit, onClose: endEdit } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    setLoading(false);
    (async () => {
      try {
        const res = await axios.get(`api/buy_list/${localStorage.auth_userId}`);
        setShoppingItems(res.data.shopping_items);
        setText(res.data.texts[0].text);
        setLoading(true);
        return;
      } catch (e) {
        setLoading(true);
        return e;
      }
    })();
  }, []);

  const HnadleSubmit1 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        navigation('/food/');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const changeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const upDataText = e.target.value;
    setText(upDataText);
  };
  if (Inputting) {
    axios
      .post('api/text', { text, userId: localStorage.auth_userId })
      .then((response) => {})
      .catch((error) => {
        console.error(error);
      });
  }

  const navigation = useNavigate();

  return (
    <>
      {loading ? (
        <BuyListComponent
          onEdit={onEdit}
          HnadleSubmit1={HnadleSubmit1}
          shoppingItems={shoppingItems}
        />
      ) : (
        <Center>
          <SpinnerIcon />
        </Center>
      )}

      <Textarea
        bgColor={'gray.50'}
        resize="vertical"
        minH="200px"
        maxH="400px"
        placeholder="その他買い物メモ"
        value={text}
        onChange={(e) => changeText(e)}
        onCompositionStart={() => {
          setIsInputting(false);
        }}
        onCompositionEnd={() => {
          setIsInputting(true);
        }}
      />

      <EditBuyListModal isOpen={isEdit} onClose={endEdit} />
    </>
  );
};
export default BuyList;
