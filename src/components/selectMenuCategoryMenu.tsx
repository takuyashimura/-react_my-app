import { VFC, memo } from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from '@chakra-ui/react';
import Icon from '../icon/mapper';

type Props = {
  setPostCategory: any;
  postCategory: any;
  menuCategories: any;
};

const SelectMenuCategoryMenu: VFC<Props> = memo((props) => {
  const { postCategory, setPostCategory, menuCategories } = props;

  return (
    <>
      <Menu>
        {postCategory === 'null' ? (
          <MenuButton
            width={'50%'}
            justify="left"
            justifyContent={'center'}
            mr={'5px'}
            mb={'5px'}
            as={Button}
            rightIcon={<Icon name="down" />}
          >
            <Text>カテゴリー選択</Text>
          </MenuButton>
        ) : (
          <MenuButton
            width={'50%'}
            justify="left"
            justifyContent={'center'}
            mr={'5px'}
            mb={'5px'}
            color={'white'}
            colorScheme={'blue'}
            as={Button}
          >
            <Text>カテゴリー:{postCategory}</Text>
          </MenuButton>
        )}

        <MenuList>
          <RadioGroup
            ml={'5px'}
            onChange={setPostCategory}
            value={postCategory}
          >
            <Stack>
              <Radio value="null">未分類</Radio>
              {menuCategories &&
                menuCategories.map((c: any) => (
                  <Radio key={c.id} value={c.name.toString()}>
                    <Text>{c.name}</Text>
                  </Radio>
                ))}
            </Stack>
          </RadioGroup>

          <MenuItem justifyContent={'center'}>
            <Text>Close</Text>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
});
export default SelectMenuCategoryMenu;
