import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Text } from '@chakra-ui/react';
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
          swal('Success', res.data.message, 'success');
          navigation('/');
        } else {
          setRegister({
            ...registerInput,
            error_list: res.data.validation_errors,
          });
        }
      });
    });
  };
  console.log('registerInput.error_list', registerInput.error_list);

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
                  <Text color="red.300">
                    {registerInput.error_list.password}
                  </Text>
                </>
              ) : (
                <RegisterTag>
                  <InformationPasswordInput
                    onChange={handleInput}
                    value={registerInput.password}
                  />
                </RegisterTag>
              )}
              <Box textAlign={'center'}>
                <Button type="submit" bg={'white'} _hover={{ opacity: 1 }}>
                  <Text
                    color={'blue.500'}
                    fontWeight={'200'}
                    _hover={{
                      borderBottom: '1px solid #3B82F6',
                    }}
                  >
                    サインアップ
                  </Text>
                </Button>
              </Box>
            </form>
          </Box>
        </ContentBox>
      </ContainerBox>
    </>
  );
}

export default Register;
