import { StackNavigator } from 'react-navigation';
import React, { Component } from 'react';
import {
    Image,
    Alert,
} from 'react-native';

import HeaderButtons from 'react-navigation-header-buttons';

import RootPage from './pages/RootPage/index';
import MinePage from './pages/Mine/index';
import AboutPage from './pages/About/index';
import ArtCatalogPage from './pages/ArtCatalog/index';
import ArtListPage from './pages/ArtListPage/index';


const StackRoutes = StackNavigator({
    Root: {
        screen: RootPage,
    },
    About: {
        screen: AboutPage,
    },
    ArtCatalog:{
        screen: ArtCatalogPage,
    },
    ArtListPage: {
        screen: ArtListPage,
    }
},
    {
        initialRouteName: 'Root',

        /* The global header config is now here */
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#222222',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
    });

export default StackNavigator(
    {
        Main: {
            screen: StackRoutes,
        },
        Mine: {
            screen: MinePage,
        },
    },
    {
        mode: 'modal',
        headerMode: 'none',
    }
);