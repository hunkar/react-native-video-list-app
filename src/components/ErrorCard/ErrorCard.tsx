import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Icon, Text} from 'react-native-elements';
import {ErrorCardProps} from './Types';

/**
 * This component shows message in error panel.
 * retryIcon is available if onRetry exists. This icon is for retry request or process if needed.
 * 
 * @param props ErrorCardProps
 * @returns ReactNode
 */
const ErrorCard = (props: ErrorCardProps) => (
  <Card containerStyle={styles.errorPanelCard}>
    <View style={styles.errorPanelContainer}>
      <Icon name="warning" color={'#ffa29c'} tvParallaxProperties={undefined} />
      <Text testID="title" style={styles.errorText}>
        {props.title}
      </Text>

      {props.onRetry && (
        <Icon
          testID="retryIcon"
          name="sync"
          color={'#ffa29c'}
          onPress={props.onRetry}
          tvParallaxProperties={undefined}
          containerStyle={styles.retryIconContiner}
        />
      )}
    </View>
  </Card>
);

const styles = StyleSheet.create({
  errorPanelCard: {
    borderColor: '#ffa29c',
    borderWidth: 1,
  },
  errorPanelContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  errorText: {
    color: '#ffa29c',
    marginLeft: 15,
  },
  retryIconContiner: {
    position: 'absolute',
    right: 0,
    borderColor: '#ffebeb',
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
  },
});

export default ErrorCard;
