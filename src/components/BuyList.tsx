import {
  Box,
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
import { MainButton } from '../tags/buttom';
import Icon from '../icon/mapper';

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

  const [text, setText] = useState<text>();
  const [Inputting, setIsInputting] = useState<input>(false);

  const { isOpen: isEdit, onOpen: onEdit, onClose: endEdit } = useDisclosure();

  const toast = useToast();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`api/buy_list/${localStorage.auth_userId}`);
        console.log('res.data', res.data);
        setShoppingItems(res.data.shopping_items);
        setText(res.data.texts[0].text);
        return;
      } catch (e) {
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
  // パソコンでのメモの変更。エンターキー押下でpostリクエスト
  const onEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code === 'Enter') {
      axios
        .post('api/text', { text, userId: localStorage.auth_userId })
        .then((response) => {
          console.log('response', response);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const changeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const upDataText = e.target.value;
    setText(upDataText);
    // if (Inputting) {
    //   axios
    //     .post('api/text', { text, userId: localStorage.auth_userId })
    //     .then((response) => {})
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // }
  };
  if (Inputting) {
    console.log('true', true);
  } else {
    console.log('false', false);
  }

  const navigation = useNavigate();

  return (
    <>
      <Box w={'100%'} textAlign={'right'}>
        <MainButton onClick={onEdit}>
          <Icon name="setting" />{' '}
        </MainButton>
      </Box>

      <form onSubmit={HnadleSubmit1}>
        <VStack
          divider={<StackDivider borderColor="gray.200" />}
          spacing={2}
          align="stretch"
          mr={2}
          ml={2}
        >
          {shoppingItems &&
            shoppingItems.map((shoppingItem) => (
              <Flex justify="space-between">
                <Text>{shoppingItem.name}</Text>
                <Text>{shoppingItem.total_amount}個</Text>
              </Flex>
            ))}
        </VStack>
        {shoppingItems && shoppingItems.length > 0 && (
          <Box w={'100%'} textAlign={'right'}>
            <MainButton type="submit">購入する</MainButton>
          </Box>
        )}
      </form>

      <Textarea
        bgColor={'gray.50'}
        resize="vertical"
        minH="200px"
        maxH="400px"
        placeholder="その他買い物メモ"
        value={text}
        onKeyDown={(e) => onEnter(e)}
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
