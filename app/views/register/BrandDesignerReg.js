import React, {Component} from 'react'
import PersonInfo from "./PersonInfo";

export default class BrandDesignerReg extends Component {
    static navigationOptions = {
        header: null,
    };
    render() {
        const {goBack,navigate} = this.props.navigation;
        return (
            <PersonInfo
                title="自有品牌设计师"
                points={[true,false,false,false]}
                navigation={this.props.navigation}
                to="BrandDesignerReg2"
                back={() => goBack()}/>
        );
    }
}