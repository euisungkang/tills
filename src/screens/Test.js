import React from 'react';
import { Text, View, StyleSheet, SafeAreaView, FlatList, ScrollView } from 'react-native';
import { SearchBar } from 'react-native-elements'

export default class Test extends React.Component {
    static navigationOptions = { headerShown: false };

    constructor(props) {
        super(props);

        this.renderHeader = this.renderHeader.bind(this);
    }

    searchFilterFunction = (text) => {
        console.log(text);
    }

    renderHeader = () => {
        //console.log("render");
        return (
            <SearchBar
                placeholder = "Search here"
                onChangeText = {(text) => { this.searchFilterFunction(text)}}
                containerStyle = {{
                    flex: 1,
                    flexDirection: "row",
                }}
            />
        );
    }

    render() {

        let bufferArray = [1, 2, 3];

        return(
            <SafeAreaView style = {{flex: 1}}>
                <View style = {styles.container}>
                    {this.renderHeader()}
                    <FlatList
                        data = {bufferArray}
                        renderItem = {({item}) => <Item item = {item}/>}
                        keyExtractor = {item => item}

                    />
                </View>
            </SafeAreaView>
        );
    }
}

function Item({item}) {
    return (
        <Text>{item}</Text>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        marginBottom: 50,
    }
});