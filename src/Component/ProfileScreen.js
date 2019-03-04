import React, {Component} from 'react';
import { View, Text, TextInput, Alert, StyleSheet } from 'react-native';
import NavigationBar from 'react-native-navbar';

export default class ProfileScreen extends Component
{
    static navigationOptions = {
        header: null,
    };

    constructor(props)
    {
        super(props);
        this.state={
            first: this.props.navigation.state.params.name.First,
            last: this.props.navigation.state.params.name.Last
        };
        titleConfig = {
            title: this.state.first || "New",
        };
    }

    render()
    {
        const rightButtonConfig = {
            title: this.props.navigation.state.params.name.First?'Update':'Save',
            handler: () => {
                this.state.first && this.state.last
                    ?
                Alert.alert(
                    this.props.navigation.state.params.name.First?'Update':'Save',
                    this.props.navigation.state.params.name.First?'Are You want to Update':'Are You want to Save',
                    [
                        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                        {text: 'OK', onPress: () => {
                                this.props.navigation.state.params.update(this.props.navigation.state.params.index,
                                    {
                                        First: this.state.first,
                                        Last: this.state.last
                                    });
                                this.props.navigation.goBack();
                            }
                        }
                    ],
                    { cancelable: false }
                )
                    :
                this.props.navigation.goBack()

            }
        };

        const leftButtonConfig = {
            title: 'Back',
            handler: () => {
                this.props.navigation.goBack();
            }
        };

        return(
            <View>
                <NavigationBar
                    title={titleConfig}
                    rightButton={rightButtonConfig}
                    leftButton={leftButtonConfig}
                />
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={{ fontWeight: 'bold' }}>First Name : </Text>
                    </View>
                    <TextInput style={style.textInput}
                               onChangeText={(first)=> this.setState({first})}
                               placeholder="Enter First Name"
                    >{this.state.first}</TextInput>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={{ fontWeight: 'bold' }}>Last Name : </Text>
                    </View>
                    <TextInput style={style.textInput}
                               onChangeText={(last)=> this.setState({last})}
                               placeholder="Enter Last Name"
                    >{this.state.last}</TextInput>
                </View>
            </View>
        );
    }
}

const style=StyleSheet.create({
    textInput: {
        height: 40,
        width: '100%'
    }
});