import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'

export default class Points extends Component {
    render() {
        return(
            <View style={[styles.pointContainer, {marginTop: this.props.topMargin}]}>
                {this.props.points.map(
                    (value, index) =>
                        (value ? <View style={styles.pointChoosed} key={index}/>
                                : <View style={styles.pointNotChoosed} key={index}/>
                    ))}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pointContainer: {
        flexDirection: 'row',
    },
    pointChoosed: {
        width: 6,
        height: 6,
        backgroundColor: '#ffffff',
        borderRadius: 3,
        marginHorizontal: 5,
    },
    pointNotChoosed: {
        width: 6,
        height: 6,
        backgroundColor: '#494949',
        borderRadius: 3,
        marginHorizontal: 5,
    },
});