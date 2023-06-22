import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
  Text,
} from '@chakra-ui/react';
import Icon from '../icon/mapper';
import { VFC, memo } from 'react';

type Props = {
  menuCategories: any;
  menuName: any;
  setEditMenuCategory: any;
  editMenuCategory: any;
};

const CategoryMenu: VFC<Props> = memo((props) => {
  const { menuCategories, menuName, setEditMenuCategory, editMenuCategory } =
    props;

  console.log('editMenuCategory', editMenuCategory);

  return (
    <>
      <Menu>
        <MenuButton
          mt={'5px'}
          width={'100%'}
          as={Button}
          rightIcon={<Icon name="down" />}
        >
          <Text
            whiteSpace={'nowrap'}
            overflow={'hidden'}
            textOverflow={'ellipsis'}
          >
            選択
          </Text>
        </MenuButton>
        <MenuList>
          <MenuOptionGroup
            defaultValue={editMenuCategory}
            type="radio"
            onChange={setEditMenuCategory}
          >
            {menuCategories &&
              menuCategories.map((c: any) => (
                <MenuItemOption key={c.id} value={c.id.toString()}>
                  {c.name}
                </MenuItemOption>
              ))}
          </MenuOptionGroup>
        </MenuList>
      </Menu>
    </>
  );
});

export default CategoryMenu;
