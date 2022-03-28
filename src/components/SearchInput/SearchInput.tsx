import React from 'react';
import {Platform} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {SearchBarBaseProps} from 'react-native-elements/dist/searchbar/SearchBar';
import {SearchInputProps} from './Types';

const SafeSearchBar = SearchBar as unknown as React.FC<SearchBarBaseProps>;

/**
 * Custom serach input. This component can provide delay for changing.
 * This can prevent high change frequency.
 * 
 * @param props SearchInputProps
 * @returns ReactNode
 */
const SearchInput = (props: SearchInputProps) => {
  const {
    placeholder = 'Type Here...',
    onChangeText,
    changeTimeout = 300,
  } = props;

  let changeSetTimeout: ReturnType<typeof setTimeout>;

  /**
   * This custom function provide delay for change event.
   * @param changedText string
   */
  const onChange = (changedText: string) => {
    clearTimeout(changeSetTimeout);

    changeSetTimeout = setTimeout(() => {
      if (onChangeText) {
        onChangeText(changedText);
      }

      clearTimeout(changeSetTimeout);
    }, changeTimeout);
  };

  return (
    <SafeSearchBar
      testID='searchBar'
      placeholder={placeholder}
      onChangeText={onChange}
      platform={Platform.OS === 'android' ? 'android' : 'ios'}
    />
  );
};

export default SearchInput;
