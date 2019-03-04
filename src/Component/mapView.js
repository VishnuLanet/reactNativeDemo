import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
const {height, width} = Dimensions.get('window');

export default class mapView extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            coords: {
                latitude: 56.67079833333334,
                longitude: -4.03922,
            },
            region: {
                latitude: 56.67079833333334,
                longitude: -4.03922,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }
        }
    }
    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({position});
                console.log("position - ", position);
            },
            (error) => alert(JSON.stringify(error)),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );

        this.watchID = navigator.geolocation.watchPosition((lastPosition) => {
                this.setState({
                    coords: lastPosition.coords,
                })
                console.log(lastPosition.coords.latitude, " ======== ", lastPosition.coords.longitude);
            },
            (error) => alert(JSON.stringify(error)),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});
    }

    render() {
        return (
            <MapView
                region={this.state.region}
                style={styles.container}
                showsCompass={true}
            >
                <Marker
                    coordinate={this.state.coords}
                    title="Hello"
                    description="Done"
                />
                <Marker
                    coordinate={{latitude: 56.6754, longitude: -4.03583}}
                    title="Hello"
                    description="Done"
                />
            </MapView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});