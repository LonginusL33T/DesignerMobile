import React, {Component} from 'react'
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet,
    Image,
    Modal,
    Dimensions,
    StatusBar,
    ActivityIndicator,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import ImagePicker from 'react-native-image-crop-picker';
import {uploadFile} from '../services/uploadFile'
import {connect} from 'react-redux';
import DeviceStorage from "../utils/DeviceStorage";
import Consts from "../config/consts";

const images = {
    back: require("../assets/designer/left.png"),
}
@connect(state => ({store: state}))
class UpdateAvatar extends Component {
    constructor(props) {
        super(props);
        const {userInfo} = this.props.store;
        this.state = {
            isModalVisible: false,
            imgType: '',
            imgPath: userInfo.avatar,
            isUpload: false,
        }
        this._onPressMore = this._onPressMore.bind(this);
        this._onPressUpload = this._onPressUpload.bind(this);
        this._openCamera = this._openCamera.bind(this);
        this._openGallery = this._openGallery.bind(this);
    }

    static navigationOptions = ({navigation: {goBack, state}}) => ({
        headerTitle: '更换头像',
        headerLeft: (<View>
            <TouchableOpacity
                style={styles.navBarLeft}
                onPress={() => goBack()}>
                <Image source={images.back}/>
            </TouchableOpacity>
        </View>),
        headerRight: (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {state.params.isUploadShow ?
                    <TouchableOpacity onPress={() => state.params.pressUpload()}>
                        <Text style={styles.headerText}>提交</Text>
                    </TouchableOpacity>: null
                }
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => state.params.pressMore()}>
                    <Icon
                        name="ios-more"
                        style={styles.navBarRight}
                        size={30}/>
                </TouchableOpacity>
            </View>
        ),
        headerTitleStyle: {
            alignSelf: 'center',
            fontSize: 17,
        }
    });

    /**
     * 点击more按钮
     * @private
     */
    _onPressMore() {
        this.setState({
            isModalVisible: true,
        })
    }

    /*
    * 提交成功的回调
    * */
    _callback = () => {
        const {goBack} = this.props.navigation;
        this.setState({
            isUpload: false,
        })
        goBack();
    }

    /**
     * 点击提交按钮
     * @private
     */
    _onPressUpload = () => {
        const {dispatch} = this.props.navigation;
        this.setState({
            isUpload: true,
        });
        DeviceStorage.get(Consts.localStorage.X_TOKEN).then(val => {
            dispatch({
                type: 'userInfo/updateAvatarImage',
                uri: this.state.imgPath,
                imgType: this.state.imgType,
                token: val,
                callback: this._callback
            });
        })
    }

    componentDidMount() {
        let {navigation} = this.props;
        navigation.setParams({
            pressMore: this._onPressMore,
            pressUpload: this._onPressUpload,
            isUploadShow:false
        });
    }

    /*
     * 打开相机
     * */
    _openCamera = () => {
        let {navigation} = this.props;
        console.log("open");
        ImagePicker.openCamera({
            width: 350,
            height: 350,
            cropping: true
        }).then(image => {
            this.setState({
                imgType: image.mime,
                imgPath: image.path,
                isModalVisible: false
            })
            navigation.setParams({
                isUploadShow:true
            });
        }).catch((error) => {
            this.setState({isModalVisible: false});
        });

    }

    /*
     * 打开相册
     * */
    _openGallery = () => {
        const {dispatch} = this.props.navigation;
        let {navigation} = this.props;
        ImagePicker.openPicker({
            width: 350,
            height: 350,
            cropping: true
        }).then(image => {
            this.setState({
                imgType: image.mime,
                imgPath: image.path,
                isModalVisible:false
            })
            navigation.setParams({
                isUploadShow:true
            });
        }).catch((error) => {
            this.setState({isModalVisible: false});
        });

    }

    render() {
        const {goBack} = this.props.navigation;
        const {dispatch} = this.props.navigation;
        return (
            <View>
                <StatusBar translucent={false}
                           backgroundColor='#000'/>
                <Image style={styles.image}
                    source={this.state.imgPath !== 'noresouce' ? {uri: this.state.imgPath} : require('../assets/designer/user.png')}/>
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.isModalVisible}
                    onRequestClose={() => {
                        this.setState({
                            isModalVisible: false,
                        });
                    }}>
                    <TouchableOpacity
                        style={styles.modalRoot}
                        activeOpacity={1}
                        onPress={() => {
                            this.setState({
                                isModalVisible: false,
                            })
                        }}>
                        <TouchableOpacity
                            style={styles.itemContainer}
                            activeOpacity={0.8}
                            onPress={this._openCamera}>
                            <Text style={{color: '#3d3d3d', fontSize: 15,}}>拍照</Text>
                        </TouchableOpacity>
                        <Text style={styles.divider}></Text>
                        <TouchableOpacity
                            style={styles.itemContainer}
                            activeOpacity={0.8}
                            onPress={this._openGallery}>
                            <Text style={{color: '#3d3d3d', fontSize: 15,}}>手机相册选择</Text>
                        </TouchableOpacity>
                        <Text style={styles.divider}></Text>
                        <TouchableOpacity
                            style={styles.itemContainer}
                            activeOpacity={0.8}
                            onPress={() => {this.setState({
                                isModalVisible: false
                            })}}>
                            <Text style={{color: '#d79c37', fontSize: 15,}}>取消</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </Modal>
                <Modal
                    animationType={"none"}
                    transparent={true}
                    visible={this.state.isUpload}
                    onRequestClose={()=>{}}>
                    <View style={styles.indicatorContainer}>
                        <ActivityIndicator
                            size="large"
                            color="#aaaaaa"/>
                    </View>
                </Modal>
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
    navBarRight: {
        color: "#fff",
        height: 30,
        marginRight: 15,
    },
    headerText: {
        color: '#fff',
        fontSize: 17,
        marginRight: 15,
    },
    toolbar: {
        backgroundColor: '#000',
        height: 56,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalRoot: {
        flex: 1,
        backgroundColor: '#00000080',
        justifyContent: 'flex-end',
    },
    itemContainer: {
        height: 55,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    divider: {
        height: 1,
        backgroundColor: '#e1e1e1'
    },
    image: {
        height: Dimensions.get('window').width,
        width: Dimensions.get('window').width,
        marginTop: 56,
    },
    indicatorContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
})

export default UpdateAvatar;