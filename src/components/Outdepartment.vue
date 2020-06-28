<template>
    <div class="content">
        <div class="content_top">
            <ul class="list">
                <li  class="list_nav" v-for="(tab,index) in months" :key="tab.id" v-bind:class="{active:tab.state}" @click="getNum(tab,index)">
                    <span>周{{tab.weeknumber}}</span>
                    <span>{{tab.showDate}}</span>
                </li>
            </ul>
        </div>
        <div class="content_tab">
            <div class="blank" v-if="dataList.length < 1">暂无门诊信息...</div>
            <ul class="collection_list" v-else>
                <li class="collection_list_li" v-for="(item, index) in this.dataList" :key="index.id">
                    <router-link tag="div" :to="{query:{deptId:item.scheduleInfo.deptId,doctorId:item.doctorId,regDate:item.scheduleInfo.regDate,shiftCode:item.scheduleInfo.shiftCode,regFee:item.scheduleInfo.regFee,regLeaveCount:item.scheduleInfo.regLeaveCount,regStatus:item.scheduleInfo.regStatus,scheduleId:item.scheduleInfo.scheduleId,treatFee:item.scheduleInfo.treatFee,getName:'预约挂号'},path:'/doctorout'}" class="card_libox">
                        <div class="card_li_top">
                            <div class="li_top_img">
                                <img src="../assets/images/timg (2).jpg"/>  
                            </div>
                            <div class="li_top_title">
                                <p>
                                    <span style="width:60px;display:inline-block;">{{item.doctorName}}</span>
                                    <span style="color:#cccccc;">{{item.doctorLevel}}</span></p>
                                <p style="color:#cccccc;">{{item.scheduleInfo.deptName}}</p>
                            </div>
                            <div class="li_top_score">
                                <span class="li_top_score_res" v-if="item.scheduleInfo.regStatus==2">展位开发</span>
                                <span class="li_top_score_full" v-if="item.scheduleInfo.regStatus==1">出诊</span>
                                <span class="li_top_score_stop" v-if="item.scheduleInfo.regStatus==0">停诊</span>
                            </div>
                        </div>
                        <div class="card_li_introduce">
                            <span>{{item.description}}</span>
                        </div>
                        <div class="card_li_time">
                            <!-- <van-cell :title='this.checkTime+"上午"' is-link />
                            <van-cell :title='this.checkTime+"下午"' is-link /> -->
                            <van-cell :title='item.scheduleInfo.startTime+"上午"' is-link/>
                            <van-cell :title='item.scheduleInfo.endTime+"下午"' is-link/>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import { Cell, CellGroup } from 'vant';
import { getScheduleInfo } from '../api/api'

Vue.use(Cell).use(CellGroup);
export default {
    data(){
        return{
            select:'李四',
            active: '',
            value:2,
            weeks: [],
            months: [],
            day: 0,
            date: 0,
            month: 0,
            d: 0,
            today: '',
            flag: 0,
            checkTime:'',
            roomId:'1',//诊室代码	
            regDate:'2020-01-01',//出诊日期，格式：YYYY-MM-DD	
            regFee:"",//挂号费
            dataList:[],//返回的所有数据
        }
    },
    methods:{
        getNum(tab,index){
            // console.log('选择日期：',tab.showDate)
            var tabCardCollection = document.querySelectorAll(".list_nav"),
            len = tabCardCollection.length;
            for(var i = 0; i < len; i++){
                this.months[i].state = false;
            }

            this.months[index].state =true;
            this.checkTime = tab.newyear+"-"+tab.showDate+"-(星期"+tab.weeknumber+")"
            let parma = {
                deptId:this.$route.query.roomId,//诊室代号
                startDate:tab.newyear+"-"+tab.showDate,
                endDate:tab.newyear+"-"+tab.showDate
                // regDate:tab.newyear+"-"+tab.showDate//出诊日期
            }
            getScheduleInfo(parma).then((res) => {
                if(res.code == 1){
                    this.dataList = res.data
                }
            }).catch((error) => {
                console.log(error)
            })
        },
        getMonDate: function(test) {
            if (test.getDay() == 1)
                return test;
            if (test.getDay() == 0)
                test.setDate(test.getDate() - 6);
            else
                test.setDate(test.getDate() - test.getDay() + 1);
            return test;
        },
        // 0-6转换成中文名称
        getDayName: function(day) {
            var day = parseInt(day);
            if (isNaN(day) || day < 0 || day > 6)
                return false;
            var weekday = ["日", "一", "二", "三", "四", "五", "六"];
            return weekday[day];
        },
        getResult: function(time, a) {
            console.log(time)
            // var timeobj = this.getMonDate(time); // timeobj是当前星期一的日期对象
            // console.log(timeobj)
            var temTime = new Date(time.getTime()); //当前当前星期一对象转换成时间戳
            
            var arr = [];
            var week = [];
            var dayss = new Date();
            for (var i = 0; i < 7; i++) {
                var time1 = new Date(temTime.getTime());
                var time2 = dayss.getTime();
                var result = time1 <= time2;
                var ymd = this.formatDate(temTime);
                // arr.push({'dayss':temTime.getDate(),'daystate':false}); //一周几号
                arr.push({
                    'date': ymd,//年月份20191209
                    'state': result,//true false
                    // 'showDate': temTime.getDate()
                    'showDate':this.formatDate(temTime).substring(4,6)+"-"+this.formatDate(temTime).substring('6'),//月份
                    'weeknumber':this.getDayName(temTime.getDay()),//周几
                    'newyear':this.formatDate(temTime).slice(0,4)//年份
                });
                week.push(this.getDayName(temTime.getDay())); //一周 周几
                temTime.setDate(temTime.getDate() + 1);
                // console.log(this.getDayName(temTime.getDay()))
            }
            this.weeks = week;
            this.months = arr;
            this.checkTime = this.months[0].newyear+"-"+this.months[0].showDate+"(星期"+this.months[0].weeknumber+")"//第一进入界面获取的默认日期（今天）
            // console.log('months:',this.months);
            // console.log('weeks:',this.weeks);
        },
        formatDate: function(date) {
            var year = date.getFullYear();
            var months = date.getMonth() + 1;
            var month = (months < 10 ? '0' + months : months).toString();
            var day = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()).toString();
            return year + month + day;
        },
        getInterface:function(){//点击卡片
            console.log('点击跳转')
        },
        getList:function(){
            let parma = {
                deptId:this.$route.query.roomId,//诊室代号
                startDate:this.startDate,
                endDate:this.endDate
                // deptId:'1001',//诊室代号
                // startDate:'2020-05-13',
                // endDate:'2020-05-15'

            }
            getScheduleInfo(parma).then((res) => {
                if(res.code == 1){
                    this.dataList = res.data
                }
                console.log('返回数据：',res)
            })
        }
    },
    mounted: function() {
        this.d = new Date(); //当前日期
        this.day = this.d.getDay(); //周几
        // this.date = this.d.getDate(); //几号
        if(this.d.getDate() < 10){
            this.date = "0" + this.d.getDate()
        }else{
            this.date = this.d.getDate()
        }
        // this.month = this.d.getMonth() + 1; //月
        (this.d.getMonth() + 1) < 10 ? (this.month = '0' + (this.d.getMonth() + 1)) : (this.month = this.d.getMonth() + 1)
        // console.log('oooo:',this.month)
        var timestr = this.month + "月" + this.date + "日";
        this.today = timestr;
        // this.flag = this.date;
        this.flag = this.formatDate(this.d);
        this.getResult(this.d);
        var ctime = this.d.getFullYear().toString()+ '-' + this.month.toString()+ '-' + this.date.toString();
        this.startDate = ctime
        this.endDate = ctime
        // 获取数据
        this.getList();
    },
}
</script>
<style scoped>
.content{
    width: 100%;
}
.content .content_top{
    /* width: 100%; */
    height: 3.2rem;
    overflow-x: scroll;
    /* display: flex;
    flex-direction: row; */
    border-bottom: 1px solid #f8f8f8;
}
.content .content_top .list{
    list-style: none;
    width: 35rem;
    /* overflow: hidden; */
    height: 3.2rem;
    /* position: fixed; */
    overflow-x: scroll;
}
.content .content_top .list .list_nav{
    float: left;
    width: 5rem;
    height: 3rem;
    /* line-height: 2rem; */
}
.content_top .list .list_nav span{
    display: inline-block;
    width: 100%;
    font-size: 0.8rem;
}
.content .content_top .list .active{
    border-bottom: 2px solid #009ce6;
}
/* .content .content_top .top_title{
    display: inline-block;
    flex: 1;
    line-height: 34px;
    font-size: 14px;
    color: #000;
} */
.content .content_top .chois{
    flex: 3;
    border: none;
    -webkit-appearance: none;
    appearance:none;
    -moz-appearance: none;
    -webkit-appearance: none;
    background: url('../assets/images/xia.png') no-repeat;
    background-position: right;
    width: 64px;
    font-size: 12px;
    background-size: 80px;
}
/* 卡片信息 */
.collection_list{
    list-style: none;
    width: 100%;
    overflow: hidden;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
}
.collection_list .collection_list_li{
    width: 90%;
    border: 1px solid #cdcdcd;
    box-shadow: #cccccc;
    border-radius: 10px;
    margin-left: 5%;
    margin-bottom: 10px;
    box-shadow: 2px 2px 2px 2px #cdcdcd;
}
.collection_list .collection_list_li .card_libox{
    width: 90%;
    margin: auto;
    padding: 10px 0px;
}
.collection_list .collection_list_li .card_libox .card_li_top{
    width: 100%;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #cdcdcd;
    font-size: 12px;
}
.collection_list .collection_list_li .card_libox .card_li_top img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
}
.collection_list_li .card_libox .card_li_top .li_top_img{
    flex: 1;
}
.collection_list_li .card_libox .card_li_top .li_top_title{
    flex: 2;
    text-align: left;
    font-size: 14px;
}
.card_li_top .li_top_score .li_top_score_res{/* 可预约 */
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 50%;
    background-color: #12a997;
    display: inline-block;
    line-height: 2.5rem;
    color: white;
}
.card_li_top .li_top_score .li_top_score_full{/* 已满诊 */
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 50%;
    background-color: #e8e8e8;
    display: inline-block;
    line-height: 2.5rem;
    color: #cccccc;
}
.card_li_top .li_top_score .li_top_score_stop{/* 停诊 */
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 50%;
    background-color: #f95050;
    display: inline-block;
    line-height: 2.5rem;
    color: white;
}
.collection_list_li .card_libox .card_li_introduce{
    display: block;
    
    border-bottom: 1px solid #cdcdcd;
}
.collection_list_li .card_libox .card_li_introduce span{
    display: inline-block;
    width: 100%;
    margin: 10px 0px;
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    font-size: 12px;
}
.card_li_time{
    text-align: left;
}
/* 空白提示 */
.blank{
    width: 100%;
    height: 100%;
    margin-top: 60%;
}
</style>