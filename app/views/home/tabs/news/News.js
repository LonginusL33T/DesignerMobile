import React, {Component} from 'react'
import {
    Dimensions,
    StyleSheet,
    View,
    TouchableWithoutFeedback,
    ScrollView,
    Animated,
    FlatList,
    Text,
    Image,
    ActivityIndicator,
    StatusBar,
} from 'react-native'
import {connect} from 'react-redux'
import newsList from "../../../../models/newsList";
import NewsItem from'./NewsItem'
import DeviceStorage from '../../../../utils/DeviceStorage'
import {getListBySchema} from "../../../../services/getListBySchema";
import Consts from'../../../../config/consts'
import {getAdvert} from "../../../../services/getAdvert"

// 屏幕宽度
var screenWidth = Dimensions.get('window').width;

@connect(state => ({store: state}))
class News extends Component {
    static navigationOptions = (n) => ({
        tabBarLabel: null,
        header: null,
    });

    _onPressItem = (id) => {
        const {navigate} = this.props.navigation;
        navigate('NewsDetail', {uuid: id});
    }

    _onRefresh = () => {
        const {dispatch} = this.props.navigation;
        dispatch({type:'newsList/updateHash', hash: Math.random()});
        dispatch({type:'newsList/getAdvertisement'});
        dispatch({type:'newsList/refreshList', perPage: 5});
    }

    render() {
        const {newsList} = this.props.store;
        let isRefreshing = newsList.isRefreshing;
        let newsData = newsList.news.slice();
        const {navigate} = this.props.navigation;
        return (
            !isRefreshing ?
            <View style={styles.outcontainer}>
                <StatusBar translucent={false}
                           backgroundColor='#000'/>
                <Image style={styles.container}
                    source={{uri: `${newsList.advert}?hash=${newsList.hash}`}}/>
                <View style={styles.listcontainer}>
                    <FlatList
                        data={newsData.splice(0, 5)}
                        refreshing={false}
                        keyExtractor={(item, index) => index}
                        onRefresh={this._onRefresh}
                        renderItem={({item}) => <NewsItem item={item} hash={newsList.hash} onPressItem={this._onPressItem}/>}
                        ItemSeparatorComponent={() =>
                            <View style={{height: 1, backgroundColor: '#E7E7E7', marginHorizontal: 15}}/>
                        }
                        ListFooterComponent={() =>
                            <TouchableWithoutFeedback onPress={() => navigate('MoreNews')}>
                                <View style={{width: screenWidth, height: 305}}>
                                    <Text style={{
                                        fontSize: 12,
                                        color: '#B78B3D',
                                        marginTop: 55,
                                        alignSelf: 'center',
                                        textDecorationLine: 'underline',
                                    }}>更多</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        }
                    />
                </View>
            </View> :
            <View style={styles.indicatorContainer}>
                <ActivityIndicator
                    size="large"
                    color="#aaaaaa"/>
            </View>
        )
    }

}


const styles = StyleSheet.create({
    indicatorContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    outcontainer: {
        flex: 1,
        flexDirection: 'column',
    },
    container: {
        width:'100%',
        height: 220
    },
    listcontainer: {
        marginTop: 9,
    },
    circleContainer: {
        position: 'absolute',
        left: 0,
        marginTop: 220
    },
    circle: {
        width: 6,
        height: 6,
        borderRadius: 6,
        backgroundColor: '#000000',
        marginHorizontal: 5,
    },
    circleSelected: {
        width: 6,
        height: 6,
        borderRadius: 6,
        backgroundColor: '#ffffff',
        marginHorizontal: 5,
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    }

});

export default News;



