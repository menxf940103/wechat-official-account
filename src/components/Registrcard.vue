<template>
    <div class="content">
        <img src="../assets/images/timg.jpg"/>
        <div class="hospital_top" v-bind:style="{display:record}">
            <p class="hospital_top_title">是否在本院住过院？</p>
            <van-radio-group v-model="hospradio" @change="getCheck">
                <van-radio name="0">是</van-radio>
                <van-radio name="1">否</van-radio>
            </van-radio-group>
        </div>
        <!-- 是否在本院住过院-是 -->
        <div class="inforb_yes" v-bind:style="{display:inforbox}">
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
                <van-cell icon="phone-o" value="住院人联系电话："/>
                <van-cell-group>
                    <van-field required v-model="phone" placeholder="请输入住院人联系电话" />
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
                <van-cell icon="pending-payment" value="住院人现址：" />
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
                     <van-cell-group>
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
                    </van-popup>
                    <van-cell-group style="margin-top:20px;">
                        <van-field
                            v-model="hmessage"
                            rows="2"
                            autosize
                            type="textarea"
                            maxlength="20"
                            placeholder="详细地址（精确到门牌，最长20个字）"
                            show-word-limit
                        />
                    </van-cell-group>
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
                    <van-cell-group>
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
                    </van-popup>
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
                <button class="getbtn" @click="getPush()">提交</button>
            </div>
        </div>
        <!-- 是否在本院住过院-否 -->
        <div class="inforb_yes"  v-bind:style="{display:nofrom.onforbox}">
           <div class="hospital_tips">
                <p class="hospital_tips_title">以下信息将用于住院登记办理移机出院后申请病案邮寄等业务，请认真填写。</p>
            </div>
            <div class="infor_fillon">
                <van-cell icon="manager-o" value="住院人的姓名："/>
                <van-cell-group>
                    <van-field v-model="nofrom.name" placeholder="请输入住院人的姓名" />
                </van-cell-group>
                <van-cell icon="debit-pay" value="住院人身份证号码："/>
                <van-cell-group>
                    <van-field v-model="nofrom.idnumber" placeholder="请输入住院人的身份证号码" />
                </van-cell-group>
                <van-cell icon="phone-o" value="住院人性别："/>
                <van-radio-group v-model="nofrom.xbradio" @change="getGender">
                    <van-radio name="0">男</van-radio>
                    <van-radio name="1">女</van-radio>
                    <van-radio name="2">未说明</van-radio>
                </van-radio-group>
                <van-cell icon="phone-o" value="住院人联系电话："/>
                <van-cell-group>
                    <van-field v-model="nofrom.phone" placeholder="请输入住院人联系电话" />
                </van-cell-group>
                <van-cell icon="phone-o" value="住院人出生日期："/>
                <van-cell-group>
                    <van-field type="date" v-model="nofrom.date" placeholder="年-月-日" />
                </van-cell-group>
                <van-cell icon="phone-o" value="住院人民族："/>
                <select v-model="nofrom.nation" class="select_nation">
                    <option v-for="item in nationData" :key="item.id">{{item.name}}</option>
                </select>
                 <van-cell icon="pending-payment" value="住院人出生地址："/>
                <van-cell-group>
                    <van-cell :value="nofrom.bornaddrCode"  @click="gotAddres"/>
                </van-cell-group>
                <van-popup v-model="nofrom.shows" position="bottom" :style="{ height: '30%' }">
                    <van-area
                    :area-list="areaList"
                    title="请选择地址"
                    @confirm="gotAddrConfirm"
                    :value="addrCode"
                    :columns-num="3"
                    />
                </van-popup>
                 <van-cell icon="pending-payment" value="住院人籍贯（其父亲出生地）："/>
                <van-cell-group>
                    <van-cell :value="nofrom.fbornaddrCode"  @click="gotaaAddres"/>
                </van-cell-group>
                <van-popup v-model="nofrom.show" position="bottom" :style="{ height: '30%' }">
                    <van-area
                    :area-list="areaList"
                    title="请选择地址"
                    @confirm="gotfAddrConfirm"
                    :value="addrCode"
                    :columns-num="3"
                    />
                </van-popup>
                <van-cell icon="pending-payment" value="住院人职业："/>
                <van-cell-group>
                    <van-field v-model="nofrom.occupation" placeholder="请输入住院人职业" />
                </van-cell-group>
                <van-cell icon="pending-payment" value="住院人工作单位："/>
                    <!-- 住院人工作单位： -->
                    <!-- <label>
                        <input name="check" value="" type="checkbox" v-model="nofrom.wcheck" @click="getWork"/>无工作单位
                    </label> -->
                <!-- </van-cell> -->
                <van-cell-group>
                    <van-field v-model="nofrom.employer" :disabled="nofrom.disabled" placeholder="没有可填无" />
                </van-cell-group>
                <van-cell icon="pending-payment" value="单位电话："/>
                <van-cell-group>
                    <van-field v-model="nofrom.emphone" :disabled="nofrom.disabled" placeholder="单位电话" />
                </van-cell-group>
                <van-cell icon="pending-payment" value="住院人婚姻状况："/>
                <van-radio-group v-model="nofrom.mradio" @change="getMarriage">
                    <van-radio name="0">未婚</van-radio>
                    <van-radio name="1">已婚</van-radio>
                    <van-radio name="2">离异</van-radio>
                    <van-radio name="3">丧偶</van-radio>
                    <van-radio name="4">未说明</van-radio>
                </van-radio-group>
                <van-cell icon="pending-payment" value="住院人区域："/>
                <van-radio-group v-model="nofrom.aradio" @change="gotRegion">
                    <van-radio name="0">中国大陆</van-radio>
                    <van-radio name="1">中国台湾</van-radio>
                    <van-radio name="2">中国香港</van-radio>
                    <van-radio name="3">中国澳门</van-radio>
                    <van-radio name="4">其他</van-radio>
                </van-radio-group>
                <van-field class="natione" v-bind:style="{display:nofrom.noattr}" v-model="nofrom.region" placeholder="没有可填无"/>
                <van-cell icon="pending-payment" value="住院人户口地址："/>
                <van-cell-group>
                    <van-cell :value="nofrom.saddres"  @click="gotbbAddres"/>
                </van-cell-group>
                <van-popup v-model="nofrom.showw" position="bottom" :style="{ height: '30%' }">
                    <van-area
                    :area-list="areaList"
                    title="请选择地址"
                    @confirm="onhkAddrConfirm"
                    :value="addrCode"
                    />
                </van-popup>
                <van-cell-group style="margin-top:20px;">
                    <van-field
                        v-model="nofrom.message"
                        rows="2"
                        autosize
                        type="textarea"
                        maxlength="20"
                        placeholder="详细地址（精确到门牌，最长20个字）"
                        show-word-limit
                    />
                </van-cell-group>
                <van-cell icon="pending-payment" value="现住址是否居住半年及以上"/>
                <van-radio-group v-model="nofrom.tradio" @change="getRestime">
                    <van-radio name="1">是</van-radio>
                    <van-radio name="2">否</van-radio>
                </van-radio-group>
                <van-cell icon="pending-payment" value="联系人姓名："/>
                <van-cell-group>
                    <van-field v-model="nofrom.lxname" placeholder="非住院人，可填其亲属、朋友同事、事主等" />
                </van-cell-group>
                <van-cell icon="pending-payment" value="联系人与住院人关系："/>
                <van-cell-group>
                    <van-field v-model="nofrom.relation" placeholder="悬着联系人与住院人关系" />
                </van-cell-group>
                <van-cell icon="pending-payment" value="联系人电话："/>
                <van-cell-group>
                    <van-field v-model="nofrom.lxphone" placeholder="联系人电话" />
                </van-cell-group>
                <van-cell icon="pending-payment" value="联系人详细地址："/>
                    <!-- 联系人详细地址： -->
                    <!-- <label>
                        <input name="check" value="" type="checkbox" v-model="nofrom.tcheck" @click="getDilet"/>同现住地址
                    </label> -->
                    <!-- <van-checkbox v-model="nofrom.checked" class="tcheck">同现住地址</van-checkbox> -->
                <!-- </van-cell> -->
                <div class="addbox" :style="{display:nofrom.addbox}">
                    <van-cell-group>
                        <van-cell :value="nofrom.xaddres"  @click="gotxAddres"/>
                    </van-cell-group>
                    <van-popup v-model="nofrom.showws" position="bottom" :style="{ height: '30%' }">
                        <van-area
                        :area-list="areaList"
                        title="请选择地址"
                        @confirm="onxxAddrConfirm"
                        :value="addrCode"
                        />
                    </van-popup>
                    <van-cell-group style="margin-top:20px;">
                        <van-field
                            v-model="nofrom.xmessage"
                            rows="2"
                            autosize
                            type="textarea"
                            maxlength="20"
                            placeholder="详细地址（精确到门牌，最长20个字）"
                            show-word-limit
                        />
                    </van-cell-group>
                </div>
                <button class="getbtn" @click="gotPush()">提交</button>
            </div>
        </div>
        <div class="getime">
            <van-button class="mybtn" @click="getMybtn()" icon="underway-o" color="#53a4f4" type="primary" plain>我的预约</van-button>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import { Checkbox, CheckboxGroup, RadioGroup, Radio, Area, Popup, Button } from 'vant';
import { postHospitalization, getCode } from '../api/api'

Vue.use(Popup);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Area);
Vue.use(Checkbox).use(CheckboxGroup);
Vue.use(Button);
import { getNation } from '../api/api';
import areaList from "../assets/js/area.js";
export default {
    data(){
        return{
            codeText:"",//返回的code值
            see:false,
            record:'block',//display属性是否住院
            hospradio:"",//是否住过院
            mradio:"",//婚姻状况选择
            aradio:"",//区域选择
            tradio:"",//居住时间
            // checked: false,//--是
            // checkeda:false,//是否住过院--否
            name:"",//姓名
            lxname:"",//联系人姓名
            idnumber:"",//身份证号
            phone:"",//联系电话
            occupation:"",//职业
            employer:"",//工作单位
            emphone:"",//工作单位联系电话
            region:"中国",//区域--其他--输入框
            accoddress:"",//户口地址
            saddres:"北京市/北京市/东城区",
            haddres:"北京市/北京市/东城区",
            xaddres:"北京市/北京市/东城区",
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
            nationData:[],
            wcheck:false,
            disabled:false,
            // addbox:'block',
            tcheck:false,
            xzaddres:false,
            xzcheck:false,
            nofrom:{
                onforbox:'none',//样式属性
                name:"",
                idnumber:"",
                xbradio:"",
                phone:"",
                date:"",
                nation:"",//民族
                saddres:"",
                shows:false,
                show:false,
                showw:false,
                showws:false,
                bornaddrCode:"北京市/北京市/东城区",
                fbornaddrCode:"北京市/北京市/东城区",
                addrCode:"",
                occupation:"",
                employer:"",
                emphone:"",
                mradio:"",
                aradio:"",
                region:"中国",
                noattr:'none',//样式属性
                saddres:"北京市/北京市/东城区",
                message:"",
                tradio:"",
                lxname:"",
                relation:"",
                lxphone:"",
                xaddres:"北京市/北京市/东城区",
                xmessage:"",
                addbox:"block",
                tcheck:false,
                wcheck:false,
                disabled:false
            }
        }
    },
    methods:{
        getCheck:function(){//是否住过院
            console.log(this.hospradio);
            if(this.hospradio == '0'){
                this.inforbox = 'block'
                this.nofrom.onforbox = 'none'
            }else if(this.hospradio == '1'){
                this.inforbox = 'none'
                this.nofrom.onforbox = 'block'
            }
        },
        // getCheckn(){//是否住过院--否
        //     console.log(this.checkeda);
        // },
        getyMarriage:function(){
            console.log(this.mradio)
        },
        getMarriage:function(){//住院人婚姻状况--选择
            console.log(this.nofrom.mradio)
        },
        getRegion:function(){//住院人区域
            if(this.aradio == '4'){
                console.log(this.aradio)
                this.attr = 'block'
            }else{
                this.attr = 'none'
            }
        },
        getAddres:function(){//选择省市区--显示蒙层地址--住院人现址
            this.show = true
            console.log('住院人现址')
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
        // gethAddres:function(){//选择省市区--显示蒙层地址--现住地址
        //     this.shows = true
        //     console.log('现住地址')
        // },
        // onhAddrConfirm:function(e) { // 点击确认，获取所选的省市区数据
        //     // 确定选择,返回的必定是三元素数组
        //     console.log('this.onAddrConfirm=>e现住地址', e)
        //     this.province = e[0].name
        //     this.city = e[1].name
        //     this.district = e[2].name
        //     this.haddres = this.province+'/'+this.city+'/'+this.district
        //     this.shows = false
        // },
        getRestime:function(){// 居住时间选择
            console.log(this.tradio)
        },
        getxAddres:function(){//选择省市区--显示蒙层地址--现住地址
            this.shows = true
            console.log('2222')
        },
        onxAddrConfirm:function(e) { // 点击确认，获取所选的省市区数据
            // 确定选择,返回的必定是三元素数组
            // console.log('this.onAddrConfirm=>e', e)
            this.province = e[0].name
            this.city = e[1].name
            this.district = e[2].name
            this.xaddres = this.province+'/'+this.city+'/'+this.district
            this.shows = false
        },
        getPush:function(){// 是否住过院--是--提交信息
           if(this.name == '' || this.idnumber == '' || this.occupation == '' || this.lxname == ''){
               alert('请将信息填写完整')
               return
           }else{
               let data = new FormData();
                data.append('isHospital',this.hospradio) //是否住过院
                data.append('name',this.name) //住院人姓名
                data.append('idCardNo',this.idnumber) //住院人身份证号	
                data.append('occupation',this.occupation) //住院人职业	
                data.append('contactName',this.lxname) //联系人姓名	
                data.append('phone',this.phone) //住院人联系电话	
                // data.append('birthday',this.hospradio) //住院人出生日期	
                // data.append('nation',this.hospradio) //住院人民族	
                // data.append('birthAddress',this.hospradio) //住院人出生地	
                // data.append('hometown',this.hospradio) //住院人籍贯	
                data.append('workUnit',this.employer) //住院人工作单位	
                data.append('unitPhone',this.emphone) //单位电话
                data.append('maritalStatus',this.mradio) //住院人婚姻状况 0：未婚，1：已婚，2：离异，3：丧偶，4：未说明
                data.append('region',this.aradio) //住院人区域，0：中国大陆，1：中国台湾，2：中国香港，3：中国澳门，4：其他
                data.append('accountAddress',this.message) //住院人户口地址
                data.append('currentAddress',this.saddres+this.hmessage) //	住院人现住址
                data.append('currentAddressIsHalfYear',this.tradio) //现住址是否居住半年及以上，0：是，1：否
                data.append('contactPersonRelationship',this.relation) //联系人与住院人关系
                data.append('contactPersonPhone',this.lxphone) //	联系人电话
                data.append('contactPersonAddress',this.xaddres+this.xmessage) //联系人详细住址	
                data.append('other',this.region) //其他区域（住院人区域为其他时必填）
                postHospitalization(data).then((res) => {
                    if(res.code == 1){
                        this.getyCodetext()//获取二维码请求
                        alert(res.desc)
                        
                    }else if(res.code == 0){
                        alert(res.data)
                    }
                    console.log('返回数据:',res)
                }).catch((error) => {console.log(error)})
           }
        },
        getyCodetext(){
            let parma = {
                idCardNo:this.idnumber
            }
            getCode(parma).then((res) => {
                console.log(res)
                this.codeText = res.data
                if(res.code == 1){
                    this.$router.push({
                        path:'/successqrcode',
                        query:{codeText:this.codeText}
                    })
                }else {
                    alert(res.data)
                    return
                }
            }).catch((error) => {console.log(error)})
        },
        // getWorky:function(){//无工作单位
        //     console.log(this.wcheck)
        //     if(this.wcheck == false){
        //         this.disabled = true
        //     }else{
        //         this.disabled = false
        //     }
        // },
        // getDilety:function(){//同户口地址
        //     console.log(this.tcheck)
        //     if(this.tcheck == false){
        //         this.xzaddres = 'none'
        //     }else{
        //         this.xzaddres = 'block'
        //     }
        // },
        // getDiletyxz:function(){//同现住址
        //     console.log(this.xzcheck)
        //     if(this.xzcheck == false){
        //         this.addbox = 'none'
        //     }else{
        //         this.addbox = 'block'
        //     }
        // },
        // 是否在本院住过院---否
        getGender:function(){//住院人性别
            console.log(this.nofrom.xbradio)
        },
        gotAddres:function(){//住院人出生地址--点击弹出地址选择层
            this.nofrom.shows = true
        },
        gotAddrConfirm:function(e) { // 点击确认，获取所选的省市区数据
            // 确定选择,返回的必定是三元素数组
            console.log('this.onAddrConfirm=>e', e)
            this.province = e[0].name
            this.city = e[1].name
            this.district = e[2].name
            this.nofrom.bornaddrCode = this.province+'/'+this.city+'/'+this.district
            this.nofrom.shows = false
            console.log('出生地址：',this.nofrom.bornaddrCode)
        },
        gotaaAddres:function(){//住院人出生地址--点击弹出地址选择层
            this.nofrom.show = true
        },
        gotfAddrConfirm:function(e) { // 点击确认，获取所选的省市区数据
            // 确定选择,返回的必定是三元素数组
            // console.log('this.onAddrConfirm=>e', e)
            this.province = e[0].name
            this.city = e[1].name
            this.district = e[2].name
            this.nofrom.fbornaddrCode = this.province+'/'+this.city+'/'+this.district
            this.nofrom.show = false
            console.log(this.nofrom.fbornaddrCode)
        },
        gotRegion:function(){//住院人区域
            if(this.nofrom.aradio == '4'){
                this.nofrom.noattr = 'block'
            }else{
                this.nofrom.noattr = 'none'
            }
            console.log(this.nofrom.aradio)
        },
        gotbbAddres:function(){//住院人出生地址--点击弹出地址选择层
            this.nofrom.showw = true
        },
        onhkAddrConfirm:function(e) { // 点击确认，获取所选的省市区数据
            // 确定选择,返回的必定是三元素数组
            console.log('this.onAddrConfirm=>e', e)
            this.province = e[0].name
            this.city = e[1].name
            this.district = e[2].name
            this.nofrom.saddres = this.province+'/'+this.city+'/'+this.district
            this.nofrom.showw = false
            console.log(this.nofrom.saddres)
        },
        gotxAddres:function(){
            this.nofrom.showws = true;
        },
        onxxAddrConfirm:function(e) { // 点击确认，获取所选的省市区数据
            // 确定选择,返回的必定是三元素数组
            // console.log('this.onAddrConfirm=>e', e)
            this.province = e[0].name
            this.city = e[1].name
            this.district = e[2].name
            this.nofrom.xaddres = this.province+'/'+this.city+'/'+this.district
            this.nofrom.showws = false
            console.log(this.nofrom.xaddres)
        },
        gotPush:function(){ //是否在本院住过院--否--提交
            // console.log('民族',this.nation)
            if(this.nofrom.name == '' || this.nofrom.idnumber == '' || this.nofrom.xbradio == '' || this.nofrom.occupation == '' ||
             this.nofrom.lxname == '' || this.nofrom.phone == '' || this.nofrom.date == '' || this.nofrom.nation == '' ||
             this.nofrom.bornaddrCode == '' || this.nofrom.fbornaddrCode == '' || this.nofrom.employer == '' || this.nofrom.emphone == '' || 
             this.nofrom.mradio == '' || this.nofrom.aradio == '' || this.nofrom.saddres == '' || this.nofrom.message == '' || 
             this.nofrom.tradio == '' || this.nofrom.relation == '' || this.nofrom.lxphone == '' || this.nofrom.xaddres == '' ||
             this.nofrom.xmessage == '' || this.nofrom.region== ''){
                alert('请将信息填写完整')
                return
            }else {
                let data = new FormData();
                data.append('isHospital',this.hospradio) //是否住过院
                data.append('name',this.nofrom.name) //住院人姓名
                data.append('idCardNo',this.nofrom.idnumber) //住院人身份证号	
                data.append('sex',this.nofrom.xbradio)//住院人性别，0：男，1：女，2：未说明
                data.append('occupation',this.nofrom.occupation) //住院人职业	
                data.append('contactName',this.nofrom.lxname) //联系人姓名	
                data.append('phone',this.nofrom.phone) //住院人联系电话	
                data.append('birthday',this.nofrom.date) //住院人出生日期	
                data.append('nation',this.nofrom.nation) //住院人民族	
                data.append('birthAddress',this.nofrom.bornaddrCode) //住院人出生地	
                data.append('hometown',this.nofrom.fbornaddrCode) //住院人籍贯	
                data.append('workUnit',this.nofrom.employer) //住院人工作单位	
                data.append('unitPhone',this.nofrom.emphone) //单位电话
                data.append('maritalStatus',this.nofrom.mradio) //住院人婚姻状况 0：未婚，1：已婚，2：离异，3：丧偶，4：未说明
                data.append('region',this.nofrom.aradio) //住院人区域，0：中国大陆，1：中国台湾，2：中国香港，3：中国澳门，4：其他
                data.append('accountAddress',this.nofrom.saddres+this.nofrom.message) //住院人户口地址
                // data.append('currentAddress',this.nofrom.saddres+this.nofrom.hmessage) //	住院人现住址
                data.append('currentAddressIsHalfYear',this.nofrom.tradio) //现住址是否居住半年及以上，0：是，1：否
                data.append('contactPersonRelationship',this.nofrom.relation) //联系人与住院人关系
                data.append('contactPersonPhone',this.nofrom.lxphone) //	联系人电话
                data.append('contactPersonAddress',this.nofrom.xaddres+this.nofrom.xmessage) //联系人详细住址	
                data.append('other',this.nofrom.region) //其他区域（住院人区域为其他时必填）
                postHospitalization(data).then((res) => {
                    if(res.code == 1){
                        alert(res.data)
                        this.getnCodetext()
                    }else if(res.code == 0){
                        alert(res.data)
                    }
                    console.log('返回数据:',res)
                }).catch((error) => {console.log(error)})
            }
        },
        getnCodetext(){
            let parma = {
                idCardNo:this.nofrom.idnumber
            }
            getCode(parma).then((res) => {
                console.log(res)
                this.codeText = res.data
                if(res.code == 1){
                    this.$router.push({
                        path:'/successqrcode',
                        query:{codeText:this.codeText}
                    })
                }else {
                    alert(res.data)
                    return
                }
            }).catch((error) => {console.log(error)})
        },
        getDilet:function(){
            console.log(this.nofrom.tcheck)
            if(this.nofrom.tcheck == false){
                this.nofrom.addbox = 'none'
            }else{
                this.nofrom.addbox = 'block'
            }
        },
        // getWork:function(){//无工作单位
        //     console.log(this.nofrom.wcheck)
        //     if(this.nofrom.wcheck == false){
        //         this.nofrom.disabled = true
        //     }else{
        //         this.nofrom.disabled = false
        //     }
        // },
        getMybtn:function(){//我的预约
            console.log('我的预约')
            this.$router.push({
                path:'/myappoinlist',
                query:{id:1}
            })
        }
    },
    mounted(){
        let para = {
            pageNum:this.pageNum,
            pageSize: this.pageSize
        };
        getNation(para).then((res) => {
            this.nationData = res.data;
            // console.log(res.data)
        })
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
.getime{
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
}
</style>