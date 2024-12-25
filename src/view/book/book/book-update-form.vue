<template>
    <el-dialog
        :title="title"
        :visible.sync="dialogFormVisible"
        width="20%"
    >
        <el-form ref="dataForm" :model="form" label-width="80px">
            <el-row>
                <el-col :span="24">
                    <el-form-item label="图书名称" prop="bookName">
                        <el-input v-model="form.bookName" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="图书类别" prop="bookTypeId">
                        <el-select v-model="form.bookTypeId" placeholder="请选择">
                            <el-option
                            v-for="item in bookTypes"
                            :key="item.id"
                            :label="item.bookTypeName"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="出版社" prop="press">
                        <el-input v-model="form.press" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="价格" prop="price">
                        <el-input v-model="form.price" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="图书编码" prop="bookCode">
                        <el-input v-model="form.bookCode" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="图书封面">
                        <el-upload
                                action=""
                                list-type="picture-card"
                                :auto-upload="false"
                                :on-change="uploadBookImage"
                                :on-remove="handleRemove"
                                :file-list="fileList"
                            >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button @click="update">确认</el-button>
        </div>
    </el-dialog>
</template>
<script>
import {editBook,selectBookTypeSummary} from '@/api/book/book'
import {uploadFile,viewUrl,delFile} from '@/api/file/file'
export default{
    name:"BookUpdateForm",
    data(){
        return{
            dialogFormVisible:false,
            form:{
                bookId:"",
                bookName:"",
                bookTypeId:"",
                bookTypeName:"",
                press:"",
                price:"",
                bookCode:"",
                bookImageName:"",
                bookImagePath:""
            },
            bookTypes:[],
            title:"",
            fileList:[]
        }
    },
    mounted(){
        
    },
    methods:{
        init(title,row){
            console.log(row.bookImageName)
            this.fileList =[]
            this.dialogFormVisible = true;
            this.title = title;
            if(row === null|| row===""){
                this.form.bookName = ""
            }else{
                this.form.bookName = row.bookName;
                this.form.bookId = row.bookId;
                this.form.bookTypeId = row.bookTypeId;
                this.form.bookTypeName = row.bookName;
                this.form.press = row.press;
                this.form.price = row.price;
                this.form.bookCode = row.bookCode;
                this.form.bookImageName = row.bookImageName;
                this.form.bookImagePath = row.bookImagePath;
                if(this.fileList.length ==0 & row.bookImageName != null ){
                    this.fileList.push({name:row.bookImageName,url:row.bookImagePath})
                }
                
            }
            this.selectBookType()
        },
        update(){
            this.$refs['dataForm'].validate((valid) => {
                const that = this;
                editBook(this.form).then(function (response) {
                        that.form.bookName = null;
                        that.form.bookImageName = null;
                        that.form.bookImagePath = null;
                        that.form.bookId = null;
                        that.dialogFormVisible = false;
                        that.$emit('refreshDataList')
                    })
                    .catch(function (error) {
                        console.log(error);
                });
            })
        },
        selectBookType(){
            const that = this;
            selectBookTypeSummary({}).then(function (response) {
                that.bookTypes = response.data.records;
            })
            .catch(function (error) {
                console.log(error);
            });
            
        },
        uploadBookImage(file){
            const that = this;
            console.log(file)
            let formData=new FormData();
            formData.append('file',file.raw);
            uploadFile(formData)
            .then(
                (res)=>{
                    console.log(res)
                    that.form.bookImageName = res.data;
                    that.getViewUrl(res.data);
                }
                
            )
            .catch((error) =>
                console.log(error)       
            )
            
        },
        getViewUrl(fileName){
            const that = this;
            viewUrl({'fileName':fileName})
            .then(
                (res)=>{
                    console.log(res)
                    that.form.bookImagePath = res.data
                }

            )
            .catch((error) =>
                console.log(error)       
            )
        },
        handleRemove(file, fileList) {
            console.log(this.form.bookImageName);
            delFile({'fileName':this.form.bookImageName}).then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                console.log(error);
            })
            console.log(fileList)
            this.fileList = fileList;
        }

    }

}

</script>
