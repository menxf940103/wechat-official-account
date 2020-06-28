<template>
    <div class="content">
        <div class="pic">
            <img class="top_pic" src="../assets/images/qrcode.png"/>
        </div>
        <div class="title">
            <p class="title_tips">预约成功！</p>
        </div>
        <div class="tips">
            <p class="tips_p">请将下面您的预约码提供给窗口办理</p>
        </div>
        <div class="barcode">
            <img id="barcode"/>
        </div>
        <div class="qrcode">
            <div ref="qrCodeUrl" style="display:inline-block"></div>
        </div>
    </div>
</template>
<script>
import QRCode from 'qrcodejs2'
import JsBarcode from 'jsbarcode'
export default {
    data(){
        return{
            codeText:""//二维码和条形码文本信息
        }
    },
    methods:{
        creatQrCode(){//二维码
            var qrcode = new QRCode(this.$refs.qrCodeUrl,{
                text:this.codeText,
                width:150,
                height:150,
                colorDark:'#000000',
                colorLight:'#ffffff',
                // correctLevel:QRCode.CorrectLevel.H
            });
        },
        creatBarcode(){//条形码
            JsBarcode("#barcode", this.codeText, {
                format: "CODE128",//CODE128
                // lineColor: "#0aa",//设置条形码颜色
                width:2,
                height:40,
                displayValue: true,
                textPosition:'bottom'
            });
        }
    },
    mounted(){
        this.codeText = this.$route.query.codeText//二维码文本
        this.creatQrCode()//二维码
        this.creatBarcode()//条形码
    }
}
</script>
<style scoped>
.content{
    width: 100%;
    margin: auto;
}
.content .pic,
.content .title,
.content .tips{
    width: 100%;
    margin-top: 1rem;
}
.content .pic .top_pic{
    width: 30%;
}
.content .title .title_tips{
    font-size: 18px;
    color: #53a4f4;
    font-weight: 600;
    letter-spacing: 4px;
    text-align: center;
    line-height: 24px;
}
.content .tips .tips_p{
    font-size: 16px;
    color: black;
    text-align: center;
    line-height: 20px;
}
/* 条形码 */

/* 二维码 */
.content .qrcode{
    width: 100%;
    margin: auto;
    margin: 20px 0px;
}
</style>