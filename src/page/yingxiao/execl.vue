<template>
<div class="realtive">
    <Button @click="explor">导出9.9商品</Button>
</div>
</template>
<script>
export default{
  methods:{
    explor(){
      this.$http.post('http://yibu.a10store.com/app/setting/api/yx.baoyou.10.excel.get.php').then(res => {
        console.log(res);
        window.location.href= res.body.down_path
        this.$Message.success('导出成功!');
      }, res => {
        // error callback

      })
    }
  }
}
</script>
