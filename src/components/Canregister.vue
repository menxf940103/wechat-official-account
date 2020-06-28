<template>
    <div class="content">
        <div class="card_li_top">
            <div class="li_top_img">
                <img src="../assets/images/timg (2).jpg"/>  
            </div>
            <div class="li_top_title">
                <p>
                    <span style="width:60px;display:inline-block;">欧阳商</span>
                    <span style="color:#cccccc;">科室主任</span>
                </p>
                <p><span class="keshi">科室显示</span></p>
                <p style="color:#cccccc;">门诊</p>
            </div>
            <!-- <div class="li_top_score">
                <span v-if="value==1">已收藏</span>
                <span v-else></span>
            </div> -->
        </div>
        <div class="reg_number">
            <van-cell-group>
                <van-cell title="医院名称" value="衡阳市第四人民医院" />
                <van-cell title="挂号类型" value="预约挂号" />
                <van-cell title="流水号" value="A1192255522" />
                <van-cell title="交易状态" value="已支付" />
            </van-cell-group>
        </div>
        <div class="reg_mony">
            <van-cell-group>
                <van-cell title="费用项目" title-style="color:#cccccc;" value="金额（元）" />
                <van-cell title="诊查费" value="￥19" value-class="font_color" />
                <van-cell title="挂号费" value="￥19" value-class="font_color" />
                <van-cell title="就诊时段" value="2019-11-22 08:30-09:00" value-class="font_color" />
            </van-cell-group>
        </div>
        <van-cell-group>
                <van-cell title="就诊人" value="李时珍"/>
        </van-cell-group>
        <van-button size="large" type="info" @click="getDialog()">确定</van-button>
    </div>
</template>
<script>
import Vue from 'vue';
import { Cell, CellGroup, Button, Dialog } from 'vant';
export default {
    data(){
        return{
            select:''
        }
    },
    methods:{
        getDialog:function(){//点击确认提示信息
            Dialog.confirm({
                title: '取消挂号须知',
                message: '1.已支付的挂号，手续费扣除。2.已支付的挂号费用退还，请耐心等待。'
            }).then(() => {
                // on confirm 
                this.$router.push({
                    path:'/myappointment',
                    // query:{id:'1'}
                })
                console.log('确认')
            }).catch(() => {
                // on cancel
                this.$router.push({
                    path:'/myappointment',
                    // query:{id:'1'}
                })
            });
        },
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
/* .card_li_top .li_top_score{
    flex: 1;
    margin: auto;
} */
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
/* 挂号信息 */
.reg_number,.reg_mony{
    width: 100%;
    border-bottom: 10px solid #f9f9f9;
}
.van-cell{
    font-size: 0.8rem;
    border-bottom: 1px solid #eeeeee;   
}
.van-cell .font_color{
    color: #f5a300;
}
.van-cell .van-cell__title{
    text-align: left;
}
.van-button{
    height: 2.5rem;
    line-height: 2.5rem;
    width: 90%;
    display: block;
    margin: auto;
    margin-top: 2rem;
    border-radius: 5px;
    background-color: #07c160;
    border: none;
}
</style>