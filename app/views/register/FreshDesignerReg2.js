import React, {Component} from 'react'
import PersonInfo2 from './PersonInfo2'

export default class FreshDesignerReg2 extends Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        const {goBack,navigate} = this.props.navigation;
        return (
        <PersonInfo2
            title="应届设计师"
            points={[false,true,false]}
            navigation={this.props.navigation}
            to="FreshDesignerReg3"
            back={() => goBack()}
            imageupload="fresh_works"
            must = {false}
            isfree = {false}/>
        );
    }
}