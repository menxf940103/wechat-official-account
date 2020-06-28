<template>
    <div class="content">
        <div class="top">
            <p class="top_pic" ><img src="../assets/images/xiaodu.jpg"/></p>
            <p class="top_text">正在与智能机器人对话中...</p>
        </div>
        <div class="dialo">
            <p class="dialo_title">
                <span>下午好，智能机器人帮您找到合适的医生</span>
            </p>
            <p class="dialo_text">
                <span>请新建就诊卡</span>
            </p>
            <p class="dialo_rtext" :style="{display:attr}">
                <span style="white-space:wrap; max-width:10rem;word-break:break-all">{{this.name}} {{this.cardNum}}</span>
            </p>
            <p class="dialo_text" :style="{display:leftattr}">
                <span>请您详细描述您的症状，请说明主要哪里不舒服，持续了多久，您可以参考一下案列来描述：“胃痉挛，胃部隐痛，上腹部疼痛。”</span>
            </p>
            <p class="dialo_rtext" :style="{display:sendattr}">
                <span>{{this.sendinfor}}</span>
            </p>
            <p class="dialo_text" :style="{display:recomattr}">
                <span>根据您的描述，为您推荐以下医生：</span>
            </p>
            <div class="doct" :style="{display:doctattr}">
                <div class="box">
                    <div class="list">
                        <ul>
                            <li v-for="(item,index) in this.deptList" :key="item.id" :class="{active:num==index}" @click="getNum(index)">{{item.parentName}}</li>
                        </ul>
                    </div>
                    <div class="cont" >
                        <div v-for='(itemCon,index) in this.deptList' v-show="index == num" :key="index">
                            <van-cell v-for="(items,index) in itemCon.depts " :key="index" :title="items.deptName" is-link :to="{ path: 'outdepartment', query: { deptId : items.deptId}}"  />
                        </div>
                    </div> 
                </div>
            </div>
        </div>
        <div class="add_card">
            <div :style="{display:allattr}">
                <div class="card_list">
                    <p class="add_infor" v-for="item in this.dataList" :key="item.patientId">
                        <button class="addbtn" @click="getAddnews(item)">{{item.name}}</button>
                    </p>
                </div>
                <!-- <p class="add_infor">
                    <button class="addbtn" @click="getAddcar">+新建就诊卡</button>
                </p>  -->
            </div>
            <div :style="{display:inputattr}">
                <p class="add_input">
                    <input type="text" placeholder="请输入症状/医生/科室..." @focus="getfous" v-model="sendinfor" @blur="scrollAction" />
                    <button class="" @mousedown="sendOut">发送</button>
                </p> 
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import { getPaientInfo,  getDeptInfo} from '../api/api'
import { Toast } from 'vant'
export default {
    data(){
        return{
            num: 0,
            attr:"none",//发送卡片
            leftattr:"none",//回复卡片
            allattr:"display",//添加卡片、已添加卡片信息
            inputattr:"none",//输入发送
            sendattr:"none",//发送的消息
            sendinfor:"",//输入信息
            recomattr:"none",//推荐提示
            doctattr:"none",
            dataList:[],//就诊卡信息
            name:"",//发送名字
            cardNum:"",//发送就诊卡号
            deptList:[],//获取科室列表
            data:""//日期时间1
        }
    },
    methods:{
        // getAddcar(){//新建就诊卡
        //     addPatientCard().then(res=>{
        //         window.location.href = res.data
        //     }).catch(err=>{console.log(err)})
        // },
        getAddnews(item){//已建卡人卡片
            this.name = item.name
            this.cardNum = item.healthCardId
            this.attr = 'block'
            setTimeout(() => {
                this.leftattr = 'block' 
                this.allattr = 'none'
                this.inputattr = 'block'
            },600)
        },
        sendOut(){//发送消息
            if(this.sendinfor != ''){
                getDeptInfo().then((res) => {
                    if(res.code == 1){
                        this.deptList = res.data
                    }else{
                       console.log(res.data) 
                    }
                }).catch((error) => {console.log(error)})
                this.sendattr = 'block'
                this.inputattr = 'none'
                setTimeout(() => {
                    this.recomattr = 'block'
                    this.doctattr = 'block'
                },200)
            }else{
                Toast('输入内容不能为空')
                return
            }
        },
        getNum(index) {
          this.num = index;
        },
        getInfor:function(){//获取就诊卡信息
            getPaientInfo().then((res) => {
                this.dataList = res.data
            })
        },
        addDate() {//获取当前日期
            var nowDate = new Date();
            let date = {
                year: nowDate.getFullYear(),
                month: nowDate.getMonth() + 1,
                date: nowDate.getDate(),
            }
            this.data = date.year + '-' + (date.month < 10 ? ('0' + date.month) : (date.month)) + '-' + (date.date < 10 ? ('0' + date.date) : (date.date));
            // console.log(this.data);
        },
        getMydoct:function(item){//跳转医生信息
            console.log(item)
            this.$router.push({
                path:'/doctorout',
                query:{doctorId:item.doctorId,regDate:this.data}
            })
        },
        // 输入框失去焦点事件
        scrollAction(){
            document.querySelector('.cominfor').style.display = 'block'
            document.querySelector('.add_card').style.bottom = 38 +'px'
            scrollTo(0,0)
        },
        // 输入框获取焦点事件
        getfous(){
            document.querySelector('.cominfor').style.display = 'none'
            document.querySelector('.add_card').style.bottom = 0
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm=>{          //  这里的vm指的就是vue实例，可以用来当做this使用
            // console.log(to)
            // console.log(from)//获取上一个路由
        })
    },

    mounted() {
        this.addDate()//日期时间
        this.getInfor()//获取信息
    },

}

</script>
<style scoped>
.content{
    width: 100%;
    padding-bottom: 4rem;
    margin: auto;
}
.content .top{
    width: 100%;
}
.content .top .top_pic{
    width: 100%;
}
.top .top_pic img{
    height: 4rem;
    border-radius: 50%;
}
.content .top .top_text{
    font-size: 12px;
    color: #c1c1c2;
}
/* 交流信息 */
.content .dialo{
    width: 100%;
    z-index: 100;
    margin: auto;
}
.content .dialo .dialo_title{
    text-align: left;
    margin-top: 20px;
    position:relative;
	animation:myfirst 800ms;
}
/* @keyframes myfirst{
    0%  {left:-40px;top:0px;}
	100% {left:0px;top:0px;}
} */
.content .dialo .dialo_text{
    text-align: left;
    margin-top: 20px;
    position:relative;
	animation:mytirst 800ms;
    /* animation-delay:400ms; */
}
@keyframes mytirst{
    0%   {left:-40px;top:0px;}
    100%   {left:0px;top:0px;}
}
.content .dialo .dialo_rtext{
    text-align: right;
    margin-top: 20px;
    position: relative;
    animation: rightletter 1s;
}
@keyframes rightletter{
    0% {right: -40px;top: 0px;}
    100% {right: 0px;top: 0px;}
}
.content .dialo .dialo_title span,
.content .dialo .dialo_text span{
    padding: 10px;
    font-size: 12px;
    line-height: 14px;
    margin-left: 20px;
    background-color: #eeeeee;
    text-align: left;
    display: inline-block;
    max-width: 10rem;
    border-radius: 5px;
}
.content .dialo .dialo_rtext span{
    padding: 10px;
    font-size: 12px;
    line-height: 14px;
    margin-right: 20px;
    background-color: #eeeeee;
    text-align: left;
    display: inline-block;
    max-width: 10rem;
    border-radius: 5px;
}
.content .add_card{
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 38px;
    margin-bottom: 1rem;
}
.content .add_card .add_infor{
    width: 96%;
    margin: auto;
    border-radius: .3rem;
    height: 2.5rem;
    line-height: 2.5rem;
    font-size: 14px;
    color: #53a4f4;
    background-color: #f0f0f6;
    margin-bottom: 0.3rem;
}
.content .add_card .addbtn{
    border: none;
    color: #53a4f4;
    font-size: 14px;
    height: 2.5rem;
    line-height: 2.5rem;
    width: 96%;
    background-color: #f0f0f6;
}
.content .add_card .add_input{
    width: 100%;
    font-size: 14px;
}
.add_card .add_input input{
    width: 76%;
    height: 2rem;
    padding-left: 1rem;
    box-sizing: border-box;
    border-radius: .3rem;
    line-height: 2rem;
    background-color: #f0f0f6;
    border: none;
}
.add_card .add_input button{
    border: 1px solid #cccccc;
    background-color: white;
    width: 18%;
    height: 2rem;
    line-height: 2rem;
    border-radius: 16px;
}
/* 推荐医生信息列表 */
.content .box{
    width: 100%;
    display: flex;
    flex-direction: row;
    /* position: absolute; */
    margin-top: 5rem;
}
.content .box .list{
    flex: 1;
}
.box .list ul{
    display: block;
    list-style: none;
    padding: 0;
    margin: 0;
    color: #717181;
    font-size: 16px;
    line-height: 60px;
    background-color: #f9f9f9;
}
.box .list ul li{
    font-size: 12px;
    height: 3rem;
    line-height: 3rem;
}
.content .box .cont{
    flex: 2;
}
.active {
    color: #fff;
    background: #77b6f3;
}
.van-cell {
    text-align: left;
}
/* 就诊卡 */
.add_card .card_list{
    overflow-y: auto;
}
</style>