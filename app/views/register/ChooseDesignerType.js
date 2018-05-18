import React, {Component} from 'react'
import {
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    StatusBar,
    View,
    Image,
    Text,
    TouchableWithoutFeedback,
    Platform
} from 'react-native'
const images = {
    background: require("../../assets/designer/login_back.png"),
    back: require("../../assets/designer/left.png"),
    arraw: require("../../assets/designer/))).png")
}
export default class ChooseDesignerType extends Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        const {navigate, goBack} = this.props.navigation;
        return (
            <ImageBackground
                resizeMode="stretch"
                source={images.background}
                style={{flex: 1}}>
                <StatusBar
                    translucent={true}
                    backgroundColor="#00000000"
                />
                <View style={{height:44}}>
                    <TouchableOpacity style={styles.backContainer} onPress={() => goBack()}>
                        <Image source={images.back}
                               style={styles.btnBack}/>
                    </TouchableOpacity>
                    <Text style={styles.title}>选择设计师类别</Text>
                </View>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[styles.itemContainer, {marginTop:30}]}
                    onPress={() => navigate('FreeDesignerReg')}>
                    <Text style={styles.typeNameC}>自由设计师</Text>
                    <Text style={styles.typeNameE}>Free Lance Designer</Text>
                    <View style={styles.iconContainer}>
                        <Image source={images.arraw}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[styles.itemContainer, {marginTop: 3}]}
                    onPress={() => navigate('BrandDesignerReg')}>
                    <Text style={styles.typeNameC}>自有品牌设计师</Text>
                    <Text style={styles.typeNameE}>Own Brand Designer</Text>
                    <View style={styles.iconContainer}>
                        <Image source={images.arraw}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[styles.itemContainer, {marginTop: 3}]}
                    onPress={() => navigate('FreshDesignerReg')}>
                    <Text style={styles.typeNameC}>应届设计师</Text>
                    <Text style={styles.typeNameE}>Just Graduate Designer</Text>
                    <View style={styles.iconContainer}>
                        <Image source={images.arraw}/>
                    </View>
                </TouchableOpacity>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        marginLeft: 10,
        marginRight: 10,
        height: 163,
        backgroundColor: 'rgba(93,88,89,0.6)',
        alignItems: 'center',
        zIndex: Platform.OS === 'android' ? 0 : 1,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 5,
    },
    backContainer:{
        marginTop: 22,
        paddingLeft:15,
        paddingVertical:10,
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
        backgroundColor: "transparent",
        textAlign: 'center',
    },
    typeNameC: {
        color: '#ffffff',
        marginTop: 47,
        fontSize: 18,
        height: 18,
        includeFontPadding: false,
        textAlignVertical: 'top',
    },
    typeNameE: {
        color: '#a0a0a0',
        marginTop: 9,
        fontSize: 15,
        height: 18,
        includeFontPadding: false,
        textAlignVertical: 'bottom',
    },
    iconContainer: {
        marginTop: 22,
        width: 40,
        height: 17,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    }
});