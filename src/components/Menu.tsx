import {
  Box,
  Button,
  Flex,
  StackDivider,
  VStack,
  useDisclosure,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AlertDialogPageMenu } from './AlertDialogPageMenu';
import { EditMenuModal } from './EditMenuModal';
import { NewMenuModal } from './NewMenuModal';
import { MenuCookModal } from './MenuCookModal';
import { MainButton } from '../tags/buttom';
import Icon from '../icon/mapper';

type Menus = {
  menu_id: number;
  name: string;
};

type DeleteMenu = {
  id: number;
  user_id: number;
  name: string;
};

type MenuName = {
  id: number;
  name: string;
};

type MenuData = {
  id: number;
  name: string;
  food_amount: number;
};

const Menu = () => {
  const [menus, setMenus] = useState<[Menus] | undefined>(undefined);
  const [deleteMenu, setDeleteMenu] = useState<DeleteMenu[] | undefined>(
    undefined
  );
  const [menuName, setMenuName] = useState<MenuName[] | undefined>(undefined);
  const [menuData, setMenuData] = useState<MenuData[] | undefined>(undefined);
  const [choiceMenu, setChoiceMenu] = useState<MenuData[] | undefined>(
    undefined
  );

  const {
    isOpen: isAlert,
    onOpen: onAlert,
    onClose: endAlert,
  } = useDisclosure();
  const { isOpen: isEdit, onOpen: onEdit, onClose: endEdit } = useDisclosure();
  const { isOpen: isNew, onOpen: onNew, onClose: endNew } = useDisclosure();
  const {
    isOpen: isChoice,
    onOpen: onChoice,
    onClose: endChoice,
  } = useDisclosure();

  // get↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`api/menu/${localStorage.auth_userId}`);
        console.log('res', res);

        setMenus(res.data.menus);
        //サイトで拾ってきたコードにはconsoleのコードはなかったので自分で追記

        return;
      } catch (e) {
        return e;
      }
    })();
  }, []);

  // ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
  // post↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

  const ClickChoice = (menu: any) => {
    axios
      .post('api/menu_cook', { menu })
      .then((response) => {
        console.log('response', response);
        setChoiceMenu(response.data);
        onChoice();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const ClickAlert = (menu: any) => {
    setDeleteMenu(menu);
    onAlert();
  };

  const clickEdit = (menu: any) => {
    axios
      .post('api/menu_edit', { menu })
      .then((response) => {
        console.log('response', response.data.foodArray);
        setMenuName(response.data.menuData);
        setMenuData(response.data.foodArray);
        onEdit();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  // console.log("menus", menus);

  // ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

  return (
    <div className="Food">
      <Box w={'100%'} textAlign={'right'}>
        <MainButton onClick={onNew}>新規メニュー追加</MainButton>
      </Box>

      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        // spacing={2}
        align="stretch"
      >
        {' '}
        {menus && menus.length > 0 ? (
          menus.map((menu) => (
            <>
              <Flex
                ml={'5px'}
                mr={'5px'}
                justify="space-between"
                height={'40px'}
                key={menu.menu_id}
                alignItems="center"
              >
                <Text>{menu.name}</Text>
                <Box>
                  {' '}
                  <Button
                    mr={1}
                    colorScheme="teal"
                    flexDirection={'column'}
                    onClick={() => ClickChoice(menu)}
                    _hover={{
                      cursor: 'pointer',
                      opacity: 0.8,
                    }}
                  >
                    <Icon name="pot" />
                    <Text fontSize={'1px'}>調理</Text>
                  </Button>
                  <Button
                    mr={1}
                    colorScheme="red"
                    onClick={() => ClickAlert(menu)}
                    _hover={{
                      cursor: 'pointer',
                      opacity: 0.8,
                    }}
                  >
                    <Icon name="trashcan" />
                  </Button>
                  <Button
                    onClick={() => clickEdit(menu)}
                    _hover={{
                      cursor: 'pointer',
                      opacity: 0.8,
                    }}
                  >
                    <Text>
                      <Icon name="pencil" />
                    </Text>
                  </Button>
                </Box>
              </Flex>
            </>
          ))
        ) : (
          <Box textAlign={'center'}>
            <Text mt={'50px'} fontSize={'20px'}>
              新規メニュー追加ボタンから
              <br />
              食材を追加してください
            </Text>
          </Box>
        )}
      </VStack>
      <AlertDialogPageMenu
        isOpen={isAlert}
        onClose={endAlert}
        deleteMenu={deleteMenu}
      />
      <EditMenuModal
        isOpen={isEdit}
        onClose={endEdit}
        menuName={menuName}
        menuData={menuData}
      />
      <NewMenuModal isOpen={isNew} onClose={endNew} />
      <MenuCookModal
        isOpen={isChoice}
        onClose={endChoice}
        choiceMenu={choiceMenu}
      />
    </div>
  );
};

export default Menu;
