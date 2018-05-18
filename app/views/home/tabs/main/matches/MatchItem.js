import React, {Component} from 'react'
import {
    View,
    ImageBackground,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    Platform,
} from 'react-native'

export default class MatchItem extends Component {
    _onPress = () => {
        this.props.onPressItem(this.props.uuid);
    };
    render() {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={this._onPress}
                style={[styles.container, this.props.isFirst ? {marginTop: 11}:null]}>
                <View style={{flexDirection: 'row'}}>
                    <Image source={this.props.avatar === 'noresouce' ?
                        require('../../../../../assets/designer/ry_small.png'):{uri: this.props.avatar}} style={styles.avatar}/>
                    <View style={{flex: 1}}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{this.props.category+'设计师'}</Text>
                            <Text style={styles.salary}>{'【 '+this.props.tags+' 】'}</Text>
                        </View>
                        <View style={styles.contentContainer}>
                            <Text style={styles.content} numberOfLines={3}>{this.props.jobDetail}</Text>
                        </View>
                    </View>
                </View>
                <Text style={styles.divider1}></Text>
                <View style={styles.bottomBar}>
                    <Image source={require('../../../../../assets/designer/icon_tag2.png')}/>
                    <Text style={styles.bottomText}>{this.props.enterpriseNature}</Text>
                    <Text style={styles.divider2}></Text>
                    <Image source={require('../../../../../assets/designer/icon_adr.png')}/>
                    <Text style={styles.bottomText}>{this.props.address}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 11,
        marginBottom: 11,
        borderWidth: 0.5,
        borderColor: '#f0e8e3',
        borderRadius: 3,
        backgroundColor: '#fff',
        zIndex: Platform.OS === 'android' ? 0 : 1,
        shadowColor: 'rgb(11, 9, 9)',
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.15,
        shadowRadius: 3,
    },
    avatar: {
        width: 53,
        height: 53,
        marginLeft: 6,
        marginRight: 7,
        marginTop: 16,
        borderRadius: 3,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 17,
    },
    title: {
        fontSize: 16,
        color: '#292929',
        height: 17,
        includeFontPadding: false,
        textAlignVertical: 'top',
    },
    salary: {
        fontSize: 13,
        color: '#cf6d05',
        marginRight: 2,
    },
    contentContainer: {
        marginBottom: 22,
        marginRight: 11,
        marginTop: 13,
    },
    content: {
        fontSize: 12,
        color: '#4d4d4d',
        lineHeight: 22,
        marginTop: -5,
        includeFontPadding: false,
        textAlignVertical: 'top',
    },
    divider1:{
        height: 1,
        backgroundColor: '#e7e7e7',
        marginHorizontal: 6,
    },
    divider2:{
        width: 1,
        height: 18,
        backgroundColor: '#e7e7e7',
        marginHorizontal: 13,
    },
    bottomBar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 13,
    },
    bottomText: {
        marginLeft: 5,
        color: '#303030',
        fontSize: 11,
        marginVertical: 11,
    }
});