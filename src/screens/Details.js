import React from 'react';
import { SafeAreaView, StyleSheet, Text, Dimensions, View } from 'react-native';
import Image from 'react-native-scalable-image';
import colors from '../styles/colors';

export default class Details extends React.Component {
  render() { 
    const { navigation } = this.props;
    const item = navigation.getParam('item', "NO_ITEM");

    return (
      <SafeAreaView style = {styles.notchContainer}>
        <View style = {styles.container}>
          <Text style = {styles.header}>{item.name}</Text>
          <Image source = {{ uri: item.img}}
                 width = {Dimensions.get('window').width}
                />
        </View>
      </SafeAreaView>
    );
  };
}

const styles = StyleSheet.create({
  notchContainer: {
    flex: 1,
    backgroundColor: colors.white
  },
  container: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 20,
  },
  header: {
    fontSize: 32,
    margin: 10,
  },
})