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
import { AllMenu, CategoryMenu, NullMenu } from './categoryMenu';

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
        </TabPanels>
      </Tabs>

      {/* <VStack
        divider={<StackDivider borderColor="gray.200" />}
        // spacing={2}
        align="stretch"
      >
        {' '}
        {menus && menus.length > 0 ? (
          menus.map((menu: any) => (
            <Flex
              ml={'5px'}
              mr={'5px'}
              justify="space-between"
              height={'40px'}
              alignItems="center"
              key={menu.menu_id}
            >
              <Text>{menu.name}</Text>
              <Box>
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
      </VStack> */}
    </>
  );
});
export default MenuComopnent;
