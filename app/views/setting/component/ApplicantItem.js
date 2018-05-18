import React, {Component} from 'react'
import {
    View,
    ImageBackground,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    Alert,
} from 'react-native'

const images = {
    look: require('../../../assets/designer/icon-check.png')
}

export default class ApplicantItem extends Component {
    render(){
        return(
            <TouchableOpacity
                activeOpacity={1}
                style={styles.container}
                onPress={() => {
                    if(this.props.upload === 1){
                        this.props.onPressItem(this.props.uniqueid);
                    }
                    else{
                        Alert.alert('温馨提醒', '该设计师还未上传个人详情');
                    }
                }}>
                <Image style={styles.avatar}
                    source={this.props.avatar === 'noresouce' ?
                    require('../../../assets/designer/ry_small.png'):{uri: this.props.avatar}}/>
                <View style={styles.innerContainer}>
                    <View>
                        <Text style={styles.name}>{this.props.username}</Text>
                        <Text style={styles.date}>{this.props.time}</Text>
                    </View>
                    {/*<View style={styles.btnContainer}>
                        <Image source={images.look}/>
                        <Text style={styles.look}>查看简历</Text>
                    </View>*/}
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: 85,
        alignSelf: 'center',
        borderBottomWidth: 1,
        borderColor: '#e9e9e9',
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-between',
        marginLeft: 10,
        marginTop: 30,
        alignSelf: 'flex-start',
    },
    btnContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        fontSize: 17,
        color: '#292929',
        height: 18,
        includeFontPadding: false,
        textAlignVertical: 'bottom',
    },
    date: {
        fontSize: 12,
        color: '#aeaeae',
        height: 12,
        includeFontPadding: false,
        textAlignVertical: 'bottom',
        marginTop: 10,
    },
    look: {
        fontSize: 12,
        color: '#888',
        marginLeft: 6,
    }
})