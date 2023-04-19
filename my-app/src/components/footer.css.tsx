import { Box, Text } from "@chakra-ui/react";
import { FooterTagu } from "../tags/Footer";
import { FooterElement } from "../tags/FooterElement";

import Icon from "../icon/mapper";

export const Footer = () => {
    return (
        <FooterTagu>
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
                        <Icon name="menu" />{" "}
                    </Box>
                    <Text fontSize={10}>メニュー</Text>{" "}
                </Box>
            </FooterElement>
            <FooterElement href="/buyList/">
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Box fontSize={30}>
                        <Icon name="cart" />{" "}
                    </Box>
                    <Text fontSize={10}>カート</Text>{" "}
                </Box>
            </FooterElement>
            <FooterElement href="/cookingList/">
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Box fontSize={30}>
                        <Icon name="cook" />{" "}
                    </Box>
                    <Text fontSize={10}>調理リスト</Text>{" "}
                </Box>
            </FooterElement>
        </FooterTagu>
    );
};
