<template>
  <div>
    <div class="right-top">
      <div>
        <span>习题名称:</span>
        <el-input v-model="querySourceName" placeholder="请输入"
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

    <div class="exam-main">
      <!-- 循环  判断是单选题还是多选题类型 只需对接数据即可 -->
      <div v-for="(item,index) in extype" :key="item">
        <div class="exam-type">
          <div class="left">
            <div class="btntype">{{ item.type }}</div>
            <span>王佳欣&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2022.02.18</span>
          </div>
          <div class="right">
            <div class="edit" @click="edit(item.id)"><img src="../../../../static/tuImg/bianji@2x.png" alt=""><span @click="openEditQuestion">编辑</span></div>
            <div @click="del(index)" class="dele"><img src="../../../../static/tuImg/shanchu@2x.png" alt=""><span>删除</span></div>
          </div>
        </div>

        <!-- 题目部分 标题 选项 解析 -->
        <div class="exam-content">
          <div class="exam-title">
            1、在html中，通过xxxxxxxxx
          </div>
          <!-- 选项 -->
          <div v-for="opt in activities" class="exam-opt" @click="change($event)" :key="opt" :ac="activities.as">
            {{ opt.content }}、{{ opt.data }}
          </div>
          <div class="exam-analy">
            解析：这是一条解析
          </div>
        </div>
      </div>
    </div>
    <AddQuestions :show="showAddQuestions" @cancel="closeAddQuestions" @confirm="confirmAddQuestion"/>
    <PcEditQuestion :show="showEditQuestion" @cancel="closeEditQuestion" @confirt="confirmEditQuestion" />
  </div>
</template>

<script>
import AddQuestions from "./AddQuestions";
import PcEditQuestion from "../manageLeft/PcEditQuestion";
import API from '@/api'

export default {
  name: "pcmanageRight",
  components: {
    AddQuestions,
    PcEditQuestion,
    API,
  },
  data() {
    return {
      showAddQuestions:false,
      showEditQuestion: false,
      activities: [
        {
          content: "A",
          data: "1",
        },
        {
          content: "B",
          data: "2",
        },
        {
          content: "C",
          data: "3",
        },
        {
          content: "D",
          data: "4",
        },
      ],
      extype: [
        {
          type: "多选题",
        },
        {
          type: "单选题",
        },
      ]
    };
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
        this.extype.splice(index, 1);
    },
    openEditQuestion(){
      this.showEditQuestion=true
    },
    closeEditQuestion(){
      this.showEditQuestion=false
    },

  }
  // methods: {
  //     change(event) {
  //         for (let index = 0; index < 5; index++) {
  //             document.getElementsByClassName("el-timeline-item__content")[
  //             index
  //             ].children[0].className = "second";
  //         }
  //         if (event.target.className == "first") {
  //             event.target.className = "second";
  //         } else {
  //             event.target.className = "first";
  //         }
  //     }
  // },
}
</script>

<style scoped lang="scss">
@import "../../../assets/css/personalCenter/pcmanage/PcmanageRight.scss";
</style>

