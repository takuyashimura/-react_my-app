import { useDisclosure, Center, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AlertDialogPageMenu } from './AlertDialogPageMenu';
import { EditMenuModal } from './EditMenuModal';
import { NewMenuModal } from './NewMenuModal';
import { MenuCookModal } from './MenuCookModal';

import MenuComopnent from './MenuComponent';
import SpinnerIcon from './loading';
import EditMenuCategoriesModal from './EditMenuCategoriesModal';

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

type MenuCategories = {
  id: number;
  name: string;
};

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
  //メニューのカテゴリーを格納
  const [menuCategories, setMenuCategories] = useState<
    MenuCategories[] | undefined
  >(undefined);
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
  const {
    isOpen: isEditCategories,
    onOpen: onEditCategories,
    onClose: endEditCategories,
  } = useDisclosure();

  const toast = useToast();

  // get↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

  //メニューのカテゴリーを取得
  const getMenuCatagories = () => {
    (async () => {
      try {
        const res = await axios.get(
          `api/getMenuCatagories/${localStorage.auth_userId}`
        );
        setMenuCategories(res.data);
        setLoading(true);
        return;
      } catch (e) {
        setLoading(true);
        return e;
      }
    })();
  };
  //メニューのデータを取得
  const getMenuData = () => {
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
  };

  useEffect(() => {
    setLoading(false);
    getMenuData();
    getMenuCatagories();
  }, []);

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

  //カテゴリー編集モーダルを開く
  const onOpenAddmenuCategory = () => {
    onEditCategories();
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
            onOpenAddmenuCategory={onOpenAddmenuCategory}
            menuCategories={menuCategories}
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
            menuCategories={menuCategories}
          />
          <NewMenuModal
            isOpen={isNew}
            onClose={endNew}
            getMenuData={getMenuData}
            menuCategories={menuCategories}
          />
          <MenuCookModal
            isOpen={isChoice}
            onClose={endChoice}
            choiceMenu={choiceMenu}
          />

          <EditMenuCategoriesModal
            isEditCategories={isEditCategories}
            endEditCategories={endEditCategories}
            menuCategories={menuCategories}
            toast={toast}
            getMenuCatagories={getMenuCatagories}
            getMenuData={getMenuData}
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
