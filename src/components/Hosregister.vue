<template>
    <div class="content">
        <div class="content_top">
            <p class="tips_title">将用于自动识别证件信息并自动填写和住院登记办理移机出院后申请病案邮寄、报销等业务，请认真填写。</p>
        </div>
        <div class="upload">
            <p class="upload_title">请上传住院人身份证正面照片</p>
            <p class="upload_titla">拍照时请确保身份证边框完整，自己清洗，亮度均匀</p>
            <div class="upload_pic">
                <div class="upload_img" @click="getPic()">
                    <img id="DocumentScreenimg" :style="{display:picattr}" src="../assets/images/s3.png"/>
                    <!-- <img alt="" :src="this.imgurl"/> -->
                    <!-- <input type="file" accept="image/*"/> -->
                </div>
				<input id="addimg" type="file" accept="image/*" @change="addImg" ref="inputer" />
                <!-- <div class="preview_pic" id="addpic" @click="getPic()">
					<img id="DocumentScreenimg">
				</div> -->
				<!-- <input id="addimg" type="file" accept="image/*" @change="addImg" ref="inputer" :src='this.imgurl'/> -->
                <!-- <p class="idcard_tips">请上传身份证正面</p>
                <p class="card_tips">证件识别的结果仅供参考，不保证每一次都准确，请您仔细核对确认。</p> -->
            </div>
        </div>
        <p class="upload_btn">
            <button class="getup" @click="getUpload()">上传并进入下一步</button>
        </p>
        <p class="upload_btn">
            <button class="noup" @click="noUpload()">未携带或暂不上传</button>
        </p>
    </div>
</template>


<script>
import $ from 'jquery'
import { postIdCardOcr } from '../api/api'

export default {
    data(){
        return{
            imgurl:"123",
            picattr:'inline-block'
        }
    },
    methods:{
        getPic(){//添加图片--预览框
            document.querySelectorAll("#addimg").click();
            // console.log('ceshi:',newfile)
            // console.log('123:',this.files)
        },
        addImg(e){
            console.log(e)
			let inputDOM = this.$refs.inputer;
            // 通过DOM取文件数据
            this.fil = inputDOM.files;
            let self   = this;
            let reader = new FileReader();
            // reader.readAsDataURL( e.target.files[0] );
            reader.onload = function ( e ) {
                self.headImg = e.target.result; //img base64
                this.imgurl = e.target.result;
                // if(e.target.result != ''){
                //    this.imgurl = e.target.result;
                // }
            }
            console.log('base:',e)
            if (this.fil != '') {
                console.log(this.fil[0])
            let data = new FormData();
			data.append('picFile',this.fil[0]);//图片
            postIdCardOcr(data).then(res=>{
                console.log(res)
            }).catch(err=>{ console.log(err) })

                // console.log('2222',inputDOM.file)
                // console.log('0000000:',this.fil)
                // console.log('reader',reader.result)
                // console.log('reader11',new FileReader())
            }
        },
        getUpload(){//上传并进入下一步
            console.log('上传并进入下一步');
            this.$router.push({
                path:'/registrcard',
                query:{id:'1'}
            })
        },
        noUpload(){//上传并进入下一步
            console.log('不上传')
            this.$router.push({
                path:'/registrcard',
                query:{id:'1'}
            })
        }
    },
    mounted(){
        var newfile ='';
        $(document).ready(function(){
            $("#addimg").change(function(){ //file点击事件
            var file = this.files[0]; //获取文件
            if (window.FileReader) { //如果浏览器支持FileReader 
                var reader = new FileReader();//新建一个FileReader对象
                reader.readAsDataURL(file); //读取文件url
                newfile = file;
                reader.onloadend = function (e) {  
                    $("#DocumentScreenimg").attr("src",e.target.result);//将base64码填入src,用于预览
                }; 
            }
            file = null;
            })
        });
    }
}
</script>
<style scoped>
.content{
    width: 96%;
    margin: auto;
}
.content .content_top{
    width: 100%;
    margin-top: 10px;
}
.content .content_top .tips_title{
    font-size: 14px;
    background-color: #53a4f4;
    color: white;
    padding: 10px 0;
    line-height: 20px;
}
.content .upload{
    margin-top: 1rem;
    background-color: #56d2ba;
    color: white;
    padding: 1.5rem 0;
}
.content .upload p{
    font-size: 14px;
    line-height: 24px;
    width: 90%;
    margin: auto;
    font-weight: 600;
}
.content .upload .upload_titla{
    width: 90%;
    margin: auto;
    line-height: 24px;
    font-size: 14px;
    font-weight: 600;
}
.content .upload_pic{
    width: 90%;
    margin: auto;
    background: #89e0cf;
    padding: 2rem 0;
}
.content .upload_pic .upload_img img{
    width: 50%;
    margin: 1rem 0;
}
.content .upload_btn{
    height: 3rem;
    line-height: 3rem;
    width: 100%;
    margin-top: 1rem;
    font-size: 14px;
}
#addimg{
    display: none;
}
.content .upload_btn button{
    height: 2.5rem;
    line-height: 2.5rem;
    width: 100%;
    background-color: #53a4f4;
    border: none;
    border-radius: 5px;
    color: white;
}
.content .upload_btn .noup{
    background-color: #85c8ff;
}
</style>