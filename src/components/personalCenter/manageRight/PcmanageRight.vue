<template>
  <div>
    <div class="right-top">
      <div>
        <span>习题名称:</span>
        <el-input v-model="questionDescription" placeholder="请输入"
                  style="height:28px; width: 300px;border: 1px solid #f8f8f8;" clearable></el-input>
        <img style="width: 20px;height: 20px;position: relative;top: 5px;right: 42px;cursor: pointer;"
             :src="$imghost+'/personalCenter/pcCourseSource/sourceSearch.png'" @click="">
      </div>
      <div>
        <el-button type="primary" style=" width: 80px;" @click="openAddQuestions">添加试题</el-button>
        <el-button type="primary" @click="" style=" width: 80px;">批量导入</el-button>
        <el-button type="danger" @click="" style=" width: 80px;">全部删除</el-button>
      </div>
      <div class="line"></div>
    </div>

    <div class="exam-main" style="overflow-y:scroll;overflow-x:hidden;height:820px">
      <!-- 循环  判断是单选题还是多选题类型 只需对接数据即可 -->
      <div v-for="(item,index) in list">
        <div class="exam-type">
          <div class="left">
            <div class="btntype">{{ item.questionType }}</div>
            <span>{{item.createUserRealName}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.modifiedTimeStr}}</span>
          </div>
          <div class="right">
            <div class="edit"><img src="../../../../static/tuImg/bianji@2x.png" alt=""><span>编辑</span></div>
            <div @click="del(index)" class="dele"><img src="../../../../static/tuImg/shanchu@2x.png" alt=""><span>删除</span></div>
          </div>
        </div>

        <!-- 题目部分 标题 选项 解析 -->
        <div class="exam-content">
          <div class="exam-title">{{index+1}}、{{item.questionDescription}}</div>
          <!-- 选项 -->
          <div v-for="option in item.options" class="exam-opt" >
            {{ option.questionOption }}、{{ option.optionContent }}
          </div>
          <div class="exam-analy">
            解析：{{item.questionAnalysis}}
          </div>
        </div>
      </div>
    </div>
    <AddQuestions :show="showAddQuestions" @cancel="closeAddQuestions" @confirm="confirmAddQuestion"/>
  </div>
</template>

<script>
import AddQuestions from "./AddQuestions";
import API from '@/api'
import {listPageSkillQuestionsByDirId} from "@/api/modules/pcCourseSource/pcmanageRight"

export default {
  name: "pcmanageRight",
  components: {
    AddQuestions,
    API,
  },
  created() {//created:在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。
    //初始化资源列表
    this.listPageSkillQuestionsByDirId();
  },
  props:{
    PcmanageRight:{
      type:Array,
      default(){
        return[]
      }
    }
  },
  data() {
    return {
      showAddQuestions:false,
      // currentPage: 1, //当前页数 ，默认为1
      // pageSize: 3, // 每页显示数量
      list: [], //当前页显示内容
    };
  },
  computed: {
    webUrl() {
      return function (name) {
        //return this.$http.webUrl('') + (encodeURI(name));
        return API.common.getUrl(encodeURI(name))
      }
    },
  },
  mounted() { //mounted:在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
    this.header.token=this.$cookie.get('access_Token')
  },
  methods:{
    openAddQuestions(){
      this.showAddQuestions=true
    },
    closeAddQuestions(){
      this.showAddQuestions=false
    },
    confirmAddQuestion(){
      this.closeAddQuestions()
      this.init()
    },
    init(){
      //TODO:请求获取数据列表
    },
    del(index) {
        // this.activities.splice(val, 1);
        this.list.splice(index, 1);
    },
    async listPageSkillQuestionsByDirId(){
      let params = {
        skillResourcesId: this.$route.query.skillResourcesId,
      }
      const  { data } =  await API.pcmanageRight.listPageSkillQuestionsByDirId(params)

      this.list = data.page.list;
      console.log(this.list); 
    },
  },
}
</script>

<style scoped lang="scss">
@import "../../../assets/css/personalCenter/pcmanage/PcmanageRight.scss";
</style>

