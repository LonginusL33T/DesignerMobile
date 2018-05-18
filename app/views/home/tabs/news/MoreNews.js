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
    ActivityIndicator
} from 'react-native'
import NewsItem from './NewsItem'
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import newsList from "../../../../models/newsList";

const images = {
    back: require("../../../../assets/designer/left.png"),
}
const DEFAULT_PAGE_SIZE = 10;

@connect(state => ({store: state}))
class MoreNews extends Component {
    static navigationOptions = ({navigation}) => ({
        title: '活动记录',
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

    componentDidMount() {
        const {dispatch} = this.props.navigation;
        dispatch({type:'newsList/updateHash', hash: Math.random()});
        dispatch({type: 'newsList/refreshList', perPage: DEFAULT_PAGE_SIZE});
    }

    _onPressItem = (id) => {
        const {navigate} = this.props.navigation;
        navigate('NewsDetail', {uuid: id});
    }

    _onRefresh = () => {
        const {dispatch} = this.props.navigation;
        dispatch({type:'newsList/updateHash', hash: Math.random()});
        dispatch({type: 'newsList/refreshList', perPage: DEFAULT_PAGE_SIZE});
    }

    /*
    * 返回列表脚布局
    * */
    _renderFooter = () => {
        const {newsList} = this.props.store;
        if(newsList.isHaveData){
            if(newsList.isLoading){
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
        const {newsList} = this.props.store;
        if (!newsList.isLoading && newsList.isHaveData && !newsList.isRefreshing) {
            dispatch({type: 'newsList/getList', perPage: DEFAULT_PAGE_SIZE});
        }
    }

    render() {
        let isRefreshing = this.props.store.newsList.isRefreshing;
        let newsList = this.props.store.newsList.news;
        return (
            !isRefreshing ?
                <View style={{flex: 1}}>
                    <StatusBar translucent={false}
                               backgroundColor='#000'/>
                    <FlatList
                        style={{flex: 1}}
                        data={newsList}
                        refreshing={false}
                        keyExtractor={(item, index) => index}
                        onRefresh={this._onRefresh}
                        renderItem={({item}) => <NewsItem item={item} hash={this.props.store.newsList.hash} onPressItem={this._onPressItem}/>}
                        ItemSeparatorComponent={() =>
                            <View style={{height: 1, backgroundColor: '#E7E7E7', marginHorizontal: 15}}/>
                        }
                        ListFooterComponent={this._renderFooter}
                        onEndReached={this._onEndReached}
                        onEndReachedThreshold={0.01}
                    />
                </View> :
                <View style={styles.indicatorContainer}>
                    <ActivityIndicator
                        size="large"
                        color="#aaaaaa"/>
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
    indicatorContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    footContainer: {
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: '#E7E7E7',
    },
})
export default MoreNews;