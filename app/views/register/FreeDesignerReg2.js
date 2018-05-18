import React, {Component} from 'react';
import PersonInfo2 from './PersonInfo2';

export default class FreeDesignerReg2 extends Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        const {goBack} = this.props.navigation;
        return (
        <PersonInfo2
            title="自由设计师"
            points={[false,true,false]}
            navigation={this.props.navigation}
            to="FreeDesignerReg3"
            back={() => goBack()}
            imageupload="free_works"
             must={true}
            isfree = {true}
        />
        );
    }
}