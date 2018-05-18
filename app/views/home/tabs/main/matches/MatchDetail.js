import React, {Component} from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    Button,
    View,
    TouchableOpacity,
    ListView,
    Image,
    WebView,
    StatusBar,
} from 'react-native';
import {connect} from 'react-redux';
import Dropdown from "../designer/Dropdown";
import DeviceStorage from '../../../../../utils/DeviceStorage'
import Icon from 'react-native-vector-icons/Ionicons'
import Consts from '../../../../../config/consts'
import {sendApply} from "../../../../../services/apply";

const images = {
    back: require("../../../../../assets/designer/left.png"),
}
@connect(state => ({store: state}))
class MatchDetail extends Component {
    static navigationOptions = ({navigation}) => ({
        title: '职位详情',
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

    constructor(props){
        super(props);
        this.state={
            isSend: false,
        }
    }

    _sendApply = () => {
        const {params} = this.props.navigation.state;
        this.setState({isSend: true});
        DeviceStorage.get(Consts.localStorage.X_TOKEN).then((val) => {
            sendApply(params.uuid, val, () => {this.setState({isSend: false})});
        })
    }

    render() {
        const {navigate} = this.props.navigation;
        const {params} = this.props.navigation.state;
        return (
            <View style={{flex: 1}}>
                <StatusBar translucent={false}
                           backgroundColor='#000'/>
                <WebView
                    style={{flex: 1}}
                    automaticallyAdjustContentInsets={false}
                    source={{uri: `${Consts.server.TEMPLATE}match-detail.html?uuid=${params.uuid}&hash=${Math.random()}`}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    startInLoadingState={true}/>
                {params.category === 'user' ?
                    <TouchableOpacity
                        style={styles.btnSend}
                        activeOpacity={0.8}
                        disabled={this.state.isSend}
                        onPress={this._sendApply}>
                        <Image source={require('../../../../../assets/designer/icon_send.png')}/>
                        <Text style={styles.textSend}>发送简历</Text>
                    </TouchableOpacity> : null
                }
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
    btnSend: {
        flexDirection: 'row',
        width: 137,
        height: 40,
        backgroundColor: '#d6982e',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
        left: Dimensions.get('window').width/2,
        marginLeft: -68,
        shadowColor: 'rgb(56, 56, 70)',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.5,
        shadowRadius: 4,
    },
    textSend: {
        fontSize: 15,
        color: '#fff',
        marginLeft: 10,
    }
});
export default MatchDetail;

