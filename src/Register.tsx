import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import {
  ContainerBox,
  ContentBox,
  InformationEmailInput,
  InformationEmailInputError,
  InformationNameInput,
  InformationNameInputError,
  InformationPasswordInput,
  InformationPasswordInputError,
  RegisterTag,
} from './tags/RegisterLogintag';

type registerInput = {
  name: string;
  email: string;
  password: string;
  error_list: any;
};

function Register() {
  const navigation = useNavigate();

  const [registerInput, setRegister] = useState<registerInput>({
    name: '',
    email: '',
    password: '',
    error_list: [],
  });

  const handleInput = (e: any) => {
    e.persist();
    setRegister({ ...registerInput, [e.target.name]: e.target.value });
  };

  const registerSubmit = (e: any) => {
    e.preventDefault();

    const data = {
      name: registerInput.name,
      email: registerInput.email,
      password: registerInput.password,
    };

    axios.get('/sanctum/csrf-cookie').then((response) => {
      axios.post(`/api/register`, data).then((res) => {
        console.log('res.data', res.data);
        if (res.data.status === 200) {
          localStorage.setItem('auth_token', res.data.token);
          localStorage.setItem('auth_name', res.data.username);
          localStorage.setItem('auth_userId', res.data.userId);
          navigation('/food/');
          swal('Success', res.data.message, 'success');
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          setRegister({
            ...registerInput,
            error_list: res.data.validation_errors,
          });
        }
      });
    });
  };

  const Login = () => {
    navigation('/login/');
  };

  return (
    <>
      <ContainerBox>
        <ContentBox>
          <Box width={'100%'}>
            <form onSubmit={registerSubmit}>
              <Box textAlign={'center'} mb={'10px'}>
                <Text fontSize={'30px'}>ユーザー登録</Text>
              </Box>
              {registerInput.error_list.name ? (
                <>
                  <RegisterTag>
                    <InformationNameInputError
                      name="name"
                      onChange={handleInput}
                      value={registerInput.name}
                    />
                  </RegisterTag>
                  <Text color="red.300">{registerInput.error_list.name}</Text>
                </>
              ) : (
                <RegisterTag>
                  <InformationNameInput
                    onChange={handleInput}
                    value={registerInput.name}
                  />
                </RegisterTag>
              )}
              {registerInput.error_list.email ? (
                <>
                  <RegisterTag>
                    <InformationEmailInputError
                      onChange={handleInput}
                      value={registerInput.email}
                    />
                  </RegisterTag>
                  <Text color="red.300">{registerInput.error_list.email}</Text>
                </>
              ) : (
                <RegisterTag>
                  <InformationEmailInput
                    onChange={handleInput}
                    value={registerInput.email}
                  />
                </RegisterTag>
              )}
              {registerInput.error_list.password ? (
                <>
                  <RegisterTag>
                    <InformationPasswordInputError
                      onChange={handleInput}
                      value={registerInput.password}
                    />
                  </RegisterTag>

                  <Text mb={'24px'} color="red.300">
                    {registerInput.error_list.password}
                  </Text>
                </>
              ) : (
                <RegisterTag>
                  <InformationPasswordInput
                    mb={'48px'}
                    onChange={handleInput}
                    value={registerInput.password}
                  />
                </RegisterTag>
              )}
              <Flex justify={'space-between'}>
                <Button
                  onClick={Login}
                  bg={'blue.300'}
                  borderRadius={'full'}
                  _hover={{ opacity: 0.8 }}
                >
                  <Text color={'white'} fontWeight={'200'}>
                    ログイン画面へ
                  </Text>
                </Button>
                <Button
                  type="submit"
                  bg={'blue.300'}
                  borderRadius={'full'}
                  _hover={{ opacity: 0.8 }}
                >
                  <Text color={'white'} fontWeight={'200'}>
                    登録
                  </Text>
                </Button>
              </Flex>
            </form>
          </Box>
        </ContentBox>
      </ContainerBox>
    </>
  );
}

export default Register;
