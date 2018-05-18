import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Dimensions,
    Image,
} from 'react-native';
const platform = require('Platform');
export default class MyTextInput extends Component {
    _blur = () => {
        this.input.blur();
    };
    render() {
        return (
            <View style={{width: '90%'}}>
                {this.props.isMust ?
                    <Image source={require('../../assets/designer/star.png')} style={platform.OS == 'android'?styles.starAndroid:styles.starIOS}/> : null}
                <View style={styles.itemContainer}>
                    <Text style={styles.label}>
                        {this.props.label}</Text>
                    <TextInput {...this.props}
                               ref={(ref) => this.input = ref}
                               style={styles.textInput}
                               placeholderTextColor="#4d4d4d"
                               underlineColorAndroid="transparent"/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    starIOS: {
        width: 10,
        height:10,
        position:"absolute",
        bottom:15,
        left:-12,
        justifyContent:"center",

    },
    starAndroid: {
        width: 10,
        height:10,
        position:"absolute",
        bottom:16,
        left:-12,
        justifyContent:"center"
    },
    itemContainer: {
        width: "100%",
        height: 54,
        borderBottomWidth: 1,
        borderColor: "#6E6E6E"
    },
    textInput: {
        width: "100%",
        fontSize: 16,
        height:40,
        paddingLeft: "45%",
        paddingRight: 8,
        position: 'absolute',
        bottom: 0,
        textAlign: 'right',
        color: '#d5d5d5',
    },
    label: {
        fontSize: 16,
        color: '#d5d5d5',
        position: 'absolute',
        bottom: 11,
        backgroundColor:"transparent"
    },
});