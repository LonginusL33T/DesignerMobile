import React, {Component} from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Image,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native'
const images={
    background:require("../../assets/designer/reg_back.png")
}
export default class FrameL extends Component {
    render() {
        return (
            <ImageBackground
                resizeMode="stretch"
                source={images.background}
                style={{flex: 1}}>
                <StatusBar
                    translucent={true}
                    backgroundColor="#00000000"/>
                <View>
                    <TouchableOpacity onPress={this.props.back} style={styles.backContainer}>
                    <Image source={require('../../assets/designer/left.png')}
                           style={styles.btnBack}/>
                    </TouchableOpacity>
                    <Text style={styles.title}>{this.props.title}</Text>
                </View>
                <KeyboardAwareScrollView
                    keyboardShouldPersistTaps="always">
                    <View style={styles.content}>
                        {this.props.children}
                        <View style={styles.bottomTextContainer}>
                            <Text style={styles.bottomTextGray}>注册即表示同意</Text>
                            <Text style={styles.bottomTextYellow}>《用户使用条款及服务协议》</Text>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        alignItems: 'center',
    },
    backContainer:{
        marginTop: 22,
        paddingVertical:10,
        paddingLeft: 15,
        width: 48,
    },
    backbtn: {
        width: 10,
    },
    title: {
        fontSize: 18,
        color: '#fff',
        width: 150,
        position: 'absolute',
        top: 30,
        left: '50%',
        marginLeft: -75,
        textAlign: 'center',
        backgroundColor:'transparent'
    },
    bottomTextGray: {
        fontSize: 12,
        color: '#d1d1d1',
        backgroundColor:'transparent'
    },
    bottomTextYellow: {
        fontSize: 12,
        color: '#fed946',
        backgroundColor:'transparent'
    },
    bottomTextContainer: {
        flexDirection: 'row',
        marginTop: 29,
        marginBottom: 20,
        backgroundColor:'transparent'
    }
});