import { StackNavigator } from 'react-navigation';
import { HomeScreen, ProfileScreen, Socket_ios, mapView, pusherSocket } from './Component';

const Navigation = StackNavigator({
    // pusherSocket: { screen: pusherSocket },
    // Socket: { screen: Socket_ios },
    // mapView: { screen: mapView },
    Home: { screen: HomeScreen },
    Profile: { screen: ProfileScreen },
},     { navigationOptions: {
        header: null
    }});

export default Navigation