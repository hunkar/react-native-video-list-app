/**
 * id: item id
 * name: item name that will be show on the list
 * isSelected: item can be selectable with this prop
 * value: any value for external use.
 */
export type RadioGroupSelectItemProps = {
  id: string;
  name: string;
  isSelected?: boolean;
  value?: string | number | boolean;
};

/**
 * items: array of RadioGroupSelectItemProps items
 * selectedItem: id of selected item
 * onChange: trigger with selected item on change
 */
export type RadioGroupSelectProps = {
  items: RadioGroupSelectItemProps[];
  selectedItem?: string;
  onChange?: (item: RadioGroupSelectItemProps) => void;
};
