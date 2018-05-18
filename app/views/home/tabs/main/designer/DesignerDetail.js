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
   Alert
} from 'react-native';
import {connect} from 'react-redux';
import Consts from '../../../../../config/consts'
import Icon from 'react-native-vector-icons/Ionicons'
import DeviceStorage from '../../../../../utils/DeviceStorage'

const images = {
    back: require("../../../../../assets/designer/left.png"),
}
@connect(state => ({store: state}))
class DesignerDetail extends Component {
    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.name,
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
    });

  constructor() {
    super();
    this.state = {
      job_uniqueid: '',
      user_uniqueid: '',
      x_token: '',
      userCategory: '',
      companyId: '',
    };
    this._InterviewAppoint = this._InterviewAppoint.bind(this);
  }

  componentDidMount(){
    const {params} = this.props.navigation.state;
    console.log('招聘信息ID' + params.infoId);
    console.log('用户ID' + params.id);
    this.setState({job_uniqueid:params.infoId});
    this.setState({user_uniqueid:params.id});

    let getTokenPromise = Promise.all([DeviceStorage.get("x_token"),
      DeviceStorage.get(Consts.localStorage.USERCATEGORY),
      DeviceStorage.get(Consts.localStorage.UNIQUEID)
    ]);
    getTokenPromise.then(([x_token,
                            userCategory,companyId]) => {
      this.setState({x_token: x_token});
      this.setState({companyId: companyId});
      if (userCategory === 'company'){
        this.setState({userCategory: true});
      } else {
        this.setState({userCategory: false});
      }
    });
  }

  _InterviewAppoint = () => {
    console.log('约面试接口' + JSON.stringify({
      'job_uniqueid': this.state.job_uniqueid,
      'owner_uniqueid': this.state.companyId,
      'user_uniqueid': this.state.user_uniqueid,
      'x_token': this.state.x_token,
    }));
    fetch(`${Consts.server.BACKSTAGE}${Consts.api.INTERVIEWAPPOINT}`, {
      method: 'POST',
      body: JSON.stringify({
        'owner_uniqueid': this.state.companyId,
        'user_uniqueid': this.state.user_uniqueid,
        'x_token': this.state.x_token,
      })
    })
      .then((response) => response.json())
      .then((responseData) => {
          if (responseData.datas.data.error_code === 0){
            Alert.alert('温馨提醒','成功预约面试');
          } else {
              Alert.alert('温馨提醒','抱歉！预约失败');
          }
      })
      .catch((error_code) => {
        //console.log('错误了');
        console.log(error_code);
      });
};

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
            source={{uri: `${Consts.server.TEMPLATE}designer-detail.html?uuid=${params.id}&hash=${Math.random()}`}}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}/>
        {this.state.userCategory ?
          <TouchableOpacity
            style={styles.btnSend}
            activeOpacity={0.8}
            onPress={() => {
              this._InterviewAppoint();
            }}>
              <Image source={require('../../../../../assets/designer/deal.png')}/>
              <Text style={styles.textSend}>约面试</Text>
          </TouchableOpacity> : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    },
    textSend: {
        fontSize: 15,
        color: '#fff',
        marginLeft: 10,
    },
    navBarLeft: {
        paddingVertical: 5,
        paddingLeft: 15,
        paddingRight: 30,
    },
});
export default DesignerDetail;

