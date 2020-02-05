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

    console.log(item);

    return (
      <SafeAreaView style = {styles.notchContainer}>
        <View style = {styles.container}>

          <Text style = {styles.header}>{item.name}</Text>
          <Image source = {{ uri: item.img}}
                 width = {Dimensions.get('window').width}
                 style = {styles.image}
                />

          <View style = {styles.body}>
            <Text style = {styles.generalDetails}>
              Description: {item.description} {'\n'}
              Synonym: {item.synonym} {'\n'}
              Nickname: {item.nickname} {'\n'}
              Origin: {item.origin} {'\n'}
            </Text>

            <Text style = {styles.plantDetails}>
              Leaf Length: {item.leafLength} cm {'\n'}
              Leaf Width: {item.leafWidth} cm {'\n'}
              Plant Height: {item.plantHeight} cm {'\n'}
              Scape: {item.scape} cm {'\n'}
            </Text>

            <Text style = {styles.flowerDetails}>
              Bracts: {item.bracts} mm {'\n'}
              Capsules: {item.capsules} mm {'\n'}
              Peduncle: {item.peduncle} mm {'\n'}
              Sepals: {item.sepals} mm {'\n'}
            </Text>
          </View>

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
    
  },
  body: {
    marginHorizontal: 20
  },
  image: {
  },
  header: {
    alignSelf: "center",
    fontSize: 32,
    margin: 10,
  },
  flowerDetails: {

  },
  plantDetails: {

  },
})