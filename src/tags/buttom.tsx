import { Button } from "@chakra-ui/react";

export const CustomButtom = (props: any) => {
    return (
        <Button
            bg={"red.400"}
            color={"white"}
            _hover={{
                opacity: 0.8,
            }}
            {...props}
        >
            {props.children}
        </Button>
    );
};
