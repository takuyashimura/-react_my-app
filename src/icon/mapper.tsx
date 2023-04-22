import React from "react";
import { GiCook, GiRiceCooker } from "react-icons/gi";
import { GoTrashcan } from "react-icons/go";
import { TfiShoppingCart } from "react-icons/tfi";
import { MdMenuBook, MdOutlineWarehouse } from "react-icons/md";
import { AiFillSetting } from "react-icons/ai";
import { RxTextAlignBottom } from "react-icons/rx";
import { MdLogout, MdLogin } from "react-icons/md";

const Icon = ({ name }: any) => {
    switch (name) {
        case "cook":
            return <GiCook />;
        case "trashcan":
            return <GoTrashcan />;
        case "pot":
            return <GiRiceCooker />;
        case "cart":
            return <TfiShoppingCart />;
        case "menu":
            return <MdMenuBook />;
        case "home":
            return <MdOutlineWarehouse />;
        case "setting":
            return <AiFillSetting />;
        case "keep":
            return <RxTextAlignBottom />;
        case "logout":
            return <MdLogout />;
        case "login":
            return <MdLogin />;

        default:
            return null;
    }
};

export default Icon;
