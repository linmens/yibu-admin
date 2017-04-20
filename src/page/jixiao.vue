<template>
<div>
    <!--工具条-->
    <!-- <el-col :span="24" class="toolbar">
        <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
        <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
        </el-pagination>
    </el-col> -->
    <Row :gutter="16" justify="start">
        <Col span="2">
        <Button type="error" @click="batchRemove" :disabled="this.sels.length===0">批量删除</Button>
        </Col>
        <Upload action="http://yibu.a10store.com/app/setting/api/cs.performance.excel.update.php" :on-success="handleuploadSuccess" :on-error="uploadError">
            <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
        </Upload>

    </Row>
    {{CHAT.uploadinfo}}
    <Table border :context="self" :columns="columns7" :data="CHAT.uploadinfo"></Table>
    <Modal v-model="addForm" width="360">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="information-circled"></Icon>
            <span>新增数据</span>
        </p>
        <div style="text-align:center">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <Form-item label="文件名" prop="uploadinfo">
                    <Input v-model="formValidate.tklink" placeholder="请输入姓名"></Input>
                </Form-item>
                <Form-item label="科尚" prop="tkl">
                    <Input v-model="formValidate.tkl" placeholder="请输入科尚"></Input>
                </Form-item>
                <Form-item label="依布" prop="mail">
                    <Input v-model="formValidate.goodslink" placeholder="请输入依布"></Input>
                </Form-item>

            </Form>
        </div>
        <div slot="footer">
            <Button type="error" size="large" @click="handleSubmit('formValidate')" long :loading="modal_loading">提交</Button>
        </div>
    </Modal>


    <Page :total="total" size="small" show-elevator show-sizer @on-change="handleCurrentChange" :page-size="20"></Page>
</div>
</template>
<style>
.rowdata {
    display: inline-block;
    margin-right: 10px
}

.ivu-row {
    margin-bottom: 10px
}

.ivu-page {
    margin-top: 10px
}

i {
    font-style: normal;
}
</style>
<script>
import CHAT from '../api/client'
export default {
    data() {
        return {
            CHAT: CHAT,
            self: this,
            userLogin:'',

            addForm: false,
            modal_loading: false,
            //编辑界面数据
            editForm: {
                id: 0,
                tklink: '',
                tkl: '',
                goodslink: ''
            },
            formValidate: {
                tklink: '',
                tkl: '',
                goodslink: ''
            },
            ruleValidate: {
                tklink: [{
                    required: true,
                    message: '姓名不能为空',
                    trigger: 'blur'
                }],
                tkl: [{
                    required: true,
                    message: '科尚不能为空',
                    trigger: 'blur'
                }],
                goodslink: [{
                    required: true,
                    message: '商品不能为空',
                    trigger: 'blur'
                }]
            },
            columns7: [{
                    title: '文件名',
                    key: 'file_name',
                    render(row, column, index) {
                        return `{{row.file_name}}`

                }
              },
                {
                    title: '上传人',
                    key: 'up_user',
                    render(row, column, index) {
                        return `
                          <Row>
                               <Col span="8">{{row.up_user}}</Col>
                           </Row>
                        `
                    }
                },
                {
                    title: '上传时间',
                    key: 'up_time',
                    render(row, column, index) {
                        return `<a :href="row.up_time" target="_blank">{{row.up_time}}</a>`
                    }

                },
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render(row, column, index) {
                        return `<i-button type="primary" size="small" @click="edit(row,${index})">编辑</i-button> <i-button type="error" size="small" @click="remove(row,index)">删除</i-button>`;
                    }
                }
            ],
            rowdate: '',
            tklist: [],
            total: 0,
            page: 1,
            listLoading: false,
            editFormVisible: false, //编辑界面是否显示
            sels: [], //列表选中列
            filters: {
                name: ''
            },
        }
    },
    methods: {

        getList() {
            let para = {
                page: this.page,
                name: this.filters.name
            };
            this.listLoading = true;
            // GET /someUrl
            this.$http.get('http://yibu.a10store.com/app/setting/api/cs.performance.files.list.info.php').then(res => {
                console.log(res);

                this.total = res.data.num;
                CHAT.uploadinfo = res.data;
                this.listLoading = false;
            }, res => {
                // error callback
            })
        },
        handleCurrentChange(val) {
            this.page = val;
            this.gettaokeList();
        },
        edit(row, index) {
            this.editFormVisible = true;
            this.editForm = row;
            console.log(row, index);
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
        handleSuccess(e) {
            console.log(this);
            this.$Message.success('复制成功!');
        },
        //上传成功后
        handleuploadSuccess(response, file, fileList) {
            console.log(response);
            this.$Message.success('上传成功!');
            CHAT.submit({
                username: this.CHAT.username,
                filename: fileList.name,
                time: fileList.lastModifiedDate
            })
            this.getList()
        },
        uploadError(error, file, fileList) {

            // console.log(fileList);
            // console.log(this);
            //  this.data1.push()
            // CHAT.submit({
            //     username: this.CHAT.username,
            //     filename: fileList.name,
            //     time: fileList.lastModifiedDate
            // })

            //  this.CHAT.socket.emit('message',this.data1)

            //  this.CHAT.socket.on('message', function(obj) {
            //      // var isme = (obj.userid == CHAT.userid) ? true : false;
            //      console.log(obj);
            //      this.data1 = obj
            //  });
        },
        handleError(e) {
            console.log(e);
        },

        //批量删除
        batchRemove: function() {
            var ids = this.sels.map(item => item.id).toString();
            this.$confirm('确认删除选中记录吗？', '提示', {
                type: 'warning'
            }).then(() => {
                this.listLoading = true;
                //NProgress.start();
                let para = {
                    ids: ids
                };
                batchRemoveUser(para).then((res) => {
                    this.listLoading = false;
                    //NProgress.done();
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.getUsers();
                });
            }).catch(() => {

            });
        }
    },
    mounted() {

        this.getList();
        // CHAT.init()
        // CHAT.uploadinfo = [{
        //         username: '王小明',
        //         filename: 128,
        //         time: '北京市朝阳区芍药居'
        //     },
        //     {
        //         username: '王小明',
        //         filename: 33318,
        //         time: '北京市朝阳区芍药居'
        //     },
        //     {
        //         username: '王小明',
        //         filename: 118,
        //         time: '北京市朝阳区芍药居'
        //     },
        //     {
        //         username: '王小明',
        //         filename: 22221,
        //         time: '北京市朝阳区芍药居'
        //     },
        // ]
    }
}
</script>
