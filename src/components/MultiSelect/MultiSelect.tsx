import React from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {Icon, ListItem} from 'react-native-elements';
import {TextElement} from 'react-native-elements/dist/text/Text';
import {MultiSelectItemProps, MultiSelectProps} from './Types';

/**
 * This component is row item of multiselect.
 * Include row item click, style logics.
 *
 * @param param0 properties of item
 * @returns ReactNode
 */
const Item = ({
  id,
  name,
  isSelected,
  onPress,
}: {
  id: string;
  name: string;
  isSelected: boolean;
  onPress: (() => void) | undefined;
}) => (
  <ListItem
    testID={`filter_item_${id}`}
    key={id}
    containerStyle={{
      backgroundColor: isSelected ? '#d6d6d6' : 'white',
      opacity: isSelected ? 0.5 : 1,
    }}
    onPress={onPress}
    hasTVPreferredFocus={undefined}
    tvParallaxProperties={undefined}>
    <ListItem.Content>
      <ListItem.Title testID={`filter_item_text_${id}`}>{name}</ListItem.Title>
    </ListItem.Content>
  </ListItem>
);

/**
 * Custom multiselect. You can select from row items. And show selected on top as a tag view.
 * Tag view has horizontal scroll.
 *
 * @param props MultiSelectProps
 * @returns ReactNode
 */
const MultiSelect = (props: MultiSelectProps) => {
  const {items, onChange, selectedItems = []} = props;

  //Array mapper is using like hash map. We can find item by id easily.
  let arrayMapper: {
    [id: string]: MultiSelectItemProps;
  } = {};

  items.forEach(item => {
    arrayMapper[item.id] = item;
  });

  /**
   * Render row item. Include row click logic for Multiselect component.
   *
   * @param param0 MultiSelectItemProps
   * @returns
   */
  const renderItem = ({item}: {item: MultiSelectItemProps}) => {
    const isSelected: boolean = selectedItems.indexOf(item.id) > -1;

    const itemPressed = () => {
      let resultArray: string[] = [];

      if (isSelected) {
        resultArray = selectedItems.filter(
          (selectedKey: String) => selectedKey !== item.id,
        );
      } else {
        resultArray = selectedItems.concat(item.id);
      }

      if (onChange) {
        onChange(resultArray.map((selected: string) => arrayMapper[selected]));
      }
    };

    return <Item onPress={itemPressed} isSelected={isSelected} {...item} />;
  };

  return (
    <View style={styles.container}>
      {/* Horizontal sliding tag container */}
      <ScrollView
        horizontal
        style={{
          maxHeight: selectedItems.length ? 40 : 0,
          ...styles.scrollView,
        }}>
        {selectedItems.reverse().map((key: string, index: number) => (
          <View
            testID={`tag_${key}`}
            key={`tag_${index}`}
            style={styles.tagItemContainer}>
            <TextElement testID={`tag_text_${key}`}>
              {arrayMapper[key]?.name}
            </TextElement>
            <Icon
              testID={`tag_close_${key}`}
              containerStyle={styles.tagIcon}
              size={20}
              name="close"
              color="#d45555"
              onPress={() => {
                if (onChange) {
                  onChange(
                    selectedItems
                      .filter((selectedKey: String) => selectedKey !== key)
                      .map((selected: string) => arrayMapper[selected]),
                  );
                }
              }}
              tvParallaxProperties={undefined}
            />
          </View>
        ))}
      </ScrollView>

      {/* Filter items list */}
      <FlatList
        style={styles.flatList}
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        initialNumToRender={5}
        maxToRenderPerBatch={10}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    height: 75,
  },
  tagItemContainer: {
    padding: 5,
    borderWidth: 2,
    borderColor: '#d6d6d6',
    borderRadius: 10,
    marginHorizontal: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagIcon: {
    marginLeft: 15,
  },
  flatList: {
    height: '100%',
    marginTop: 15,
  },
});

export default MultiSelect;
