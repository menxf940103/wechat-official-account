<template>
	<div class="center">
		<div class="top">
			<img src="../assets/images/timg.jpg"/>
		</div>
		<van-tabs v-model="active">
			<van-tab title="就医">
				<ul class="hospital">
					<!-- <router-link tag="li" :to="{path:'/visitingcard',query:{getName:'预约挂号'}}" class="hospital_li">
						<img src="../assets/images/a1.png"/>
						<span class="hospital_li_title">预约挂号</span>
					</router-link> -->
					<router-link tag="li" :to="{path:'/choicehospital',query:{getName:'预约挂号'}}" class="hospital_li">
						<img src="../assets/images/a1.png"/>
						<span class="hospital_li_title">预约挂号</span>
					</router-link>
					<router-link tag="li" :to="{path:'/choicehospital',query:{getName:'当天挂号'}}" class="hospital_li">
						<img src="../assets/images/a2.png"/>
						<span class="hospital_li_title">当天挂号</span>
					</router-link>
					<router-link tag="li" to="/periodpayment" class="hospital_li">
						<img src="../assets/images/a3.png"/>
						<span class="hospital_li_title">诊间支付</span>
					</router-link>
					<router-link tag="li" to="/smartanswer" class="hospital_li">
						<img src="../assets/images/a4.png"/>
						<span class="hospital_li_title">智能问诊</span>
					</router-link>
				</ul>
			</van-tab>
			<van-tab title="住院">
				<ul class="hospital">
					<router-link tag="li" to="/hosregister" class="hospital_li">
						<img src="../assets/images/a5.png"/>
						<span class="hospital_li_title">住院登记</span>
					</router-link>
					<router-link tag="li" to="/costquery" class="hospital_li">
						<img src="../assets/images/a6.png"/>
						<span class="hospital_li_title">费用查询</span>
					</router-link>
					<router-link tag="li" to="/reportquery" class="hospital_li">
						<img src="../assets/images/a7.png"/>
						<span class="hospital_li_title">报告查询</span>
					</router-link>
				</ul>
			</van-tab>
		</van-tabs>
		<van-tabs v-model="active1">
			<van-tab title="个人中心">
				<ul class="hospital">
					<router-link tag="li" to="/personalinfor" class="hospital_li">
						<img src="../assets/images/a8.png"/>
						<span class="hospital_li_title">个人信息</span>
					</router-link>
					<router-link tag="li" to="/myappointment" class="hospital_li">
						<img src="../assets/images/a9.png"/>
						<span class="hospital_li_title">我的预约</span>
					</router-link>
					<router-link tag="li" to="/reportquery" class="hospital_li">
						<img src="../assets/images/a10.png"/>
						<span class="hospital_li_title">我的报告</span>
					</router-link>
					<!-- <router-link tag="li" to="/socialsecurity" class="hospital_li">
						<img src="../assets/images/a11.png"/>
						<span class="hospital_li_title">我的社保</span>
					</router-link> -->
					<router-link tag="li" to="/mydoctor" class="hospital_li">
						<img src="../assets/images/a12.png"/>
						<span class="hospital_li_title">我的医生</span>
					</router-link>
					<router-link tag="li" to="/healthcode" class="hospital_li">
						<img src="../assets/images/a13.png"/>
						<span class="hospital_li_title">电子健康码</span>
					</router-link>
				</ul>
			</van-tab>
			<van-tab title="服务平台">
				<ul class="hospital">
					<router-link tag="li" to="/doctorguide" class="hospital_li">
						<img src="../assets/images/a14.png"/>
						<span class="hospital_li_title">就医指南</span>
					</router-link>
					<router-link tag="li" to="/navigation" class="hospital_li">
						<img src="../assets/images/a15.png"/>
						<span class="hospital_li_title">科室分布</span>
					</router-link>
					<router-link tag="li" to="/healthprop" class="hospital_li">
						<img src="../assets/images/a16.png"/>
						<span class="hospital_li_title">健康宣传</span>
					</router-link>
					<!-- <router-link tag="li" to="/queries" class="hospital_li">
						<img src="../assets/images/a17.png"/>
						<span class="hospital_li_title">排队查询</span>
					</router-link> -->
					<router-link tag="li" to="/website" class="hospital_li">
						<img src="../assets/images/a18.png"/>
						<span class="hospital_li_title">微官网</span>
					</router-link>
					<router-link tag="li" to="/trafficguide" class="hospital_li">
						<img src="../assets/images/a19.png"/>
						<span class="hospital_li_title">交通指引</span>
					</router-link>
					<router-link tag="li" to="/specialist" class="hospital_li"> 
						<img src="../assets/images/a20.png"/>
						<span class="hospital_li_title">专科矩阵</span>
					</router-link>
				</ul>
			</van-tab>
		</van-tabs>
		<!-- <div class="cominfor">
            <p class="company">创鑫智慧医疗</p>
            <p class="company">Copyright © 2018 chuangxin</p>  
        </div> -->
	</div>
</template>

<script>
import Vue from 'vue';
import { Tab, Tabs } from 'vant';
Vue.use(Tab).use(Tabs);
export default {
	name: 'HelloWorld',
	data () {
		return {
		msg: 'Welcome to Your Vue.js App',
		active:0,
		active1:0
		}
	},
	methods:{
	},
	mounted(){
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
	padding: 0px;
	margin: 0px;
}
.center{
	width: 100%;
	display: flex;
	flex-direction: column;
	background-color: white;
}
.center .top{
	width: 100%;
}
.top img{
	width: 100%;
}
/* 选项卡 */
 .center .van-tabs{ 
	margin: auto;
	width: 90%;
	padding-bottom: 20px;
}
.hospital{
	list-style: none;
    margin-top: 20px;
    width: 100%;
}
.hospital .hospital_li{
	width: 25%;
	float: left;
	margin-bottom: 10px;
}
.hospital .hospital_li img{
	width: 50%;
    /* border-radius: 50%; */
    background: #f8f8f8;
}
.hospital .hospital_li .hospital_li_title{
	display: inline-block;
    width: 100%;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
}
.center .cominfor{
    bottom: 0px;
    position: fixed;
    margin: auto;
    width: 100%;
}
.center .company{
    font-size: 12px;
    color: #cccccc;
}
</style>
