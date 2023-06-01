<template>
  <div class="layout">
    <el-container v-if="state.showMenu" class="container">
      <!--左侧菜单-->
      <el-aside class="aside">
        <!--系统名称+logo-->
        <div class="head">
          <div>
            <img src="//s.weituibao.com/1582958061265/mlogo.png" alt="logo">
            <span>vue3 admin</span>
          </div>
        </div>
        <!--一条为了美观的线条-->
        <div class="line" />
        <!--菜单们-->
        <el-menu
            background-color="#222832"
            text-color="#fff"
            :router="true"
        >
          <el-sub-menu index="1">
            <!--一级栏目-->
            <template #title>
              <span>Dashboard</span>
            </template>
            <!--二级栏目-->
            <el-menu-item-group>
              <el-menu-item index="/"><el-icon><DataLine /></el-icon>首页</el-menu-item>
              <el-menu-item index="/add"><el-icon><DataLine /></el-icon>添加商品</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <span>首页配置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/swiper"><el-icon><Picture /></el-icon>轮播图配置</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>

        </el-menu>

      </el-aside>

      <!--右边内容布局-->
      <el-container class="content">
        <Header/>
        <div class="main">
          <!--将 <router-view></router-view> 移到这里，并且用单标签-->
          <router-view />
        </div>
        <Footer/>
      </el-container>
    </el-container>
    <el-container v-else>
      <router-view />
    </el-container>

  </div>
  <div>div</div>
</template>

<script setup>
import {localGet} from "@/utls";
import path from "path";
import {reactive} from "vue";
import {useRouter} from "vue-router";


//不需要 menu 的 path arr
const noMenu = ['/login']
const router = useRouter();
const state = reactive(({
  showMenu: true,
  defaultOpen: ['1', '2'],
  currentPath: '/'
}))

//监听路由的变化
router.beforeEach((to, from, next) => {

  //33章代码
  if (to.path == '/login') next(); //正常执行
  else {
    if (!localGet('token')) next({ path: '/login'}); //如果没有 则跳至登录页面
    else next(); //否则继续执行
  }

  //32章代码
  state.showMenu = !noMenu.includes(to.path)
  //35章
  state.currentPath = to.path;
  //33章代码
  document.title = path[to.name];
})
</script>

<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";

export default {
  name: 'App',
  components: {Footer, Header}
}

</script>

<style scoped>
.layout {
  min-height: 100vh;
  background-color: #ffffff;
}
.container {
  height: 100vh;
}
.aside {
  width: 200px!important;
  background-color: #222832;
}
.head {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
}
.head > div {
  display: flex;
  align-items: center;
}

.head img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
.head span {
  font-size: 20px;
  color: #ffffff;
}
.line {
  border-top: 1px solid hsla(0,0%,100%,.05);
  border-bottom: 1px solid rgba(0,0,0,.2);
}

.content {
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  overflow: hidden;
}
.main {
  height: calc(100vh - 100px);
  overflow: auto;
  padding: 10px;
}
</style>

<style>
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>
