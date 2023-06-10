import { VFC, memo, useState, useEffect } from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  Button,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from '@chakra-ui/react';
import Icon from '../icon/mapper';
import axios from 'axios';

type Props = { setCategory: any; category: any; selectCateogory: any };

const SelectCategoryMenu: VFC<Props> = memo((props) => {
  const { category, selectCateogory, setCategory } = props;

  //   useEffect(() => {
  //     (async () => {
  //       try {
  //         const res = await axios.get(`/api/home/${localStorage.auth_userId}`);

  //         return;
  //       } catch (e) {
  //         return e;
  //       }
  //     })();
  //   }, []);

  return (
    <>
      <Menu>
        <MenuButton
          width={'50%'}
          justify="left"
          justifyContent={'center'}
          mb={'5px'}
          as={Button}
          rightIcon={<Icon name="down" />}
        >
          {category ? <Text>{category}</Text> : <Text>未選択</Text>}
        </MenuButton>
        <MenuList>
          <RadioGroup ml={'5px'} onChange={setCategory} value={category}>
            <Stack>
              <Radio value="未分類">未分類</Radio>
              {category &&
                category.map((c: any) => {
                  <Radio key={c.id} value="2">
                    Second
                  </Radio>;
                })}

              <Radio value="3">Third</Radio>
            </Stack>
          </RadioGroup>
        </MenuList>
      </Menu>
    </>
  );
});
export default SelectCategoryMenu;
