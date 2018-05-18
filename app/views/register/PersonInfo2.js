import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    Alert
} from 'react-native'
import FrameL from './FrameL'
import MyTextInput from './MyTextInput'
import Points from './Points';
import Upload from './Upload'
import DeviceStorage from '../../utils/DeviceStorage'

export default class PersonInfo2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            full12: '',
            full13: '',
            full14: '',
            full15: '',
            full16: '',
            a: '',
            b: '',
            c: '',
        }
    }

    _textInputBlur = () => {
        this.instagramInput._blur();
        this.otherInput._blur();
        this.homePageInput._blur();
        this.schoolInput._blur();
        this.collegeInput._blur();
        this.professionInput._blur();
        this.graduateInput._blur();
    }

    render() {
        const {navigate, goBack} = this.props.navigation;
        return (
            <FrameL title={this.props.title}
                    back={() => {
                        this._textInputBlur();
                        goBack();
                    }}>
                <MyTextInput
                    label="Instagram"
                    placeholder="请填写ID号"
                    ref={(ref) => this.instagramInput = ref}
                    onChangeText={(free_instagram) => {
                        this.setState({a: free_instagram});
                        DeviceStorage.save("free_instagram", free_instagram)
                    }}/>
                <MyTextInput
                    label="其他社交平台"
                    placeholder="例：微博-ID号"
                    ref={(ref) => this.otherInput = ref}
                    onChangeText={(free_other) => {
                        this.setState({b: free_other});
                        DeviceStorage.save("free_other", free_other)
                    }}/>
                <MyTextInput
                    label="个人主页"
                    placeholder="例：请填写网址"
                    ref={(ref) => this.homePageInput = ref}
                    onChangeText={(free_home_page) => {
                        this.setState({c: free_home_page});
                        DeviceStorage.save("free_home_page", free_home_page)
                    }}/>
                <Upload isMust={this.props.must}
                        name="上传作品"
                        tip="3-5张作品"
                        imageupload={this.props.imageupload}/>
                <MyTextInput
                    isMust={true}
                    label="毕业院校"
                    placeholder="请写全称"
                    ref={(ref) => this.schoolInput = ref}
                    onChangeText={(free_school) => {
                        this.setState({full13: free_school});
                        DeviceStorage.save("free_school", free_school)
                    }}/>
                <MyTextInput
                    isMust={true}
                    label="学院/系"
                    ref={(ref) => this.collegeInput = ref}
                    onChangeText={(free_college) => {
                        this.setState({full14: free_college});
                        DeviceStorage.save("free_college", free_college)
                    }}/>
                <MyTextInput
                    isMust={true}
                    label="专业"
                    ref={(ref) => this.professionInput = ref}
                    onChangeText={(free_profession) => {
                        this.setState({full15: free_profession});
                        DeviceStorage.save("free_profession", free_profession)
                    }}/>
                <MyTextInput
                    isMust={true}
                    label="毕业年份"
                    ref={(ref) => this.graduateInput = ref}
                    onChangeText={(free_graduate) => {
                        this.setState({full16: free_graduate});
                        DeviceStorage.save("free_graduate", free_graduate)
                    }}/>
                <Points points={this.props.points} topMargin={46.5}/>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => {
                        this._textInputBlur();
                        let getTokenPromise = Promise.all([DeviceStorage.get(this.props.imageupload)]);
                        getTokenPromise.then(([works]) => {
                            console.log(this.props.imageupload);

                            console.log('第二页下一步点击时输出作品' + typeof(works) + works);

                            if (this.props.isfree) {
                                if (this.state.full13.length === 0 ||
                                    this.state.full14.length === 0 ||
                                    this.state.full15.length === 0 ||
                                    this.state.full16.length === 0 || !works && typeof(works) !== "undefined" && works !== 0 || works === '' || works.length === 0) {

                                    Alert.alert('温馨提醒', '所有“*”项皆为必填，请填写完整提交注册')


                                } else {
                                    if (this.state.a.length === 0) {
                                        DeviceStorage.save("free_instagram", '')
                                    }
                                    if (this.state.b.length === 0) {
                                        DeviceStorage.save("free_other", '')
                                    }
                                    if (this.state.c.length === 0) {
                                        DeviceStorage.save("free_home_page", '')
                                    }
                                    navigate(this.props.to
                                    )
                                }
                            } else {
                                if (this.state.full13.length > 0 &&
                                    this.state.full14.length > 0 &&
                                    this.state.full15.length > 0 &&
                                    this.state.full16.length > 0) {

                                    if (this.state.a.length === 0) {
                                        DeviceStorage.save("free_instagram", '')
                                    }
                                    if (this.state.b.length === 0) {
                                        DeviceStorage.save("free_other", '')
                                    }
                                    if (this.state.c.length === 0) {
                                        DeviceStorage.save("free_home_page", '')
                                    }

                                    if (!works && typeof(works) !== "undefined" && works !== 0 || works === '' || works.length === 0) {
                                        Alert.alert('温馨提醒', '用户必须上传作品才能入驻设计师工作站，可注册成功后再上传');
                                        navigate(this.props.to
                                        )
                                    } else {
                                        navigate(this.props.to
                                        )
                                    }


                                } else {
                                    Alert.alert('温馨提醒', '所有“*”项皆为必填，请填写完整提交注册')
                                }
                            }
                        });
                    }}
                    style={styles.btnNext}>
                    <Text style={styles.btnInnerText}>下一步</Text>
                </TouchableOpacity>
            </FrameL>
        );
    }
}

const styles = StyleSheet.create({
    btnNext: {
        marginTop: 13,
        width: "90%",
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderColor: '#d1a850',
        borderWidth: 1,
    },
    btnInnerText: {
        fontSize: 18,
        color: '#d1a850',
        backgroundColor: "transparent"
    },
});