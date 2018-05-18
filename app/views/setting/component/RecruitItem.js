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

export default class RecruitItem extends Component {
    render(){
        const type = this.props.type;
        let recordStatus;
        switch (this.props.status) {
            case 'accept':
                recordStatus = '已匹配';
                break;
            case 'reject':
                recordStatus = '不匹配';
                break;
            case 'verifing':
                recordStatus = '未匹配';
                break;
        }
        return(
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => this.props.onPressItem(this.props.uniqueid)}
                style={[styles.container, this.props.isFirst ? {marginTop: 11}:null]}>
                <View style={styles.topContainer}>
                    <View style={styles.leftContainer}>
                        <View style={styles.circle}></View>
                        <Text style={styles.title}>{this.props.category+'设计师'}</Text>
                        {type === 'company' ?
                            <Text style={styles.date}>{this.props.time}</Text> :
                            <Text style={styles.status}>{`(${recordStatus})`}</Text>}
                    </View>
                    {type === 'user' ?
                        <View style={styles.rightContainer}>
                            <Text style={styles.rightText}>{this.props.time}</Text>
                        </View> : null
                    }
                </View>
                <View style={styles.contentContainer}>
                    <Image source={this.props.avatar === 'noresouce'|| !this.props.avatar ?
                        require('../../../assets/designer/ry_small.png'):{uri: this.props.avatar}} style={styles.avatar}/>
                    <Text numberOfLines={3} style={styles.contentText}>
                        {this.props.jobDetail}
                    </Text>
                </View>
                {type === 'company' ?
                    <TouchableOpacity style={styles.btnDelete}
                                      onPress={() => this.props.onPressDelete(this.props.uniqueid)}>
                        <Image source={require('../../../assets/designer/scicon.png')}/>
                    </TouchableOpacity> : null}
                {type === 'company' ?
                    <TouchableOpacity style={styles.deliverbox}
                                      onPress={() => {this.props.onPressDeliveryBox(this.props.uniqueid)}}>
                        <Text style={{fontSize: 12, color: '#cf6d05'}}>
                            {`查看投递箱 (${this.props.applyCount})`}
                        </Text>
                    </TouchableOpacity> : null}
                <Text style={styles.divider1}></Text>
                <View style={styles.bottomBar}>
                    <Image source={require('../../../assets/designer/icon_tag2.png')}/>
                    <Text style={styles.bottomText}>{this.props.enterPriseNature}</Text>
                    <Text style={styles.divider2}></Text>
                    <Image source={require('../../../assets/designer/icon_adr.png')}/>
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
    circle: {
        width: 6,
        height: 6,
        marginLeft: 9,
        marginRight: 10,
        backgroundColor: '#d6982e',
        borderRadius: 3,
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 18,
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        color: '#292929',
        height: 17,
        includeFontPadding: false,
        textAlignVertical: 'top',
    },
    rightText: {
        fontSize: 12,
        color: '#cf6d05',
        marginRight: 11,
    },
    contentContainer: {
        flexDirection: 'row',
        marginBottom: 22,
    },
    avatar: {
        width: 53,
        height: 53,
        marginRight: 7,
        marginLeft: 26,
        borderRadius: 3,
    },
    contentText: {
        flex: 1,
        fontSize: 12,
        color: '#4d4d4d',
        lineHeight: 22,
        marginRight: 11,
        marginTop: -5,
        includeFontPadding: false,
        textAlignVertical: 'top',
    },
    bottomBar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 13,
        height: 35,
    },
    bottomText: {
        marginLeft: 5,
        color: '#303030',
        fontSize: 11,
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
    date:{
        fontSize: 10,
        color: '#bdbdbd',
        marginLeft: 10,
    },
    btnDelete: {
        width: 40,
        height: 40,
        position: 'absolute',
        top: 3,
        right: 0,
    },
    deliverbox: {
        position: 'absolute',
        top: 7,
        right: 45,
        paddingVertical: 8,
    },
    status: {
        fontSize: 12,
        color: '#cf6d05',
        marginLeft: 6,
    }
})