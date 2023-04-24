import React, { useState } from 'react';

import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  ContainerBox,
  ContentBox,
  InformationEmailInput,
  InformationEmailInputError,
  InformationPasswordInput,
  InformationPasswordInputError,
  RegisterTag,
} from './tags/RegisterLogintag';
import { Box, Button, Text } from '@chakra-ui/react';

type LoginInput = {
  email: string;
  password: string;
  error_list: any;
};

function Login() {
  const navigation = useNavigate();

  const [loginInput, setLogin] = useState<LoginInput>({
    email: '',
    password: '',
    error_list: [],
  });

  const handleInput = (e: any) => {
    e.persist();
    setLogin({ ...loginInput, [e.target.name]: e.target.value });
  };

  const loginSubmit = (e: any) => {
    e.preventDefault();

    const data = {
      email: loginInput.email,
      password: loginInput.password,
    };

    axios.get('/sanctum/csrf-cookie').then((response) => {
      axios.post(`api/login`, data).then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem('auth_token', res.data.token);
          localStorage.setItem('auth_name', res.data.username);
          swal('ログイン成功', res.data.message, 'success');
          navigation('/food/');
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else if (res.data.status === 401) {
          swal('注意', res.data.message, 'warning');
        } else {
          setLogin({
            ...loginInput,
            error_list: res.data.validation_errors,
          });
        }
      });
    });
  };

  return (
    <ContainerBox>
      <ContentBox>
        <Box width={'100%'}>
          <form onSubmit={loginSubmit}>
            <Box width={'100%'} textAlign={'center'} mb={'10px'}>
              <Text fontSize={'30px'}>ログイン</Text>
            </Box>
            {loginInput.error_list.email ? (
              <>
                <RegisterTag>
                  <InformationEmailInputError
                    onChange={handleInput}
                    value={loginInput.email}
                  />
                </RegisterTag>
                <Text color="red.300">{loginInput.error_list.email}</Text>
              </>
            ) : (
              <RegisterTag>
                <InformationEmailInput
                  onChange={handleInput}
                  value={loginInput.email}
                />
              </RegisterTag>
            )}
            {loginInput.error_list.password ? (
              <>
                <RegisterTag>
                  <InformationPasswordInputError
                    onChange={handleInput}
                    value={loginInput.password}
                  />
                </RegisterTag>
                <Text color="red.300">{loginInput.error_list.password}</Text>
              </>
            ) : (
              <RegisterTag>
                <InformationPasswordInput
                  onChange={handleInput}
                  value={loginInput.password}
                />
              </RegisterTag>
            )}

            <Text textAlign={'center'}>
              <Button type="submit" bg={'white'} _hover={{ opacity: 1 }}>
                <Text
                  color={'blue.500'}
                  fontWeight={'200'}
                  _hover={{
                    borderBottom: '1px solid #3B82F6',
                  }}
                >
                  ログイン
                </Text>
              </Button>
            </Text>
          </form>
        </Box>
      </ContentBox>
    </ContainerBox>
  );
}

export default Login;
