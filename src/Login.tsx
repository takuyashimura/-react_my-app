import React, { useEffect, useState } from 'react';

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
import { Box, Button, Flex, Text } from '@chakra-ui/react';

type LoginInput = {
  email: string;
  password: string;
  error_list: any;
};

function Login() {
  const navigation = useNavigate();
  useEffect(() => {
    if (localStorage.auth_token) {
      localStorage.clear();
      window.location.reload();
    }
  }, []);

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
        console.log('res', res);
        if (res.data.status === 200) {
          localStorage.setItem('auth_token', res.data.token);
          localStorage.setItem('auth_name', res.data.username);
          localStorage.setItem('auth_userId', res.data.userId);
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

  const Register = () => {
    navigation('/register/');
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

            <Flex textAlign={'center'} justify={'space-between'}>
              {' '}
              <Button
                onClick={Register}
                bg={'blue.300'}
                borderRadius={'full'}
                _hover={{ opacity: 0.8 }}
              >
                <Text color={'white'} fontWeight={'200'}>
                  新規登録画面へ
                </Text>
              </Button>
              <Button
                type="submit"
                bg={'blue.300'}
                borderRadius={'full'}
                _hover={{ opacity: 0.8 }}
              >
                <Text color={'white'} fontWeight={'200'}>
                  ログイン
                </Text>
              </Button>{' '}
            </Flex>
          </form>
          <Box
            mt={'5px'}
            width={'100%'}
            display={'flex'}
            justifyContent={'center'}
          ></Box>
        </Box>
      </ContentBox>
    </ContainerBox>
  );
}

export default Login;
