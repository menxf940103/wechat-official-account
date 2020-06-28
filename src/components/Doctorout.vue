<template>
    <div class="content">
        <div class="card_li_top">
            <div class="li_top_img">
                <img src="../assets/images/timg (2).jpg"/>  
            </div>
            <div class="li_top_title">
                <p>
                    <span style="width:60px;display:inline-block;">{{doctorInfoMap.doctorName}}</span>
                    <span style="color:#cccccc;">{{doctorInfoMap.doctorLevel}}</span>
                </p>
                <p><span class="keshi">{{doctorInfoMap.deptName}}</span></p>
                <!-- <p style="color:#cccccc;">{{doctorInfoMap.deptName}}</p> -->
            </div>
            <div class="li_top_score">
                <van-checkbox @click="getCheck(item)" v-model="checked" style="height:40px;">
                    <img style="width:30px;height:30px;"
                        slot="icon"
                        slot-scope="props"
                        :src="props.checked ? inactiveIcon:activeIcon "
                    >
                </van-checkbox>
                <!-- <span v-if="value==1">已收藏</span>
                <span v-else></span> -->
            </div>
        </div>
        <div class="register">
            <van-tabs v-model="active">
			    <van-tab title="挂号">
                    <div class="time" style="display:none">
                        <ul class="time_week">
                            <!-- <li  class="week_day" v-for="(tab,index) in months" :key="tab.id" v-bind:class="{active:tab.state}" @click="getNum(tab,index)"> -->
                            <li  class="week_day active1" @click="getNum()">
                                <span>周一</span>
                                <span>11-22</span>
                            </li>
                            <li  class="week_day" @click="getNum()">
                                <span>周二</span>
                                <span>11-22</span>
                            </li>
                            <li  class="week_day" @click="getNum()">
                                <span>周三</span>
                                <span>11-22</span>
                            </li>
                            <li  class="week_day" @click="getNum()">
                                <span>周四</span>
                                <span>11-22</span>
                            </li>
                            <li  class="week_day" @click="getNum()">
                                <span>周五</span>
                                <span>11-22</span>
                            </li>
                            <li  class="week_day" @click="getNum()">
                                <span>周六</span>
                                <span>11-22</span>
                            </li>
                            <li  class="week_day" @click="getNum()">
                                <span>周日</span>
                                <span>11-22</span>
                            </li>
                        </ul>
                    </div>
                    <div class="register_ticket">
                        <ul class="ticket_list">
                            <router-link tag="li" :to="{
                                path:'/register',
                                query:{
                                    doctorId:doctorInfoMap.doctorId,
                                    doctorName:doctorInfoMap.doctorName,
                                    deptName:doctorInfoMap.deptName,
                                    doctorLevel:doctorInfoMap.doctorLevel,
                                    startTime:item.startTime,
                                    endTime:item.endTime,
                                    regDate:regDate,
                                    regFee:regFee,
                                    deptId:deptId,
                                    shiftCode:shiftCode,
                                    scheduleId:scheduleId,
                                    treatFee:treatFee,
                                    getName:getName
                                }
                                }" class="ticket_status_a" v-for="item in this.dataList" :key="item.id">
                                <div class="ticket_status_left">
                                    <span class="status_left_yy">可预约</span>
                                    <span>{{item.startTime}}-{{item.endTime}}</span>
                                    <!-- <span>{{this.addFrom.time}}</span> -->
                                </div>
                                <div class="ticket_status_right">
                                    <span class="status_left_yuan">&#65509;{{regFee}}</span>
                                    <span class="status_left_yupiao">余{{item.regLeaveCount}}</span>
                                </div>
                            </router-link>
                        </ul>
                    </div>
                </van-tab>
                <van-tab title="介绍">
                    <p class="introduc_title">
                        <img src="../assets/images/introduc.png"/>
                        <span>介绍和特长</span>
                    </p>
                    <p style="word-break: break-all;text-align: left;">{{this.description}}</p>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import { Tab, Tabs, Notify } from 'vant';
import { getTimeInfo, postFavorite } from '../api/api'
Vue.use(Tab).use(Tabs);
Vue.use(Notify);

window.alert = function(name){//解决苹果手机使用alert提示显示url地址的问题
    var iframe = document.createElement("IFRAME");
    iframe.style.display="none";
    iframe.setAttribute("src", 'data:text/plain,');
    document.documentElement.appendChild(iframe);
    window.frames[0].window.alert(name);
    iframe.parentNode.removeChild(iframe);
};
export default {
    data(){
        return{
            checked: false,
            activeIcon: require('../assets/images/sc1.png'),
            inactiveIcon: require('../assets/images/sc2.png'),
            value:'1',
            active:'',//挂号--介绍 选项卡
            active1:'',//选中时间
            regFee:"",//挂号费
            doctorId:'',//医生代码	
            regDate:"",//出诊日期，格式：YYYY-MM-DD	
            dataList:[],//返回全部数据
            regStatus:"",//出诊状态
            favor:"",//收藏值
            doctorInfoMap:[],//医生信息
            description:"",//医生简介
            deptId:'',//科室id
            shiftCode:'',//班别代号
            scheduleId:'',//排班号
            treatFee:'',//诊疗费
            getName:''//区别来源（预约挂号还是当天挂号）
        }
    },
    methods:{
        getNum:function(tab, index){//选择挂号时间
            var tabCardCollection = document.querySelectorAll(".week_day"),
            len = tabCardCollection.length;
            for(var i = 0; i < len; i++){
                this.months[i].state = false;
            }
            this.months[index].state =true;
        },
        sufFicient:function(){//点击满诊--显示提示信息
            alert('该时间段已满诊');
        },
        suSpend:function(){//点击停诊--显示提示信息
            alert('该时间段暂停挂号');
        },
        getList:function(){
            let parma = {
                doctorId:this.$route.query.doctorId, //医生编号
                regDate:this.$route.query.regDate, //出诊日期
                deptId:this.$route.query.deptId, //诊室代号
                shiftCode:this.$route.query.shiftCode, 
                regFee:this.$route.query.regFee, //挂号费
                regStatus:this.$route.query.regStatus, //出诊状态
                scheduleId:this.$route.query.scheduleId,//排班号
                treatFee:this.$route.query.treatFee,//诊疗费
            }
            getTimeInfo(parma).then((res) => {
                this.doctorInfoMap = res.data.doctor
                this.description = res.data.doctor.description
                this.dataList = res.data.time
                this.regFee = res.data.fee
                this.scheduleId = res.data.scheduleId
                this.treatFee = res.data.treatFee
                res.data.state == 0 ? (this.checked=false) : (this.checked=true) 
            })
        },
        getCheck:function(item){//点击收藏
            if(this.checked == false){
                this.favor = '1'
                Notify({ type: 'success', message: '成功收藏' });
            }else if(this.checked == true){
                this.favor = '0'
                Notify({ type: 'warning', message: '取消收藏' });
            }
            let data = {
                doctorId:this.doctorId,
                favoriteState:this.favor
            }
            postFavorite(data).then((res) => {
                console.log('post:',res)
            })
        }
    },
    mounted(){
        this.doctorId = this.$route.query.doctorId
        this.regDate = this.$route.query.regDate
        this.deptId = this.$route.query.deptId 
        this.shiftCode = this.$route.query.shiftCode,
        this.getName = this.$route.query.getName
        this.getList();
        // this.regFee = this.$route.query.regFee;
        this.regStatus = this.$route.query.regStatus;
    }
}
</script>
<style scoped>
.content{
    width: 100%;
}
/* 顶部医生基本信息 */
.card_li_top{
    width: 100%;
    height: 6rem;
    display: flex;
    flex-direction: row;
    border-bottom: 10px solid #f9f9f9;
    font-size: 12px;
    overflow: hidden;
}
.card_li_top .li_top_img{
    flex: 1;
    margin: auto;
}
.card_li_top .li_top_title{
    flex: 2;
    text-align: left;
    font-size: 14px;
    margin: auto;
}
.card_li_top .li_top_score{
    flex: 1;
    margin: auto;
}
.card_li_top img{
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
}
.keshi{
    background-color: #12a997;
    padding: 2px 10px;
    border-radius: 10px;
    color: white;
    font-size: 12px;
}
/* 挂号 */
.register{
    width: 100%;
}
/* 挂号--时间条 */
.register .time{
    width: 100%;
    overflow-x: scroll;
    height: 4rem;
    border-bottom: 1px solid #eeeeee;
}
.register .time .time_week{
    overflow-x: scroll;
    list-style: none;
    width: 28rem;
}
.time .time_week .active1{
    border-bottom: 1px solid #009ce6;
}
.time .time_week .week_day{
    float: left;
    width: 4rem;
}
.time_week .week_day span{
    display: inline-block;
    width: 100%;
    font-size: 0.8rem;
}
/* 挂号--时间段预约 */
.register_ticket{
    width: 100%;
    overflow: hidden;
}
.register_ticket .ticket_list{
    list-style: none;
    width: 100%;
}
.ticket_list .ticket_status_a,
.ticket_list .ticket_status_b,
.ticket_list .ticket_status_c{
    height: 3rem;
    float: left;
    width: 100%;
    display: flex;
    flex-direction: row;
    font-size: 0.8rem;
    padding: 5px 0px;
    border-bottom: 1px solid #eeeeee;
}
.ticket_list .ticket_status_a .ticket_status_left,
.ticket_list .ticket_status_b .ticket_status_left,
.ticket_list .ticket_status_c .ticket_status_left{
    display: inline-block;
    flex: 1;
    text-align: left;
    line-height: 3rem;
    padding-left: 10px;
}
.ticket_status_a .ticket_status_left .status_left_yy,
.ticket_status_b .ticket_status_left .status_left_yy,
.ticket_status_c .ticket_status_left .status_left_yy{
    height: 3rem;
    background-color: #12a997;
    border-radius: 50%;
    width: 3rem;
    display: inline-block;
    text-align: center;
    color: white;
}
.ticket_list .ticket_status_a .ticket_status_right,
.ticket_list .ticket_status_b .ticket_status_right,
.ticket_list .ticket_status_c .ticket_status_right{
    display: inline-block;
    flex: 1;
    text-align: right;
    padding-right: 10px;
    line-height: 3rem;
}
.ticket_status_a .ticket_status_right .status_left_yuan,
.ticket_status_b .ticket_status_right .status_left_yuan,
.ticket_status_c .ticket_status_right .status_left_yuan{
    display: inline-block;
    background-color: #f5a300;
    height: 1.5rem;
    text-align: center;
    line-height: 1.5rem;
    width: 30%;
    margin: 0;
}
.ticket_status_a .ticket_status_right .status_left_yupiao,
.ticket_status_b .ticket_status_right .status_left_yupiao,
.ticket_status_c .ticket_status_right .status_left_yupiao{
    display: inline-block;
    width: 30%;
    line-height: 1.5rem;
    background-color: #12a997;
    text-align: center;
    color: white;
}
/* 介绍 */
.introduc_title{
    height: 3rem;
    width: 100%;
    display: block;
    line-height: 3rem;
}
.introduc_title img{
    height: 2rem;
    padding: 10px;
    display: inline-block;
    float: left;
}
.introduc_title span{
    float: left;
    font-size: 14px;
    color: lightseagreen;
}
</style>