<template>
  <div class="base_pcCourseManage" >
    <div class="main_pcCourseManage">
      <personal-center-nav :navList="navList"  >
      </personal-center-nav>
      <div class="main_tain">

        <!-- 左侧 -->
        <div class="left-main">
          <pcmanage-left/>
        </div>

        <!-- 右侧 -->
        <div class="right-main">
          <pcmanage-right/>
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
