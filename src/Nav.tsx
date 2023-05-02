/* eslint-disable react/jsx-no-undef */
import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import { Box, Flex, List, ListItem, Text, Link } from '@chakra-ui/react';
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
      <Box
        display={'flex'}
        alignItems={'flex-end'}
        height={'100%'}
        onClick={logoutSubmit}
      >
        <Box height={'50%'} fontSize={'130%'} pb={'5px'} pr={'5px'}>
          <Icon name="logout" />
        </Box>
      </Box>
    );
  } else {
    AuthButtons = (
      <List
        display={'flex'}
        flexDirection="column"
        justifyContent="space-between"
        height={'100%'}
      >
        <Link href="/register" height={'50%'} pt={'5px'} pr={'5px'}>
          <span>登録</span>
        </Link>
        <Link
          href="/login"
          height={'50%'}
          display={'flex'}
          justifyContent={'right'}
        >
          <Box height={'100%'} fontSize={'130%'} pb={'5px'} pr={'5px'}>
            <Icon name="login" />
          </Box>
        </Link>
      </List>
    );
  }
  console.log('localStorage', localStorage);

  return (
    <Flex bg={'red.100'} justify="space-between">
      <Box m={'10px'}>
        <Text fontSize={'25px'}>食材管理</Text>
      </Box>

      <List>{AuthButtons}</List>
    </Flex>
  );
}

export default GlobalNav;
