import React, {Component} from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Platform,
    ListView,
    Image,
    ImageBackground,
    Modal,
    WebView,
    StatusBar,
} from 'react-native';
import { connect } from 'react-redux';
import Consts from '../../../../config/consts'

var screenWidth = Dimensions.get('window').width;

class We extends Component {
    static navigationOptions = ({navigation: {goBack, state}}) => ({
        header:()=><View style={styles.titleContainer}>
            <StatusBar
                barStyle="default"
            />
            <Text style={styles.titleText}>设计师工作站</Text>
        </View>
    });
    render() {
        return (
            <View style = {{flex: 1}}>
                <WebView
                    style={{flex: 1}}
                    automaticallyAdjustContentInsets={false}
                    source={{uri: `${Consts.server.TEMPLATE}we.html?hash=${Math.random()}`}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    startInLoadingState={true}/>
            </View>
        );
    }
}
// {/*<StatusBar translucent={false}*/}
// {/*backgroundColor='#000'/>*/}
// {/*                <View style={styles.titleContainer}>
//                     <Text style={styles.headerTitle}>设计师工作站</Text>
//                 </View>*/}
const ImageSize = 40;

const styles = StyleSheet.create({
    titleContainer: {
        height:60,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText:{
        width:"100%",
        marginTop:15,
        alignSelf:"center",
        textAlign:"center",
        fontSize:17
    },
    headerTitle: {
        fontSize: 17,
        color: '#fff',
    },
    screen: {
        flex:1,
        backgroundColor: 'green'
    },
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
    },
    statusbar: {
        height: 64,
        width: screenWidth,
        backgroundColor: 'rgba(255,255,255,0.3)',
        justifyContent: 'center',
    },
    statusbartext: {
        marginTop: 44,
        justifyContent: 'center',
        alignSelf: 'center',
        fontSize: 20,
    },
    lineargradienttop:{
        height: 100,
        width: '100%'
    },
    lineargradientbottom:{
        height: 180,
        width: '100%',
        marginTop: 230,
    },
    contenttext: {
        marginTop: 0,
        width: '90%',
        alignSelf: 'center',
        fontSize: 15,
    },
    bottom: {
        backgroundColor: '#FFF',
        width: '100%',
        height: 300,
    }
});

const mapStateToProps = (state) => {
    return {
        store: state
    };
};

export default connect(mapStateToProps)(We);



