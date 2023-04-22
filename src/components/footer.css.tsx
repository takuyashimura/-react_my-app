import { Box, List, ListItem, Text } from '@chakra-ui/react';
import { FooterTagu } from '../tags/Footer';
import { FooterElement } from '../tags/FooterElement';
import { Link } from 'react-router-dom';

import Icon from '../icon/mapper';
import { ReactNode } from 'react';

export const Footer = () => {
  let AuthButtons: ReactNode;

  if (localStorage.getItem('auth_token')) {
    AuthButtons = (
      <>
        <FooterElement href="/food/">
          <Box display="flex" flexDirection="column" alignItems="center">
            <Box fontSize={30}>
              <Icon name="home" />
            </Box>
            <Text fontSize={10}>食材</Text>
          </Box>
        </FooterElement>
        <FooterElement href="/menu/">
          <Box display="flex" flexDirection="column" alignItems="center">
            <Box fontSize={30}>
              <Icon name="menu" />{' '}
            </Box>
            <Text fontSize={10}>メニュー</Text>{' '}
          </Box>
        </FooterElement>
        <FooterElement href="/buyList/">
          <Box display="flex" flexDirection="column" alignItems="center">
            <Box fontSize={30}>
              <Icon name="cart" />{' '}
            </Box>
            <Text fontSize={10}>カート</Text>{' '}
          </Box>
        </FooterElement>
        <FooterElement href="/cookingList/">
          <Box display="flex" flexDirection="column" alignItems="center">
            <Box fontSize={30}>
              <Icon name="cook" />{' '}
            </Box>
            <Text fontSize={10}>調理リスト</Text>{' '}
          </Box>
        </FooterElement>
      </>
    );
  }

  return <FooterTagu>{AuthButtons}</FooterTagu>;
};
