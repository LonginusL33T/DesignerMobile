import React, {Component} from 'react'
import PersonInfo from './PersonInfo'

export default class FreshDesignerReg extends Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        const {goBack,navigate} = this.props.navigation;
        return (
            <PersonInfo
                title="应届设计师"
                points={[true,false,false]}
                navigation={this.props.navigation}
                to="FreshDesignerReg2"
                back={() => goBack()}/>
        );
    }
}