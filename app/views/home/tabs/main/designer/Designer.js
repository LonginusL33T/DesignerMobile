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
    ScrollView,
    TextInput,
    FlatList,
    ActivityIndicator,
    ImageBackground,
} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation'
import DeviceStorage from "../../../../../utils/DeviceStorage";
import Consts from "../../../../../config/consts";
import {getNode} from '../../../../../services/getNode'
//import {BoxShadow} from 'react-native-shadow'

const defaultDesigner = {
    name: '',
    studio: '',
    image: require('../../../../../assets/designer/ry_small.png'),
};
const top100 = require('../../../../../assets/designer/top100.png');

const data = [{
    type: 'designer_type',
    nameC: '成衣',
    nameE: 'Garment',
    align: 'right',
    background: require('../../../../../assets/designer/chengyi.png'),
}, {
    type: 'designer_type',
    nameC: '珠宝',
    nameE: 'Jewelry',
    align: 'left',
    background: require('../../../../../assets/designer/zhubao.png'),
}, {
    type: 'designer_type',
    nameC: '家居',
    nameE: 'Home',
    align: 'right',
    background: require('../../../../../assets/designer/jiaju.png'),
}, {
    type: 'designer_type',
    nameC: '配饰',
    nameE: 'Accessories',
    align: 'left',
    background: require('../../../../../assets/designer/peishi.png'),
}, {
    type: 'designer_type',
    nameC: '形象',
    nameE: 'Image',
    align: 'right',
    background: require('../../../../../assets/designer/xingxiang.png'),
}, {
    type: 'designer_type',
    nameC: '箱包',
    nameE: 'Luggage&Bags',
    align: 'left',
    background: require('../../../../../assets/designer/xiangbao.png'),
}, {
    type: 'designer_type',
    nameC: '其他',
    nameE: 'Others',
    align: 'right',
    background: require('../../../../../assets/designer/qita.png'),
}, {
    type: 'banner',
}];

@connect(state => ({store: state}))
class Designer extends Component {
    componentDidMount() {
        const {dispatch} = this.props;
        const {userInfo} = this.props.store;
        if(!userInfo.isLogin) {
            DeviceStorage.get(Consts.localStorage.ISLOGIN).then((val) => {
                if (val) {
                    dispatch({type: 'userInfo/updateLoginState', payload: val});
                }
            })
        }
        dispatch({type: 'top100designerList/refreshList'});
    }

    /*
    * 返回top100头像布局
    * */
    _getAvatar(designer, i) {
        return (
            <TouchableOpacity
                activeOpacity={1}
                style={{alignItems: 'center'}} key={'designer' + i}
                onPress={() => this._onPressAvatar(designer, i)}>
                <Image source={designer.avatar === 'noresouce' ? defaultDesigner.image : {uri: designer.avatar}}  style={styles.avatar}/>
                <Text style={styles.designerName}>{designer.name}</Text>
                <Text style={styles.companyName}>{designer.studio}</Text>
            </TouchableOpacity>
        );
    }

    /*
    * 点击top100头像效果
    * */
    _onPressAvatar = (designer, i) => {
        const {dispatch} = this.props;
        const {userInfo} = this.props.store;
        if(userInfo.isLogin){
            getNode(designer.uniqueid, (name) => {
                const navigateAction = NavigationActions.navigate({
                    routeName: 'DesignerDetail',
                    params: {
                        id: designer.uniqueid,
                        name: name,
                    },
                });
                dispatch(navigateAction);
            });
        }
        else{
            const navigateAction = NavigationActions.navigate({
                routeName: 'Login',
            });
            dispatch(navigateAction);
        }
    }

    /*
    * 返回列表item布局
    * */
    _renderItem = ({item, index}) => {
        const {dispatch} = this.props;
        const {userInfo} = this.props.store;
        const navigateAction = NavigationActions.navigate({
            routeName: 'MoreDesigners',
            params: {design_type: item.nameC},
        });
        switch (item.type) {
            case 'designer_type':
                return (
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => {
                            dispatch(navigateAction);
                        }}>
                        <ImageBackground
                            resizeMode="stretch"
                            style={[styles.categoryItem, index === 0 ? {height: 126} : null]}
                            source={item.background}>
                            <View style={[item.align === 'right' ? styles.categoryNameRight : styles.categoryNameLeft,
                                index === 0 ? {top: 38} : null]}>
                                <Text style={styles.categoryNameC}>{item.nameC}</Text>
                                {index === 6 ?
                                    <Text style={[styles.categoryNameE, {marginTop: 5}]}>{item.nameE}</Text> :
                                    <View style={styles.categoryNameEContainer}>
                                        <Text style={styles.categoryNameE}>{item.nameE}</Text>
                                        <Text style={[styles.categoryNameE, {marginLeft: 10}]}>Designer</Text>
                                    </View>
                                }
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                )
                break;
            case 'banner':
                return (
                    <View style={{alignItems: 'center'}}>
                        <View style={styles.dividerContainer}>
                            <Text style={styles.divider}/>
                            <Text style={styles.dividerText}>入驻设计师</Text>
                            <Text style={styles.divider}/>
                        </View>
                        <Image
                            style={styles.banner}
                            source={top100}/>
                    </View>
                )
                break;
            case 'designer':
                let designerList1 = item.designers.slice();
                let isList2Show = designerList1.length > 3;
                for (let i = designerList1.length; i < 6; i++)
                    designerList1.push(defaultDesigner);
                let designerList2 = designerList1.splice(3, 3);
                return (
                    <View style={{alignItems: 'center'}}>
                        <View style={{flexDirection: 'row', marginBottom: 22}}>
                            {designerList1.map((designer, i) => {
                                return (
                                    designer.name ?
                                        this._getAvatar(designer, i) :
                                        <View key={'designer' + i} style={styles.avatar}></View>
                                );
                            })}
                        </View>
                        {isList2Show ?
                            <View style={{flexDirection: 'row', marginBottom: 22}}>
                                {designerList2.map((designer, i) => {
                                    return (
                                        designer.name ?
                                            this._getAvatar(designer, i) :
                                            <View key={'designer' + i} style={styles.avatar}></View>
                                    );
                                })}
                            </View> : null
                        }
                    </View>
                );
                break;
        }
    };

    /*
    * 返回列表脚布局
    * */
    _renderFooter = () => {
        const {top100designerList} = this.props.store;
        if(top100designerList.isHaveData){
            if(top100designerList.isLoadFinish){
                return (
                    <View style={styles.footContainer}>
                        <Text style={{fontSize: 14}}>上拉加载</Text>
                    </View>
                )
            }
            else{
                return (
                    <View style={styles.footContainer}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <ActivityIndicator size="small" color="#d6982e"/>
                            <Text style={{fontSize: 14, marginLeft: 8}}>数据加载中</Text>
                        </View>
                    </View>
                )
            }
        }
        else{
            return (
                <View style={styles.footContainer}>
                    <Text style={{fontSize: 14}}>没有更多了</Text>
                </View>
            )
        }
    }

    /*
    * 列表到达底部时调用
    * */
    _onEndReached = () => {
        const {dispatch} = this.props;
        const {top100designerList, userInfo} = this.props.store;
        if (top100designerList.isLoadFinish && top100designerList.isHaveData) {
            dispatch({type: 'top100designerList/getList'});
        }
    }

    render() {
        const {top100designerList, userInfo} = this.props.store;
        let isRefreshing = top100designerList.isRefreshing;
        let items = data.slice();
        let designerList = top100designerList.designers.slice();
        for (let i = 0; i < top100designerList.pageNum; i++) {
            items.push({
                type: 'designer',
                designers: designerList.splice(0, 6),
            });
        }
        return (
            <View style={{flex: 1}}>
                {isRefreshing ?
                    <View style={styles.indicatorContainer}>
                        <ActivityIndicator
                            size="large"
                            color="#aaaaaa"/>
                    </View> :
                    <FlatList
                        data={items}
                        keyExtractor={(item, index) => index}
                        renderItem={this._renderItem}
                        ListFooterComponent={this._renderFooter}
                        onEndReached={this._onEndReached}
                        onEndReachedThreshold={0.01}
                    />}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    indicatorContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        alignItems: 'center',
    },
    categoryItem: {
        width: Dimensions.get('window').width,
        height: 92,
    },
    categoryNameLeft: {
        position: 'absolute',
        left: 39,
        top: 27,
        alignItems: 'flex-start',
    },
    categoryNameRight: {
        position: 'absolute',
        right: 45,
        top: 27,
        alignItems: 'flex-end',
    },
    categoryNameC: {
        fontSize: 20,
        color: '#373737',
        height: 21,
        textAlignVertical: 'top',
        includeFontPadding: false,
    },
    categoryNameEContainer: {
        flexDirection: 'row',
        marginTop: 5,
    },
    categoryNameE: {
        fontSize: 13,
        height: 13,
        color: '#737373',
        includeFontPadding: false,
        textAlignVertical: 'bottom',
    },
    dividerContainer: {
        flexDirection: 'row',
        marginTop: 35,
        marginBottom: 15,
        alignItems: 'center',
    },
    divider: {
        width: 66,
        height: 1,
        backgroundColor: '#cecece',
    },
    dividerText: {
        fontSize: 14,
        color: '#242424',
        marginHorizontal: 13,
        height: 15,
        textAlignVertical: 'top',
        includeFontPadding: false,
    },
    banner: {
        height: 157.5,
        width: 340,
        marginBottom: 39,
        backgroundColor: '#232323'
    },
    avatar: {
        width: 59,
        height: 59,
        borderRadius: 29.5,
        marginHorizontal: 22.5,
    },
    designerName: {
        fontSize: 13,
        color: '#494949',
    },
    companyName: {
        fontSize: 12,
        color: '#7c7c7c',
    },
    footContainer: {
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default Designer;

