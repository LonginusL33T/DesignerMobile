import React, {Component} from 'react'
import PersonInfo2 from "./PersonInfo2";

export default class BrandDesignerReg2 extends Component {
    static navigationOptions = {
        header: null,
    };
    render() {
        const {goBack,navigate} = this.props.navigation;
        return (
            <PersonInfo2
                title="自有品牌设计师"
                points={[false,true,false,false]}
                navigation={this.props.navigation}
                to="BrandDesignerReg3"
                back={() => goBack()}
                imageupload="brand_works"
                must = {false}
                isfree = {false}
            />
        );
    }
}