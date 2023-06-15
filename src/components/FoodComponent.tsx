import {
  Text,
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import { VFC, memo } from 'react';
import { AllFood, CategoryFood, NullFood } from './categoryFood';

type Props = {
  handlePostModal: any;
  onCheckOpen: any;
  foodStocks: any;
  getCategories: any;
  foodCategoryEditModal: any;
};

const FoodComponent: VFC<Props> = memo((props) => {
  const {
    handlePostModal,
    onCheckOpen,
    foodStocks,
    getCategories,
    foodCategoryEditModal,
  } = props;

  return (
    <>
      {foodStocks && foodStocks.length > 0 ? (
        <>
          <Tabs isFitted variant="soft-rounded" colorScheme="green">
            <TabList overflowX={'scroll'}>
              <Tab>
                <Text>全て</Text>
              </Tab>
              {getCategories &&
                getCategories.map((g: any) => <Tab key={g.id}>{g.name}</Tab>)}

              <Tab>未分類</Tab>
            </TabList>
            <TabPanels>
              <TabPanel pr={'0px'} pl={'0px'}>
                {' '}
                <AllFood
                  handlePostModal={handlePostModal}
                  onCheckOpen={onCheckOpen}
                  foodStocks={foodStocks}
                  getCategories={getCategories}
                  foodCategoryEditModal={foodCategoryEditModal}
                />
              </TabPanel>

              {getCategories &&
                getCategories.map((g: any) => (
                  <TabPanel pr={'0px'} pl={'0px'} key={g.id}>
                    <CategoryFood
                      handlePostModal={handlePostModal}
                      onCheckOpen={onCheckOpen}
                      foodStocks={foodStocks}
                      getCategories={getCategories}
                      foodCategoryEditModal={foodCategoryEditModal}
                      g={g}
                    />{' '}
                  </TabPanel>
                ))}
              <TabPanel pr={'0px'} pl={'0px'}>
                <NullFood
                  handlePostModal={handlePostModal}
                  onCheckOpen={onCheckOpen}
                  foodStocks={foodStocks}
                  getCategories={getCategories}
                  foodCategoryEditModal={foodCategoryEditModal}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </>
      ) : (
        <Box textAlign={'center'}>
          <Text mt={'50px'} fontSize={'20px'}>
            新規食材追加ボタンから
            <br />
            食材を追加してください
          </Text>
        </Box>
      )}
    </>
  );
});

export default FoodComponent;
