import React, {useState} from 'react';
import {ImageSourcePropType, StyleSheet} from 'react-native';
import {Card, Text} from 'react-native-elements';
import {ThumbnailCardProps} from './Types';

/**
 * Default image url if uploading any video image is failed.
 */
const defaultImageUrl = 'https://static.thenounproject.com/png/2932881-200.png';

/**
 * 
 * Thumbnail card for music items.
 * 
 * @param props ThumbnailCardProps
 * @returns ReactNode
 */
const ThumbnailCard = (props: ThumbnailCardProps) => {
  const {title, subTitle} = props;
  const [imageUrl, setImageUrl] = useState<string>(props.imageUrl);

  return (
    <Card containerStyle={styles.card}>
      <Card.Image
        testID="image"
        style={styles.image}
        onError={() => {
          setImageUrl(defaultImageUrl);
        }}
        source={
          {
            uri: imageUrl,
          } as ImageSourcePropType
        }
      />
      <Card.Title testID="title" style={styles.title}>
        {title}
      </Card.Title>
      <Text testID="subTitle" style={styles.subTitle}>
        {subTitle}
      </Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 5,
    padding: 0,
    paddingBottom: 10,
  },
  image: {padding: 0},
  title: {marginTop: 25, marginBottom: 0},
  subTitle: {
    width: '100%',
    textAlign: 'center',
  },
});

export default ThumbnailCard;
