<template>
    <div id="upload">
        <el-upload
            action="/apis/demo/file/upload"
            list-type="picture-card"
            :headers="token"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :multiple="true"
            :file-list="fileList"
            :on-success="uploadSuccess"
        >
        <i class="el-icon-plus"></i>
      </el-upload>
    </div>
</template>
<script>
export default {
    name:"upload",
    data() {
        return {
            fileList:[],
            token:{
                accessToken:sessionStorage.getItem('accessToken')
            },
        }
    },
    methods: {
        
        uploadSuccess(response, file, fileList) {
            console.log(response );
        },
        //移除文件
        handleRemove(file, fileList) {
            this.fileList = fileList;
        },
        //文件点击事件
        handlePictureCardPreview(file) {
            console.log(file);
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
    },
}
</script>
<style scoped>

</style>