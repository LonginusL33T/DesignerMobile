import {
    Platform,
    StatusBar,
} from 'react-native';
import {
    StackNavigator,
} from 'react-navigation';

import appRouteConfigs from './appRouteConfigs';

//const theme = Theme.currentTheme();
//console.log(theme);

/**
 * Top-level navigator. Renders the application UI.
 */
const AppNavigator = StackNavigator({
    ...appRouteConfigs
}, {
    navigationOptions: ({ screenProps: { theme } }) => ({
        headerStyle: {
            backgroundColor: theme.primaryColor,
            borderBottomWidth: 0,
        },
        headerTitleStyle:{
            fontSize: 18,
        },
        headerTintColor: '#fff',
    }),
    cardStyle: {
        backgroundColor: '#f6f9fa',
    }
});

export default AppNavigator;
