import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    Platform,
    Alert
} from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';
import DeviceStorage from '../../utils/DeviceStorage';
import Consts from '../../config/consts';

export default class Upload2 extends Component {

    constructor(props) {
        super();
        this.state = {
            avatarSource: null,
            imagesSource: [],
            image1able: true,
            image2able: true,
            image3able: true,
            image4able: true,
            image5able: true,
        };
        this._imagesPicker = this._imagesPicker.bind(this);
    }

    _imagesPicker() {
        ImagePicker.openPicker({
            multiple: true,
            compressImageQuality: 0.4
        }).then(images => {
            this.setState({
                imagesSource: images,
                image1able: true,
                image2able: true,
                image3able: true,
                image4able: true,
                image5able: true,
            }, () => {
                let imagesSourcefinal = this.state.imagesSource.filter(function (x) {
                    return typeof(x) != 'undefined';
                });

                DeviceStorage.save(this.props.imageupload, imagesSourcefinal);
            });

        }).catch((error_code) => {
            console.log(error_code);
        });
    }

    /*
     _ImageUpload = () => {
     let formData = new FormData();
     if (this.state.imagesSource === null) {
     Alert.alert('温馨提醒', '没有选择图片');
     } else {
     for (let i = 0; i < this.state.imagesSource.length; i++) {
     let uri = this.state.imagesSource[i].path;
     let file = {uri: uri, type: this.state.imagesSource[i].mime, name: '123'};
     formData.append(this.props.imageupload + i, file);
     }
     }

     const REQUEST_URL = `${Consts.api.UPLOADIMAGE}`;
     fetch(REQUEST_URL, {
     method: 'POST',
     headers: {
     'Content-Type': 'multipart/form-data',
     'Accept': 'application/json'
     },
     body: formData,
     }).then((response) => response.json()).then((responseJson) => {
     if (responseJson.code === 'OK') {
     switch (responseJson.files.length) {
     case 1:
     console.log(this.props.imageupload);
     console.log(responseJson.files[0].token);
     DeviceStorage.save(this.props.imageupload, responseJson.files[0].token);
     break;
     case 2:
     DeviceStorage.save(this.props.imageupload, responseJson.files[0].token + ' ,' + responseJson.files[1].token);
     break;
     case 3:
     DeviceStorage.save(this.props.imageupload, responseJson.files[0].token + ' ,' + responseJson.files[1].token + ' ,' + responseJson.files[2].token);
     break;
     case 4:
     DeviceStorage.save(this.props.imageupload, responseJson.files[0].token + ' ,' + responseJson.files[1].token + ' ,' + responseJson.files[2].token + ' ,' + responseJson.files[3].token);
     break;
     case 5:
     DeviceStorage.save(this.props.imageupload, responseJson.files[0].token + ' ,' + responseJson.files[1].token + ' ,' + responseJson.files[2].token + ' ,' + responseJson.files[3].token + ' ,' + responseJson.files[4].token);
     break;
     default:
     break;
     }
     Alert.alert('温馨提醒', '图片已上传成功');
     } else {
     Alert.alert('温馨提醒', responseJson);
     }
     }).catch((error) => {
     Alert.alert('温馨提醒', error);
     });

     };
     */

    Image1Visible = () => {
        this.setState({image1able: false});
        let imagesSource1 = this.state.imagesSource;
        delete imagesSource1[0];
        this.setState({imagesSource: imagesSource1});

        let imagesSourcefinal = this.state.imagesSource.filter(function (x) {
            return typeof(x) != 'undefined';
        });

        DeviceStorage.save(this.props.imageupload, imagesSourcefinal);
    };
    Image2Visible = () => {
        this.setState({image2able: false});
        let imagesSource2 = this.state.imagesSource;
        delete imagesSource2[1];
        this.setState({imagesSource: imagesSource2});

        let imagesSourcefinal = this.state.imagesSource.filter(function (x) {
            return typeof(x) != 'undefined';
        });

        DeviceStorage.save(this.props.imageupload, imagesSourcefinal);
    };
    Image3Visible = () => {
        this.setState({image3able: false});
        let imagesSource3 = this.state.imagesSource;
        delete imagesSource3[2];
        this.setState({imagesSource: imagesSource3});

        let imagesSourcefinal = this.state.imagesSource.filter(function (x) {
            return typeof(x) != 'undefined';
        });

        DeviceStorage.save(this.props.imageupload, imagesSourcefinal);
    };
    Image4Visible = () => {
        this.setState({image4able: false});
        let imagesSource4 = this.state.imagesSource;
        delete imagesSource4[3];
        this.setState({imagesSource: imagesSource4});

        let imagesSourcefinal = this.state.imagesSource.filter(function (x) {
            return typeof(x) != 'undefined';
        });

        DeviceStorage.save(this.props.imageupload, imagesSourcefinal);
    };
    Image5Visible = () => {
        this.setState({image5able: false});
        let imagesSource5 = this.state.imagesSource;
        delete imagesSource5[4];
        this.setState({imagesSource: imagesSource5});

        let imagesSourcefinal = this.state.imagesSource.filter(function (x) {
            return typeof(x) != 'undefined';
        });

        DeviceStorage.save(this.props.imageupload, imagesSourcefinal);
    };


    render() {
        if (this.state.imagesSource.length === 0) {
            return (
                <View style={styles.container}>
                    {this.props.isMust ?
                        <Image source={require('../../assets/designer/star.png')} style={Platform.OS === 'android' ? styles.starAndroid : styles.starIOS}/> : null}
                    <TouchableOpacity activeOpacity={0.6}
                                      style={styles.itemContainer}
                                      onPress={this._imagesPicker}>

                        <Text style={styles.text}>{this.props.name}</Text>
                        <Image source={require('../../assets/designer/icon_up.png')} style={styles.iconRight}/>
                        <Text style={styles.tip}>{this.props.tip}</Text>
                    </TouchableOpacity>
                </View>
            );
        } else if (this.state.imagesSource.length === 1) {
            return (
                <View style={styles.container}>{this.props.isMust ?
                    <Image source={require('../../assets/designer/star.png')} style={Platform.OS === 'android' ? styles.starAndroid : styles.starIOS}/> : null}
                    <TouchableOpacity activeOpacity={0.6}
                                      style={styles.itemContainer}
                                      onPress={this._imagesPicker}>

                        <Text style={styles.text}>{this.props.name}</Text>


                        {this.state.image1able ?
                            <View style={styles.image1}>
                                <TouchableOpacity
                                    onPress={this.Image1Visible}>
                                    <Image source={{uri: this.state.imagesSource[0].path}} style={styles.inpic}/>
                                    <Image source={require('../../assets/designer/X.png')} style={styles.deletepic}/>
                                </TouchableOpacity>
                            </View> : null}


                        <Image source={require('../../assets/designer/icon_up.png')} style={styles.iconRight}/>

                    </TouchableOpacity>
                </View>
            );
        }
        else if (this.state.imagesSource.length === 2) {
            return (
                <View style={styles.container}>
                    {this.props.isMust ?
                        <Image source={require('../../assets/designer/star.png')} style={Platform.OS === 'android' ? styles.starAndroid : styles.starIOS}/> : null}
                    <TouchableOpacity activeOpacity={0.6}
                                      style={styles.itemContainer}
                                      onPress={this._imagesPicker}>
                        <Text style={styles.text}>{this.props.name}</Text>

                        {this.state.image1able ?
                            <View style={styles.image1}>
                                <TouchableOpacity
                                    onPress={this.Image1Visible}>
                                    <Image source={{uri: this.state.imagesSource[0].path}} style={styles.inpic}/>
                                    <Image source={require('../../assets/designer/X.png')} style={styles.deletepic}/>
                                </TouchableOpacity>
                            </View> : null}

                        {this.state.image2able ?
                            <View style={styles.image2}>
                                <TouchableOpacity
                                    onPress={this.Image2Visible}>
                                    <Image source={{uri: this.state.imagesSource[1].path}} style={styles.inpic}/>
                                    <Image source={require('../../assets/designer/X.png')} style={styles.deletepic}/>
                                </TouchableOpacity>
                            </View> : null}

                        <Image source={require('../../assets/designer/icon_up.png')} style={styles.iconRight}/>

                    </TouchableOpacity>
                </View>
            );
        }
        else if (this.state.imagesSource.length === 3) {
            return (
                <View style={styles.container}>
                    {this.props.isMust ?
                        <Image source={require('../../assets/designer/star.png')} style={Platform.OS === 'android' ? styles.starAndroid : styles.starIOS}/> : null}
                    <TouchableOpacity activeOpacity={0.6}
                                      style={styles.itemContainer}
                                      onPress={this._imagesPicker}>

                        <Text style={styles.text}>{this.props.name}</Text>

                        {this.state.image1able ?
                            <View style={styles.image1}>
                                <TouchableOpacity
                                    onPress={this.Image1Visible}>
                                    <Image source={{uri: this.state.imagesSource[0].path}} style={styles.inpic}/>
                                    <Image source={require('../../assets/designer/X.png')} style={styles.deletepic}/>
                                </TouchableOpacity>
                            </View> : null}

                        {this.state.image2able ?
                            <View style={styles.image2}>
                                <TouchableOpacity
                                    onPress={this.Image2Visible}>
                                    <Image source={{uri: this.state.imagesSource[1].path}} style={styles.inpic}/>
                                    <Image source={require('../../assets/designer/X.png')} style={styles.deletepic}/>
                                </TouchableOpacity>
                            </View> : null}

                        {this.state.image3able ?
                            <View style={styles.image3}>
                                <TouchableOpacity
                                    onPress={this.Image3Visible}>
                                    <Image source={{uri: this.state.imagesSource[2].path}} style={styles.inpic}/>
                                    <Image source={require('../../assets/designer/X.png')} style={styles.deletepic}/>
                                </TouchableOpacity>
                            </View> : null}

                        <Image source={require('../../assets/designer/icon_up.png')} style={styles.iconRight}/>

                    </TouchableOpacity>
                </View>
            );
        }
        else if (this.state.imagesSource.length === 4) {
            return (
                <View style={styles.container}>
                    {this.props.isMust ?
                        <Image source={require('../../assets/designer/star.png')} style={Platform.OS === 'android' ? styles.starAndroid : styles.starIOS}/> : null}
                    <TouchableOpacity activeOpacity={0.6}
                                      style={styles.itemContainer}
                                      onPress={this._imagesPicker}>

                        <Text style={styles.text}>{this.props.name}</Text>

                        {this.state.image1able ?
                            <View style={styles.image1}>
                                <TouchableOpacity
                                    onPress={this.Image1Visible}>
                                    <Image source={{uri: this.state.imagesSource[0].path}} style={styles.inpic}/>
                                    <Image source={require('../../assets/designer/X.png')} style={styles.deletepic}/>
                                </TouchableOpacity>
                            </View> : null}

                        {this.state.image2able ?
                            <View style={styles.image2}>
                                <TouchableOpacity
                                    onPress={this.Image2Visible}>
                                    <Image source={{uri: this.state.imagesSource[1].path}} style={styles.inpic}/>
                                    <Image source={require('../../assets/designer/X.png')} style={styles.deletepic}/>
                                </TouchableOpacity>
                            </View> : null}

                        {this.state.image3able ?
                            <View style={styles.image3}>
                                <TouchableOpacity
                                    onPress={this.Image3Visible}>
                                    <Image source={{uri: this.state.imagesSource[2].path}} style={styles.inpic}/>
                                    <Image source={require('../../assets/designer/X.png')} style={styles.deletepic}/>
                                </TouchableOpacity>
                            </View> : null}

                        {this.state.image4able ?
                            <View style={styles.image4}>
                                <TouchableOpacity
                                    onPress={this.Image4Visible}>
                                    <Image source={{uri: this.state.imagesSource[3].path}} style={styles.inpic}/>
                                    <Image source={require('../../assets/designer/X.png')} style={styles.deletepic}/>
                                </TouchableOpacity>
                            </View> : null}

                        <Image source={require('../../assets/designer/icon_up.png')} style={styles.iconRight}/>

                    </TouchableOpacity>
                </View>
            );
        }
        else if (this.state.imagesSource.length === 5) {
            return (
                <View style={styles.container}>
                    {this.props.isMust ?
                        <Image source={require('../../assets/designer/star.png')} style={Platform.OS === 'android' ? styles.starAndroid : styles.starIOS}/> : null}
                    <TouchableOpacity activeOpacity={0.6}
                                      style={styles.itemContainer}
                                      onPress={this._imagesPicker}>

                        <Text style={styles.text}>{this.props.name}</Text>

                        {this.state.image1able ?
                            <View style={styles.image1}>
                                <TouchableOpacity
                                    onPress={this.Image1Visible}>
                                    <Image source={{uri: this.state.imagesSource[0].path}} style={styles.inpic}/>
                                    <Image source={require('../../assets/designer/X.png')} style={styles.deletepic}/>
                                </TouchableOpacity>
                            </View> : null}

                        {this.state.image2able ?
                            <View style={styles.image2}>
                                <TouchableOpacity
                                    onPress={this.Image2Visible}>
                                    <Image source={{uri: this.state.imagesSource[1].path}} style={styles.inpic}/>
                                    <Image source={require('../../assets/designer/X.png')} style={styles.deletepic}/>
                                </TouchableOpacity>
                            </View> : null}

                        {this.state.image3able ?
                            <View style={styles.image3}>
                                <TouchableOpacity
                                    onPress={this.Image3Visible}>
                                    <Image source={{uri: this.state.imagesSource[2].path}} style={styles.inpic}/>
                                    <Image source={require('../../assets/designer/X.png')} style={styles.deletepic}/>
                                </TouchableOpacity>
                            </View> : null}

                        {this.state.image4able ?
                            <View style={styles.image4}>
                                <TouchableOpacity
                                    onPress={this.Image4Visible}>
                                    <Image source={{uri: this.state.imagesSource[3].path}} style={styles.inpic}/>
                                    <Image source={require('../../assets/designer/X.png')} style={styles.deletepic}/>
                                </TouchableOpacity>
                            </View> : null}

                        {this.state.image5able ?
                            <View style={styles.image5}>
                                <TouchableOpacity
                                    onPress={this.Image5Visible}>
                                    <Image source={{uri: this.state.imagesSource[4].path}} style={styles.inpic}/>
                                    <Image source={require('../../assets/designer/X.png')} style={styles.deletepic}/>
                                </TouchableOpacity>
                            </View> : null}

                        <Image source={require('../../assets/designer/icon_up.png')} style={styles.iconRight}/>

                    </TouchableOpacity>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%"
    },
    star: {
        width: 10,
        height: 10,
    },
    starIOS: {
        width: 10,
        height:10,
        position:"absolute",
        bottom:15,
        left:8,
        justifyContent:"center",
    },
    starAndroid: {
        width: 10,
        height:10,
        position:"absolute",
        bottom:12,
        left:8,
        justifyContent:"center",
    },
    itemContainer: {
        alignItems: 'center',
        width: "90%",
        height: 54,
        alignSelf: 'center',
        borderBottomWidth: 1,
        borderBottomColor: "#5a5a5a",
        flexDirection: 'row'
    },
    text: {
        fontSize: 16,
        color: '#d5d5d5',
        backgroundColor: "transparent",
        position: "absolute",
        top: 27,
    },
    iconRight: {
        position: 'absolute',
        right: 8,
        top: 26,
        height: 19,
        width: 19,
    },
    tip: {
        fontSize: 16,
        color: '#4d4d4d',
        position: 'absolute',
        right: 36,
        backgroundColor: "transparent",
        top: 27,
    },
    line: {
        height: 1,
        width: 345,
        backgroundColor: '#5a5a5a',
        marginTop: 0,
        alignSelf: 'center',
    },
    image1: {
        width: 36,
        height: 31,
        marginLeft: 120,
        top: 17,
        position: 'absolute',
    },
    image2: {
        width: 36,
        height: 31,
        marginLeft: 152,
        top: 17,
        position: 'absolute',
    },
    image3: {
        width: 36,
        height: 31,
        marginLeft: 184,
        top: 17,
        position: 'absolute',
    },
    image4: {
        width: 36,
        height: 31,
        marginLeft: 216,
        top: 17,
        position: 'absolute',
    },
    image5: {
        width: 36,
        height: 31,
        marginLeft: 248,
        top: 17,
        position: 'absolute',
    },
    inpic: {
        width: 30,
        height: 25,
        marginTop: 6,
        marginLeft: 0,
    },
    deletepic: {
        width: 13,
        height: 13,
        position: 'absolute',
        marginTop:0,
        marginLeft: 23}
});