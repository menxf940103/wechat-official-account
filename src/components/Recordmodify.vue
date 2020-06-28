<template>
    <div class="content">
        <img src="../assets/images/timg.jpg"/>
        <!-- 是否在本院住过院-是 -->
        <div class="inforb_yes">
           <div class="hospital_tips">
                <p class="hospital_tips_title">以下信息将用于住院登记办理移机出院后申请病案邮寄等业务，请认真填写。</p>
            </div>
            <div class="infor_fillin">
                <van-cell icon="manager-o" value="住院人的姓名："/>
                <van-cell-group>
                    <van-field required v-model="name" placeholder="请输入住院人的姓名" />
                </van-cell-group>
                <van-cell icon="debit-pay" value="住院人身份证号码："/>
                <van-cell-group>
                    <van-field v-model="idnumber" required placeholder="请输入住院人的身份证号码" />
                </van-cell-group>
                 <van-cell icon="phone-o" value="住院人性别："/>
                <van-radio-group v-model="sex" @change="getGender">
                    <van-radio name="0">男</van-radio>
                    <van-radio name="1">女</van-radio>
                    <van-radio name="2">未说明</van-radio>
                </van-radio-group>
                <van-cell icon="phone-o" value="住院人联系电话："/>
                <van-cell-group>
                    <van-field required v-model="phone" placeholder="请输入住院人联系电话" />
                </van-cell-group>
                <van-cell icon="phone-o" value="住院人出生日期："/>
                <van-cell-group>
                    <van-field type="date" v-model="date" placeholder="年-月-日" />
                </van-cell-group>
                <van-cell icon="phone-o" value="住院人民族："/>
                <select v-model="nation" class="select_nation">
                    <option v-for="item in nationData" :key="item.id">{{item.name}}</option>
                </select>
                <van-cell icon="pending-payment" value="住院人出生地："/>
                <van-cell-group>
                    <van-field required v-model="birthAddress" placeholder="请输入住院人出生地" />
                </van-cell-group>
                <van-cell icon="pending-payment" value="住院人籍贯（其父亲出生地）："/>
                <van-cell-group>
                    <van-field required v-model="hometown" placeholder="请输入住院人籍贯" />
                </van-cell-group>
                <van-cell icon="pending-payment" value="住院人职业："/>
                <van-cell-group>
                    <van-field required v-model="occupation" placeholder="请输入住院人职业" />
                </van-cell-group>
                <van-cell icon="pending-payment"  value="住院人工作单位：" />
                    <!-- 住院人工作单位： -->
                    <!-- <label>
                        <input name="check" value="" type="checkbox"  v-model="wcheck" @click="getWorky"/>无工作单位
                    </label> -->
                <van-cell-group>
                    <van-field v-model="employer" :disabled="disabled" placeholder="没有可填无" />
                </van-cell-group>
                <van-cell icon="pending-payment" value="单位电话："/>
                <van-cell-group>
                    <van-field v-model="emphone" :disabled="disabled" placeholder="没有可填无" />
                </van-cell-group>
                <van-cell icon="pending-payment" value="住院人婚姻状况："/>
                <van-radio-group v-model="mradio" @change="getyMarriage">
                    <van-radio name="0">未婚</van-radio>
                    <van-radio name="1">已婚</van-radio>
                    <van-radio name="2">离异</van-radio>
                    <van-radio name="3">丧偶</van-radio>
                    <van-radio name="4">未说明</van-radio>
                </van-radio-group>
                <van-cell icon="pending-payment" value="住院人区域："/>
                <van-radio-group v-model="aradio" @change="getRegion">
                    <van-radio name="0">中国大陆</van-radio>
                    <van-radio name="1">中国台湾</van-radio>
                    <van-radio name="2">中国香港</van-radio>
                    <van-radio name="3">中国澳门</van-radio>
                    <van-radio name="4">其他</van-radio>
                </van-radio-group>
                <van-field class="natione" v-bind:style="{display:attr}" v-model="region" placeholder="请填写国籍"/>
                <van-cell icon="pending-payment" value="住院人户口地址："/>
                <!-- <van-cell-group>
                    <van-cell :value="saddres"  @click="getAddres"/>
                </van-cell-group>
                <van-popup v-model="show" position="bottom" :style="{ height: '30%' }">
                    <van-area
                    :area-list="areaList"
                    title="请选择地址"
                    @confirm="onAddrConfirm"
                    :value="addrCode"
                    :columns-num="4"
                    />
                </van-popup> -->
                <van-cell-group>
                    <van-field
                        v-model="message"
                        rows="2"
                        autosize
                        type="textarea"
                        maxlength="20"
                        placeholder="详细地址（精确到门牌，最长20个字）"
                        show-word-limit
                    />
                </van-cell-group>
                <!-- <van-cell icon="pending-payment" value="住院人现址：" /> -->
                    <!-- 住院人现址：
                    <label>
                        <input name="check" value="" type="checkbox" v-model="tcheck" @click="getDilety"/>同户口地址
                    </label> -->
                <!-- </van-cell> -->
                <!-- <div class="xzaddres" :style="{display:xzaddres}"> -->
                    <!-- <van-cell-group>
                        <van-cell :value="haddres"  @click="gethAddres"/>
                    </van-cell-group>
                    <van-popup v-model="shows" position="bottom" :style="{ height: '30%' }">
                        <van-area
                        :area-list="areaList"
                        title="请选择地址"
                        @confirm="onAddrConfirm"
                        :value="haddrCode"
                        :columns-num="4"
                        />
                    </van-popup> -->
                     <!-- <van-cell-group>
                        <van-cell :value="saddres"  @click="getAddres"/>
                    </van-cell-group>
                    <van-popup v-model="show" position="bottom" :style="{ height: '30%' }">
                        <van-area
                        :area-list="areaList"
                        title="请选择地址"
                        @confirm="onAddrConfirm"
                        :value="addrCode"
                        :columns-num="4"
                        />
                    </van-popup> -->
                    <!-- <van-cell-group style="margin-top:20px;">
                        <van-field
                            v-model="hmessage"
                            rows="2"
                            autosize
                            type="textarea"
                            maxlength="20"
                            placeholder="详细地址（精确到门牌，最长20个字）"
                            show-word-limit
                        />
                    </van-cell-group> -->
                <!-- </div> -->
                
                <van-cell icon="pending-payment" value="现住址是否居住半年及以上"/>
                <van-radio-group v-model="tradio" @change="getRestime">
                    <van-radio name="0">是</van-radio>
                    <van-radio name="1">否</van-radio>
                </van-radio-group>
                <van-cell icon="pending-payment" value="联系人姓名："/>
                <van-cell-group>
                    <van-field required v-model="lxname" placeholder="非住院人，可填其亲属、朋友同事、事主等" />
                </van-cell-group>
                <van-cell icon="pending-payment" value="联系人与住院人关系："/>
                <van-cell-group>
                    <van-field required v-model="relation" placeholder="联系人与住院人关系" />
                </van-cell-group>
                <van-cell icon="pending-payment" value="联系人电话："/>
                <van-cell-group>
                    <van-field required v-model="lxphone" placeholder="联系人电话" />
                </van-cell-group>
                <van-cell icon="pending-payment" value="联系人详细地址："/>
                    <!-- 联系人详细地址： -->
                    <!-- <label>
                        <input name="check" value="" type="checkbox" v-model="xzcheck" @click="getDiletyxz"/>同现住址
                    </label> -->
                <!-- </van-cell> -->
                <div class="addbox">
                    <!-- <van-cell-group>
                        <van-cell :value="xaddres"  @click="getxAddres"/>
                    </van-cell-group>
                    <van-popup v-model="shows" position="bottom" :style="{ height: '30%' }">
                        <van-area
                        :area-list="areaList"
                        title="请选择地址"
                        @confirm="onxAddrConfirm"
                        :value="xaddrCode"
                        :columns-num="4"
                        />
                    </van-popup> -->
                    <van-cell-group style="margin-top:20px;">
                        <van-field
                            v-model="xmessage"
                            rows="2"
                            autosize
                            type="textarea"
                            maxlength="20"
                            placeholder="详细地址（精确到门牌，最长20个字）"
                            show-word-limit
                        />
                    </van-cell-group>
                </div>
                <button class="getbtn" @click="getPush()">修改保存</button>
            </div>
        </div>
        <!-- <div class="getime">
            <van-button class="mybtn" @click="getMybtn()" icon="underway-o" color="#53a4f4" type="primary" plain>我的预约</van-button>
        </div> -->
    </div>
</template>
<script>
import Vue from 'vue';
import { Checkbox, CheckboxGroup, RadioGroup, Radio, Area, Popup, Button } from 'vant';
import { getNation, gethosReservation, postHospitalReservation } from '../api/api'

Vue.use(Popup);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Area);
Vue.use(Checkbox).use(CheckboxGroup);
Vue.use(Button);
import areaList from "../assets/js/area.js";
export default {
    data(){
        return{
            id:"",//id
            dataList:[],//返回数据
            codeText:"",//返回的code值
            see:false,
            hospradio:"",//是否住过院
            mradio:"",//婚姻状况选择
            aradio:"",//区域选择
            tradio:"",//居住时间
            // checked: false,//--是
            // checkeda:false,//是否住过院--否
            name:"",//姓名
            lxname:"",//联系人姓名
            idnumber:"",//身份证号
            sex:"",//住院人性别
            phone:"",//联系电话
            date:"",//住院人出生日期
            nation:"",//住院人民族
            nationData:[],
            birthAddress:"",//住院人出生地
            hometown:"",//住院人籍贯
            occupation:"",//职业
            employer:"",//工作单位
            emphone:"",//工作单位联系电话
            region:"中国",//区域--其他--输入框
            accoddress:"",//户口地址
            saddres:"请选择省/市/区",
            haddres:"请选择省/市/区",
            xaddres:"请选择省/市/区",
            areaList,//选择省市区方法
            show:false,//是否显示地址选择弹框
            shows:false,//是否显示地址选择弹框
            addrCode: '',//蒙层--选择的省市区地址
            haddrCode: '',//蒙层--选择的省市区地址
            xaddrCode:"",
            message:'',//输入地址--户口
            hmessage:'',//输入地址--现住
            xmessage:"",//
            relation:"",//与联系人关系
            lxphone:"",//联系人电话
            attr:'none',//样式属性
            inforbox:"none",//样式属性
            wcheck:false,
            disabled:false,
            // addbox:'block',
            tcheck:false,
            xzaddres:false,
            xzcheck:false
        }
    },
    methods:{
        getData(){//获取数据
        // 获取id
            let parm = {
                id:this.$route.query.id
            }
            gethosReservation(parm).then((res) => {
                if(res.code == 1){
                    this.dataList = res.data
                    this.name = this.dataList.name//住院人姓名	
                    this.idnumber = this.dataList.idCardNo//住院人身份证号码
                    this.sex = this.dataList.sex//住院人性别
                    this.phone = this.dataList.phone//住院人联系电话
                    this.date = this.dataList.birthday//住院人出生日期
                    this.nation = this.dataList.nation//住院人民族	
                    this.hometown = this.dataList.hometown//住院人籍贯
                    this.birthAddress = this.dataList.birthAddress//住院人出生地
                    this.occupation = this.dataList.occupation//住院人职业
                    this.employer = this.dataList.workUnit//住院人工作单位
                    this.emphone = this.dataList.unitPhone//单位电话
                    this.mradio = this.dataList.maritalStatus//住院人婚姻状况，0：未婚，1：已婚，2：离异，3：丧偶，4：未说明
                    this.aradio = this.dataList.region//住院人区域，0：中国大陆，1：中国台湾，2：中国香港，3：中国澳门，4：其他
                    this.message = this.dataList.accountAddress//住院人户口地址
                    // this.hmessage = this.dataList.currentAddress//住院人现住址
                    this.tradio = this.dataList.currentAddressIsHalfYear//现住址是否居住半年及以上，0：是，1：否
                    this.lxname = this.dataList.contactName//联系人姓名
                    this.relation = this.dataList.contactPersonRelationship//联系人与住院人关系
                    this.lxphone = this.dataList.contactPersonPhone//联系人电话
                    this.xmessage = this.dataList.contactPersonAddress//联系人详细住址
                    this.region = this.dataList.other//其他地区
                    console.log(res)
                }else{
                    console.log(res.data)
                }
            }).catch((error) => {console.log(error)})
        },
        getGender:function(){//住院人性别
            console.log(this.xbradio)
        },
        getyMarriage:function(){//选择婚姻状况
            console.log(this.mradio)
        },
        getRegion:function(){//住院人区域
            if(this.aradio == '4'){
                console.log(this.aradio)
                this.attr = 'block'
            }else{
                this.attr = 'none'
            }
        },
        onAddrConfirm:function(e) { // 点击确认，获取所选的省市区数据
            // 确定选择,返回的必定是三元素数组
            console.log('this.onAddrConfirm=>e', e)
            this.province = e[0].name
            this.city = e[1].name
            this.district = e[2].name
            this.saddres = this.province+'/'+this.city+'/'+this.district
            this.show = false
            console.log(this.saddres)
        },
        getRestime:function(){// 居住时间选择
            console.log(this.tradio)
        },
        getPush:function(){// 是否住过院--是--提交信息
           if(this.name == '' || this.idnumber == '' || this.occupation == '' || this.lxname == ''){
               alert('请将信息填写完整')
               return
           }else{
               let data = new FormData();
                // this.dataList = res.data
                data.append('id',this.id)//住院人姓名
                data.append('name',this.name)//住院人姓名
                data.append('idCardNo',this.idnumber)//	住院人身份证号码
                data.append('sex',this.sex)//住院人性别，0：男，1：女，2：未说明
                data.append('phone',this.phone)//住院人联系电话
                data.append('birthday',this.date)//住院人出生日期
                data.append('nation',this.nation)//住院人民族
                data.append('birthAddress',this.birthAddress)//住院人出生地
                data.append('hometown',this.hometown)//住院人籍贯
                data.append('occupation',this.occupation)//住院人职业
                data.append('workUnit',this.employer)//住院人工作单位
                data.append('unitPhone',this.emphone)//	单位电话
                data.append('maritalStatus',this.mradio)//住院人婚姻状况，0：未婚，1：已婚，2：离异，3：丧偶，4：未说
                data.append('region',this.aradio)//住院人区域，0：中国大陆，1：中国台湾，2：中国香港，3：中国澳门，4：其他
                data.append('accountAddress',this.message)//住院人户口地址
                data.append('currentAddressIsHalfYear',this.tradio)//现住址是否居住半年及以上，0：是，1：否
                data.append('contactName',this.lxname)//联系人姓名
                data.append('contactPersonRelationship',this.relation)//联系人与住院人关系
                data.append('contactPersonPhone',this.lxphone)//联系人电话
                data.append('contactPersonAddress',this.xmessage)//	联系人详细住址
                data.append('other',this.region)//其他区域
                postHospitalReservation(data).then((res) => {
                    if(res.code == 1){
                        alert(res.data)
                        this.$router.push({
                            path:'/myappoinlist'
                        })
                    }else if(res.code == 0){
                        alert(res.data)
                    }
                    console.log('返回数据:',res)
                }).catch((error) => {console.log(error)})
           }
        },
        getDilet:function(){
            console.log(this.nofrom.tcheck)
            if(this.nofrom.tcheck == false){
                this.nofrom.addbox = 'none'
            }else{
                this.nofrom.addbox = 'block'
            }
        },
    },
    mounted(){
        // 获取本地数据名族
        let para = {
            pageNum:this.pageNum,
            pageSize: this.pageSize
        };
        getNation(para).then((res) => {
            this.nationData = res.data;
            // console.log(res.data)
        })
        this.getData()
        this.id = this.$route.query.id;
    }
}
</script>
<style scoped>
.content{
    width: 100%;
}
.content img:nth-child(1){
    width: 96%;
    margin: auto;
}
.content .hospital_top{
    width: 90%;
    margin: auto;
    display: block;
}
.content .hospital_top .hospital_top_title{
    text-align: left;
    width: 100%;
    line-height: 2rem;
    font-size: 1rem;
}
.content .hospital_top .hospital_check{
    width: 100%;
    /* height: 6rem; */
    background: white;
    border: 1px solid #eeeeee;
    border-radius: 5px;
}
.hospital_top .hospital_check .van-checkbox{
    height: 2rem;
    line-height: 3rem;
    width: 90%;
    margin: auto;
}
/* 住过院 */
.content .inforb_yes{
    width: 100%;
}
.content .inforb_yes .hospital_tips{
    width: 100%;
    height: 6rem;
    background-color: #53a4f4;
    margin-top: 1rem;
}
.inforb_yes .hospital_tips .hospital_tips_title{
    font-size: 1rem;
    line-height: 2rem;
    width: 80%;
    margin: auto;
    color: white;
    padding: 1rem 0;
}
.content .inforb_yes .infor_fillin,
.content .inforb_yes .infor_fillon{
    width: 100%;
    padding: 1rem 0;
}
.van-cell:not(:last-child)::after,[class*=van-hairline]::after{
    border: none;
}
.inforb_yes .van-cell{
    border-radius: 5px;
    font-size: 16px;
}
.inforb_yes .infor_fillin .van-cell-group,
.inforb_yes .infor_fillon .van-cell-group{
    background-color: #fff;
    border: 1px solid #eeeeee;
    border-radius: 5px;
    width: 90%;
    margin: auto;
}
.infor_fillin .natione,
.infor_fillon .natione{
    border: 1px solid #eeeeee;  
    width: 90%;
    margin: auto;
    margin-top: 1rem;
    /* display: none; */
}
/* 住院人婚姻状况 */
.infor_fillin .van-radio-group .van-radio,
.infor_fillon .van-radio-group .van-radio,
.hospital_top .van-radio-group .van-radio{
    height: 2rem;
    line-height: 2rem;
    text-align: left;
    float: left;
    padding: 0 2rem;
}
.van-radio-group .van-radio .van-radio__icon{
    display: inline-block;
}
.infor_fillin .van-radio-group,
.infor_fillon .van-radio-group{
    overflow: hidden;
    border: 1px solid #eeeeee;
    width: 90%;
    margin: auto;
    border-radius: 5px;
}
.hospital_top .van-radio-group{
    overflow: hidden;
    border: 1px solid #eeeeee;
    width: 100%;
    margin: auto;
    border-radius: 5px;
}
.content .infor_fillin .getbtn,
.content .infor_fillon .getbtn{
    border: none;
    margin-top: 1rem;
    background: #53a4f4;
    width: 90%;
    height: 2.5rem;
    line-height: 2.5rem;
    border-radius: 5px;
    color: white;
}
.content .select_nation{
    width: 90%;
    height: 2.5rem;
    line-height: 2.5rem;
    border: 1px solid #eeeeee;
    border-radius: 5px;
    background-color: white;
}
/* .infor_fillon .tcheck,
.infor_fillon .tcheck div{
    display: inline-block!important;
} */
/* 我的预约按钮 */
/* .getime{
    display: inline-block;
    position: fixed;
    z-index: 999;
    right: 6px;
    top: 2rem;
}
.getime .mybtn{
    height: 2rem;
    line-height: 2rem;
    border-radius: 5px;
    font-size: 12px;
} */
</style>