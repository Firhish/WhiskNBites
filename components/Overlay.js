import React from 'react';
import { StyleSheet, View } from 'react-native';

const Overlay = ({ visible }) => {
  if (!visible) {
    return null;
  }

  return <View style={styles.overlay} />;
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    
    //backgroundColor: 'transparent',
    // backgroundColor: 'rgba(0,0,0,0.7)',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

export default Overlay;
