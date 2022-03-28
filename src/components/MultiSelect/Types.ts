/**
 * id: id of item,
 * name: item name that will be shown
 * isSelected: you can set select status of item
 * value: extra value for item. For external use.
 */
export type MultiSelectItemProps = {
  id: string;
  name: string;
  isSelected?: boolean;
  value?: string | number | boolean;
};

/**
 * items: array of MultiSelectItemProps
 * selectedItems: id array of selected items
 * onChange: trigger function with selected items
 */
export type MultiSelectProps = {
  items: MultiSelectItemProps[];
  selectedItems?: string[];
  onChange?: (item: MultiSelectItemProps[]) => void;
};
