import React, {Component} from 'react'
import PersonInfo from './PersonInfo'
import {View,TouchableOpacity,Image} from 'react-native'

export default class FreeDesignerReg extends Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        const {goBack,navigate} = this.props.navigation;
        return (
            <PersonInfo
                title="自由设计师"
                points={[true,false,false]}
                navigation={this.props.navigation}
                to="FreeDesignerReg2"
                back={() => goBack()}
          />
        );
    }
}