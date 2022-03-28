// Note: test renderer must be required after react-native.
// import {render} from '@testing-library/react';
import renderer, {act} from 'react-test-renderer';
import React from 'react';
import {
  ButtonGroupProps,
  ButtonProps,
} from '../../src/components/ButtonGroup/Types';
import ButtonGroup from '../../src/components/ButtonGroup/ButtonGroup';

test('snapshot equility', async () => {
  const firtButton: ButtonProps = {
    title: 'Select',
    onPress: jest.fn(),
  };
  const secondButton: ButtonProps = {
    title: 'Cancel',
    onPress: jest.fn(),
  };

  const mockProps: ButtonGroupProps = {
    buttons: [firtButton, secondButton],
  };

  const component = renderer.create(<ButtonGroup {...mockProps} />);

  expect(component.toJSON()).toMatchSnapshot();
});

test('renders title, onPress correctly', async () => {
  const firtButton: ButtonProps = {
    title: 'Select',
    onPress: jest.fn(),
  };
  const secondButton: ButtonProps = {
    title: 'Cancel',
    onPress: jest.fn(),
  };

  const mockProps: ButtonGroupProps = {
    buttons: [firtButton, secondButton],
  };

  const component = renderer.create(<ButtonGroup {...mockProps} />);

  const firstButtonComponent = component.root.findByProps({
    testID: 'button_0',
  }).props;
  const secondButtonComponent = component.root.findByProps({
    testID: 'button_1',
  }).props;

  expect(firstButtonComponent.title).toEqual(mockProps.buttons[0].title);
  expect(firstButtonComponent.onPress).toEqual(mockProps.buttons[0].onPress);

  expect(secondButtonComponent.title).toEqual(mockProps.buttons[1].title);
  expect(secondButtonComponent.onPress).toEqual(mockProps.buttons[1].onPress);
});

test('renders title, onPress correctly', async () => {
  const firtButton: ButtonProps = {
    title: 'Select',
    onPress: jest.fn(),
  };
  const secondButton: ButtonProps = {
    title: 'Cancel',
    onPress: jest.fn(),
  };

  const mockProps: ButtonGroupProps = {
    buttons: [firtButton, secondButton],
  };

  const component = renderer.create(<ButtonGroup {...mockProps} />);

  const firstButtonComponent = component.root.findByProps({
    testID: 'button_0',
  }).props;
  const secondButtonComponent = component.root.findByProps({
    testID: 'button_1',
  }).props;

  expect(firstButtonComponent.title).toEqual(mockProps.buttons[0].title);
  expect(firstButtonComponent.onPress).toEqual(mockProps.buttons[0].onPress);

  expect(secondButtonComponent.title).toEqual(mockProps.buttons[1].title);
  expect(secondButtonComponent.onPress).toEqual(mockProps.buttons[1].onPress);
});

test('call onPress functions correct', async () => {
  const firtButton: ButtonProps = {
    title: 'Select',
    onPress: jest.fn(),
  };
  const secondButton: ButtonProps = {
    title: 'Cancel',
    onPress: jest.fn(),
  };

  const mockProps: ButtonGroupProps = {
    buttons: [firtButton, secondButton],
  };

  const component = renderer.create(<ButtonGroup {...mockProps} />);

  const firstButtonComponent = component.root.findByProps({
    testID: 'button_0',
  }).props;
  const secondButtonComponent = component.root.findByProps({
    testID: 'button_1',
  }).props;

  act(() => {
    firstButtonComponent.onPress();
    secondButtonComponent.onPress();
  });

  expect(firtButton.onPress).toBeCalledTimes(1);
  expect(secondButton.onPress).toBeCalledTimes(1);
});