import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../styles/colors';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, FlatList, TextInput } from 'react-native';
import { SearchBar } from 'react-native-elements';
import firebase from 'react-native-firebase';

export default class Catalog extends React.Component {

  static navigationOptions = { headerShown: false };

  constructor(props) {
    super(props);

    this.renderHeader = this.renderHeader.bind(this);

    this.state = {
      collArray: [],
      loading: false,
      error: null,
    };
  }

  fillArray(bufferArray) {
    this.setState({collArray: bufferArray});
  }

  renderHeader = () => {
    return(
      <SearchBar
        placeholder = "Try 'Xerographica'"
        lightTheme = {true}
        placeholderTextColor = "grey" 
        onChangeText = {(text) => { this.searchFilterFunction(text) }}
        autoCorrect = { false }
        containerStyle = {{
          backgroundColor: colors.white,
          borderBottomColor: colors.white,
          borderTopColor: colors.white,
          flex: 1,
        }}
        inputContainerStyle= {{ backgroundColor: colors.white }}
        inputStyle =  {{ backgroundColor: colors.white }}
        searchIcon = { false }
      />
    );
  }

  arrayHolder = [];

  searchFilterFunction = (text) => {
    console.log(text);
    const newData = this.state.collArray.filter(item => {
      const itemData = item.name.toUpperCase();
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > - 1;
    });

    this.setState({ data: newData });
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

          <View style = {styles.catalog}>
            <FlatList 
              data = {this.state.collArray}
              renderItem = {({ item }) => <Item navigation = {this.props.navigation}
                                                item = {item} />}
              keyExtractor = {item => item.id}
              ListHeaderComponent = {this.renderHeader()}
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
    marginBottom: 50,
  },
  header: {
    fontSize: 32,
    margin: 10
  },
  search: {
    flexDirection: "row",
    backgroundColor: colors.white,
    padding: 20,
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