import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    TextInput,
    Text,
    TouchableOpacity,
    StatusBar,
    Image,
    FlatList,
    Alert,
    ActivityIndicator,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import DesignerItem from '../designer/DesignerItem'
import DeviceStorage from "../../../../../utils/DeviceStorage";
import Consts from "../../../../../config/consts";
import {connect} from 'react-redux';
import {getNode} from "../../../../../services/getNode"
import {NavigationActions} from 'react-navigation'

const DEFAULT_PAGE_SIZE = 10;

@connect(state => ({store: state}))
export default class SearchDesigner extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            searchItems: props.navigation.state.params.searchHistory,
            currentValue: '',
            isDropdownShow: true,
        };
    }

    _renderEmptyView() {
        return (
            <View style={{alignItems: 'center'}}>
                <Text style={{fontSize: 14, color: '#838f9f', marginVertical: 10}}>暂无数据</Text>
            </View>
        );
    }

    _onClickItem = (text) => {
        this._textInput.blur();
        let array = this.state.searchItems.slice();
        let i = array.indexOf(text);
        array.splice(i, 1);
        array.unshift(text);
        this._fetch(text);
        this.setState({
            searchItems: array,
            currentValue: text,
            isDropdownShow: false,
        });
        DeviceStorage.save(Consts.localStorage.SEARCHHISTORY, array);
    }

    _onFocus = () => {
        if (!this.state.isDropdownShow)
            this.setState({
                isDropdownShow: true,
            })
    }

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

    _onSubmitEditing = () => {
        const patt = /\S/g;
        if (this.state.currentValue.length > 0 && patt.test(this.state.currentValue)) {
            let array = this.state.searchItems ? this.state.searchItems.slice() : [];
            let i = array.indexOf(this.state.currentValue);
            if (i >= 0) {
                if (i > 0) {
                    array.splice(i, 1);
                    array.unshift(this.state.currentValue);
                }
            } else {
                array.unshift(this.state.currentValue);
                if (array.length > 4) {
                    array.length = 4;
                }
            }
            this._fetch(this.state.currentValue);
            this.setState({
                isDropdownShow: false,
                searchItems: array
            });
            DeviceStorage.save(Consts.localStorage.SEARCHHISTORY, array);
        }
        else {
            Alert.alert('温馨提醒', '请输入搜索关键字');
        }
    }

    _fetch = (keyword) => {
        const {dispatch} = this.props.navigation;
        dispatch({type: 'designerList/refreshList', perPage: DEFAULT_PAGE_SIZE, query: keyword});
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
        if(designerList.isHaveData){
            if(designerList.isLoading){
                return (
                    <View style={styles.footContainer}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <ActivityIndicator size="small" color="#E7E7E7"/>
                            <Text style={{fontSize: 14, marginLeft: 8}}>数据加载中</Text>
                        </View>
                    </View>
                )
            }
            else{
                return (
                    <View style={styles.footContainer}>
                        <Text style={{fontSize: 14}}>上拉加载</Text>
                    </View>
                )
            }
        }
        else{
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
        const {dispatch} = this.props;
        const {designerList} = this.props.store;
        if (!designerList.isLoading && designerList.isHaveData) {
            dispatch({
                type: 'designerList/getList',
                perPage: DEFAULT_PAGE_SIZE,
                query: this.state.currentValue
            });
        }
    }

    render() {
        const {goBack} = this.props.navigation;
        const designerList = this.props.store.designerList.designers.slice();
        const isRefreshing = this.props.store.designerList.isRefreshing;
        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <View style={{
                    backgroundColor: '#000',
                    paddingTop: 31 - StatusBar.currentHeight,
                    paddingBottom: 5
                }}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            ref={(ref) => this._textInput = ref}
                            style={styles.textInput}
                            placeholder="搜索心仪设计师"
                            placeholderTextColor="#9a9999"
                            underlineColorAndroid="transparent"
                            value={this.state.currentValue}
                            returnKeyType="search"
                            onFocus={this._onFocus}
                            onSubmitEditing={this._onSubmitEditing}
                            onChangeText={(text) => this.setState({currentValue: text})}/>
                        <Image
                            style={styles.iconSearch}
                            source={require('../../../../../assets/designer/939139-200.png')}/>
                        <TouchableOpacity onPress={() => {
                            this.state.isDropdownShow ?
                                goBack() :
                                this.setState({
                                    isDropdownShow: true,
                                    currentValue: '',
                                })
                        }}>
                            <Text style={styles.cancle}>取消</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {this.state.isDropdownShow ?
                    (this.state.searchItems && this.state.searchItems.length > 0 ?
                        <View>
                            <Text style={styles.historyText}>历史搜索</Text>
                            {this.state.searchItems.map(this._getSearchItem)}
                            <View style={{alignItems: 'center'}}>
                                <TouchableOpacity style={styles.clearContainer}
                                                  onPress={() => {
                                                      this.setState({searchItems: []});
                                                      DeviceStorage.save(Consts.localStorage.SEARCHHISTORY, []);
                                                  }}>
                                    <Image source={require('../../../../../assets/designer/del.png')}/>
                                    <Text style={styles.clearText}>清除历史记录</Text>
                                </TouchableOpacity>
                            </View>
                        </View> : <Text style={styles.noHistoryRecord}>无历史纪录</Text>) :
                    (isRefreshing ?
                        <View style={styles.indicatorContainer}>
                            <ActivityIndicator
                                size="large"
                                color="#aaaaaa"/>
                        </View> :
                        <FlatList
                            keyExtractor={(item, index) => index}
                            data={this._getListData(designerList)}
                            ListEmptyComponent={this._renderEmptyView}
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
                            ListFooterComponent={this._renderFooter}
                            onEndReached={this._onEndReached}
                            onEndReachedThreshold={0.01}
                        />)
                }
            </View>
        );
    }

    _getSearchItem = (text, index) => (
        <TouchableOpacity
            onPress={() => this._onClickItem(text)}
            activeOpacity={0.6}
            key={'item' + index}>
            <View style={styles.searchItem}>
                <Text style={styles.searched}>{text}</Text>
                <TouchableOpacity
                    style={styles.cancleIcon}
                    onPress={() => {
                        let temp = this.state.searchItems.slice();
                        temp.splice(temp.indexOf(text), 1);
                        this.setState({
                            searchItems: temp,
                        })
                        DeviceStorage.save(Consts.localStorage.SEARCHHISTORY, temp);
                    }}>
                    <Icon name="ios-close" size={30}></Icon>
                </TouchableOpacity>
            </View>
            <Text style={[styles.divider, {marginBottom: 0}]}></Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    inputContainer: {
        backgroundColor: '#000',
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconSearch: {
        position: 'absolute',
        top: 8,
        left: 20,
    },
    textInput: {
        flex: 1,
        height: 33,
        fontSize: 14,
        color: '#9a9999',
        backgroundColor: '#fff',
        marginLeft: 10,
        paddingVertical: 0,
        paddingLeft: 34,
    },
    cancle: {
        fontSize: 14,
        color: '#fff',
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    historyText: {
        fontSize: 14,
        color: '#646464',
        marginLeft: 14,
        marginTop: 24,
    },
    divider: {
        backgroundColor: '#dcdcdc',
        height: 1,
        marginHorizontal: 10,
        marginBottom: 24,
    },
    searchItem: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 28,
    },
    searched: {
        fontSize: 13,
        color: '#404040',
    },
    clearContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    clearText: {
        fontSize: 14,
        color: '#404040',
        marginLeft: 5,
        paddingVertical: 23,
    },
    noHistoryRecord: {
        fontSize: 14,
        color: '#404040',
        textAlign: 'center',
        marginTop: 20,
    },
    cancleIcon: {
        height: 30,
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: -10,
    },
    indicatorContainer: {
        alignItems: 'center',
        flex: 1,
        paddingTop: 250,
    },
    footContainer: {
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
    },
});