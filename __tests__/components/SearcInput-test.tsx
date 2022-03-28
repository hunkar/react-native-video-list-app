import renderer, {act} from 'react-test-renderer';
import React from 'react';
import {SearchInputProps} from '../../src/components/SearchInput/Types';
import SearchInput from '../../src/components/SearchInput/SearchInput';

test('snapshot equility', async () => {
  const mockProps: SearchInputProps = {
    placeholder: 'Search',
    onChangeText: jest.fn(),
    changeTimeout: 500,
  };

  const component = renderer.create(<SearchInput {...mockProps} />);

  expect(component.toJSON()).toMatchSnapshot();
});

test('renders placeholder correct and platform should be ios', async () => {
  const mockProps: SearchInputProps = {
    placeholder: 'Search',
    onChangeText: jest.fn(),
    changeTimeout: 500,
  };

  const component = renderer.create(<SearchInput {...mockProps} />);

  const searchComponent = component.root.findByProps({
    testID: 'searchBar',
  }).props;

  expect(searchComponent.placeholder).toEqual(mockProps.placeholder);
  expect(searchComponent.platform).toEqual('ios');
});

test('onChange of searchbar should be change 3 times, but our onChangeText should be called once', done => {
  const mockProps: SearchInputProps = {
    placeholder: 'Search',
    onChangeText: jest.fn(),
    changeTimeout: 500,
  };

  const component = renderer.create(<SearchInput {...mockProps} />);

  const searchComponent = component.root.findByProps({
    testID: 'searchBar',
  }).props;

  act(() => {
    searchComponent.onChangeText('a');
    searchComponent.onChangeText('ab');
    searchComponent.onChangeText('abc');
  });

  setTimeout(() => {
    expect(mockProps.onChangeText).toBeCalledTimes(1);
    expect(mockProps.onChangeText).toBeCalledWith('abc');
    done();
  }, mockProps.changeTimeout || 0);
});

test('onChange of searchbar should be change 2 times with changeTimeout space, our onChangeText should be called 2 times', done => {
  const mockProps: SearchInputProps = {
    placeholder: 'Search',
    onChangeText: jest.fn(),
    changeTimeout: 200,
  };

  const component = renderer.create(<SearchInput {...mockProps} />);

  const searchComponent = component.root.findByProps({
    testID: 'searchBar',
  }).props;

  act(() => {
    searchComponent.onChangeText('a');
  });

  setTimeout(() => {
    act(() => {
      searchComponent.onChangeText('ab');
    });

    setTimeout(() => {
      expect(mockProps.onChangeText).toBeCalledTimes(2);
      done();
    }, mockProps.changeTimeout || 0);
  }, mockProps.changeTimeout || 0);
});
