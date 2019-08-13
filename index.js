/**
 * @format
 */
import React from "react"
import {AppRegistry , YellowBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux'
import store from './src/redux/store'
import Map from './src/components/Map'
const CityApp = ()=>{
    return(
        <Provider store={store}>
            <App/>
        </Provider>
    )
}
console.disableYellowBox = true;
AppRegistry.registerComponent(appName, () => CityApp);
