import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import SocketIOClient from 'socket.io-client';

export default class Socket_ios extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            receive: '',
            send: '',
        };

        this.socket = SocketIOClient('ws://localhost:3000', { jsonp: false });
        this.socket.on('native', (receive) => this.setState({receive}));
    }

    render()
    {
        return(
            <View style={{ top: 20 }}>
                <Text>{ this.state.receive }</Text>
                <TextInput onChangeText={(send) => this.setState({send})}></TextInput>
                <Button onPress={() => this.socket.emit('native', this.state.send)} title="send" />
            </View>);
    }
}