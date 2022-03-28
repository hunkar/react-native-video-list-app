import renderer, {act} from 'react-test-renderer';
import React from 'react';
import { RadioGroupSelectItemProps, RadioGroupSelectProps } from '../../src/components/RadioGroupSelect/Types';
import RadioGroupSelect from '../../src/components/RadioGroupSelect/RadioGroupSelect';

test('snapshot equility', async () => {
  const firstElement: RadioGroupSelectItemProps = {
    id: '1',
    name: 'First Element',
    value: 1,
  };

  const secondElement: RadioGroupSelectItemProps = {
    id: '2',
    name: 'Second Element',
    value: 1,
  };

  const mockProps: RadioGroupSelectProps = {
    items: [firstElement, secondElement],
    onChange: jest.fn(),
  };

  const component = renderer.create(<RadioGroupSelect {...mockProps} />);

  expect(component.toJSON()).toMatchSnapshot();
});

test('renders elements', async () => {
  const firstElement: RadioGroupSelectItemProps = {
    id: '1',
    name: 'First Element',
    value: 1,
  };

  const secondElement: RadioGroupSelectItemProps = {
    id: '2',
    name: 'Second Element',
    value: 1,
  };

  const mockProps: RadioGroupSelectProps = {
    items: [firstElement, secondElement],
    onChange: jest.fn(),
  };

  const component = renderer.create(<RadioGroupSelect {...mockProps} />);

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
  const firstElement: RadioGroupSelectItemProps = {
    id: '1',
    name: 'First Element',
    value: 1,
  };

  const secondElement: RadioGroupSelectItemProps = {
    id: '2',
    name: 'Second Element',
    value: 1,
  };

  const mockProps: RadioGroupSelectProps = {
    items: [firstElement, secondElement],
    selectedItem: firstElement.id,
    onChange: jest.fn(),
  };

  const component = renderer.create(<RadioGroupSelect {...mockProps} />);

  const firstElementComponent = component.root.findByProps({
    testID: 'filter_item_1',
  }).props;

  act(() => {
    firstElementComponent.onPress();
  });

  expect(mockProps.onChange).toBeCalledTimes(1);
  expect(mockProps.onChange).toBeCalledWith(firstElement);
});

test('Second item should be trigger on change after first', async () => {
  const firstElement: RadioGroupSelectItemProps = {
    id: '1',
    name: 'First Element',
    value: 1,
  };

  const secondElement: RadioGroupSelectItemProps = {
    id: '2',
    name: 'Second Element',
    value: 1,
  };

  const mockProps: RadioGroupSelectProps = {
    items: [firstElement, secondElement],
    selectedItem: firstElement.id,
    onChange: jest.fn(),
  };

  const component = renderer.create(<RadioGroupSelect {...mockProps} />);

  const secondElementComponent = component.root.findByProps({
    testID: 'filter_item_2',
  }).props;

  act(() => {
    secondElementComponent.onPress();
  });

  expect(mockProps.onChange).toBeCalledTimes(1);
  expect(mockProps.onChange).toBeCalledWith(secondElement);
});

test('Selected item should have selected icon.', async () => {
  const firstElement: RadioGroupSelectItemProps = {
    id: '1',
    name: 'First Element',
    value: 1,
  };

  const secondElement: RadioGroupSelectItemProps = {
    id: '2',
    name: 'Second Element',
    value: 1,
  };

  const mockProps: RadioGroupSelectProps = {
    items: [firstElement, secondElement],
    selectedItem: firstElement.id,
    onChange: jest.fn(),
  };

  const component = renderer.create(<RadioGroupSelect {...mockProps} />);

  const iconComponent = component.root.findByProps({
    testID: 'filter_item_icon_1',
  }).props;

  expect(iconComponent.name).toEqual('radio-button-on');
});
