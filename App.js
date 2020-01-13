import React from 'react';
import Catalog from './src/screens/Catalog';
import Details from './src/screens/Details';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const MainNavigator = createStackNavigator(
  {
    CatalogScreen: {
      screen: Catalog,
    },
    DetailsScreen: {
      screen: Details,
    }
  },
  {
    initialRouteName: 'CatalogScreen',
  },
);

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}