<template>
  <div>
    <div class="right-top">
      <div>
        <span>习题名称:</span>
        <el-input v-model="questionDescription" placeholder="请输入"
                  style="height:28px; width: 300px;border: 1px solid #f8f8f8;" clearable></el-input>
        <img style="width: 20px;height: 20px;position: relative;top: 5px;right: 42px;cursor: pointer;"
             :src="$imghost+'/personalCenter/pcCourseSource/sourceSearch.png'">
      </div>
      <div>
        <el-button type="primary" style=" width: 80px;" @click="openAddQuestions">添加试题</el-button>

        <el-button type="primary" style=" width: 80px;">批量导入</el-button>
        <el-button type="danger" style=" width: 80px;">全部删除</el-button>
      </div>
      <div class="line"></div>
    </div>

    <div class="exam-main" style="overflow-y:scroll;overflow-x:hidden;height:820px">
      <!-- 循环  判断是单选题还是多选题类型 只需对接数据即可 -->
      <div v-for="(item,index) in list">
        <div class="exam-type">
          <div class="left">
            <div class="btntype" v-if="item.questionType ==1">单选题</div>
            <div class="btntype" v-if="item.questionType ==2">多选题</div>
            <div class="btntype" v-if="item.questionType ==3">判断题</div>
            <div class="btntype" v-if="item.questionType ==4">填空题</div>
            <div class="name">{{item.createUserRealName}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.modifiedTimeStr}}</div>
          </div>
          <div class="right">
            <div @click="openEditQuestion(item)" class="edit"><img src="../../../../static/tuImg/bianji@2x.png" alt=""><span>编辑</span></div>
            <div @click="del(item.id)" class="dele"><img src="../../../../static/tuImg/shanchu@2x.png" alt=""><span>删除</span></div>
          </div>
        </div>

        <!-- 题目部分 标题 选项 解析 -->
        <div class="exam-content">
          <div class="exam-title">{{index+1}}.&nbsp;&nbsp;{{item.questionDescription}}</div>
          <!-- 选项 -->
          <div v-for="option in item.options" class="exam-opt" :class="addClass(option.answerFlag)" >
            <span :class="optionaddClass(option.answerFlag)">{{ option.questionOption }}</span>&nbsp;&nbsp;&nbsp;<span>{{ option.optionContent }}</span>
          </div>
          <div class="exam-analy">
            解析：{{item.questionAnalysis}}
          </div>
        </div>
      </div>
    </div>
    <AddQuestions :show="showAddQuestions" @cancel="closeAddQuestions" @confirm="confirmAddQuestion"/>

    <PcEditQuestion :show="showEditQuestion" :question="question" @cancel="closeEditQuestion" @confirm="confirmEditQuestion" />
  </div>
</template>

<script>
import AddQuestions from "./AddQuestions";
import PcEditQuestion from "../manageLeft/PcEditQuestion";
import API from '@/api'
import {listPageSkillQuestionsByDirId} from "@/api/modules/pcCourseSource/pcmanageRight"
import {deletetim} from "@/api/modules/question/question_manage"
import { doGetQuestion } from "../../../api/modules/question_bank/menu";

export default {
  name: "pcmanageRight",
  components: {
    AddQuestions,
    PcEditQuestion,
    API,
  },
  created() {//created:在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。
    //初始化资源列表
    this.listPageSkillQuestionsByDirId();
  },
  data() {
    return {
      showAddQuestions:false,
      question: null,
      // currentPage: 1, //当前页数 ，默认为1
      // pageSize: 3, // 每页显示数量
      list: [], //当前页显示内容
      showEditQuestion: false,
      imghost:this.$imghost,
      questionDescription:''
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
      this.listPageSkillQuestionsByDirId();
    },
    del(id) {
      console.log(id);
      deletetim({"questionId": id}).then((result) => {
        console.log(result);
        if(result && result.data.code == 0) {
          this.$message.success("删除成功")
          this.listPageSkillQuestionsByDirId()
        }else {
          this.$message.error("删除失败")
        }
      })
    },
    addClass(i) {
      switch(i){
        case 1:
          return 'exam-opted';
        case 2:
          return 'exam-opt'
      }
    },
    optionaddClass(i){
      switch(i){
        case 1:
          return 'opted';
        case 2:
          return ''
      }
    },
    async listPageSkillQuestionsByDirId(){
      let params = {
        skillResourcesId: this.$route.query.skillResourcesId,
      }
      const  { data } =  await API.pcmanageRight.listPageSkillQuestionsByDirId(params)
      this.list = data.page.list;
    },
    openEditQuestion(question){
      this.question = question;
      this.showEditQuestion=true
    },
    closeEditQuestion(){
      this.showEditQuestion=false
    },
    confirmEditQuestion() {
      this.init()
      this.showEditQuestion = false
    },
  },
}
</script>

<style scoped lang="scss">
@import "../../../assets/css/personalCenter/pcmanage/PcmanageRight.scss";
</style>

