<template>
<div class="realtive">
  <Table :columns="columns1" :data="data1" @on-row-click="isonrow" height="400" class="cDataTable">

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
.cDataTable tr td span{
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
      Aftersale: "",
      targetId: 1,
      rowEdit: [],
      columns1: [{
          type: 'selection',
          width: 60,
          align: 'center'
        }, {
          title: '货号',
          key: 'outer_id_ds'
        }, {
          title: '主图url',
          key: 'pic_url',
          render(row, column, index) {
            return `
            <span @click="editable($event,'pic_url',row)">{{row.pic_url}}</span>
            `
          }
        }, {
          title: '闪购价',
          key: 'goods_price_ump_yhd_sg',
          render(row, column, index) {
            return `

            <span @click="editable($event,'goods_price_ump_yhd_sg',row)">{{row.goods_price_ump_yhd_sg}}</span>

            `
          }
        }, {
          title: '上架时间',
          key: 'time_goods_onlist',
          render(row, column, index) {
            return `
            <span @click="editable($event,'time_goods_onlist',row)">{{row.time_goods_onlist}}</span>
            `
          }
        },
        {
          title: '拍摄时间',
          key: 'time_goods_paishe',
          render(row, column, index) {
            return `
            <span @click="editable($event,'time_goods_paishe',row)">{{row.time_goods_paishe}}</span>
            `
          }
        }, {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render(row, column, index) {
            return `<i-button type="primary" size="small" @click="show(${index})">编辑</i-button> <i-button type="error" size="small" @click="remove(${index})">删除</i-button>`;
          }
        }
      ],
      data1: [{
        "un_id": "Y6D0625藏青色",
        "outer_id_ds": "E6D0625",
        "pic_url": "",
        "goods_price_ump_yhd_sg": 318.00,
        "time_goods_onlist": "",
        time_goods_paishe: '123213'
      }]

    }
  },
  watch: {
    // 如果 question 发生改变，这个函数就会运行
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
          this.data1 = res.body.goods_list;
          this.pagetotal = res.body.num
        }, res => {
          // error callback
        })
      });
    },
    senDChange: _.debounce(function(s) {

    }),
    changeyhd(i) {
      this.targetId = i
      console.log(this.targetId);

    },
    getgoodlist() {
      this.$http.post('http://yibu.a10store.com/app/setting/api/goods.info.get.php', {
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
