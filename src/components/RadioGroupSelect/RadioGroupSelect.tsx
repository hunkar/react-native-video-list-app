import React, {useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {Icon, ListItem} from 'react-native-elements';
import {RadioGroupSelectItemProps, RadioGroupSelectProps} from './Types';

/**
 * This component is row item of radio group.
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
  onPress?: (() => void) | undefined;
}) => (
  <ListItem
    testID={`filter_item_${id}`}
    key={id}
    containerStyle={{
      backgroundColor: isSelected ? '#d6d6d6' : 'white',
    }}
    onPress={onPress}
    hasTVPreferredFocus={undefined}
    tvParallaxProperties={undefined}>
    <ListItem.Content style={styles.itemTextContent}>
      <Icon
        testID={`filter_item_icon_${id}`}
        name={isSelected ? 'radio-button-on' : 'radio-button-off'}
        style={styles.itemIcon}
        tvParallaxProperties={undefined}
      />
      <ListItem.Title testID={`filter_item_text_${id}`}>{name}</ListItem.Title>
    </ListItem.Content>
  </ListItem>
);

/**
 * Custom radio group select. You can toggle from row items.
 *
 * @param props RadioGroupSelectProps
 * @returns ReactNode
 */
const RadioGroupSelect = (props: RadioGroupSelectProps) => {
  const {items, onChange} = props;

  const [selected, setSelected] = useState<string>(props.selectedItem || '');

    /**
   * Render row item. Include row click logic for  radio group select component.
   *
   * @param param0 MultiSelectItemProps
   * @returns
   */
  const renderItem = ({item}: {item: RadioGroupSelectItemProps}) => (
    <Item
      onPress={() => {
        if (onChange) {
          onChange(item);
        }
        setSelected(item.id);
      }}
      isSelected={
        item.isSelected || (selected && item.id === selected) || false
      }
      {...item}
    />
  );

  return (
    <FlatList
      style={styles.flatList}
      data={items}
      renderItem={renderItem}
      keyExtractor={(item: RadioGroupSelectItemProps) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  itemTextContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  itemIcon: {
    marginRight: 15,
  },
  flatList: {
    height: '100%',
  },
});

export default RadioGroupSelect;
