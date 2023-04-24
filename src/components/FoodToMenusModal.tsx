import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import axios from 'axios';
import { VFC, memo, useState } from 'react';
import { MenuCookModal } from './MenuCookModal';
type ModalFoodStocks = {
  id: number;
  name: string;
  total_amount: number;
  length: number;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  modalFoodStocks: ModalFoodStocks[] | undefined;
};

type MenuData = {
  id: number;
  name: string;
  food_amount: number;
};

export const FoodToMenusModal: VFC<Props> = memo((props) => {
  console.log('props', props);
  const { isOpen, onClose, modalFoodStocks } = props;
  const [choiceMenu, setChoiceMenu] = useState<MenuData[] | undefined>(
    undefined
  );
  const {
    isOpen: isChoice,
    onOpen: onChoice,
    onClose: endChoice,
  } = useDisclosure();

  if (modalFoodStocks) {
    console.log('modalFoodStocks', modalFoodStocks[0]);
    console.log('modalFoodStocks', modalFoodStocks[1].length);
    const length = modalFoodStocks[1].length;
    console.log('length', !!length);
  }

  const ClickChoice = (menu: any) => {
    console.log('menu', menu);
    axios
      .post('api/menu_cook', { menu })
      .then((response) => {
        setChoiceMenu(response.data);
        console.log('choiceMenu', choiceMenu);
        onChoice();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <div>
              <h1>
                {modalFoodStocks &&
                  modalFoodStocks[0] &&
                  `${modalFoodStocks[0]}を使うメニュー`}
              </h1>
            </div>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>
              {modalFoodStocks &&
              Array.isArray(modalFoodStocks[1]) &&
              modalFoodStocks[1].length > 0 ? (
                modalFoodStocks[1].map((menu: any) => (
                  <Button key={menu.id} m={1} onClick={() => ClickChoice(menu)}>
                    <p>{menu.name}</p>
                  </Button>
                ))
              ) : (
                <p>使用するメニューがありません</p>
              )}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
      <MenuCookModal
        isOpen={isChoice}
        onClose={endChoice}
        choiceMenu={choiceMenu}
      />
    </>
  );
});
