import {
  Box,
  Flex,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react';
import { VFC, memo } from 'react';
import { MainButton, MainNonButton } from '../tags/buttom';

type Props = {
  nameCount: any;
  onChange: any;
  nameCountBase: any;
  editFood: any;
  useList: any;
  HandleSubmit: any;
  nonStocksData: any;
  length: any;
  onStocksData: any;
  HandlePost: any;
};

const CookingListComponent: VFC<Props> = memo((props) => {
  const {
    nameCount,
    onChange,
    nameCountBase,
    editFood,
    useList,
    HandleSubmit,
    nonStocksData,
    length,
    onStocksData,
    HandlePost,
  } = props;
  return (
    <>
      {nameCount && nameCount.length > 0 ? (
        <>
          <Flex justify={'space-between'}>
            <Text m={2} fontSize={30} fontWeight={800}>
              メニュー
            </Text>
          </Flex>
          <VStack
            divider={<StackDivider borderColor="gray.200" />}
            spacing={2}
            align="stretch"
          >
            {nameCount.map((c: any) => (
              <Flex ml={2} mr={2} justify="space-between" key={c.menu_id}>
                <Flex
                  alignItems={'center'}
                  width={'100%'}
                  justify="space-between"
                >
                  <Text>{c.name}</Text>
                  <NumberInput
                    onChange={(e) => onChange(e, c.name, c.menu_id)}
                    value={`${c.count}人前`}
                    min={1}
                  >
                    <NumberInputField
                      textAlign={'right'}
                      pr={'30px'}
                      border={'none'}
                      _focus={{ boxShadow: 'none' }}
                      _active={{ borderColor: 'transparent' }}
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper border={'none'} />
                      <NumberDecrementStepper border={'none'} />
                    </NumberInputStepper>
                  </NumberInput>
                </Flex>
              </Flex>
            ))}
            {JSON.stringify(nameCountBase) !== JSON.stringify(nameCount) ? (
              <Box w={'100%'} textAlign={'right'}>
                <MainButton onClick={editFood}>使用食材を再計算</MainButton>{' '}
              </Box>
            ) : (
              <Box w={'100%'} textAlign={'right'}>
                <MainNonButton>使用食材を再計算</MainNonButton>{' '}
              </Box>
            )}
          </VStack>{' '}
          <Text m={2} fontSize={30} fontWeight={700}>
            使用食材
          </Text>
          {useList && (
            <VStack
              divider={<StackDivider borderColor="gray.200" />}
              spacing={2}
              align="stretch"
            >
              {useList.map((u: any) => (
                <Flex ml={2} mr={2} justify="space-between" key={u.id}>
                  <Text>{u.food_name}</Text>
                  <Text>{u.amount}個</Text>
                </Flex>
              ))}{' '}
            </VStack>
          )}
        </>
      ) : (
        <Box mt={'30px'} justifyContent="center" alignItems="center">
          <Text fontSize={25} textAlign="center">
            調理リストが空です
          </Text>
          <Text fontSize={25} textAlign="center">
            メニューを追加してください
          </Text>
        </Box>
      )}
      <form onSubmit={HandleSubmit}>
        {nonStocksData && onStocksData && !!length ? (
          <>
            <Text m={2} fontSize={30} fontWeight={700}>
              不足食材
            </Text>
            <VStack
              divider={<StackDivider borderColor="gray.200" />}
              spacing={2}
              align="stretch"
            >
              {nonStocksData.map((d: any) => (
                <Flex justify="space-between" bg="red.200" key={d.id}>
                  <Text>{d.food_name}</Text>
                  <Flex>
                    <Text color={'red'}>{d.amount}</Text>
                    <Text>個</Text>
                  </Flex>{' '}
                </Flex>
              ))}
              {onStocksData.map((d: any) => (
                <Flex justify="space-between" bg="red.200" key={d.id}>
                  <Text>{d.food_name}</Text>
                  <Flex>
                    <Text color={'red'}>{d.amount}</Text>
                    <Text>個</Text>
                  </Flex>
                </Flex>
              ))}
            </VStack>

            {JSON.stringify(nameCountBase) === JSON.stringify(nameCount) ? (
              <Box w={'100%'} textAlign={'right'}>
                <MainButton type="submit">不足分をカートに追加する</MainButton>
              </Box>
            ) : (
              <Box w={'100%'} textAlign={'right'}>
                <MainNonButton>不足分をカートに追加する</MainNonButton>
              </Box>
            )}
          </>
        ) : (
          <>
            {useList && useList.length > 0 && (
              <>
                {JSON.stringify(nameCountBase) === JSON.stringify(nameCount) ? (
                  <Box w={'100%'} textAlign={'right'}>
                    <MainButton onClick={HandlePost}>調理をする</MainButton>{' '}
                  </Box>
                ) : (
                  <Box w={'100%'} textAlign={'right'}>
                    <MainNonButton>調理をする</MainNonButton>{' '}
                  </Box>
                )}
              </>
            )}
          </>
        )}
      </form>
    </>
  );
});

export default CookingListComponent;
