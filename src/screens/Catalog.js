import React from 'react';
import colors from '../styles/colors';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, FlatList, Animated } from 'react-native';
import { SearchBar } from 'react-native-elements';
import firebase from 'react-native-firebase';

export default class Catalog extends React.Component {

  static navigationOptions = { headerShown: false };

  constructor(props) {
    super(props);

    //Initialize array with data from firestore database
    let bufferArray;
    firebase.firestore().collection('tillandsias').get()
                        .then((querySnapshot) => {
                          bufferArray = querySnapshot.docs.map(doc => doc.data());
                        })
                        .then(() => {
                          this.setState({ searchArray: bufferArray, tillArray: bufferArray });
                        })
                        .catch(e => console.log(e));

    this.state = {
      tillArray: [],
      searchArray: [],
      search: '',
      searchLayover: false,
      searchOpacity: new Animated.Value(0),
    };
  }
   
  //Will animate the search bar transition from home -> search
  animateSearchBar = () => {
    console.log("Animated");
    Animated.timing(this.state.searchOpacity, {
      duration: 200,
      toValue: 1,
      userNativeDriver: true,
    }).start()
  }

  //Function to filter the flat list of tillandsias.
  searchFilterFunction = (text) => {
    const newData = this.state.tillArray.filter(item => {
      const itemName = item.name.toUpperCase();
      const itemSynonym = item.synonym.toUpperCase();
      const textData = text.toUpperCase();

      return (itemName.indexOf(textData) > -1) || (itemSynonym.indexOf(textData) > -1);
    });

    this.setState({ searchArray: newData, search: text });
  }

  //Function to display either home or actual search
  displayScreenOrCatalog = () => {
    if (this.state.searchLayover == true) {
      return(
        <View style = {styles.catalog}>
          <SearchBar 
            autoFocus
            placeholder = "Try 'Xerographica'"
            placeholderTextColor = "grey" 
            value = { this.state.search }
            onChangeText = {(text) => { this.searchFilterFunction( text ) }}
            autoCorrect = { false }
            containerStyle = { styles.searchBar }
            inputContainerStyle= {{ backgroundColor: colors.white }}
            inputStyle =  {{ backgroundColor: colors.white }}
          />
          <FlatList
            data = {this.state.searchArray}
            renderItem = {({ item }) => <Item navigation = {this.props.navigation}
                                              item = {item} />}
            keyExtractor = {item => item.key}
          />
        </View>
      );
    } else {
      return (
        <View style = { styles.catalog }>
          <TouchableOpacity onPress = {this.displayCatalog}>
            <View>
            <SearchBar
              placeholder = "Try 'Xerographica'"
              placeholderTextColor = "grey" 
              containerStyle = { styles.searchBar }
              inputContainerStyle= {{ backgroundColor: colors.white }}
              inputStyle =  {{ backgroundColor: colors.white }}
            />
          </View>
        </TouchableOpacity>
        </View>
      );
    }
  }

  //Helper function to display search catalog
  displayCatalog = () => {
    this.setState({
      searchLayover: true
    })
  }

  render() {
    return (
      <SafeAreaView style = {styles.notchContainer}>
        <View style = {styles.container}>
            {this.displayScreenOrCatalog()}
        </View>
      </SafeAreaView>
    );  
  }
}

//Item definition, represents an individual tillandsia in the flat list
function Item({item, navigation}) {
  return (
    <TouchableOpacity onPress = {() => navigation.navigate('DetailsScreen', {item: item})}>
      <View style = {styles.item}>
        {/* <Card
          title={item.name}
          image={{ uri: item.img }}>
          <Text style={{marginBottom: 10}}>
            {item.name}
          </Text>
        </Card> */}
        <Text style = {styles.itemTitle}>{item.name}</Text>
        <Text style = {styles.itemSubTitle}>{item.synonym}</Text>
      </View>
    </TouchableOpacity>
  );
}

//Start of CSS
const styles = StyleSheet.create({
  notchContainer: {
    flex: 1,
    backgroundColor: colors.white
  },
  container: {
    alignItems: 'center',
    backgroundColor: colors.white,
    flex: 1,
    marginBottom: 50,
  },
  header: {
    fontSize: 32,
    margin: 10
  },
  searchBar: {
    backgroundColor: colors.white,
    borderBottomColor: colors.white,
    borderTopColor: colors.white,
    width: "100%",
    padding: 20,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "#9DB17C",
    shadowOpacity: 0.2
  },
  searchLayoverTextButton: {
    backgroundColor: colors.white,
    borderBottomColor: colors.white,
    borderTopColor: colors.white,
    width: "100%",
    padding: 20,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "#9DB17C",
    shadowOpacity: 0.2
  },
  catalog: {
    width: "100%",
    justifyContent: 'center',
  },
  item: {
    color: colors.black,
    alignItems: 'center',
    marginVertical: 20
  },
  itemTitle: {
    fontSize: 32
  },
  itemSynonym: {
    fontSize: 20
  },
});