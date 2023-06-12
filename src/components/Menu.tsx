import { useDisclosure, Center } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AlertDialogPageMenu } from './AlertDialogPageMenu';
import { EditMenuModal } from './EditMenuModal';
import { NewMenuModal } from './NewMenuModal';
import { MenuCookModal } from './MenuCookModal';

import MenuComopnent from './MenuComponent';
import SpinnerIcon from './loading';

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
  menu: [];
};

type MenuData = {
  id: number;
  name: string;
  food_amount: number;
};
type Loading = boolean;

const Menu = () => {
  const [menus, setMenus] = useState<Menus[] | undefined>(undefined);
  const [deleteMenu, setDeleteMenu] = useState<DeleteMenu[] | undefined>(
    undefined
  );
  const [menuName, setMenuName] = useState<MenuName[] | undefined>(undefined);
  const [menuData, setMenuData] = useState<MenuData[] | undefined>(undefined);
  const [choiceMenu, setChoiceMenu] = useState<MenuData[] | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<Loading>(true);

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
    setLoading(false);

    (async () => {
      try {
        const res = await axios.get(`api/menu/${localStorage.auth_userId}`);
        setMenus(res.data.menus);
        setLoading(true);
        return;
      } catch (e) {
        setLoading(true);

        return e;
      }
    })();
  }, []);

  const getMenuData = () => {
    (async () => {
      try {
        const res = await axios.get(`api/menu/${localStorage.auth_userId}`);
        setMenus(res.data.menus);
        console.log('aaaa');
        return;
      } catch (e) {
        return e;
      }
    })();
  };

  // ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
  // post↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

  const ClickChoice = (menu: any) => {
    axios
      .post('api/menu_cook', { menu })
      .then((response) => {
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
        setMenuName(response.data.menuData);
        setMenuData(response.data.foodArray);

        onEdit();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

  return (
    <div className="Food">
      {loading ? (
        <>
          <MenuComopnent
            onNew={onNew}
            menus={menus}
            ClickChoice={ClickChoice}
            ClickAlert={ClickAlert}
            clickEdit={clickEdit}
          />
          <AlertDialogPageMenu
            isOpen={isAlert}
            onClose={endAlert}
            deleteMenu={deleteMenu}
            getMenuData={getMenuData}
          />
          <EditMenuModal
            isOpen={isEdit}
            onClose={endEdit}
            menuName={menuName}
            menuData={menuData}
          />
          <NewMenuModal
            isOpen={isNew}
            onClose={endNew}
            getMenuData={getMenuData}
          />
          <MenuCookModal
            isOpen={isChoice}
            onClose={endChoice}
            choiceMenu={choiceMenu}
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

export default Menu;
