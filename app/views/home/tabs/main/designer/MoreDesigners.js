import React, {Component} from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    Button,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ListView,
    Image,
    Modal,
    StatusBar,
    ImageBackground,
    FlatList,
    ActivityIndicator,
    Platform,
} from 'react-native';
import {connect} from 'react-redux';
import Dropdown from "./Dropdown";
import Icon from 'react-native-vector-icons/Ionicons'
import DesignerItem from './DesignerItem'
import {NavigationActions} from 'react-navigation'
import DeviceStorage from "../../../../../utils/DeviceStorage";
import Consts from '../../../../../config/consts'
import {getNode} from '../../../../../services/getNode'

const regionDatas = [
    {
        continent: "",
        countries: []
    },
    {
        continent: "欧洲",
        countries: ['英国', '法国', '德国', '意大利', '其他']
    },
    {
        continent: "亚洲",
        countries: ['中国', '新加坡', '日本', '韩国', '其他']
    },
    {
        continent: "美洲",
        countries: ['美国', '阿根廷', '其他']
    },
    {
        continent: "大洋洲",
        countries: ['澳大利亚', '新西兰', '其他']
    },
];

const typeDatas = ['', '自有品牌设计师', '自由设计师', '应届设计师'];
const images = {
    back: require("../../../../../assets/designer/left.png"),
    成衣: require("../../../../../assets/designer/chengyi2.png"),
    珠宝: require("../../../../../assets/designer/zhubao2.png"),
    家居: require("../../../../../assets/designer/jiaju2.png"),
    配饰: require("../../../../../assets/designer/peishi2.png"),
    形象: require("../../../../../assets/designer/xingxiang2.png"),
    箱包: require("../../../../../assets/designer/xiangbao2.png"),
    其他: require("../../../../../assets/designer/qita2.png"),
}
const DEFAULT_PAGE_SIZE = 10;

@connect(state => ({store: state}))
class MoreDesigners extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            choosedContinent: '',
            choosedCountry: '',
            choosedType: '',
            openedContinent: '',
            isRegionModalVisible: false,
            isTypeModalVisible: false,
        }
    }

    componentWillMount() {
        const {dispatch, state} = this.props.navigation;
        dispatch({
            type: 'designerList/refreshList',
            perPage: DEFAULT_PAGE_SIZE,
            designType: state.params.design_type
        });
    }

    /*
    * 将数据处理成列表需要的形式
    * */
    _getListData(array) {
        if (array.length % 2 !== 0)
            array.push({
                studio: '',
                name: '',
                avatar: '',
            });
        let result = [];
        for (var i = 0, len = array.length; i < len; i += 2) {
            result.push(array.slice(i, i + 2));
        }
        return result;
    }

    /*
    * 二级菜单打开的大洲发生变化时调用
    * */
    _onOpenChange = (openedContinent) => {
        this.setState({
            openedContinent: openedContinent,
        });
    }

    _typeMap = (type) => {
        if (type === '自有品牌设计师')
            return 'production';
        else if (type === '自由设计师')
            return 'free';
        else if (type === '应届设计师')
            return 'graduate';
    }

    /*
    * 选中的国家发生变化时调用
    * */
    _onCountryChange = (continent, country) => {
        const {dispatch, state} = this.props.navigation;
        dispatch({
            type: 'designerList/refreshList',
            perPage: DEFAULT_PAGE_SIZE,
            country: country,
            designer: this._typeMap(this.state.choosedType),
            designType: state.params.design_type,
        });
        this.setState({
            choosedContinent: continent,
            choosedCountry: country,
            isRegionModalVisible: false,
        });
    }

    /*
    * 选中的类别发生变化时调用
    * */
    _onTypeChange = (type) => {
        const {dispatch, state} = this.props.navigation;
        dispatch({
            type: 'designerList/refreshList',
            perPage: DEFAULT_PAGE_SIZE,
            designer: this._typeMap(type),
            country: this.state.choosedCountry,
            designType: state.params.design_type,
        });
        this.setState({
            choosedType: type,
            isTypeModalVisible: false,
        });
    }

    /*
    * 控制选择框消失
    * */
    _onTouch = () => {
        this.state.isRegionModalVisible ?
            this.setState({
                isRegionModalVisible: false,
                openedContinent: this.state.choosedContinent,
            }) :
            this.setState({
                isTypeModalVisible: false,
            });
    }

    /*
    * 点击列表item时调用
    * */
    _onPressItem = (id) => {
        const {dispatch} = this.props;
        const {userInfo} = this.props.store;
        if (userInfo.isLogin) {
            getNode(id, (name) => {
                const navigateAction = NavigationActions.navigate({
                    routeName: 'DesignerDetail',
                    params: {
                        id: id,
                        name: name,
                    },
                });
                dispatch(navigateAction);
            });
        }
        else {
            const navigateAction = NavigationActions.navigate({
                routeName: 'Login',
            });
            dispatch(navigateAction);
        }
    }

    /*
    * 返回列表脚布局
    * */
    _renderFooter = () => {
        const {designerList} = this.props.store;
        if (designerList.isHaveData) {
            if (designerList.isLoading) {
                return (
                    <View style={styles.footContainer}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <ActivityIndicator size="small" color="#E7E7E7"/>
                            <Text style={{fontSize: 14, marginLeft: 8}}>数据加载中</Text>
                        </View>
                    </View>
                )
            }
            else {
                return (
                    <View style={styles.footContainer}>
                        <Text style={{fontSize: 14}}>上拉加载</Text>
                    </View>
                )
            }
        }
        else {
            return (
                <View style={styles.footContainer}>
                    {designerList.designers.length > 0 ?
                        <Text style={{fontSize: 14}}>没有更多了</Text> : null}
                </View>
            )
        }
    }

    /*
    * 列表到达底部时调用
    * */
    _onEndReached = () => {
        const {dispatch, state} = this.props.navigation;
        const {designerList} = this.props.store;
        if (!designerList.isLoading && designerList.isHaveData) {
            dispatch({
                type: 'designerList/getList',
                perPage: DEFAULT_PAGE_SIZE,
                designType: state.params.design_type,
                designer: this._typeMap(this.state.choosedType),
                country: this.state.choosedCountry,
            });
        }
    }

    _renderEmptyView() {
        return (
            <View style={{alignItems: 'center'}}>
                <Text style={{fontSize: 14, color: '#838f9f', marginVertical: 10}}>暂无数据</Text>
            </View>
        );
    }

    render() {
        const {goBack, state} = this.props.navigation;
        const designerList = this.props.store.designerList.designers.slice();
        const isRefreshing = this.props.store.designerList.isRefreshing;
        return (
            <View style={{flex: 1}}>
                <StatusBar
                    translucent={true}
                    backgroundColor="transparent"/>
                <ImageBackground
                    resizeMode="stretch"
                    source={images[state.params.design_type]}
                    style={styles.topImage}>
                    <View>
                        <TouchableOpacity
                            activeOpacity={1}
                            style={styles.btnBack}
                            onPress={() => goBack()}>
                            <Image source={images.back}/>
                        </TouchableOpacity>
                        <Text style={styles.title}>{state.params.design_type + '设计师'}</Text>
                        <View style={styles.searchBar}>
                            <TouchableOpacity
                                style={styles.searchItem}
                                activeOpacity={0.6}
                                onPress={() => this.setState((previousState) => {
                                    return {
                                        isRegionModalVisible: !previousState.isRegionModalVisible
                                    };
                                })}>
                                <View style={[styles.searchContainer]}>
                                    <Text style={[styles.searchText, this.state.isRegionModalVisible ?
                                        {color: '#f1a82b'} : {color: '#fff'}]}>{this.state.choosedCountry || '地区'}</Text>
                                    <View style={styles.iconContainer}>
                                        <Image source={this.state.isRegionModalVisible ?
                                            require('../../../../../assets/designer/d1.png') :
                                            require('../../../../../assets/designer/d2.png')
                                        }/>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <Text style={styles.divider}/>
                            <TouchableOpacity
                                style={styles.searchItem}
                                activeOpacity={0.6}
                                onPress={() => this.setState((previousState) => {
                                    return {
                                        isTypeModalVisible: !previousState.isTypeModalVisible
                                    };
                                })}>
                                <View style={styles.searchContainer}>
                                    <Text style={[styles.searchText, this.state.isTypeModalVisible ?
                                        {color: '#f1a82b'} : {color: '#fff'}]}>{this.state.choosedType || '类别'}</Text>
                                    <View style={styles.iconContainer}>
                                        <Image source={this.state.isTypeModalVisible ?
                                            require('../../../../../assets/designer/d1.png') :
                                            require('../../../../../assets/designer/d2.png')
                                        }/>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
                {!isRefreshing ?
                    <FlatList
                        keyExtractor={(item, index) => index}
                        data={this._getListData(designerList)}
                        renderItem={({item, index}) =>
                            <DesignerItem
                                index={index}
                                ids={[item[0].uniqueid, item[1].uniqueid]}
                                names={[item[0].name, item[1].name]}
                                studios={[item[0].studio, item[1].studio]}
                                avatars={[item[0].avatar, item[1].avatar]}
                                onPressItem={this._onPressItem}
                            />
                        }
                        ListEmptyComponent={this._renderEmptyView}
                        ListFooterComponent={this._renderFooter}
                        onEndReached={this._onEndReached}
                        onEndReachedThreshold={0.01}
                    /> :
                    <View style={styles.indicatorContainer}>
                        <ActivityIndicator
                            size="large"
                            color="#aaaaaa"/>
                    </View>}
                <Modal
                    animationType={"none"}
                    transparent={true}
                    visible={this.state.isRegionModalVisible}
                    onRequestClose={() => {
                        this.setState({
                            isRegionModalVisible: false,
                            openedContinent: this.state.choosedContinent,
                        });
                    }}>
                    <TouchableOpacity
                        activeOpacity={1.0}
                        style={{flex: 1}}
                        onPress={this._onTouch}>
                        <View style={styles.dialogContainer}>
                            {regionDatas.map((value, i) =>
                                <Dropdown
                                    key={'item' + i}
                                    type='region'
                                    continent={value.continent}
                                    countries={value.countries}
                                    choosedContinent={this.state.choosedContinent}
                                    choosedCountry={this.state.choosedCountry}
                                    openedContinent={this.state.openedContinent}
                                    onCountryChange={this._onCountryChange}
                                    onOpenChange={this._onOpenChange}/>
                            )}
                        </View>
                    </TouchableOpacity>
                </Modal>
                <Modal
                    animationType={"none"}
                    transparent={true}
                    visible={this.state.isTypeModalVisible}
                    onRequestClose={() => {
                        this.setState({
                            isTypeModalVisible: false,
                        });
                    }}>
                    <TouchableOpacity
                        activeOpacity={1.0}
                        style={{flex: 1}}
                        onPress={this._onTouch}>
                        <View style={styles.dialogContainer}>
                            {typeDatas.map((value, i) =>
                                <Dropdown
                                    key={'item' + i}
                                    type='type'
                                    designerType={value}
                                    choosedType={this.state.choosedType}
                                    onTypeChange={this._onTypeChange}/>)}
                        </View>
                    </TouchableOpacity>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    navBarLeft: {
        color: "#fff",
        width: 30,
        height: 30,
        marginLeft: 15,
        marginRight: 30,
        backgroundColor: 'transparent'
    },
    btnBack: {
        width: 40,
        marginTop: 28,
        marginLeft: 8,
        paddingLeft: 8,
        paddingVertical: 5,
    },
    title: {
        fontSize: 19,
        height: 20,
        color: '#fff',
        width: 150,
        position: 'absolute',
        top: 32,
        left: '50%',
        marginLeft: -75,
        textAlign: 'center',
        backgroundColor: 'transparent',
        includeFontPadding: false,
        textAlignVertical: 'top',
    },
    topImage: {
        width: Dimensions.get('window').width,
    },
    searchBar: {
        width: Dimensions.get('window').width,
        height: 36,
        backgroundColor: 'rgba(93,88,89,0.5)',
        marginTop: 75.5,
        flexDirection: 'row',
    },
    divider: {
        backgroundColor: '#646464',
        width: 1,
        height: 16,
        marginTop: 15,
    },
    searchItem: {
        flex: 1,
        alignItems: 'center',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
    },
    searchText: {
        fontSize: 16,
        marginRight: 16,
    },
    iconContainer: {
        width: 15,
        height: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    indicatorContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    dialogContainer: {
        backgroundColor: '#fff',
        marginTop: Platform.OS === 'android' ? 145 : 166,
        zIndex: Platform.OS === 'android' ? 0 : 1,
        shadowColor: 'rgb(42, 34, 32)',
        shadowOffset: {width: 0, height: -5},
        shadowOpacity: 0.3,
    },
    footContainer: {
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
export default MoreDesigners;

