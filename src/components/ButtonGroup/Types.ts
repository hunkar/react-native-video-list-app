import {IconNode} from 'react-native-elements/dist/icons/Icon';
import {StyleProp, ViewStyle} from 'react-native';

//TODO Other styles can be customized. Can be added in the future.
/**
 * title: text of button
 * icon: icon of button
 * onPress: press event of button
 */
export type ButtonProps = {
  title: string;
  icon?: IconNode;
  onPress?: (() => void) | undefined;
};

/**
 * containerStyle: Styles for group container
 * buttons: array of ButtonProps
 */
export type ButtonGroupProps = {
  containerStyle?: StyleProp<ViewStyle>;
  buttons: ButtonProps[];
};
