import React, {Component} from 'react'
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet,
    Image,
    Alert,
    StatusBar,
    ActivityIndicator,
    Modal,
} from 'react-native'
import DeviceStorage from '../utils/DeviceStorage'
import {feedback} from "../services/feedback"
import Icon from 'react-native-vector-icons/Ionicons'
import ImagePicker from 'react-native-image-crop-picker';
import {uploadMultiFile} from "../services/uploadMultiFile";
import Consts from "../config/consts";

const images = {
    back: require("../assets/designer/left.png"),
}
class FeedBack extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sugestion: '',
            imageSource: [],
            isUpload: false,
        }
        this._feedback = this._feedback.bind(this);
    }
    static navigationOptions = ({navigation: {goBack, state}}) => ({
        title: '反馈',
        headerLeft: (<View>
            <TouchableOpacity
                style={styles.navBarLeft}
                onPress={() => goBack()}>
                <Image source={images.back}/>
            </TouchableOpacity>
        </View>),
        headerRight: (
            <View>
                <TouchableOpacity
                    onPress={() => state.params.headerRight()}>
                    <Text style={styles.headerRight}>提交</Text>
                </TouchableOpacity>
            </View>
        ),
        headerTitleStyle: {
            alignSelf: 'center',
            fontSize: 17,
        }
    });

    componentDidMount() {
        let {navigation} = this.props;
        navigation.setParams({headerRight: this._feedback});
    }

    /*
    * 打开相册
    * */
    _openGallery = () => {
        ImagePicker.openPicker({
            multiple: true,
            maxFiles: 3,
            compressImageQuality: 0.4,
        }).then(images => {
            this.setState({
                imageSource: images,
            })
        });
    }

    /*
    * 反馈成功的回调
    * */
    _callback = () => {
        const {goBack} = this.props.navigation;
        this.setState({
            isUpload: false,
        })
        goBack();
    }

    _feedback() {
        if (this.state.sugestion && this.state.imageSource.length > 0) {
            this.setState({
                isUpload: true,
            })
            uploadMultiFile(this.state.imageSource, this.state.sugestion, this._callback);
        }
        else if (this.state.sugestion && this.state.imageSource.length == 0) {
            DeviceStorage.get(Consts.localStorage.X_TOKEN).then((val) => {
                this.setState({
                    isUpload: true,
                })
                feedback(this.state.sugestion, val, '', this._callback);
            })
        }
        else {
            Alert.alert('温馨提醒', '反馈内容不能为空');
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar translucent={false}
                           backgroundColor='#000'/>
                <View style={styles.container}>
                    <Text style={styles.text}>问题和意见</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="不超过150字"
                        placeholderTextColor="#ccc"
                        underlineColorAndroid="transparent"
                        multiline={true}
                        maxLength={150}
                        onChangeText={(text) => this.setState({sugestion: text})}/>
                    <Text style={styles.text}>添加图片 (选填)</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        {this.state.imageSource[0] ?
                            <Image
                                resizeMode='contain'
                                style={styles.images}
                                source={{uri: this.state.imageSource[0].path}}/> : null
                        }
                        {this.state.imageSource[1] ?
                            <Image
                                resizeMode='contain'
                                style={styles.images}
                                source={{uri: this.state.imageSource[1].path}}/> : null
                        }
                        {this.state.imageSource[2] ?
                            <Image
                                resizeMode='contain'
                                style={styles.images}
                                source={{uri: this.state.imageSource[2].path}}/> : null
                        }
                        <TouchableOpacity style={styles.addImage}
                                          onPress={this._openGallery}>
                            <Image source={require('../assets/designer/icon_add2.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>
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
    headerText: {
        color: '#fff',
        fontSize: 17,
        alignItems: 'center',
        marginRight: 15,
    },
    toolbar: {
        backgroundColor: '#000',
        height: 56,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    container: {
        paddingTop: 24,
        paddingHorizontal: 24,
    },
    headerRight: {
        color: '#fff',
        fontSize: 17,
        paddingRight: 15,
        paddingTop: 15,
        paddingLeft: 15,
        paddingBottom: 15
    },
    text: {
        fontSize: 14,
        marginBottom: 4,
        color: '#3c3c3c',
    },
    input: {
        color: '#3c3c3c',
        fontSize: 12,
        height: 180,
        borderWidth: 1,
        borderColor: '#d2d2d2',
        borderRadius: 4,
        textAlignVertical: 'top',
        padding: 12,
        marginBottom: 18,
    },
    addImage: {
        height: 75,
        width: 75,
        borderWidth: 1,
        borderColor: '#d2d2d2',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    images: {
        height: 112,
        width: 63,
        marginHorizontal: 8,
    },
    indicatorContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
});

export default FeedBack;