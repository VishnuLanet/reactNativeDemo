import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, VirtualizedList, Button } from 'react-native';
import axios from 'axios';
import Swipeout from 'react-native-swipeout';

export default class HomeScreen extends React.Component
{
/*    static navigationOptions = {
        title: 'Welcome',
    };*/

    constructor()
    {
        super();
        this.state={
            data: [],
            isLoader: true,
        };

        axios.get('https://api.myjson.com/bins/6hzrm').then((res) => {
            for(i=0;i<10;i++)
                res.data=res.data.concat(res.data);
            this.setState({ data: res.data, isLoader: false })
        });
    }

    updateData=(index, dat)=>{
        let data=this.state.data;
        // data.pop();
        // this.setState({data:data});
        // data.push(dat);
        data[index]=dat;
        this.setState({data:data},() => {
            this.forceUpdate()
        });
    };

    render()
    {
        return(
            <View style={{ flex:1 }}>
                {/*<FlatList
                    data={this.state.data}
                    renderItem={({item, index}) =>
                        <TouchableOpacity
                            style={{ marginLeft: 8, marginRight: 8, borderBottomWidth: 0.3, height: 60, justifyContent: 'center'}}
                            onPress={() => this.props.navigation.navigate("Profile", {index: index, name: item, update: this.updateData})}>
                            <Text style={{ textAlign: 'center' }}>{item.First}</Text>
                        </TouchableOpacity>}
                />
                {
                    this.state.data.map((item, index) => {
                        return (
                            <TouchableOpacity
                                style={{ marginLeft: 8, marginRight: 8, borderBottomWidth: 0.3, height: 60, justifyContent: 'center'}}
                                onPress={() => this.props.navigation.navigate("Profile", {index: index, name: item, update: this.updateData})}>
                                <Text style={{ textAlign: 'center' }}>{item.First}</Text>
                            </TouchableOpacity>

                    )
                    })
                }*/}
                <VirtualizedList
                    data={this.state.data}
                    getItem={(data, index) => {
                                    return data[index];
                                }}
                    getItemCount={(data) => data.length}
                    /*keyExtractor={(item, index) => {
                        return item.First
                    }}*/
                    renderItem={({ item, index }) => {
                        let swipeBtns = [{
                            text: 'Delete',
                            backgroundColor: 'red',
                            underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
                            onPress: () => {
                                let data = this.state.data;
                                data.splice(index, 1);
                                this.setState({data: data});
                            }
                        }];
                        return (
                            <Swipeout right={swipeBtns}
                                      autoClose='true'
                                      backgroundColor= 'transparent'>
                                <TouchableOpacity
                                    style={{ marginLeft: 8, marginRight: 8, height: index%3!=0?60:200, justifyContent: 'center'}}
                                    onPress={() => this.props.navigation.navigate("Profile", {index: index, name: item, update: this.updateData})}>
                                    <Text style={{ textAlign: 'center' }}>{item.First}</Text>
                                </TouchableOpacity>
                                <View style={{ marginLeft: 8, marginRight: 8, borderBottomWidth: 0.3 }} />
                            </Swipeout>
                        )
                    }}
                />
                { this.state.isLoader && <ActivityIndicator size="large" style={{ position: 'absolute', justifyContent: 'center', alignSelf: 'center', height: '100%' }} /> }
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Profile", {name: {First: null, Last: null}, index: this.state.data.length, update: this.updateData})} title="New"></TouchableOpacity>
            </View>
        )
    }
}