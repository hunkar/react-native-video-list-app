import renderer, {act} from 'react-test-renderer';
import React from 'react';
import {ErrorCardProps} from '../../src/components/ErrorCard/Types';
import ErrorCard from '../../src/components/ErrorCard/ErrorCard';

test('snapshot equility', async () => {
  const mockProps: ErrorCardProps = {
    title: 'No data!',
  };

  const component = renderer.create(<ErrorCard {...mockProps} />);

  expect(component.toJSON()).toMatchSnapshot();
});

test('renders title correctly, no retry icon.', async () => {
  const mockProps: ErrorCardProps = {
    title: 'No data!',
  };

  const component = renderer.create(<ErrorCard {...mockProps} />);

  const titleComponent = component.root.findByProps({testID: 'title'}).props;

  const retryIconComponent = component.root.findAllByProps({
    testID: 'retryIcon',
  });

  expect(titleComponent.children).toEqual(mockProps.title);
  expect(retryIconComponent.length).toEqual(0);
});

test('renders title correctly, with icon.', async () => {
  const mockProps: ErrorCardProps = {
    title: 'No data!',
    onRetry: jest.fn(),
  };

  const component = renderer.create(<ErrorCard {...mockProps} />);

  const titleComponent = component.root.findByProps({testID: 'title'}).props;

  const retryIconComponent = component.root.findByProps({
    testID: 'retryIcon',
  }).props;

  expect(titleComponent.children).toEqual(mockProps.title);
  expect(retryIconComponent.onPress).toEqual(mockProps.onRetry);
});

test('renders title correctly, with icon.', async () => {
  const mockProps: ErrorCardProps = {
    title: 'No data!',
    onRetry: jest.fn(),
  };

  const component = renderer.create(<ErrorCard {...mockProps} />);

  const retryIconComponent = component.root.findByProps({
    testID: 'retryIcon',
  }).props;

  act(() => {
    retryIconComponent.onPress();
  });

  expect(retryIconComponent.onPress).toBeCalledTimes(1);
});
