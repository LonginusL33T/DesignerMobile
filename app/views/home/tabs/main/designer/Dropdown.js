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
    Platform,
} from 'react-native';

export default class Dropdown extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const isContinentChoosed = this.props.continent === this.props.choosedContinent;
        const isContinentOpened = this.props.continent === this.props.openedContinent && this.props.continent !== '';
        const isTypeChoosed = this.props.designerType === this.props.choosedType;
        return this.props.type === 'region' ?
            (<View style={styles.container}>
                {this.props.continent === '' ?
                    <TouchableOpacity
                        style={styles.itemContainer}
                        activeOpacity={0.6}
                        onPress={() => {
                            if (this.props.choosedCountry !== '') {
                                this.props.onCountryChange('', '');
                                this.props.onOpenChange('');
                            }
                        }}>
                        <Text style={[this.props.choosedCountry === '' ?
                            styles.activeText : styles.inActiveText, {marginLeft: 22}]}>全部</Text>
                    </TouchableOpacity> :
                    <TouchableOpacity
                        style={[styles.itemContainer, {justifyContent: 'space-between'}]}
                        activeOpacity={0.6}
                        onPress={() => {
                            if(!isContinentOpened){
                                this.props.onOpenChange(this.props.continent);
                            }
                            else {
                                this.props.onOpenChange('');
                            }
                        }}>
                        <Text
                            style={[isContinentChoosed ? styles.activeText : styles.inActiveText, {marginLeft: 22}]}>
                            {this.props.continent}
                        </Text>
                        <View style={styles.iconContainer}>
                            <Image source={isContinentOpened ?
                                require('../../../../../assets/designer/d1.png') :
                                require('../../../../../assets/designer/dd.png')}/>
                        </View>
                    </TouchableOpacity>
                }
                {!isContinentOpened && this.props.continent === '大洋洲' ?
                    null : <Text style={styles.divider}/>
                }
                {isContinentOpened ?
                    <View style={styles.allContainer}>
                        <View style={styles.countryContainer}>
                            {this.props.countries.map((value, i) =>
                                <Text
                                    key={'country' + i}
                                    style={[(value === this.props.choosedCountry && isContinentChoosed) ? styles.activeText : styles.inActiveText,
                                        {padding: 10}]}
                                    onPress={() => {
                                        if (value !== this.props.choosedCountry)
                                            this.props.onCountryChange(this.props.continent, value);
                                    }}>
                                    {value}
                                </Text>
                            )}
                        </View>
                        <Text style={styles.bottom}/>
                    </View> : null
                }

            </View>) :
            (
                <View style={styles.container}>
                    <TouchableOpacity
                        style={styles.itemContainer}
                        activeOpacity={0.6}
                        onPress={() => {
                            if(!isTypeChoosed){
                                this.props.onTypeChange(this.props.designerType);
                            }
                        }}>
                        <Text
                            style={[isTypeChoosed ? styles.activeText : styles.inActiveText, {marginLeft: 22}]}>
                            {this.props.designerType || '全部'}
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.divider}/>
                </View>
            );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    itemContainer: {
        height: 52,
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    activeText: {
        fontSize: 15,
        color: '#bf7900'
    },
    inActiveText: {
        fontSize: 15,
        color: '#787878'
    },
    divider: {
        width: Dimensions.get('window').width - 30,
        height: 1,
        backgroundColor: '#e7e7e7',
    },
    bottom:{
        width: "100%",
        height: 1,
        shadowColor: 'rgb(42, 34, 32)',
        shadowOffset: {width: 0, height:-1},
        shadowOpacity: 0.25,
        shadowRadius: 1,
        zIndex:2,
        backgroundColor: '#e5e5e5',
    },
    iconContainer: {
        width: 15,
        height: 15,
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    allContainer:{
        width:"100%",
        alignItems:'center'
    },
    countryContainer: {
        height: 52,
        width: "100%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        zIndex: Platform.OS === 'android' ? 0 : 1,
    },
});