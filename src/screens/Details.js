import React from 'react';
import { SafeAreaView, StyleSheet, Text, Dimensions, View } from 'react-native';
import { Card } from 'react-native-elements';
import Image from 'react-native-scalable-image';
import colors from '../styles/colors';

export default class Details extends React.Component {

  static navigationOptions = { headerShown: false };

  render() { 
    const { navigation } = this.props;
    const item = navigation.getParam('item', "NO_ITEM");

    return (
      <SafeAreaView style = {styles.notchContainer}>
        <View style = {styles.container}>
        <Card
          title={item.name}
          image={{ uri: item.img }}>
          <Text style={{marginBottom: 10}}>
            {item.name}
          </Text>
        </Card>

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