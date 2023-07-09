import {
  Box,
  Flex,
  VStack,
  Text,
  Button,
  StackDivider,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import { VFC, memo } from 'react';
import Icon from '../icon/mapper';
import { MainButton, MainCategoryButton } from '../tags/buttom';
import { AllMenu, CategoryMenu, NullMenu, HistoryMenu } from './categoryMenu';

type Props = {
  onNew: any;
  menus: any;
  ClickChoice: any;
  ClickAlert: any;
  clickEdit: any;
  onOpenAddmenuCategory: any;
  menuCategories: any;
};

const MenuComopnent: VFC<Props> = memo((props) => {
  const {
    onNew,
    menus,
    ClickChoice,
    ClickAlert,
    clickEdit,
    onOpenAddmenuCategory,
    menuCategories,
  } = props;
  return (
    <>
      <Flex>
        <Box w={'100%'} textAlign={'left'}>
          <MainCategoryButton onClick={onOpenAddmenuCategory}>
            カテゴリー編集
          </MainCategoryButton>
        </Box>
        <Box w={'100%'} textAlign={'right'}>
          <MainButton onClick={onNew}>新規メニュー追加</MainButton>
        </Box>
      </Flex>

      <Tabs variant="soft-rounded" colorScheme="green">
        <TabList overflowX={'scroll'}>
          <Tab>
            <Text>全て</Text>
          </Tab>
          {menuCategories &&
            menuCategories.map((g: any) => <Tab key={g.id}>{g.name}</Tab>)}

          <Tab>未分類</Tab>
          <Tab>履歴</Tab>
        </TabList>
        <TabPanels>
          <TabPanel pr={'0px'} pl={'0px'}>
            {' '}
            <AllMenu
              menuCategories={menuCategories}
              menus={menus}
              ClickChoice={ClickChoice}
              ClickAlert={ClickAlert}
              clickEdit={clickEdit}
            />
          </TabPanel>

          {menuCategories &&
            menuCategories.map((g: any) => (
              <TabPanel pr={'0px'} pl={'0px'} key={g.id}>
                <CategoryMenu
                  menuCategories={menuCategories}
                  menus={menus}
                  ClickChoice={ClickChoice}
                  ClickAlert={ClickAlert}
                  clickEdit={clickEdit}
                  g={g}
                />{' '}
              </TabPanel>
            ))}
          <TabPanel pr={'0px'} pl={'0px'}>
            <NullMenu
              menuCategories={menuCategories}
              menus={menus}
              ClickChoice={ClickChoice}
              ClickAlert={ClickAlert}
              clickEdit={clickEdit}
            />
          </TabPanel>

          <TabPanel pr={'0px'} pl={'0px'}>
            {' '}
            <HistoryMenu
              menuCategories={menuCategories}
              menus={menus}
              ClickChoice={ClickChoice}
              ClickAlert={ClickAlert}
              clickEdit={clickEdit}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
});
export default MenuComopnent;
