import {
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  Button,
  Text,
} from '@chakra-ui/react';
import Icon from '../icon/mapper';
import { VFC, memo } from 'react';

type Props = {
  menuCategories: any;
  setEditMenuCategory: any;
  editMenuCategory: any;
  editMenuCategoryName: any;
};

const CategoryMenu: VFC<Props> = memo((props) => {
  const { menuCategories, setEditMenuCategory, editMenuCategory } = props;

  const categoryName = menuCategories.filter((m: any) => {
    return m.id == editMenuCategory;
  });

  return (
    <>
      <Menu>
        <MenuButton
          mt={'5px'}
          width={'100%'}
          as={Button}
          rightIcon={<Icon name="down" />}
        >
          {categoryName[0] ? (
            <Text
              whiteSpace={'nowrap'}
              overflow={'hidden'}
              textOverflow={'ellipsis'}
            >
              {categoryName[0].name}
            </Text>
          ) : (
            <Text
              whiteSpace={'nowrap'}
              overflow={'hidden'}
              textOverflow={'ellipsis'}
            >
              未選択
            </Text>
          )}
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
            <MenuItemOption value={'null'}>未分類</MenuItemOption>
          </MenuOptionGroup>
        </MenuList>
      </Menu>
    </>
  );
});

export default CategoryMenu;
