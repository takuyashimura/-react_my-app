import { VFC, memo, useState, useEffect } from 'react';
import {
  Flex,
  StackDivider,
  VStack,
  Text,
  Box,
  Button,
} from '@chakra-ui/react';
import Icon from '../icon/mapper';

type Props = {
  menuCategories: any;
  ClickChoice: any;
  ClickAlert: any;
  clickEdit: any;
  menus: any;
};

type CategoryProps = {
  menuCategories: any;
  ClickChoice: any;
  ClickAlert: any;
  clickEdit: any;
  menus: any;
  g: any;
};

type HistoryName = {
  id: number;
  user_id: number;
  name: string;
  category_id: number;
  last_cook_at: number;
};

export const AllMenu: VFC<Props> = memo((props) => {
  const { menuCategories, ClickChoice, ClickAlert, clickEdit, menus } = props;
  console.log('menus', menus);
  return (
    <>
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={2}
        align="stretch"
      >
        {menus &&
          menus.map((menu: any) => (
            <Flex
              ml={'5px'}
              mr={'5px'}
              justify="space-between"
              height={'40px'}
              alignItems="center"
              key={menu.id}
            >
              <Text>{menu.name}</Text>

              <Box>
                <Button
                  colorScheme="teal"
                  mr={1}
                  flexDirection="column"
                  onClick={() => ClickChoice(menu)}
                  _hover={{
                    cursor: 'pointer',
                    opacity: 0.8,
                  }}
                >
                  <Box>
                    <Icon name="pot" />
                  </Box>
                  <Text fontSize={'1px'}>調理</Text>
                </Button>
                <Button
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
                  ml={1}
                  onClick={() => clickEdit(menu)}
                  _hover={{
                    cursor: 'pointer',
                    opacity: 0.8,
                  }}
                >
                  <Box>
                    <Icon name="pencil" />
                  </Box>
                </Button>
              </Box>
            </Flex>
          ))}
      </VStack>
    </>
  );
});

export const CategoryMenu: VFC<CategoryProps> = memo((props) => {
  const { menuCategories, ClickChoice, ClickAlert, clickEdit, menus, g } =
    props;

  return (
    <>
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={2}
        align="stretch"
      >
        {menus &&
          menus
            .filter((f: any) => f.category_id === g.id)
            .map((menu: any) => (
              <Flex
                ml={'5px'}
                mr={'5px'}
                justify="space-between"
                height={'40px'}
                alignItems="center"
                key={menu.id}
              >
                <Text>{menu.name}</Text>

                <Box>
                  <Button
                    colorScheme="teal"
                    mr={1}
                    flexDirection="column"
                    onClick={() => ClickChoice(menu)}
                    _hover={{
                      cursor: 'pointer',
                      opacity: 0.8,
                    }}
                  >
                    <Box>
                      <Icon name="pot" />
                    </Box>
                    <Text fontSize={'1px'}>調理</Text>
                  </Button>
                  <Button
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
                    ml={1}
                    onClick={() => clickEdit(menu)}
                    _hover={{
                      cursor: 'pointer',
                      opacity: 0.8,
                    }}
                  >
                    <Box>
                      <Icon name="pencil" />
                    </Box>
                  </Button>
                </Box>
              </Flex>
            ))}
      </VStack>
    </>
  );
});

export const NullMenu: VFC<Props> = memo((props) => {
  const { menuCategories, ClickChoice, ClickAlert, clickEdit, menus } = props;

  return (
    <>
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={2}
        align="stretch"
      >
        {menus &&
          menus
            .filter((f: any) => f.category_id === null)
            .map((menu: any) => (
              <Flex
                ml={'5px'}
                mr={'5px'}
                justify="space-between"
                height={'40px'}
                alignItems="center"
                key={menu.id}
              >
                <Text>{menu.name}</Text>

                <Box>
                  <Button
                    colorScheme="teal"
                    mr={1}
                    flexDirection="column"
                    onClick={() => ClickChoice(menu)}
                    _hover={{
                      cursor: 'pointer',
                      opacity: 0.8,
                    }}
                  >
                    <Box>
                      <Icon name="pot" />
                    </Box>
                    <Text fontSize={'1px'}>調理</Text>
                  </Button>
                  <Button
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
                    ml={1}
                    onClick={() => clickEdit(menu)}
                    _hover={{
                      cursor: 'pointer',
                      opacity: 0.8,
                    }}
                  >
                    <Box>
                      <Icon name="pencil" />
                    </Box>
                  </Button>
                </Box>
              </Flex>
            ))}
      </VStack>
    </>
  );
});

//メニューの履歴タブの機能実装
export const HistoryMenu: VFC<Props> = memo((props) => {
  const { menuCategories, ClickChoice, ClickAlert, clickEdit, menus } = props;

  const [historyMenu, setHistoryMenu] = useState<HistoryName[] | undefined>(
    undefined
  );

  useEffect(() => {
    if (menus) {
      const updataHistoryMenu = [...menus]
        .sort(
          (a: any, b: any) =>
            new Date(a.last_cook_at).valueOf() -
            new Date(b.last_cook_at).valueOf()
        )
        .filter((m: any) => m.last_cook_at !== null);
      setHistoryMenu(updataHistoryMenu);
    }
  }, [menus]);

  return (
    <>
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={2}
        align="stretch"
      >
        {historyMenu &&
          historyMenu.map((menu: any) => (
            <Flex
              ml={'5px'}
              mr={'5px'}
              justify="space-between"
              height={'40px'}
              alignItems="center"
              key={menu.id}
            >
              <Flex width={'100%'} justify="space-between" alignItems="center">
                <Box width={'calc(100% - 90px)'}>
                  <Text flexGrow={1}>{menu.name}</Text>
                </Box>
                {/* 最終調理日の描画 */}
                {menu.last_cook_at && (
                  <Box width={'80px'} mr={1}>
                    <Text>最終調理日</Text>
                    <Text textAlign={'center'}>
                      {` ${new Date(menu.last_cook_at).getMonth()}月${new Date(
                        menu.last_cook_at
                      ).getDate()}日`}
                    </Text>
                  </Box>
                )}
              </Flex>

              <Box width={'156px'} display="flex" justifyContent={'flex-end'}>
                <Button
                  colorScheme="teal"
                  mr={1}
                  flexDirection="column"
                  onClick={() => ClickChoice(menu)}
                  _hover={{
                    cursor: 'pointer',
                    opacity: 0.8,
                  }}
                >
                  <Box>
                    <Icon name="pot" />
                  </Box>
                  <Text fontSize={'1px'}>調理</Text>
                </Button>
                <Button
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
                  ml={1}
                  onClick={() => clickEdit(menu)}
                  _hover={{
                    cursor: 'pointer',
                    opacity: 0.8,
                  }}
                >
                  <Box>
                    <Icon name="pencil" />
                  </Box>
                </Button>
              </Box>
            </Flex>
          ))}
      </VStack>
    </>
  );
});
