import Consts from '../config/consts'
import {
    Alert
} from 'react-native'

export const createRecruit = (category, address, educational_requirements, experience, tags,
                              job_detail, skills_requirements, compensation_benefit, x_token, callback) => {
    console.log(JSON.stringify({
        "category": category,
        "address": address,
        "educational_requirements": educational_requirements,
        "experience": experience,
        "tags": tags,
        "job_detail": job_detail,
        "skills_requirements": skills_requirements,
        "compensation_benefit": compensation_benefit,
        "x_token": x_token
    }));
    fetch(`${Consts.server.BACKSTAGE}${Consts.api.CREATERECRUIT}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "category": category,
            "address": address,
            "educational_requirements": educational_requirements,
            "experience": experience,
            "tags": tags,
            "job_detail": job_detail,
            "skills_requirements": skills_requirements,
            "compensation_benefit": compensation_benefit,
            "x_token": x_token
        })
    })
        .then((response) => response.json())
        .then((responseData) => {
            if(responseData.datas.data.error_code === 0) {
                callback();
            }
            else {
                Alert.alert('温馨提醒', responseData.datas.data.message);
            }
        })
        .catch((error) => {
            Alert.alert('温馨提醒', '网络出错');
        })
}
