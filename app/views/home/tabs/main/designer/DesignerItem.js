import React, {Component} from 'react'
import {
    View,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native'


const defaultImg = require('../../../../../assets/designer/default.jpg');

export default class DesignerItem extends Component {
    render() {
        return (
            <View style={[styles.container, this.props.index === 0 ? {paddingTop: 15} : null]}>
                <TouchableOpacity
                    activeOpacity={1}
                    style={[styles.backImage, {marginRight: 5, marginBottom: 5}]}
                    onPress={() => this.props.onPressItem(this.props.ids[0])}>
                    <ImageBackground
                        source={this.props.avatars[0] === 'noresouce' ? defaultImg : {uri: this.props.avatars[0]}}
                        style={{flex: 1, justifyContent: 'flex-end', width: "100%", height: 220}}>
                        <View style={styles.bottomBar}>
                            <Text style={styles.name}>{this.props.names[0]}</Text>
                            <Text style={styles.company}>{this.props.studios[0]}</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
                {this.props.names[1] !== '' ?
                    <TouchableOpacity
                        activeOpacity={1}
                        style={styles.backImage}
                        onPress={() => this.props.onPressItem(this.props.ids[1])}>
                        <ImageBackground
                            source={this.props.avatars[1] === 'noresouce' ? defaultImg : {uri: this.props.avatars[1]}}
                            style={{flex: 1, justifyContent: 'flex-end', width: "100%", height: 220}}>
                            <View style={styles.bottomBar}>
                                <Text style={styles.name}>{this.props.names[1]}</Text>
                                <Text style={styles.company}>{this.props.studios[1]}</Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity> :
                    <View style={styles.backImage}></View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 14,
        paddingBottom: 5,
    },
    backImage: {
        flex: 1,
        height: 220,
    },
    bottomBar: {
        height: 53,
        backgroundColor: 'rgba(93,88,89,0.5)',
    },
    name: {
        color: '#fff',
        fontSize: 15,
        marginLeft: 11,
        marginTop: 11,
        lineHeight: 17,
        height: 17,
        includeFontPadding: false,
        textAlignVertical: 'bottom',
    },
    company: {
        color: '#fff',
        fontSize: 12,
        marginLeft: 11,
        marginTop: 5,
        lineHeight: 14,
        height: 14,
        includeFontPadding: false,
        textAlignVertical: 'bottom',
    },
});