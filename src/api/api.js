import axios from 'axios';
// var url = 'http://47.112.214.79:8082';
// var url = 'http://java.goliebao.com:8082';
var url = 'http://qdfy.goliebao.com/qdfy-smarthospital'


export const getNation = params => {//本地json数据--民族
    return axios.get('/static/nation.json',
    { params:params}).then(res => res.data);
};

export const postRegisterInfo = params => {//授权注册
    return axios.post(`${url}/card/registerCard`,
    params).then(res => res.data);
};
export const getAuthorization = params => {//授权注册--一键授权
    return axios.post(`${url}/card/getHealthCardCode`,
     params).then(res => res.data);
};
export const changePersonalInfo = params => {//个人信息修改
    return axios.post(`${url}/card/updateHealthCard`,
     params).then(res => res.data);
};

// export const getAddress = params => {//测试--根据经纬度查询详细地址
//     return axios.get('https://apis.map.qq.com/ws/geocoder/v1/',
//     {params:params}).then(res => res.data)
// }
export const getPatientNameInfo = params => {//获取就诊人信息
    return axios.get(`${url}/payment/getPatientNameInfo`,
    { params:params}).then(res => res.data);
};
export const getPaientInfo = params => {//获取就诊人信息
    return axios.get(`${url}/doctor/appointment/confirmInfo`,
    { params:params}).then(res => res.data);
};


// 就医--预约挂号、当天挂号
export const getDeptInfo = params => {//预约挂号--选择科室门诊
    return axios.get(`${url}/doctor/appointment/getDeptInfo`,
    { params:params}).then(res => res.data);
};
export const getScheduleInfo = params => {//预约挂号--医生出诊信息查询
    return axios.get(`${url}/doctor/appointment/getScheduleInfo`,
    { params:params}).then(res => res.data);
};
export const getTimeInfo = params => {//预约挂号--医生号源分时信息查询
    return axios.get(`${url}/doctor/appointment/getTimeInfo`,
    { params:params}).then(res => res.data);
};
export const getaddOrder = params => {//预约挂号--预约
    return axios.post(`${url}/doctor/appointment/addOrder`,
    params).then(res => res.data);
};
export const getpayOrder = params => {//预约挂号--预约--预约支付
    return axios.post(`${url}/doctor/appointment/pay`,
    params).then(res => res.data);
};
export const getFavorite = params => {//预约挂号--查看最近收藏
    return axios.get(`${url}/doctor/appointment/getFavorite`,
    { params:params}).then(res => res.data);
};
export const postFavorite = params => {//预约挂号--收藏
    return axios.post(`${url}/doctor/appointment/addFavorite`,
    params).then(res => res.data);
};

//就医--当天挂号
export const getDayDeptInfo = params => {//当天挂号--选择科室门诊
    return axios.get(`${url}/doctor/day/getDeptInfo`,
    { params:params}).then(res => res.data);
};
export const getDayScheduleInfo = params => {//当天挂号--医生出诊信息查询
    return axios.post(`${url}/doctor/day/getScheduleInfo`,
    params).then(res => res.data);
};
export const getLockReg = params => {//当天挂号--支付前号源锁定
    return axios.post(`${url}/doctor/day/lockReg`,
    params).then(res => res.data);
};

// 就医--诊间支付
export const getPayInfo = params => {//诊间支付--待缴费记录查询
    return axios.post(`${url}/doctor/clinicPay/getPayInfo`,
    params).then(res => res.data);
};
export const getCompletedPayInfo = params => {//诊间支付--已缴费记录查询
    return axios.post(`${url}/doctor/clinicPay/getCompletedPayInfo`,
    params).then(res => res.data);
};
export const getPayBillFee = params => {//诊间支付--待缴费用信息
    return axios.post(`${url}/doctor/clinicPay/getPaybillfee`,
    params).then(res => res.data);
};
export const getCompletedBill = params => {//诊间支付--已缴费用信息
    return axios.post(`${url}/doctor/clinicPay/getCompletedPayDetailInfo`,
    params).then(res => res.data);
};
export const payFee = params => {//诊间支付--立即支付
    return axios.post(`${url}/doctor/clinicPay/pay`,
    params).then(res => res.data);
};

// 就医--智能问诊 

// 住院--住院登记
export const postIdCardOcr= params => {//住院登记-身份证上传
    return axios.post(`${url}/hospitalRegistration/idCardOcr`,
    params).then(res => res.data);
};
export const postHospitalization= params => {//住院登记信息提交
    return axios.post(`${url}/hospitalRegistration/addHospitalRegistrationCard`,
    params).then(res => res.data);
};
export const getCode = params => {//住院登记--获取二维码和条形码信息
    return axios.get(`${url}/hospitalRegistration/getCode`,
    { params:params}).then(res => res.data);
};
export const getReservation = params => {//住院登记--我的预约列表
    return axios.get(`${url}/hospitalRegistration/reservation`,
    { params:params}).then(res => res.data);
};
export const gethosReservation = params => {//住院登记--我的预约列表--获取修改表单信息
    return axios.get(`${url}/hospitalRegistration/getHospitalReservation`,
    { params:params}).then(res => res.data);
};
export const postHospitalReservation= params => {//住院登记信息提交
    return axios.post(`${url}/hospitalRegistration/updateHospitalReservation`,
    params).then(res => res.data);
};

// 住院--费用查询

export const getInpatientInfo = params => {//费用查询--患者住院信息查询
    return axios.post(`${url}/hospital/queryFee/getInpatientInfo`,
    params).then(res => res.data);
};
export const getPrepay = params => {//费用查询--预交金缴纳
    return axios.post(`${url}/hospital/queryFee/getPrepayRecord`,
    params).then(res => res.data);
};
export const postPrepay= params => {//费用查询--预交金支付
    return axios.post(`${url}/hospital/queryFee/getPrepayRecord`,
    params).then(res => res.data);
};
export const getdaycheckList = params => {//费用查询--每日清单
    return axios.post(`${url}/hospital/queryFee/getDailyBill`,
    params).then(res => res.data);
};
export const getmedicineDetail = params => {//费用查询--每日清单明细
    return axios.get(`${url}/queryFee/medicineDetail`,
    { params:params}).then(res => res.data);
};
export const gethospitialFee = params => {//费用查询--住院费用
    return axios.post(`${url}/hospital/queryFee/getTotalCost`,
    params).then(res => res.data);
};
export const getfeeDetail = params => {//费用查询--住院费用明细
    return axios.post(`${url}/hospital/queryFee/getDetailCost`,
    params).then(res => res.data);
};
export const getgoHospitialInfo = params =>{//费用查询--入院须知
    return axios.get(`${url}/queryFee/hospitalNotice`,
    { params:params}).then(res => res.data);
};
export const getleaveHospitialInfo = params =>{//费用查询--出院须知
    return axios.get(`${url}/queryFee/leaveHospitalNotice`,
    { params:params}).then(res => res.data);
};




// 住院--报告查询
export const getestReport = params => {//报告查询--检验报告
    return axios.post(`${url}/hospital/report/getReport`,
    params).then(res => res.data);
};
export const getestReportDetail = params => {//报告查询--检验报告项目详情
    return axios.post(`${url}/hospital/report/getReportItem`,
    params).then(res => res.data);
};
export const getcheckReport = params => {//报告查询--检查报告报告
    return axios.get(`${url}/queryReport/checkReport`,
    { params:params}).then(res => res.data);
};
export const getcheckReportDetail = params => {//报告查询--检查报告报告项目详情
    return axios.get(`${url}/queryReport/checkReportDetail`,
    { params:params}).then(res => res.data);
};

//个人中心--个人信息
export const getPatientInfo = params => {//个人信息--默认获取个人信息表单
    return axios.post(`${url}/personal/info/getPersonalInfo`,
    params).then(res => res.data);
};
export const addPatient= params => {//个人信息--添加就诊人
    return axios.post(`${url}/personal/info/addNewPaitent`,
    params).then(res => res.data);
};
export const removeCard= params => {//个人信息--解除绑定
    return axios.post(`${url}/personal/info/removeHealthCard`,
    params).then(res => res.data);
};
export const changePatient= params => {//个人信息--切换就诊人
    return axios.post(`${url}/personal/info/getPatient`,
    params).then(res => res.data);
};
export const changePatientInfo= params => {//个人信息--修改个人信息
    return axios.post(`${url}/personal/info/updateHealthCard`,
    params).then(res => res.data);
};


//个人中心--我的医生
export const getRecentDoctor = params => {//我的医生--最近就诊
    return axios.post(`${url}/personal/myDoctor/recentOutpatient`,
    params).then(res => res.data);
};

// 个人中心--我的预约
export const getMyReservationInfo = params => {//我的预约--获取我的预约信息
    return axios.post(`${url}/personal/reservation/getReservationInfo`,
    params).then(res => res.data);
};
export const getcancelResevation = params => {//我的预约--取消预约
    return axios.post(`${url}/personal/reservation/cancelReservation`,
    params).then(res => res.data);
};            
export const cancelRegistration = params => {//我的预约--取消挂号
    return axios.post(`${url}/personal/reservation/returnPay`,
    params).then(res => res.data);
};
export const  reservationPay= params => {//我的预约--立即支付
    return axios.post(`${url}/personal/reservation/pay`,
    params).then(res => res.data);
};


//个人中心--电子健康码
export const gethealthCode = params =>{//电子健康码
    return axios.post(`${url}/card/getHealthCard`,
    params).then(res => res.data)
}


//服务平台--就医指南
export const getmedicineDuide = params =>{//服务平台--就医指南
    return axios.post(`${url}/platform/service/getMedicalGuide`,
    params).then(res => res.data)
}
//服务平台--科室分布
export const getDeptAddress = params =>{//服务平台--科室分布
    return axios.post(`${url}/platform/service/getDeptAddress`,
    params).then(res => res.data)
}
//服务平台--健康宣传
export const getHealthPropaganda = params =>{//服务平台--健康宣传
    return axios.post(`${url}/platform/service/getHealthPropaganda`,
    params).then(res => res.data)
}
//服务平台--排队查询
export const getqueryQueue = params => {//服务平台--排队查询
    return axios.post(`${url}/platform/service/queryQueue`,
    params).then(res => res.data);
};
//服务平台--微官网
export const getMicroOfficial = params => {//服务平台--微官网
    return axios.post(`${url}/platform/service/getMicroOfficial`,
    params).then(res => res.data)
}
//服务平台--专科矩阵
export const getSpecialistMatrix =params => {//服务平台--专科矩阵
    return axios.post(`${url}/platform/service/getSpecialistMatrix`,
    params ).then(res => res.data)
}
