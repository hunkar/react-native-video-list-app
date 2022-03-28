/**
 * placeholder: placeholder for searchBar
 * onChangeText: event for text change
 * changeTimeout: letter input frequency waiting range in ms 
 */
export type SearchInputProps = {
  placeholder?: string;
  onChangeText?: (text: string) => void;
  changeTimeout?: number;
};
