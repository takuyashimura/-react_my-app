import { VFC, memo } from 'react';
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

export const AllMenu: VFC<Props> = memo((props) => {
  const { menuCategories, ClickChoice, ClickAlert, clickEdit, menus } = props;

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
