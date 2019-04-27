<template>
  <div id="app">
    <router-view/>
    <Loading v-show="LOADING" />
  </div>
</template>

<script>
 import {mapState} from 'vuex'
 //import Loading from './components/loading'
 import Loading from '@/components/Loadding'
export default {
  name: 'App',
   computed:{
            ...mapState([
                'LOADING',
            ])
        }, 
   components: {
     Loading:Loading,
     },   
   created(){
     this.$store.dispatch('getBrowser')//分发浏览器信息
   }   
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
