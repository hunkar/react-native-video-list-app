import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {TextElement} from 'react-native-elements/dist/text/Text';
import RBSheet from 'react-native-raw-bottom-sheet';
import {SheetModalProps} from './Types';

type ForwardedFunctionsType = {
  open: () => void;
};

/**
 *
 * SheetModal is helper for RBSheet
 * Title, container or open logics are common for needs.
 *
 * @param props  SheetModalProps
 * @param forwardedRef ForwardRefRenderFunction
 * @returns ReactNode
 */
const SheetModal: React.ForwardRefRenderFunction<
  ForwardedFunctionsType,
  SheetModalProps
> = (props, forwardedRef) => {
  const modalScreenRef = useRef<RBSheet>(null);

  /**
   * Define open function to ref for reaching from parents.
   */
  React.useImperativeHandle(forwardedRef, () => ({
    open() {
      if (
        modalScreenRef &&
        modalScreenRef.current &&
        modalScreenRef.current.open
      ) {
        modalScreenRef.current.open();
      }
    },
  }));

  return (
    <RBSheet ref={modalScreenRef} height={400} openDuration={500}>
      <View style={styles.container}>
        <TextElement testID="modalScreenTitleText" h3 style={styles.title}>
          {props.title}
        </TextElement>
        {props.children}
      </View>
    </RBSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    padding: 15,
  },
});

export default React.forwardRef(SheetModal);
