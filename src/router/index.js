import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'//首页
import RegisterInfo from '@/components/RegisterInfo' //新用户注册页
// 就医
import visitingcard from '@/components/visitingcard' //添加就诊卡（手工绑定）
import Choicehospital from '@/components/Choicehospital'//预约挂号--选择科室门诊
import Outdepartment from '@/components/Outdepartment'//门诊信息
import Daychoose from '@/components/Daychoose'//当天--门诊信息

import Mydoctor from '@/components/Mydoctor'//门诊信息
import Doctorout from '@/components/Doctorout'//医生门诊
import Register from '@/components/Register'//确认挂号信息
import Myappointment from '@/components/Myappointment'//我的预约
import Canregister from '@/components/Canregister'//取消挂号信息
import Periodpayment from '@/components/Periodpayment'//诊间结算1（诊间支付）
import Paymentdetails from '@/components/Paymentdetails'//诊间支付--诊间结算1详情（诊间支付）
import Smartanswer from '@/components/Smartanswer'//智能问诊
import Createvisitcard from '@/components/Createvisitcard'//新建就诊卡
import Navigation from '@/components/Navigation'//科室分布
// 住院
import Costquery from '@/components/Costquery'//费用查询
import Reservation from '@/components/Reservation'//费用查询--预交金缴纳
import Dailylist from '@/components/Dailylist'//费用查询--每日清单
import Hospitaldetails from '@/components/Hospitaldetails'//费用查询--每日清单--住院费用明细
import Hospitalization from '@/components/Hospitalization'//费用查询--住院总费用
import Hospitaliexdatils from '@/components/Hospitaliexdatils'//费用查询--住院总费用--明细
import Reportquery from '@/components/Reportquery'//报告查询
import Checkdetails from '@/components/Checkdetails'//报告查询--检验详情(处理中)
import Carrydetails from '@/components/Carrydetails'//报告查询--检验详情(完成)
import Testdetails from '@/components/Testdetails'//报告查询--检查详情(处理中)carry
import Tcarrydetails from '@/components/Tcarrydetails'//报告查询--检查详情(完成)
import Hosregister from '@/components/Hosregister'//住院登记
import Registrcard from '@/components/Registrcard'//住院登记--住院登记卡(表格)
import Successqrcode from '@/components/Successqrcode'//住院登记--住院登记卡--展示预约成功二维码
import Myappoinlist from '@/components/Myappoinlist'//住院登记--我的预约列表
import Recordmodify from '@/components/Recordmodify'//住院登记--我的预约列表--修改表单信息

// 个人中心
import Personalinfor from '@/components/Personalinfor'//个人信息
import Contactaddress from '@/components/Contactaddress'//个人信息--联系地址
import Hospitalnumber from '@/components/Hospitalnumber'//个人信息--住院号
import Socialsecurity from '@/components/Socialsecurity' // 我的社保
import Healthcode from '@/components/Healthcode'  //电子健康码

// 服务平台
import Doctorguide from '@/components/Doctorguide'//就医指南
import Doctordetails from '@/components/Doctordetails'//就医指南--详情
import Healthprop from '@/components/Healthprop'//健康宣传
import Healthdetails from '@/components/Healthdetails'//健康宣传--详情
import Queries from '@/components/Queries'//排队查询
import Website from '@/components/Website'//微官网
import Specialist from '@/components/Specialist'//专科矩阵
import Trafficguide from '@/components/Trafficguide'//交通指引



import textceshi from '@/components/textceshi'//demo测试文件
import ceshi from '@/components/ceshi'//测试文件--获取当前位置
import analysis from '@/components/analysis'//测试文件--逆解析地址
import myaddres from '@/components/myaddres'//测试文件--获取我的位置

Vue.use(Router)

export default new Router({
    routes: [
        { path: '/', name: 'HelloWorld', component: HelloWorld, meta:{title:'祁东县妇幼保健院'}},
        { path:'/registerinfo', name: 'registerinfo', component: RegisterInfo, meta:{title:'注册'}},        
        { path:'/visitingcard', name:'visitingcard', component:visitingcard, meta:{title:'添加就诊卡'}},
        { path:'/choicehospital', name:'choicehospital', component:Choicehospital, meta:{title:'选择科室门诊'}},
        
        { path:'/outdepartment', name:'outdepartment', component:Outdepartment, meta:{title:'门诊信息'}},
        { path:'/daychoose', name:'daychoose', component:Daychoose, meta:{title:'门诊信息'}},
        { path:'/mydoctor', name:'mydoctor', component:Mydoctor, meta:{title:'我的医生'}},
        { path:'/doctorout', name:'doctorout', component:Doctorout, meta:{title:'医生门诊'}},
        { path:'/register', name:'register', component:Register, meta:{title:'确认挂号信息'}},
        { path:'/myappointment', name:'myappointment', component:Myappointment, meta:{title:'我的预约'}},
        { path:'/canregister', name:'canregister', component:Canregister, meta:{title:'取消挂号信息'}},
        { path:'/periodpayment', name:'periodpayment', component:Periodpayment, meta:{title:'诊间结算'}},
        { path:'/paymentdetails', name:'paymentdetails', component:Paymentdetails, meta:{title:'诊间支付'}},
        { path:'/smartanswer', name:'smartanswer', component:Smartanswer, meta:{title:'智能问诊'}},
        { path:'/createvisitcard', name:'createvisitcard', component:Createvisitcard, meta:{title:'新建就诊卡'}},

        { path:'/navigation', name:'navigation', component:Navigation, meta:{title:'科室分布'}},
        { path:'/costquery', name:'costquery', component:Costquery, meta:{title:'费用查询'}},
        { path:'/reservation', name:'reservation', component:Reservation, meta:{title:'预交金缴纳'}},
        { path:'/dailylist', name:'dailylist', component:Dailylist, meta:{title:'每日清单'}},
        { path:'/hospitaldetails', name:'hospitaldetails', component:Hospitaldetails, meta:{title:'每日清单明细'}},
        { path:'/hospitalization', name:'hospitalization', component:Hospitalization, meta:{title:'住院总费用'}},
        { path:'/hospitaliexdatils', name:'hospitaliexdatils', component:Hospitaliexdatils, meta:{title:'住院总费用明细'}},
        { path:'/reportquery', name:'reportquery', component:Reportquery, meta:{title:'报告查询'}},
        { path:'/checkdetails', name:'checkdetails', component:Checkdetails, meta:{title:'检查详情'}},
        { path:'/carrydetails', name:'carrydetails', component:Carrydetails, meta:{title:'检验详情'}},
        { path:'/testdetails', name:'testdetails', component:Testdetails, meta:{title:'检查详情'}},
        { path:'/tcarrydetails', name:'tcarrydetails', component:Tcarrydetails, meta:{title:'检验详情'}},
        { path:'/hosregister', name:'hosregister', component:Hosregister, meta:{title:'住院登记'}},
        { path:'/myappoinlist', name:'myappoinlist', component:Myappoinlist, meta:{title:'我的预约'}},
        { path:'/registrcard', name:'registrcard', component:Registrcard, meta:{title:'住院登记卡'}},
        { path:'/recordmodify', name:'recordmodify', component:Recordmodify, meta:{title:'修改住院信息'}},
        { path:'/successqrcode', name:'successqrcode', component:Successqrcode, meta:{title:'预约成功二维码'}},
        { path:'/personalinfor', name:'personalinfor', component:Personalinfor, meta:{title:'个人信息'}},
        { path:'/contactaddress', name:'contactaddress', component:Contactaddress, meta:{title:'联系地址'}},
        { path:'/hospitalnumber', name:'hospitalnumber', component:Hospitalnumber, meta:{title:'住院号'}},
        { path:'/socialsecurity', name:'socialsecurity', component:Socialsecurity, meta:{title:'我的社保'}},
        { path:'/healthcode', name:'healthcode', component:Healthcode, meta:{title:'电子健康码'}},
        

        { path:'/doctorguide', name:'doctorguide', component:Doctorguide, meta:{title:'就医指南'}},
        { path:'/doctordetails', name:'doctordetails', component:Doctordetails, meta:{title:'就医指南详情'}},
        { path:'/healthprop', name:'healthprop', component:Healthprop, meta:{title:'健康宣传'}},
        { path:'/healthdetails', name:'healthdetails', component:Healthdetails, meta:{title:'健康宣传详情'}},
        { path:'/queries', name:'queries', component:Queries, meta:{title:'排队查询'}},
        { path:'/website', name:'website', component:Website, meta:{title:'微官网'}},
        { path:'/specialist', name:'specialist', component:Specialist, meta:{title:'专科矩阵'}},
        { path:'/trafficguide', name:'trafficguide', component:Trafficguide, meta:{title:'交通指引'}},

        { path:'/textceshi', name:'textceshi', component:textceshi, meta:{title:'demo文件'}},
        { path:'/analysis', name:'analysis', component:analysis, meta:{title:'逆解析地址'}},
        { path:'/myaddres', name:'myaddres', component:myaddres, meta:{title:'获取我的位置'}},
    ]
})
