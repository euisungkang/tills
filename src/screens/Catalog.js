import React from 'react';
// import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../styles/colors';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, FlatList, TextInput } from 'react-native';
import firebase from 'react-native-firebase';

export default class Catalog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collArray: [],
    };
  }

  fillArray(bufferArray) {
    this.setState({collArray: bufferArray});
  }

  render() {  
    
    let bufferArray;
    firebase.firestore().collection('tillandsias').get()
                        .then((querySnapshot) => {
                          bufferArray = querySnapshot.docs.map(doc => doc.data());
                        })
                        .then(() => {
                          this.fillArray(bufferArray);
                        })
                        .catch(e => console.log(e));

    return (
      <SafeAreaView style = {styles.notchContainer}>
        <View style = {styles.container}>
          <Text style = {styles.header}>Tills</Text>

          <View style = {styles.search}>
            {/* <Icon name = "ios-search" style = {styles.searchIcon} /> */}
            <TextInput placeholder = "Try 'Xerographica'"
                        placeholderTextColor = "grey" 
                        style = {styles.searchInput} />
          </View>

          <View style = {styles.catalog}>
            <Text>Tillandsia Catalog</Text>

            <FlatList 
              data = {this.state.collArray}
              renderItem = {({ item }) => <Item navigation = {this.props.navigation}
                                                item = {item} />}
              keyExtractor = {item => item.id}
              removeClippedSubviews= {false} 
            />
          </View>
        </View>
      </SafeAreaView>
    );  
  }
}

function Item({item, navigation}) {
  return (
    <TouchableOpacity onPress = {() => navigation.navigate('DetailsScreen', {item: item})}>
      <View style = {styles.item}>
        <Text style = {styles.itemTitle}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
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
    margin: 10
  },
  searchIcon: {
    marginRight: 15,
    fontSize: 40
  },
  searchInput: {
    fontWeight: "700",
    flex: 1
  },
  search: {
    flexDirection: "row",
    backgroundColor: colors.white,
    padding: 10,
    marginBottom: 30,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "black",
    shadowOpacity: 0.2
  },
  catalog: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    color: colors.black,
    marginVertical: 20
  },
  itemTitle: {
    fontSize: 32
  },
});