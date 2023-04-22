import { Link } from "@chakra-ui/react";

export const FooterElement = (props: any) => {
    return (
        <Link
            bg={"red.100"}
            display={"flex"}
            width={"25%"}
            justifyContent={"center"}
            alignItems={"center"}
            textDecoration={"column"}
            height={"50px"}
            {...props}
        >
            {props.children}
        </Link>
    );
};
