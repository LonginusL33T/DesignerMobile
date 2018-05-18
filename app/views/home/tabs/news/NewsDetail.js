import React, {Component} from 'react'
import {
    StyleSheet,
    WebView,
    View,
    TouchableOpacity,
    Text,
    StatusBar,
    Image,
} from 'react-native'
import Consts from '../../../../config/consts'
import Icon from 'react-native-vector-icons/Ionicons'

const images = {
    back: require("../../../../assets/designer/left.png"),
}
class NewsDetail extends Component {
    static navigationOptions = ({navigation}) => ({
        title: '正文',
        headerLeft: (<View>
            <TouchableOpacity
                style={styles.navBarLeft}
                onPress={() => navigation.goBack()}>
                <Image source={images.back}/>
            </TouchableOpacity>
        </View>),
        headerTitleStyle: {
            alignSelf: 'center',
            fontSize: 17,
        },
        headerRight: (<View></View>),
    })

    render() {
        const {params} = this.props.navigation.state;
        return (
            <View style={{flex: 1}}>
                <StatusBar translucent={false}
                    backgroundColor='#000'/>
                <WebView
                    style={{flex: 1}}
                    automaticallyAdjustContentInsets={false}
                    source={{uri: `${Consts.server.TEMPLATE}news-detail.html?uuid=${params.uuid}&hash=${Math.random()}`}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    startInLoadingState={true}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    navBarLeft: {
        paddingVertical: 5,
        paddingLeft: 15,
        paddingRight: 30,
    },
})
export default NewsDetail;