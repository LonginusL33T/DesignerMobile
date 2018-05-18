import React, {Component} from 'react'
import {
    StyleSheet,
    TouchableOpacity,
    Image,
    View,
    Text,
} from 'react-native'
import consts from '../../../../config/consts'

class NewsItem extends Component {
    render() {
        return (
            <TouchableOpacity
                style={styles.outitem}
                activeOpacity={1}
                onPress={() => this.props.onPressItem(this.props.item.uuid)}>
                <Image style={styles.itemimage}
                       source={{uri: `${consts.server.MESH}designer/nodes/${this.props.item.uuid}/binary/imge?hash=${this.props.hash}&width=200`}}/>
                <View style={styles.item}>
                    <Text style={styles.title}>{this.props.item.fields.title}</Text>
                    <Text style={styles.content} numberOfLines={3}>{this.props.item.fields.brief}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    outitem: {
        flexDirection: 'row',
        height: 130,
    },
    itemimage: {
        width: 122.5,
        height: 93,
        marginTop: 18,
        marginLeft: 15,
    },
    item: {
        flexDirection: 'column',
        flex: 1,
    },
    title: {
        fontSize: 15,
        color: '#8D6622',
        marginTop: 20,
        paddingLeft: 11,
        paddingRight: 15,
        includeFontPadding: false,
        textAlignVertical: 'top',
    },
    content: {
        marginTop: 18,
        fontSize: 12,
        color: '#585858',
        paddingLeft: 11,
        paddingRight: 15,
        lineHeight: 18,
        includeFontPadding: false,
        textAlignVertical: 'top',
    },
});

export default NewsItem;