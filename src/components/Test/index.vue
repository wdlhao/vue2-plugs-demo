
<template>
    <div class="btn-item">
        <button class="btn btn-success" @click="sure($event)">确定</button>
        <button class="btn btn-default" @click="quit">取消</button>
    </div>
</template>

<script>
  export default{
      name:'test',
      data(){
          return {

          }
      },
      methods:{
          sure(e){
               console.log(e.target);
          },
          quit(e){
              console.log(e.target);
          }
      }
  }

</script>
