import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-elements';
import {ButtonGroupProps, ButtonProps} from './Types';

/**
 * This component provides group of same type buttons.
 * Developed for decrease workload for same types.
 *
 * @param props ButtonGroupProps
 * @returns ReactNode
 */
const ButtonGroup = (
  props: ButtonGroupProps = {
    containerStyle: {},
    buttons: [],
  },
) => {
  const {containerStyle, buttons} = props;

  return (
    <View
      style={{
        ...styles.containerStyle,
        ...(containerStyle as object),
      }}>
      {buttons.map(
        (
          buttonItem: ButtonProps = {
            title: 'Button',
            icon: {},
            onPress: () => {
              console.log('Set event for button.');
            },
          },
          buttonIndex,
        ) => (
          <Button
            testID={`button_${buttonIndex}`}
            key={`button_${buttonIndex}`}
            title={buttonItem.title}
            icon={buttonItem.icon}
            iconContainerStyle={styles.iconContainerStyle}
            titleStyle={styles.titleStyle}
            buttonStyle={styles.buttonStyle}
            containerStyle={styles.buttonContainerStyle}
            onPress={buttonItem.onPress}
          />
        ),
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainerStyle: {
    flex: 1,
  },
  buttonStyle: {
    backgroundColor: '#d6d6d6',
    borderColor: '#4a4a4a',
    borderWidth: 1,
    borderRadius: 0,
  },
  titleStyle: {
    color: '#4a4a4a',
  },
  iconContainerStyle: {
    marginRight: 10,
  },
});

export default ButtonGroup;
