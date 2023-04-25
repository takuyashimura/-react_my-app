/* eslint-disable react/jsx-no-undef */
import React, { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import { Box, Flex, List, ListItem, Text } from '@chakra-ui/react';
import Icon from './icon/mapper';

function GlobalNav() {
  const navigation = useNavigate();

  const logoutSubmit = (e: any) => {
    e.preventDefault();

    axios.post(`api/logout`).then((res) => {
      console.log('res', res);
      if (res.data.status === 200) {
        localStorage.clear();
        swal('ログアウトしました', res.data.message, 'success');
        navigation('/');
        window.location.reload();
      }
    });
  };

  let AuthButtons: ReactNode;

  if (localStorage.getItem('auth_token')) {
    AuthButtons = (
      <Box>
        <Box>
          <Text>ログイン中</Text>
        </Box>
        <ListItem float={'right'} onClick={logoutSubmit}>
          <Box width={'25%'}>
            <Icon name="logout" />
          </Box>
        </ListItem>{' '}
      </Box>
    );
  } else {
    AuthButtons = (
      <List>
        <ListItem>
          <Link to="/register">
            <span>登録</span>
          </Link>
        </ListItem>
        <ListItem float={'right'}>
          <Link to="/login">
            <Icon name="login" />
          </Link>
        </ListItem>
      </List>
    );
  }
  console.log('localStorage', localStorage);

  return (
    <Flex bg={'red.100'} justify="space-between">
      <Box>
        <Text fontSize={'25px'}>食材管理</Text>
      </Box>

      <List>{AuthButtons}</List>
    </Flex>
  );
}

export default GlobalNav;
