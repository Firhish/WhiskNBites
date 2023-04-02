import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

class TabHeader extends Component {
  render() {
    const { title, icon } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        {icon && <Ionicons name={icon} size={28} color="white" style={styles.icon} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: '#DB9B06',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 30,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    color:'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  icon: {
    position:'absolute',
    right: 10
    
  },
});

export default TabHeader;