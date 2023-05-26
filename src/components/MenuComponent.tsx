import {
  Box,
  Flex,
  VStack,
  Text,
  Button,
  StackDivider,
} from '@chakra-ui/react';
import { VFC, memo } from 'react';
import { MainButton } from '../tags/buttom';
import Icon from '../icon/mapper';

type Props = {
  onNew: any;
  menus: any;
  ClickChoice: any;
  ClickAlert: any;
  clickEdit: any;
};

const MenuComopnent: VFC<Props> = memo((props) => {
  const { onNew, menus, ClickChoice, ClickAlert, clickEdit } = props;
  return (
    <>
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
      </VStack>
    </>
  );
});
export default MenuComopnent;
