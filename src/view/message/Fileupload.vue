<template>
    <div id="upload">
        <i>文件上传组件，直接上传</i>
        <el-upload
            action="/apis/demo/file/upload"
            list-type="picture-card"
            ref="upload"
            :headers="token"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :on-success="uploadSuccess"
        >
        <i class="el-icon-plus"></i>
      </el-upload> 
      <i>文件上传组件与图片组件，自定义上传</i>
      <el-upload
            action=""
            list-type="picture-card"
            :auto-upload="false"
            :on-change="upload"
            :on-remove="handleRemove"
            :file-list="fileList"
        >
        <i class="el-icon-plus"></i>
      </el-upload>
       <el-row v-if="isShowImgUpload" style="padding-left:100px;padding-right:100px;">
           <el-image
                :src="localUrl"
                :preview-src-list="[localUrl]"
                style="width:100%;height:600px;"
                fit="scale-down"
            ></el-image>
       </el-row>
    </div>
</template>
<script>
import {filrUpload} from '@/api/login/login';
export default {
    name:"upload",
    data() {
        return {
            localUrl:'',
            isShowImgUpload:false,
            isShowUpload:true,
            fileList:[],
            token:{
                accessToken:sessionStorage.getItem('accessToken')
            },
        }
    },
    methods: {
        //文件上传成功
        uploadSuccess(response, file, fileList) {
            console.log(response );
        },
        //上传文件前
        beforeUpload(file){
            this.fileList.push(file)
        },
        //移除文件
        handleRemove(file, fileList) {
            console.log(fileList)
            // this.fileList = fileList;
        },
        //文件点击事件
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },

        upload(file){
            console.log(file)
            let formData=new FormData();
            formData.append('file',file.raw);
            filrUpload(formData)
            .then((res)=>console.log(res))
            .catch((error) =>
                console.log(error)       
            )

            this.localUrl = file.url;
            this.isShowImgUpload = true;//呈现本地预览组件
        }
    },
}
</script>
<style scoped>

</style>