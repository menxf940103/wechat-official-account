<template>
  <div class="registerinfo">
        <!-- <van-form @submit="onSubmit"> -->
            <van-field v-model="name" label="姓名 ："  required />
            <van-field v-model="gender" label="性别 ：" required  readonly  :value="gender" @click="showPickerGender = true"   right-icon="arrow-down" />
            <van-popup v-model="showPickerGender" position="bottom">
                <van-picker
                    show-toolbar
                    :columns="genderList"
                    @confirm="onConfirmGender"
                    @cancel="showPickerGender = false"
                />
            </van-popup>
            <van-field v-model="nation" label="民族 ：" required readonly :value="nation" @click="showPickerNational = true" right-icon="arrow-down" />
            <van-popup v-model="showPickerNational" position="bottom">
                <van-picker
                    show-toolbar
                    value-key="name"
                    :columns="nationalList"
                    @confirm="onConfirmNational"
                    @cancel="showPickerNational = false"
                />
            </van-popup>
            <van-field v-model="birthday" label="出生日期 ："  required readonly :value="birthday" @click="showPickerBirthday = true" right-icon="arrow-down"/>
            <van-popup v-model="showPickerBirthday" position="bottom">
                <van-datetime-picker
                v-model="currentDate"
                type="date"
                :min-date="minDate"
                :max-date="maxDate"
                :formatter="formatter"
                @confirm="onConfirmBirthday"
                @cancel="showPickerBirthday = false"
                />    
            </van-popup>
            <van-field v-model="idNumber" label="身份证 ：" required @blur="checkIdCard"  />
            <van-field v-model="phone" type="tel" label="手机号 ：" required  @blur="checkPhone"/>
            <!-- <van-field label="验证码 ：" placeholder="请输入验证码" required>
                <template #button>
                    <van-button size="small" type="primary" @click="getInfo">发送验证码</van-button>
                </template>
            </van-field> -->
            <van-field v-model="address" label="地址 ："  />
            <van-button class="btn" round block type="info" v-if="state==0" native-type="submit"  @click="pushData">提交</van-button>
            <van-button class="btn" round block type="info" v-if="state==1" native-type="submit"  @click="changeData">确认修改</van-button>
            <span class="authorization" v-if="state==0" @click="authorizationAction">已有健康卡，一键授权</span>
        <!-- </van-form> -->
        <van-loading v-if="showLoading" />
  </div>
</template>

<script>
import Vue from 'vue'
import { Form ,Field , Button   ,Picker ,DatetimePicker, Toast,Loading  } from 'vant';
import { getNation ,postRegisterInfo ,getAuthorization,changePersonalInfo} from '../api/api'
export default {
    name:'registerinfo',
    components:{
        [Picker.name]:Picker,
        [DatetimePicker.name]:DatetimePicker
    },
    data() {
        return {
            name:'', 
            gender:'',
            nation:'',
            idNumber:'',
            birthday:'',
            phone:'',
            address:'',
            patid:'',
            showPickerGender:false,
            genderList:['男','女'],
            showPickerNational:false,
            nationalList:[],
            showPickerBirthday:false,
            minDate: new Date(1820, 0, 1),
            maxDate: new Date(2200, 10, 1),
            currentDate: new Date(),
            wechatCode:'',
            state:'0',
            showLoading:false,//是否显示loading
        }
    },
    methods: {
        // 性别选择确认
        onConfirmGender(value){
            this.gender = value;
            this.showPickerGender = false;
        },
        // 获取本地民族列表数据
        getNationAction:function(){
            getNation().then(res=>{
                this.nationalList = res.data
            }).catch(err=>{console.log(err)})
        },
        // 民族选择确认
        onConfirmNational(value){
            this.nation = value.name
            this.showPickerNational = false
        },
        // 出生日期选择确认
        onConfirmBirthday(value){
            let d = new Date(value)
            let resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
            this.birthday = resDate
            this.showPickerBirthday = false
        },
        // 规范日期格式
        p(s) {
            return s < 10 ? '0' + s : s
        },
        // 给选择的时间添加年月日
        formatter(type, val) {
            if (type === 'year') {
                return `${val}年`;
            } else if (type === 'month') {
                return `${val}月`
            }else if(type === 'day'){
                return `${val}日`
            }
            return val;
        },
        // 验证输入的身份证号是否规范
        checkIdCard(e){
            // 验证身份证号码格式是否正确
            var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
            if(reg.test(e.target.value) === false){
                Toast('身份证号格式有误')
            }
        },
        // 手机号码验证
        checkPhone(e){
            const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
            if(reg.test(e.target.value) == false){
                Toast('手机号码格式有误')
            }
        },
        // 发送短信验证码
        getInfo(){
            if(this.phone == '' || this.phone.length != 11){
                Toast('请输入正确的手机号')
            }
        },
        // 注册提交数据
        pushData:function(){
            if(!this.name){
                Toast('姓名不能为空')
                return
            }
            if(!this.gender){
                Toast('性别不能为空')
                return
            }
            if(!this.nation){
                Toast('民族不能为空')
                return
            }
            if(!this.birthday){
                Toast('出生日期不能为空')
                return
            }
            if(!this.idNumber){
                Toast('身份证号不能为空')
                return
            }
            if(!this.phone){
                Toast('手机号不能为空')
                return
            }
            let data = new FormData()
            data.append('name',this.name)
            data.append('gender',this.gender)
            data.append('nation',this.nation)
            data.append('birthday',this.birthday)
            data.append('idNumber',this.idNumber)
            data.append('address',this.address)
            data.append('phone',this.phone)
            data.append('wechatCode',this.wechatCode)
            // let param ={
            //     name:this.name,
            //     gender:this.gender,
            //     nation:this.national,
            //     birthday:this.birthday,
            //     idNumber:this.idNumber,
            //     address:this.address,
            //     phone:this.phone,
            //     wechatCode:this.wechatCode
            // };
            // 注册请求
            postRegisterInfo(data).then(res=>{
                this.showLoading = true
                if(res.code == 1){
                    this.showLoading = false
                    this.$router.push({
                        path:'/'
                    })
                }else{
                    alert(res.data)
                }
            }).catch(err=>{console.log(err)})
        },
        //修改个人信息
        changeData(){
            if(!this.name){
                Toast('姓名不能为空')
                return
            }
            if(!this.gender){
                Toast('性别不能为空')
                return
            }
            if(!this.nation){
                Toast('民族不能为空')
                return
            }
            if(!this.birthday){
                Toast('出生日期不能为空')
                return
            }
            if(!this.idNumber){
                Toast('身份证号不能为空')
                return
            }
            if(!this.phone){
                Toast('手机号不能为空')
                return
            }
            let data = new FormData()
            data.append('wechatCode',this.wechatCode)
            data.append('name',this.name)
            data.append('gender',this.gender)
            data.append('nation',this.nation)
            data.append('birthday',this.birthday)
            data.append('idNumber',this.idNumber)
            data.append('address',this.address)
            data.append('phone',this.phone)
            data.append('patid',this.patid)

            changePersonalInfo(data).then(res=>{
                if(res.code  == 1){
                    this.$router.push({
                        path:'/personalinfor'
                    })
                }
            }).catch(err=>{console.log(err)})
        },
        // 一键授权
        authorizationAction(){
            getAuthorization().then(res=>{
                window.location.href = res.data
            }).catch(err=>{console.log(err)})
        }
    },
    mounted(){
        this.wechatCode = this.$route.query.wechatCode
        this.state = this.$route.query.state ?  this.$route.query.state:'0'
        this.name = this.$route.query.name || '', 
        this.gender = this.$route.query.gender || '',
        this.nation = this.$route.query.nation || '',
        this.idNumber = this.$route.query.idNumber || '',
        this.birthday = this.$route.query.birthday || '',
        this.phone = this.$route.query.phone || '',
        this.address = this.$route.query.address || '',
        this.patid = this.$route.query.patientId || ''
        this.getNationAction()
    }
}
</script>

<style scoped>
.registerinfo{
    text-align: left;
}
.van-cell {
    padding: 15px 16px;
}
.btn{
    width: 80%;
    height: 40px;
    line-height: 40px;
    margin:  50px auto 0;
    border-radius: 40px;
}
 .authorization{
    display: block;
    color: #1989FA;
    font-size: 14px;
    width: 50%;
    text-align: center;
    margin: 20px  auto;
}
</style>