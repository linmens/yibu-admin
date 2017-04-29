<template>
<div class="realtive">
  <Row :gutter="32">
    <Col span="24" class="demo-tabs-style1" style="background: #e3e8ee;padding:16px;">
    <Tabs type="card">
      <Tab-pane :label="tab.title" v-for="tab in tabs">
        <Radio-group v-model="animal" @on-change="isChange($event)">
          <Radio :label="r" v-for="r in tab.animal"></Radio>
        </Radio-group>
      </Tab-pane>

    </Tabs>
    </Col>
  </Row>

  <Upload multiple type="drag" ref="upload" :data="{animal}" :before-upload="handleBeforeUpload" action="http://yibu.a10store.com/app/setting/api/uv.shop.info.excel.update.php">
    <div style="padding: 20px 0">
      <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
      <p>点击或将文件拖拽到这里上传</p>
    </div>
  </Upload>
</div>
</template>
<style>
.demo-tabs-style1>.ivu-tabs-card>.ivu-tabs-content {
  height: 120px;
  margin-top: -16px;
}

.demo-tabs-style1>.ivu-tabs-card>.ivu-tabs-content>.ivu-tabs-tabpane {
  background: #fff;
  padding: 16px;
}

.demo-tabs-style1>.ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab {
  border-color: transparent;
}

.demo-tabs-style1>.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab-active {
  border-color: #fff;
}
</style>
<script>
export default {
  data() {
    return {
      animal: '录入大仓库存',
      tabs:[{animal:['录入大仓库存','录入商场库存','导入新品信息'],title:'同步丽晶数据'},
            {animal:['导入每日销售','导入库存销量','导入总销量'],title:'同步E电宝数据'}]
    }
  },
  methods: {
    handleBeforeUpload() {
      console.log(this);
    },
    isChange(e){
      console.log(e);
    },
    explor() {
      this.$http.post('http://yibu.a10store.com/app/setting/api/yx.baoyou.10.excel.get.php').then(res => {
        console.log(res);
        window.location.href = res.body.down_path
        this.$Message.success('导出成功!');
      }, res => {
        // error callback

      })
    }
  },
  mounted() {
    console.log(this.$refs.upload);
  }
}
</script>
