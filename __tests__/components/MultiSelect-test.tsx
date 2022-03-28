import renderer, {act} from 'react-test-renderer';
import React from 'react';
import {
  MultiSelectItemProps,
  MultiSelectProps,
} from '../../src/components/MultiSelect/Types';
import MultiSelect from '../../src/components/MultiSelect/MultiSelect';

test('snapshot equility', async () => {
  const firstElement: MultiSelectItemProps = {
    id: '1',
    name: 'First Element',
    value: 1,
  };

  const secondElement: MultiSelectItemProps = {
    id: '2',
    name: 'Second Element',
    value: 1,
  };

  const mockProps: MultiSelectProps = {
    items: [firstElement, secondElement],
    selectedItems: [],
    onChange: jest.fn(),
  };

  const component = renderer.create(<MultiSelect {...mockProps} />);

  expect(component.toJSON()).toMatchSnapshot();
});

test('renders elements', async () => {
  const firstElement: MultiSelectItemProps = {
    id: '1',
    name: 'First Element',
    value: 1,
  };

  const secondElement: MultiSelectItemProps = {
    id: '2',
    name: 'Second Element',
    value: 1,
  };

  const mockProps: MultiSelectProps = {
    items: [firstElement, secondElement],
    selectedItems: [],
    onChange: jest.fn(),
  };

  const component = renderer.create(<MultiSelect {...mockProps} />);

  const firstElementTextComponent = component.root.findByProps({
    testID: 'filter_item_text_1',
  }).props;

  const secondElementTextContainer = component.root.findByProps({
    testID: 'filter_item_text_2',
  }).props;

  expect(firstElementTextComponent.children).toEqual(firstElement.name);
  expect(secondElementTextContainer.children).toEqual(secondElement.name);
});

test('Clicked item should be trigger on change as selected.', async () => {
  const firstElement: MultiSelectItemProps = {
    id: '1',
    name: 'First Element',
    value: 1,
  };

  const secondElement: MultiSelectItemProps = {
    id: '2',
    name: 'Second Element',
    value: 1,
  };

  const mockProps: MultiSelectProps = {
    items: [firstElement, secondElement],
    selectedItems: [],
    onChange: jest.fn(),
  };

  const component = renderer.create(<MultiSelect {...mockProps} />);

  const firstElementComponent = component.root.findByProps({
    testID: 'filter_item_1',
  }).props;

  act(() => {
    firstElementComponent.onPress();
  });

  expect(mockProps.onChange).toBeCalledTimes(1);
  expect(mockProps.onChange).toBeCalledWith([firstElement]);
});

test('Clicked item should be trigger on change as unselected', async () => {
  const firstElement: MultiSelectItemProps = {
    id: '1',
    name: 'First Element',
    value: 1,
  };

  const secondElement: MultiSelectItemProps = {
    id: '2',
    name: 'Second Element',
    value: 1,
  };

  const mockProps: MultiSelectProps = {
    items: [firstElement, secondElement],
    selectedItems: [firstElement.id],
    onChange: jest.fn(),
  };

  const component = renderer.create(<MultiSelect {...mockProps} />);

  const firstElementComponent = component.root.findByProps({
    testID: 'filter_item_1',
  }).props;

  act(() => {
    firstElementComponent.onPress();
  });

  expect(mockProps.onChange).toBeCalledTimes(1);
  expect(mockProps.onChange).toBeCalledWith([]);
});

test('Tag item should be rendered.', async () => {
  const firstElement: MultiSelectItemProps = {
    id: '1',
    name: 'First Element',
    value: 1,
  };

  const secondElement: MultiSelectItemProps = {
    id: '2',
    name: 'Second Element',
    value: 1,
  };

  const mockProps: MultiSelectProps = {
    items: [firstElement, secondElement],
    selectedItems: [firstElement.id],
    onChange: jest.fn(),
  };

  const component = renderer.create(<MultiSelect {...mockProps} />);

  const tagTextElementComponent = component.root.findByProps({
    testID: 'tag_text_1',
  }).props;

  expect(tagTextElementComponent.children).toEqual(firstElement.name);
});

test('Tag item click should be trigger onChange with [].', async () => {
  const firstElement: MultiSelectItemProps = {
    id: '1',
    name: 'First Element',
    value: 1,
  };

  const secondElement: MultiSelectItemProps = {
    id: '2',
    name: 'Second Element',
    value: 1,
  };

  const mockProps: MultiSelectProps = {
    items: [firstElement, secondElement],
    selectedItems: [firstElement.id],
    onChange: jest.fn(),
  };

  const component = renderer.create(<MultiSelect {...mockProps} />);

  const tagCloseIconComponent = component.root.findByProps({
    testID: 'tag_close_1',
  }).props;

  act(() => {
    tagCloseIconComponent.onPress();
  });

  expect(mockProps.onChange).toBeCalledTimes(1);
  expect(mockProps.onChange).toBeCalledWith([]);
});

test('Tag item click should be trigger onChange with [secondElement].', async () => {
  const firstElement: MultiSelectItemProps = {
    id: '1',
    name: 'First Element',
    value: 1,
  };

  const secondElement: MultiSelectItemProps = {
    id: '2',
    name: 'Second Element',
    value: 1,
  };

  const mockProps: MultiSelectProps = {
    items: [firstElement, secondElement],
    selectedItems: [firstElement.id, secondElement.id],
    onChange: jest.fn(),
  };

  const component = renderer.create(<MultiSelect {...mockProps} />);

  const tagCloseIconComponent = component.root.findByProps({
    testID: 'tag_close_1',
  }).props;

  act(() => {
    tagCloseIconComponent.onPress();
  });

  expect(mockProps.onChange).toBeCalledTimes(1);
  expect(mockProps.onChange).toBeCalledWith([secondElement]);
});