<template>
  <div class="base_addQuestions">
    <el-dialog title="添加试题" width="900px" top="84px" :visible.sync="show"
               :close-on-click-modal="false"
                :close-on-press-escape="false"
                :before-close="cancel">
      <div class="question_main">
        <div class="dropdown" style="padding-bottom: 6px">
          <el-dropdown @command="add">
            <el-button type="primary">
              新增题目&nbsp;<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="1">单选题</el-dropdown-item>
              <el-dropdown-item :command="4">填空题</el-dropdown-item>
              <el-dropdown-item :command="2">多选题</el-dropdown-item>
              <el-dropdown-item :command="3">判断题</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="question_container" ref="scroll">
          <template v-for="(q,i) in form">
            <div class="question" :key="i">
              <div class="question_type">
                <div class="title" v-if="q.question.questionType===1">单选题</div>
                <div class="title" v-if="q.question.questionType===2">多选题</div>
                <div class="title" v-if="q.question.questionType===3">判断题</div>
                <div class="title" v-if="q.question.questionType===4">填空题</div>
                <div class="dele" @click="del(i)"><img style="" src="../../../../static/tuImg/shanchu@2x.png"
                                                       alt=""><span>删除</span>
                </div>
              </div>
              <div class="question_form" :style="{height:(200+q.options.length*40)+'px'}">
                <div class="left">
                  <div class="top">
                    <div class="description item">
                      <div class="label">
                        <span>*</span>题目：
                      </div>
                      <div class="input">
                        <el-input type="textarea" resize="none" v-model.trim="q.question.questionDescription" rows="2"
                                  placeholder="请输入题目"></el-input>
                      </div>
                    </div>
                    <div class="uploader">
                      <el-upload
                        :action="uploadImgUrl"
                        name="file"
                        :data="uploadFileData"
                        :show-file-list="false"
                        :on-success="(response, file, fileList) =>
      handleImgSuccess(response, file, fileList, i)"
                        :before-upload="beforeImgUpload"
                        :headers="header"
                      >
                        <div v-if="q.optionImgs[0].questionImg===''">
                          <div style="width: 100%;display: flex;justify-content: center;">
                            <div class="jia"
                                 :style="{backgroundImage:'url(' + imghost + '/personalCenter/pcCourseSource/pcCourseSource_uploadFile_jia.png' + ')' }"></div>
                          </div>
                          <div class="txt">添加图片</div>
                        </div>
                        <img v-if="q.optionImgs[0].questionImg!==''" :src="webUrl(q.optionImgs[0].questionImg)" style="width: 100px;height: 64px;">
                      </el-upload>
                    </div>
                  </div>

                  <div class="option item">
                    <div class="label" v-if="q.question.questionType===4">
                      <span>*</span>答案选项：
                    </div>
                    <div class="label" v-else>
                      <span>*</span>参考答案：
                    </div>
                    <div class="input" style="padding-left: 8px;">
                      <div class="answer" :style="{
                         borderBottom: q.question.questionType!==3?'1px solid #efefef':'none'
                      }" v-for="(item,index) in q.options" :key="index">
                        <el-checkbox v-model="item.answerFlag" :true-label="1" :false-label="2"
                                     class="flag"
                                     v-if="q.question.questionType!==4"
                                     @change="check($event,i,index)"
                        >
                        <span style="color: #252525;" v-if="q.question.questionType===1||q.question.questionType===2">
                          {{ String.fromCharCode(97 + index).toUpperCase() }}.
                        </span>
                        </el-checkbox>
                        <span style="color: #252525;margin-left: 20px" v-else>{{ index + 1 }}.</span>
                        <el-input v-model.trim="item.optionContent" v-if="q.question.questionType!==3"></el-input>
                        <span style="color: #252525;margin-left: 10px" v-else>{{ item.optionContent }}</span>
                        <span class="cha" @click="deleteOption(i,index)"
                              v-if="q.question.questionType!==3&&q.question.questionType!==4">
                          x
                        </span>
                        <span class="cha" @click="deleteOption(i,index)"
                              v-if="q.question.questionType===4&&q.options.length>1">
                          x
                        </span>
                      </div>

                      <div class="footer" style="padding-top: 0" v-if="q.question.questionType!==3">
                        <el-button type="primary" class="aus_confirm_btn_ok" style="height: 28px;margin-left: 18px;"
                                   @click="addOption(i)">添加答案
                        </el-button>
                      </div>
                    </div>
                  </div>


                </div>
                <div class="right">
                  <div class="analysis item">
                    <div class="label">
                      题目解析：
                    </div>
                    <div class="input">
                      <el-input type="textarea" placeholder="请输入题目解析" resize="none"
                                v-model.trim="q.question.questionAnalysis"></el-input>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
        <div class="footer">
          <el-button style="height: 28px;" @click="cancel">取消</el-button>
          <el-button type="primary" :class="{
            dis:form.length===0
          }" style="height: 28px;margin-left: 18px;"
                     @click="submitForm" :disabled="form.length===0">确定
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import API from '@/api'
import {saveSkillQuestionBatch} from '@/api/modules/question/question_manage'

export default {
  name: "AddQuestions",
  props:['show'],
  data() {
    return {
      imghost: this.$imghost,
      uploadImgUrl: API.common.getUrl('/hyossfilelist/comUploadImage'),
      dialogVisible: true,
      uploadFileData: {"fileFrom": 12},
      header: {token: ''},
      form: []
    }
  },
  mounted() { //mounted:在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
    this.header.token = this.$cookie.get('access_Token')
  },
  computed: {
    webUrl() {
      return function (name) {
        //return this.$http.webUrl('') + (encodeURI(name));
        return API.common.getUrl(encodeURI(name))
      }
    },
  },
  methods: {
    // scrollToBottom(){
    //   this.$refs.scroll.scrollTop=this.$refs.scroll.scrollHeight
    // },
    add(command) {
      const obj = {
        question: {
          skillResourcesId: this.$route.query.skillResourcesId,
          questionType: command,
          questionDescription: '',
          questionAnalysis: '',
          importType: 1,
        },
        optionImgs: [{
          questionImg: ''
        }]
      }
      if (command === 1 || command === 2) {
        obj.options = [
          {
            optionContent: '',
            answerFlag: 2
          },
          {
            optionContent: '',
            answerFlag: 2
          },
          {
            optionContent: '',
            answerFlag: 2
          },
          {
            optionContent: '',
            answerFlag: 2
          },
        ]
      } else if (command === 3) {
        obj.options = [
          {
            optionContent: '正确',
            answerFlag: 2
          },
          {
            optionContent: '错误',
            answerFlag: 2
          },
        ]
      } else {
        obj.question.answerUniqueStatus = 0
        obj.options = [
          {
            optionContent: '',
            answerFlag: 1
          },
        ]
      }

      this.form = [...this.form, obj]
      // this.scrollToBottom()
    },
    check(val, i, j) {
      let type = this.form[i].question.questionType
      console.log(val,i,j)
      if (type === 1 || type === 3) {
        this.form[i].options.forEach((item, index) => {
          if (index !== j&&val===1) {
            item.answerFlag = val === 2 ? 1 : 2
          }
        })
      }
    },
    addOption(i) {
      let type = this.form[i].question.questionType
      if (this.form[i].options.length >= 6) {
        this.$alert('同一个题目，最多可添加6个空')
        return
      }

      if (type === 1 || type === 2) {
        this.form[i].options = [
          ...this.form[i].options,
          {
            optionContent: '',
            answerFlag: 2
          }
        ]
      } else {
        this.form[i].options = [
          ...this.form[i].options,
          {
            optionContent: '',
            answerFlag: 1
          }
        ]
        this.form[i].question.answerUniqueStatus = 1
      }
    },
    deleteOption(i, j) {
      let type = this.form[i].question.questionType
      if (type === 1 || type === 2) {
        if (this.form[i].options.length <= 2) {
          this.$alert('不能少于两个选项')
          return
        }
      }
      this.form[i].options = this.form[i].options.filter((item, index) => {
        return index !== j
      })
      if (type === 4 && this.form[i].options.length <= 1) {
        this.form[i].question.answerUniqueStatus = 0
      }
    },
    del(i) {
      this.form = this.form.filter((item, index) => {
        return index !== i
      })
    },
    cancel(){
      this.form=[]
      this.$emit('cancel')
    },
    submitForm() {
      for(let item of this.form){
        if(!item.question.questionDescription){
          this.$message.error("题目还未填写")
          return
        }
        for (let i of item.options){
          if(!i.optionContent){
            this.$message.error("选项还未填写")
            return
          }
        }
        let hasAnswer=item.options.some((item,index)=>{
          return item.answerFlag===1
        })
        if (!hasAnswer){
          this.$message.error("请指明正确答案")
          return
        }
      }

      saveSkillQuestionBatch(this.form).then(({data}) =>{
        if(data.code===0){
          this.$message.success("操作成功")
          this.form=[]
          this.$emit('confirm')
        }
        else{
          this.$message.error(data.msg)
        }
      })
    },
    sourceMenuIndexFun() {
      if (this.sourceType === 2) {
        return 12;
      } else if (this.sourceType === 3) {
        return 13;
      } else if (this.sourceType === 4) {
        return 14;
      }
    },
    handleImgSuccess(res, file, fileList, i) {
      if (res.code === 0) {
        this.form[i].optionImgs[0].questionImg = res.data.fileSrc;
        this.$forceUpdate();
        // this.$message.success('上传图片成功',500)
        this.$message.success({message: '上传图片成功', duration: 800});
      }
    },
    beforeImgUpload(file, fileList) {
      console.log(file)
      const isImg = ['image/jpg', 'image/gif', 'image/ico', 'image/jpeg', 'image/png'].includes(file.type);
      console.log("isImg", isImg)
      const isLt = file.size / 1024 / 1024 < 20;
      if (!isImg) {
        this.$message.error('上传图片格式错误!');
        return false;
      }
      if (!isLt) {
        this.$message.error('上传图片大小不能超过20MB!');
        return false;
      }
      this.uploadFileData = {"fileFrom": this.sourceMenuIndexFun()};
      return true;
    },
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/css/personalCenter/pcmanage/addQuestions.scss";
</style>
