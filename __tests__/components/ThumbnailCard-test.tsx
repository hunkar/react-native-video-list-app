import renderer, {act} from 'react-test-renderer';
import React from 'react';

import ThumbnailCard from '../../src/components/ThumbnailCard/ThumbnailCard';
import {ThumbnailCardProps} from '../../src/components/ThumbnailCard/Types';

test('snapshot equility', async () => {
  const mockProps: ThumbnailCardProps = {
    id: '1',
    title: 'John',
    subTitle: 'Up',
    imageUrl: 'www.dummy-image.com/image.png',
  };

  const component = renderer.create(<ThumbnailCard {...mockProps} />);

  expect(component.toJSON()).toMatchSnapshot();
});

test('renders areas correctly', async () => {
  const mockProps: ThumbnailCardProps = {
    id: '1',
    title: 'John',
    subTitle: 'Up',
    imageUrl: 'www.dummy-image.com/image.png',
  };

  const component = renderer.create(<ThumbnailCard {...mockProps} />);

  const titleComponent = component.root.findByProps({testID: 'title'}).props;
  const subTitleComponent = component.root.findByProps({
    testID: 'subTitle',
  }).props;
  const imageComponent = component.root.findByProps({testID: 'image'}).props;

  expect(titleComponent.children).toEqual(mockProps.title);
  expect(subTitleComponent.children).toEqual(mockProps.subTitle);
  expect(imageComponent.source.uri).toEqual(mockProps.imageUrl);
});
