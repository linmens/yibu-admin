<template>
<div class="realtive">
  <input type="text" placeholder="搜索..." class="ivu-select-input" v-model="search">
  <Table :columns="columns1" :data="data1" @on-row-click="isonrow" class="cDataTable">
  </Table>
  <Page :total="pagetotal" :current="page" @on-change="changePage"></Page>
  <div class="fix_sumbit">
    <Row class="fix_bottom" justify="end">
      <Col span="24">
      <Button type="primary">保存修改</Button>
      </Col>
    </Row>
  </div>
</div>
</template>
<style>
.cDataTable tr td span {
  display: block;
  cursor: text;
}

.realtive {
  position: relative;
}

.fix_bottom {
  background: #f5f7f9;
  padding: 10px;
  margin-bottom: 0
}

.fix_sumbit {
  position: fixed!important;
  bottom: 0;
  width: 100%;
  z-index: 999
}
</style>
<script>
import lodash from 'lodash'
import Vue from 'vue'
export default {

  data() {
    return {
      self: this,
      pagetotal: 0,
      page: 1,
      search: '',
      Aftersale: "",
      targetId: 1,
      rowEdit: [],
      columns1: [{
          type: 'selection',
          width: 60,
          align: 'center'
        }, {
          title: '公司货号',
          key: 'outer_id_gs',
          sortable: true
        }, {
          title: '电商货号',
          key: 'outer_id_ds',
          sortable: true
        }, {
          title: '电商条码',
          key: 'bar_code_ds',
          sortable: true
        }, {
          title: '颜色',
          key: 'goods_color_gs',
          sortable: true
        }, {
          title: '颜色编码',
          key: 'goods_color_no_gs',
          sortable: true
        }, {
          title: '尺码',
          key: 'goods_size_gs',
          sortable: true
        }, {
          title: '尺码编码',
          key: 'goods_size_no_gs',
          sortable: true
        }, {
          title: '年份',
          key: 'goods_year',
          sortable: true
        }, {
          title: '季节',
          key: 'goods_season',
          sortable: true
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render(row, column, index) {
            return `<i-button type="primary" size="small" @click="show(${index})">编辑</i-button> <i-button type="error" size="small" @click="remove(${index})">删除</i-button>`;
          }
        }
      ]
    }
  },
  watch: {
    // 如果 question 发生改变，这个函数就会运行
    search: function() {
      this.senDChange()
    },
    rowEdit: function(newQuestion, old) {
      console.log(newQuestion);
    }
  },
  methods: {
    /*
           e     :事件
           field :字段，用于告诉服务端要更新哪个字段
           user  :列表中某一行数据
        */
    editable: function(e, field, user) {
      var that = this;
      console.log(user);
      that.$editable(e, function(value) {
        // 这里做ajax请求
        //如果数据没有被修改这个回调方法不会执行
        console.log(value);
        that.$http.post('http://yibu.a10store.com/app/setting/api/goods.info.update.php', {
          uuid: user.un_id,
          fields: field,
          values: value
        }).then(res => {
          console.log(res);
          // this.data1 = res.body.goods_list;
          // this.pagetotal = res.body.num
          that.$Message.success('更新成功!');
        }, res => {
          // error callback
        })
      });
    },
    senDChange: _.debounce(
      function(s) {
        this.$http.post('http://yibu.a10store.com/app/setting/api/goods.info.sku.get.php', {
          search: this.search
        }).then(res => {
          console.log(res);
          this.data1 = res.body.goods_list;
          this.pagetotal = res.body.num
        }, res => {
          // error callback
        })
      },
      // 这是我们为用户停止输入等待的毫秒数
      500
    ),
    changeyhd(i) {
      this.targetId = i
      console.log(this.targetId);

    },
    getgoodlist() {
      this.$http.post('http://yibu.a10store.com/app/setting/api/goods.info.sku.get.php', {
        current: this.page
      }).then(res => {
        console.log(res);
        this.data1 = res.body.goods_list;
        this.pagetotal = res.body.num
      }, res => {
        // error callback
      })
    },
    changePage(val) {
      this.page = val
      // 这里直接更改了模拟的数据，真实使用场景应该从服务端获取数据
      this.getgoodlist();
    },
    isonrow(row) {
      console.log(row);
      // row._checked=true
    }
  },
  mounted() {
    this.getgoodlist()
  }
}
</script>
