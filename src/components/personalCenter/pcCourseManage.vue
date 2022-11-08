<template>
  <div class="base_pcCourseManage" >
    <div class="main_pcCourseManage">
      <personal-center-nav :navList="navList"  >
      </personal-center-nav>
      <div class="main_tain">
        <!-- 左侧 -->
        <div class="left-main">
          <div class="left-top">
            <el-button type="primary" @click="" style=" width: 90px;">+ 专项类型</el-button>
            <el-button type="primary" @click="" style=" width: 70px;">+ 子专项</el-button>
            <img style="margin-left:45px" src="../../../static/tuImg/sahng@2x.png" alt="">
            <img src="../../../static/tuImg/xia2@2x.png" alt="">
          </div>
          <div class="line">
          </div>

          <!-- 左侧目录 -->
          <div>
            <pcmanage-left/>
          </div>

        </div>
        <!-- 右侧 -->
        <div class="right-main">
          <!-- 右侧顶部 -->
          <div class="right-top">
            <div>
              <span>习题名称:</span>
              <el-input v-model="querySourceName" placeholder="请输入" style="height:28px; width: 300px;border: 1px solid #f8f8f8;" clearable></el-input>
              <img style="width: 20px;height: 20px;position: relative;top: 5px;right: 42px;cursor: pointer;" :src="$imghost+'/personalCenter/pcCourseSource/sourceSearch.png'" @click="">
            </div>
            <div>
              <el-button type="primary" @click="" style=" width: 80px;">添加试题</el-button>
              <el-button type="primary" @click="" style=" width: 80px;">批量导入</el-button>
              <el-button type="danger" @click="" style=" width: 80px;">全部删除</el-button>
            </div>
          </div>
          <div class="line">
          </div>

          <div>
            <!-- 右侧显示试题部分 -->
            <pcmanage-right/>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PersonalCenterNav from "../common/LocationNav/PersonalCenterNav";
import PcmanageRight from "../personalCenter/manageRight/PcmanageRight";
import PcmanageLeft from "./manageLeft/pcmanageLeft";
export default {
  name: 'pcCourseManage',
  components: {
    PersonalCenterNav,
    PcmanageRight,
    PcmanageLeft,
  },
  data () {
    return {
      navList:[
        {name:'老师工作台',url:'',flag:0},//0不变色，1变色
        {name:'专业资源管理',url:'',flag:0},//0不变色，1变色
        {name:'web前端开发',url:'',flag:0},//0不变色，1变色
        {name:'题库管理',url:'',flag:1},//0不变色，1变色
      ],
    }
  },
  methods: {

  },
}
</script>

<style scoped lang="scss">
 @import "../../assets/css/personalCenter/pcmanage/pcCourseManage.scss";
</style>
