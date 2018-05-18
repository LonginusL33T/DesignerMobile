import React from 'react';
import {
    StyleSheet,
    Image
} from 'react-native';
import {
    TabNavigator,
} from 'react-navigation';

import Theme from './theme';
import Login from './views/Login';
import Splash from './views/Splash';

import FormFieldEditor from './views/common/FormFieldEditor';
import HomeScreenDrawerNavigator from './views/home/HomeScreenDrawerNavigator'
import MoreDesigners from './views/home/tabs/main/designer/MoreDesigners'
import MatchDetail from './views/home/tabs/main/matches/MatchDetail'
import DesignerDetail from "./views/home/tabs/main/designer/DesignerDetail";
import SearchDesigner from './views/home/tabs/main/search/SearchDesigner'
import MoreNews from './views/home/tabs/news/MoreNews'
import NewsDetail from './views/home/tabs/news/NewsDetail'
import ForgetPassword from './views/ForgetPassword'
import CompanyReg from './views/register/CompanyReg';
import CompanyReg2 from './views/register/CompanyReg2';
import FreeDesignerReg from './views/register/FreeDesignerReg';
import FreeDesignerReg2 from './views/register/FreeDesignerReg2';
import FreeDesignerReg3 from './views/register/FreeDesignerReg3';
import BrandDesignerReg from './views/register/BrandDesignerReg';
import BrandDesignerReg2 from './views/register/BrandDesignerReg2';
import BrandDesignerReg3 from './views/register/BrandDesignerReg3';
import BrandDesignerReg4 from './views/register/BrandDesignerReg4';
import FreshDesignerReg from './views/register/FreshDesignerReg';
import FreshDesignerReg2 from './views/register/FreshDesignerReg2';
import FreshDesignerReg3 from './views/register/FreshDesignerReg3';
import ChooseDesignerType from './views/register/ChooseDesignerType';
import FrameL from './views/register/FrameL';
import FeedBack from './views/FeedBack'
import UpdateAvatar from "./views/UpdateAvatar";
import ModifyPassword from "./views/register/ModifyPassword";
import MatchRequire from './views/setting/company/MatchRequire'
import RecruitRecord from "./views/setting/company/RecruitRecord";
import ApplyRecord from './views/setting/user/ApplyRecord'
import DeliveryBox from './views/setting/company/DeliveryBox'

const theme = Theme.currentTheme();

const styles = StyleSheet.create({
    icon: {
        width: 25,
        height: 25
    },
});


export default {
    // Splash: {
    //     screen: Splash,
    // },
    Home: {
        screen: HomeScreenDrawerNavigator,
    },
    Login: {
        screen: Login,
    },
    FormFieldEditor: {
        screen: FormFieldEditor,
    },
    MoreDesigners: {
        screen: MoreDesigners,
    },
    MatchDetail: {
        screen: MatchDetail,
    },
    DesignerDetail: {
        screen: DesignerDetail,
    },
    SearchDesigner: {
        screen: SearchDesigner,
    },
    MoreNews: {
        screen: MoreNews,
    },
    NewsDetail: {
        screen: NewsDetail,
    },
    ForgetPassword: {
        screen: ForgetPassword,
    },
    FeedBack: {
        screen: FeedBack
    },
    CompanyReg: {screen: CompanyReg},
    CompanyReg2: {screen: CompanyReg2},
    FreeDesignerReg: {screen: FreeDesignerReg},
    FreeDesignerReg2: {screen: FreeDesignerReg2},
    FreeDesignerReg3: {screen: FreeDesignerReg3},
    BrandDesignerReg: {screen: BrandDesignerReg},
    BrandDesignerReg2: {screen: BrandDesignerReg2},
    BrandDesignerReg3: {screen: BrandDesignerReg3},
    BrandDesignerReg4: {screen: BrandDesignerReg4},
    FreshDesignerReg: {screen: FreshDesignerReg},
    FreshDesignerReg2: {screen: FreshDesignerReg2},
    FreshDesignerReg3: {screen: FreshDesignerReg3},
    ChooseDesignerType: {screen: ChooseDesignerType},
    FrameL: {screen: FrameL},
    UpdateAvatar: {screen: UpdateAvatar},
    ModifyPassword: {screen: ModifyPassword},
    MatchRequire: {screen: MatchRequire},
    RecruitRecord: {screen: RecruitRecord},
    ApplyRecord: {screen: ApplyRecord},
    DeliveryBox: {screen: DeliveryBox},
};
