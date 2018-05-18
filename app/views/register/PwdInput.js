import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    Platform,
} from 'react-native'

export default class PwdInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,
        };
    }

    _blur = () => {
        this.input.blur();
    }

    render() {
        return (
            <View>
                <Image source={require('../../assets/designer/star.png')} style={Platform.OS == 'android'?styles.starAndroid:styles.starIOS}/>
                <View style={styles.itemContainer}>
                    <Text style={{position: 'absolute',bottom: 11, fontSize: 14}}/>
                    <TextInput
                        {...this.props}
                        ref={(ref) => this.input = ref}
                        style={styles.textInput}
                        placeholderTextColor="#d5d5d5"
                        underlineColorAndroid="transparent"
                        secureTextEntry={!this.state.showPassword}/>
                    <TouchableOpacity activeOpacity={0.6} style={styles.iconContainer} onPress={
                        () => this.setState((previousState) => {
                            return {showPassword: !previousState.showPassword};
                        })
                    }>
                        <Image source={this.state.showPassword ?
                            require('../../assets/designer/icon_eyes.png') : require('../../assets/designer/eye.png')}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        alignItems: 'center',
        width: "90%",
        height: 54,
        borderBottomWidth: 1,
        borderBottomColor: "#5a5a5a",
        flexDirection: 'row'
    },

    textInput: {
        width: "100%",
        height: 30,
        fontSize: 16,
        paddingTop: 0,
        paddingRight:40,
        paddingLeft: 2,
        marginTop: 30,
        color: '#d5d5d5',
    },
    iconContainer: {
        position: 'absolute',
        alignItems:'center',
        paddingLeft: 14,
        right: 8,
        top:30,
        width: 40,
        height: 40,
    },
    starIOS: {
        width: 10,
        height:10,
        position:"absolute",
        top:34,
        left:-10,
        justifyContent:"center",

    },
    starAndroid: {
        width: 10,
        height:10,
        position:"absolute",
        top:30,
        left:-10,
        justifyContent:"center"
    },
});
