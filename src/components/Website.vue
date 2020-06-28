<template>
    <div class="content">
        <!-- <p class="top_title">衡阳第四医院</p>
        <div class="top_img">
            <img src="../assets/images/timg.jpg"/>
        </div>
        <div class="inforbox">
            <p class="introduc">
            衡阳市第四人民医院（原名中核集团公司二七二厂职工医院，于2011年元月移交衡阳市卫生局管理并更为现名）是一所综合性市直二级甲等医院。
            医院占地30亩，座落于衡阳市珠晖区东阳渡街道，毗邻湘江，周边有中核集团二七二铀业有限公司、中核集团宏华机械公司等多家大中型企业，与白沙工业园隔江相望，服务人口6万人左右。
            </p>
            <img src="../assets/images/hy1.jpg"/>
            <p class="introduc">
            医院现为衡阳市城镇职工医疗保险、工伤保险、生育保险、城镇居民医保及新型农村合作医疗保险等定点医院，为衡阳市珠晖区东阳渡区域十三家医保单位职工首诊定点医院。
            医院分为院本部、社区卫生服务中心、医疗养老康复中心三个医疗单元，其中院本部设有内儿科、外科、妇产科、五官科、中医科、理疗康复科、住院部等临床科室。
            社区卫生服务中心是珠晖区定点社区卫生服务中心，因发展的需要，现正在重新规划，进行异地重建。
            </p>
            <img src="../assets/images/hy2.jpg"/>
            <p class="introduc">
            医疗养老康复中心已纳入衡阳市重点建设项目，根据衡阳市卫计委发展规划，第一期规划500张床位，第二期规划2000张床位，建成后将发展成为湘南地区最大的医疗养老康复服务机构。
            医院现有员工133人，卫生专业技术人员104人，其中高级职称12人，中级职称 37人；拥有本科以上学历 43人，大、中专学历96人，是一支具有较高素质的医疗队伍。
            </p>
            <img src="../assets/images/hy3.jpg"/>
            <p class="introduc">
            医院现核定病床130张，实际开放130张床位。拥有东芝牌彩色多谱勒、DR数字X光机、日立全自动生化仪、西门子化学发光分析仪、全自动血凝仪等先进仪器设备。
            可开展普外腹部手术、妇产科手术，医院在治疗常见病、多发病及老年康复等方面积累了丰富的经验，多次被评为衡阳市卫计委目标管理先进单位。
            全院职工始终坚持以“病人为中心”，以质量求生存，以技术求发展，竭诚为座落地及周边居民的健康保驾护航。
            </p>
        </div>
        <div class="qrcode">
            <p class="qrcode_title">衡阳市第四人民医院</p>
            <img src="../assets/images/qc1.jpg"/>
            <p class="qrcode_link">关注我们，就是关注健康</p>
        </div> -->
    </div>
</template>

<script>
import Vue from 'vue';
import { getMicroOfficial } from '../api/api'
export default {
    methods:{
        getMicroOfficialAction:function(){//获取微官网信息
            getMicroOfficial().then(res => {
                window.location.replace(res.data)
            }).catch(error => {
                console.log(error)
            })
        }
    },
    mounted(){
        this.getMicroOfficialAction()
    }
}
</script>

<style scoped>
.content{
    width: 90%;
    margin: auto;
}
.content .top_title{
    width: 100%;
    height: 3rem;
    line-height: 3rem;
    text-align: left;
    font-size: 18px;
    color: #53a4f4;
}
.content .top_img,
.content .top_img img,
.content .inforbox,
.content .inforbox img{
    width: 100%;
}
.content .inforbox .introduc{
    text-align: left;
    text-indent: 2em;
}
.content .qrcode{
    width: 100%;
    margin-top: 1rem;
}
.content .qrcode .qrcode_title{
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    color: red;
}
.content .qrcode img{
    width: 60%;
}
.content .qrcode .qrcode_link{
    font-size: 12px;
    color: #53a4f4;
    line-height: 18px;
}
</style>