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
import { CustomButtom } from '../tags/buttom';
import Icon from '../icon/mapper';

type shopingItem = {
  food_id: number;
  name: string;
  total_amount: number;
};
type text = string;

const BuyList = () => {
  const [shoppingItems, setShoppingItems] = useState<shopingItem[] | undefined>(
    undefined
  );
  const [text, setText] = useState<text>();

  const { isOpen: isEdit, onOpen: onEdit, onClose: endEdit } = useDisclosure();

  const toast = useToast();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('http://localhost:8888/api/buy_list');
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
      .post('http://localhost:8888/api/boughtFood', shoppingItems)
      .then((response) => {
        console.log('shoppingItems', shoppingItems);
        toast({
          title: '購入しました',
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

  const HnadleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post('http://localhost:8888/api/text', text)
      .then((response) => {
        console.log('post', response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const navigation = useNavigate();

  return (
    <>
      <Box w={'100%'} textAlign={'right'}>
        <CustomButtom m={2} onClick={onEdit}>
          <Icon name="setting" />{' '}
        </CustomButtom>
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
            <CustomButtom m={2} ml={2} type="submit">
              購入する
            </CustomButtom>
          </Box>
        )}
      </form>

      <form onSubmit={HnadleSubmit}>
        <Textarea
          bgColor={'gray.50'}
          resize="vertical"
          minH="200px"
          maxH="400px"
          placeholder="その他買い物メモ"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Box w={'100%'} textAlign={'right'}>
          <CustomButtom m={2} ml={2} type="submit">
            <Icon name="keep" />{' '}
          </CustomButtom>
        </Box>
      </form>
      <EditBuyListModal isOpen={isEdit} onClose={endEdit} />
    </>
  );
};
export default BuyList;
