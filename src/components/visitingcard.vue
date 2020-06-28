<template>
    <div class="content">
        <van-cell-group>
           <van-field v-model="value" clearable left-icon="contact" placeholder="请输入就诊人姓名" />
        </van-cell-group>
        <van-cell-group>
           <van-field v-model="number" clearable left-icon="idcard" placeholder="请输入就诊卡号" />
        </van-cell-group>
        <van-cell-group class="aggregate">
            <select v-model="select" placeholder="请输入证件号码" @change="changeProduct($event)" class="chois">
                <option value="证件类型">证件类型</option>
                <option value="大陆">大陆</option>
                <option value="港澳">港澳</option>
            </select>
            <van-field width="50%" class="Certificates_number" v-model="cnumber" clearable placeholder="请输入证件号码" />
        </van-cell-group>
        <van-cell-group>
           <van-field maxlength="11" v-model="phone" clearable left-icon="phone-o" placeholder="请输入您的手机号" />
        </van-cell-group>
        <van-cell-group>
            <van-field v-model="yznumber" clearable left-icon="label-o" placeholder="请输入图形验证码">
                <van-button class="button" slot="button" size="small" type="default" :style="`width:${width}; height:${height}`" @click="createdCode">
                    <span v-for="(item, index) in codeList" :key="index" :style="getStyle(item)">{{item.code}}</span>
                </van-button>
            </van-field>
        </van-cell-group>
        
        <div class="explain">
            <p class="explain_title">绑定说明:</p>
            <p class="explain_content">绑定微信可以进行预约挂号、诊间支付、查询诊疗信息等功能;</p>
            <p class="explain_content">1.绑卡用户请输入真实准确就诊人的“姓名”，“证件号”、“手机号”；</p>
            <p class="explain_content">2.“证件号”目前支持：大陆身份证、港澳台身份证；</p>
            <p class="explain_content">3.每个微信目前最多可绑定5个就诊人；</p>
            <p class="explain_content">4.医保病人完成电脑号的绑定后，请在“我的信息”页面点击“我的社保卡”查看已绑定或者绑定本人社保卡；</p>
            <p class="explain_content">5.绑定的信息将作为就诊参考凭证。</p>
        </div>
        <van-button @click="suBmission" type="primary" size="large">确认添加</van-button>
    </div>
</template>
<script>

import Vue from 'vue';
import {Cell ,CellGroup, Field, Button } from 'vant';

Vue.use(Field);
Vue.use(Cell).use(CellGroup)
Vue.use(Button).use(Button)


export default {
    component:{
        [Field.name]: Field,
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup,
        [Button.name]: Button,
    },
    props: {
            width: {
                type: String,
                // default: '200px'
            },
            height: {
                type: String,
                default: '20px'
            },
            length: {
                type: Number,
                default: 4
            }
        },
    data(){
        return {
            value:'',//选择类型
            select:'证件类型',
            number:'',//就诊卡号
            cnumber:'',//证件号
            phone:'',//手机号
            yznumber:'',//图形验证码
            codeList: [],
            url:""//上一个界面路由
        }
    },
    methods:{
        changeProduct:function(event){//证件类型选择
            // console.log(this.select)
        },
        suBmission:function(){
            if(this.yznumber.toLowerCase() == this.Vericode.toLowerCase()){
                this.$router.push({path:'/choicehospital'})
            }else{
                alert('验证码错误')
            }
        },
        createdCode () {//验证码
            let len = this.length,
                codeList = [],
                chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789',
                charsLen = chars.length
            // 生成随机验证码
            for (let i = 0; i < len; i++) {
                let rgb = [Math.round(Math.random() * 220), Math.round(Math.random() * 240), Math.round(Math.random() * 200)]
                codeList.push({
                    code: chars.charAt(Math.floor(Math.random() * charsLen)),
                    color: `rgb(${rgb})`,
                    fontSize:`20px`,
                    padding: `${[Math.floor(Math.random() * 5)]}px`,
                    transform: `rotate(${Math.floor(Math.random() * 90) - Math.floor(Math.random() * 90)}deg)`
                })
            }
            // 指向
            this.codeList = codeList
            // console.log(this.codeList.length);
            for(let i=0;i<codeList.length;i++){
                this.Numbercode += codeList[i].code;
			}
			this.Vericode = this.Numbercode.substring(this.Numbercode.length-4);
            // 将当前数据派发出去
            this.$emit('update:value', codeList.map(item => item.code).join(''))
        },
        getStyle (data) {//验证码样式
            return `color: ${data.color}; font-size: ${data.fontSize}; padding: ${data.padding}; transform: ${data.transform}`
        },
        getAlert(){
            this.$dialog.confirm({
                title:"温馨提示",
                message:"如果你是医保患者，可使用社保卡绑定",
                confirmButtonText:'社保绑定',
                cancelButtonText:'手动绑定'
            }).then(() => {
                // console.log('社保绑定')
                //点击社保绑定跳转到社保绑定界面
            }).catch(() => {
                // console.log('手动绑定')
            })
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm=>{
            // console.log(to)
            // console.log(from.path)
            if(from.path === '/smartanswer'){
                // console.log('上个地址')
            }else {
                vm.getAlert();//弹框
            }
        })
    },
    mounted(){
        this.createdCode()
    },
    
}
</script>
<style scoped>

.content{
    width: 90%;
    margin: auto;
}
.content .aggregate{
    display: flex;
    flex-direction: row;
}
.content .chois{
    text-align: left;
    border: none;
    height: 40px;
    line-height: 40px;
    -webkit-appearance: none;
    appearance:none;
    -moz-appearance: none;
    -webkit-appearance: none;
    background: url('../assets/images/xia.png');
    background-position: 16px -20px;
    width: 64px;
    font-size: 12px;
    background-size: 80px;
}
.content .Certificates_number{
    flex: 3;
}
.content .button{
    width: 100px;
}
.content .van-button--large{
    border-radius: 5px;
    height: 2.5rem;
    line-height: 2.5rem;
}
/* 说明 */
.content .explain{
    text-align: left
}
.content .explain .explain_title{
    font-size: 16px;
    font-weight: 600;
    line-height: 50px;
}
.content .explain .explain_content{
    font-size: 12px;
    line-height: 24px;
}

</style>