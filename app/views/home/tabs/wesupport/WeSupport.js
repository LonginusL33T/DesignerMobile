import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    FlatList,
    TextInput,
    Image,
    StatusBar,
} from 'react-native';
import { connect } from 'react-redux';
import DeviceStorage from "../../../../utils/DeviceStorage";
import {getListBySchema} from "../../../../services/getListBySchema";
import Consts from '../../../../config/consts';

class WeSupport extends Component {
    static navigationOptions = (n) => ({
        header:()=><View style={styles.titleContainer}>
            <Text style={styles.titleText}>WE SUPPORT</Text>
        </View>
    });
    constructor(props) {
        super(props);
        this.state = {
            datas: [],
        }
    }

    componentDidMount() {
        getListBySchema('material', (datas) => {this.setState({datas: datas})});
    }


    render() {
        return (
            <View style={styles.container}>
                {/*<StatusBar translucent={false}*/}
                           {/*backgroundColor='#000'/>*/}
                {/*<View style={styles.titleContainer}>*/}
                    {/*<Text style={styles.headerTitle}>WE SUPPORT</Text>*/}
                {/*</View>*/}
{/*                <View style={styles.searchcontainer}>
                    <View style={styles.searchview}>
                        <Image style={styles.searchicon}
                               source={require('../../../../assets/designer/939139-200.png')}/>
                        <TextInput style={styles.search}
                                   placeholder="搜索喜欢的内容"
                                   placeholderTextColor="#9A9999"
                                   underlineColorAndroid='transparent'/>
                    </View>
                </View>*/}
                <FlatList
                    data={this.state.datas}
                    keyExtractor={(item, index) => index}
                    renderItem={({item}) =>
                        <ImageBackground style={styles.backimage}
                               resizeMode="stretch"
                               source={{uri:Consts.server.MESH+"designer/nodes/"+item.uuid+"/binary/background?width=800&hash="+Math.random()}}>
                            <View style={styles.shade}>
                                <Text style={styles.title}>
                                    {item.fields.title}
                                </Text>
                                <Text style={styles.engtitle}>
                                    {item.fields.intro}
                                </Text>
                            </View>
                        </ImageBackground>
                    }
                />
            </View>
        );
    }
}

const ImageSize = 40;

const styles = StyleSheet.create({
    titleContainer: {
        height:60,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText:{
        width:"100%",
        marginTop:15,
        alignSelf:"center",
        textAlign:"center",
        fontSize:17,
        color:"#fff",
        textAlignVertical:"bottom"
    },
    container: {
        flex: 1,
        backgroundColor: '#000000'
    },
    searchcontainer: {
        height: 60,
        width: '100%',
        backgroundColor: '#000000',
        marginTop: 25
    },
    searchview: {
        height: 33,
        width: 352,
        alignSelf: 'center',
        backgroundColor: '#131313',
        marginBottom: 19,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    search: {
        height: 27,
        fontSize: 14,
        width: 300,
        marginLeft: 7.5,
        paddingTop: 0,
        marginTop: 10,
        color: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchicon: {
        height: 18,
        width:18,
        marginLeft: 10,
        marginTop: 7
    },
    backimage: {
        height: 160,
        width: '100%',
        backgroundColor: '#232323'
    },
    shade: {
        height: 79,
        width: 283,
        backgroundColor: 'rgba(93,88,89,.4)',
        alignSelf: 'center',
        marginTop: 40.5,
    },
    title: {
        fontSize: 16,
        height: 17,
        color: '#FFFFFF',
        marginTop: 22,
        alignSelf: 'center',
        includeFontPadding: false,
        textAlignVertical: 'top',
    },
    engtitle: {
        marginTop: 10,
        fontSize: 10,
        height: 10,
        color: '#C5C5C5',
        alignSelf: 'center',
        includeFontPadding: false,
        textAlignVertical: 'bottom',
    }

});

const mapStateToProps = (state) => {
    return {
        store: state
    };
};

export default connect(mapStateToProps)(WeSupport);



