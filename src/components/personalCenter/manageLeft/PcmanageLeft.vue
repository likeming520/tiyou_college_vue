<template>
    <div>
        <div class="left-top">
            <el-button type="primary" @click="addDirOne" style=" width: 90px;">+ 专项类型</el-button>
            <el-button type="primary" @click="addSmall" style=" width: 70px;">+ 子专项</el-button>
            <img style="margin-left:45px" src="../../../../static/tuImg/sahng@2x.png" alt="">
            <img src="../../../../static/tuImg/xia2@2x.png" alt="">
        </div>



        <!-- <el-row class="tac">
            <el-col>
                <el-menu
                default-active="2"
                class="el-menu-vertical-demo">
                    <el-submenu v-for="(first, f_index) in menus" :index="f_index+1">
                        <template slot="title">
                            <span>{{first.name}}</span>
                        </template>
                        <el-menu-item-group v-if="first.childList">
                            <el-submenu v-for="(second,s_index) in first.childList" :index="f_index +'-' + (s_index+1)">
                                <template slot="title">
                                    <span>{{second.name}}</span>
                                </template>
                                <el-menu-item-grroup v-if="second.childList">
                                    <el-submenu v-for="(thirst,t_index) in second.childList" :index="f_index+ '-' +s_index+ '-' +(t_index)">
                                        <template slot="title">
                                            <span>{{thirst.name}}</span>
                                        </template>
                                    </el-submenu>
                                </el-menu-item-grroup>
                            </el-submenu>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-col>
        </el-row> -->

        <div class="main_dir3" style="font-size: 12px;" v-if="menus.length>0">
          <div v-for="(item1) in menus">
            <!--  一级目录列表 -->
            <div class="main_dir_line" @mouseover="msover_dir(item1.id)" @mouseout="msout_dir(item1.id)">
              <div class="main_dir_line_icon">
                <div class="main_dir_line_icon1"></div>
                <div class="main_dir_line_split1"></div>
              </div>

              <div class="main_dir_line_right" :class="model_bgcolor_dirId==item1.id?model_bgcolor_class:''" v-show="model_rename_dir_cId=='' || model_rename_dir_cId!=item1.id">
                <div style="margin-left: 15px;">{{item1.nodeNum}}.{{item1.name}}</div>
                <div class="main_dir_line_right_operator" :class="model_bgcolor_dirId==item1.id?model_bgcolor_op_class:''" v-popover::ref="'popover_'+item1.id">操作
                  <el-popover
                    :ref="'popover_'+item1.id"
                    placement="bottom"
                    popper-class="course_dirfileexame_pccs"
                    trigger="hover"
                  >
                    <div style="width: 98px;min-height: 180px;border: 0px solid red;" @mouseover="msover_dir(item1.id)" @mouseout="msout_dir(item1.id)">
                      <div class="dirFileExame_pccs_col" @click="renameDirName_open(item1.id,item1.name)">编辑</div>
                      <div class="dirFileExame_pccs_col" @click="deleteSkillCourseDir(item1.id)">删除</div>
                      <div class="dirFileExame_pccs_col" @click="upOrDownSkillCourseDir(item1.id,1)">上移</div>
                      <div class="dirFileExame_pccs_col" @click="upOrDownSkillCourseDir(item1.id,2)">下移</div>
                      <div class="dirFileExame_pccs_col" @click="addSubDir_open(item1.id)">添加子目录</div>
                    </div>
                  </el-popover>
                </div>
              </div>
              <!--重命名一级目录 s-->
              <div class="main_dir_line_right main_dir_line_right_add1dir" v-show="model_rename_dir_cId==item1.id " style="margin-left: 20px;">
                <div style="" class="main_dir_add1dir_input">
                  <el-input  v-model="model_rename_dirName"  placeholder="请输入目录名称" style="width: 100%;margin-left: -6px;" clearable></el-input>
                </div>
                <div class="main_dir_line_right_add1dir_operator"  >
                  <div class="main_dir_line_right_add1dir_operator_cal" @click="renameDirName_cal">取消</div>
                  <div class="main_dir_line_right_add1dir_operator_add" @click="renameDirName_confirm">确定</div>
                </div>
              </div>
              <!--重命名一级目录 e-->

            </div>

            <!--  二级目录列表 -->
            <div    v-for="(item2) in item1.childList">
              <div class="main_dir_line"  @mouseover="msover_dir(item2.id)" @mouseout="msout_dir(item2.id)">
                <div class="main_dir_line_icon">
                  <div class="main_dir_line_icon1" style="visibility:hidden;"></div>
                  <div class="main_dir_line_split1"></div>
                </div>
                <div class="main_dir_line_right" :class="model_bgcolor_dirId==item2.id?model_bgcolor_class:''" v-show="model_rename_dir_cId=='' || model_rename_dir_cId!=item2.id">
                  <div style="margin-left: 15px;">{{item2.nodeNum}}.{{item2.name}}</div>
                  <div class="main_dir_line_right_operator" :class="model_bgcolor_dirId==item2.id?model_bgcolor_op_class:''"  v-popover::ref="'popover_'+item2.id">操作
                    <el-popover
                      :ref="'popover_'+item2.id"
                      placement="bottom"
                      popper-class="course_dirfileexame_pccs"
                      trigger="hover"
                    >
                      <div style="width: 98px;min-height: 180px;border: 0px solid red;" @mouseover="msover_dir(item2.id)" @mouseout="msout_dir(item2.id)">
                        <div class="dirFileExame_pccs_col" @click="renameDirName_open(item2.id,item2.name)">重命名</div>
                        <div class="dirFileExame_pccs_col" @click="deleteSkillCourseDir(item2.id)">删除</div>
                        <div class="dirFileExame_pccs_col" @click="upOrDownSkillCourseDir(item2.id,1)">上移</div>
                        <div class="dirFileExame_pccs_col" @click="upOrDownSkillCourseDir(item2.id,2)">下移</div>
                        <div class="dirFileExame_pccs_col"  @click="addSubDir_open(item2.id)">添加子目录</div>
                      </div>
                    </el-popover>
                  </div>
                </div>
                <!--重命名二级目录 s-->
                <div class="main_dir_line_right main_dir_line_right_add1dir" v-show="model_rename_dir_cId==item2.id " style="margin-left: 20px;">
                  <div style="" class="main_dir_add1dir_input">
                    <el-input  v-model="model_rename_dirName"   v-fo  placeholder="请输入目录名称" style="width: 100%;margin-left: -6px;" clearable></el-input>
                  </div>
                  <div class="main_dir_line_right_add1dir_operator"  >
                    <div class="main_dir_line_right_add1dir_operator_cal" @click="renameDirName_cal">取消</div>
                    <div class="main_dir_line_right_add1dir_operator_add" @click="renameDirName_confirm">确定</div>
                  </div>
                </div>
                <!--重命名二级目录 e-->
              </div>


              <!--  三级目录列表 -->
              <div    v-for="(item3) in item2.childList">
                <div class="main_dir_line" @mouseover="msover_dir(item3.id)" @mouseout="msout_dir(item3.id)">
                  <div class="main_dir_line_icon">
                    <div class="main_dir_line_icon1" style="visibility:hidden;"></div>
                    <div class="main_dir_line_split1"></div>
                  </div>
                  <div class="main_dir_line_right" :class="model_bgcolor_dirId==item3.id?model_bgcolor_class:''" v-show="model_rename_dir_cId=='' || model_rename_dir_cId!=item3.id">
                    <div style="margin-left: 15px;">{{item3.nodeNum}}.{{item3.name}}</div>
                    <div class="main_dir_line_right_operator" :class="model_bgcolor_dirId==item3.id?model_bgcolor_op_class:''" v-popover::ref="'popover_'+item3.id">操作
                      <el-popover
                        :ref="'popover_'+item3.id"
                        placement="bottom"
                        popper-class="course_dirfileexame_pccs"
                        trigger="hover"
                      >
                        <div style="width: 98px;min-height: 180px;border: 0px solid red;" @mouseover="msover_dir(item3.id)" @mouseout="msout_dir(item3.id)">
                          <div class="dirFileExame_pccs_col" @click="renameDirName_open(item3.id,item3.name)">重命名</div>
                          <div class="dirFileExame_pccs_col" @click="deleteSkillCourseDir(item3.id)">删除</div>
                          <div class="dirFileExame_pccs_col" @click="upOrDownSkillCourseDir(item3.id,1)">上移</div>
                          <div class="dirFileExame_pccs_col" @click="upOrDownSkillCourseDir(item3.id,2)">下移</div>
                          <!--<div class="dirFileExame_pccs_col">添加子目录</div>-->
                        </div>
                      </el-popover>
                    </div>
                  </div>
                  <!--重命名二级目录 s-->
                  <div class="main_dir_line_right main_dir_line_right_add1dir" v-show="model_rename_dir_cId==item3.id " style="margin-left: 20px;">
                    <div style="" class="main_dir_add1dir_input">
                      <el-input  v-model="model_rename_dirName"   v-fo  placeholder="请输入目录名称" style="width: 100%;margin-left: -6px;" clearable></el-input>
                    </div>
                    <div class="main_dir_line_right_add1dir_operator"  >
                      <div class="main_dir_line_right_add1dir_operator_cal" @click="renameDirName_cal">取消</div>
                      <div class="main_dir_line_right_add1dir_operator_add" @click="renameDirName_confirm">确定</div>
                    </div>
                  </div>
                  <!--重命名二级目录 e-->

                </div>

              </div>

              <!--  【新增修改目录-输入框】【三级目录】开始 -->
              <div class="main_dir_line2" v-if="model_sub_dir_pId == item2.id">
                <div class="main_dir_line_icon">
                  <div class="main_dir_line_icon1" style="visibility: hidden;"></div>
                  <div class="main_dir_line_split1"></div>
                </div>
                <div class="main_dir_line_right_add1dir" style="margin-left: 20px;">
                  <div style="" class="main_dir_add1dir_input">
                    <el-input  v-model="model_sub_dirName"   v-fo  placeholder="请输入目录名称" style="width: 100%;margin-left: -6px;" clearable></el-input>
                  </div>
                  <div class="main_dir_line_right_add1dir_operator"  >
                    <div class="main_dir_line_right_add1dir_operator_cal" @click="addDirSub_cal">取消</div>
                    <div class="main_dir_line_right_add1dir_operator_add" @click="addDirSub_confirm">确定</div>
                  </div>
                </div>
              </div>
              <!--  【新增修改目录-输入框】【三级目录】结束 -->
            </div>

            <!--  【新增修改目录-输入框】【二级目录】开始 -->
            <div class="main_dir_line2" v-if="model_sub_dir_pId == item1.id">
              <div class="main_dir_line_icon">
                <div class="main_dir_line_icon1" style="visibility: hidden;"></div>
                <div class="main_dir_line_split1"></div>
              </div>
              <div class="main_dir_line_right_add1dir" style="margin-left: 20px;">
                <div style="" class="main_dir_add1dir_input">
                  <el-input  v-model="model_sub_dirName"   v-fo  placeholder="请输入目录名称" style="width: 100%;margin-left: -6px;" clearable></el-input>
                </div>
                <div class="main_dir_line_right_add1dir_operator"  >
                  <div class="main_dir_line_right_add1dir_operator_cal" @click="addDirSub_cal">取消</div>
                  <div class="main_dir_line_right_add1dir_operator_add" @click="addDirSub_confirm">确定</div>
                </div>
              </div>
            </div>
            <!--  【新增修改目录-输入框】【二级目录】结束 -->
          </div>
        </div>

      <!--  【新增目录-输入框】开始 -->
      <div class="main_dir_line2" style="font-size: 14px" v-if="model_first_dirName_show_flag">
        <div class="main_dir_line_right_add1dir">
          <div style="" class="main_dir_add1dir_input">
            <el-input  v-model="model_first_dirName"   v-fo  placeholder="请输入目录名称" style="width: 100%;margin-left: -6px;" clearable></el-input>
          </div>
          <div class="main_dir_line_right_add1dir_operator"  >
            <div class="main_dir_line_right_add1dir_operator_cal" @click="addDirOne_cal">取消</div>
            <div class="main_dir_line_right_add1dir_operator_add" @click="addDirOne_confirm">确定</div>
          </div>
        </div>
      </div>
      <!--  【新增目录-输入框】结束 -->
    </div>
</template>

<script>
import API from '@/api'
import {doGetMenu} from '../../../api/modules/question_bank/menu.js'
import {getDir, update, moveUpAndDown} from "../../../api/modules/question/question_manage";

export default {
        name: "PcmanageLeft",
        data() {
            return {
                menus: [],  // 目录
                skillResourcesId:1,

                model_first_dirName:'',//新增一级目录
                model_first_dirName_show_flag:false,//新增一级目录，是否显示，true 显示，false不显示

                model_sub_dirName:'',//新增子目录
                model_sub_dir_pId:'',//新增子目录，父级目录id

                model_rename_dirName:'',//重命名目录名称
                model_rename_dir_cId:'',//重命名目录名称，目录id

                model_rename_file_id:'',//重命名文件名称
                model_rename_fileName:'',//重命名文件名称，目录id

                model_bgcolor_dirId:'',//当前悬浮的背景的目录id
                model_bgcolor_class:'',//目录背景样式
                model_bgcolor_op_class:'',//是否显示操作按钮样式
            }
        },
        created() {
            this.init()
        },

        components:{},

        methods: {
          addBig() {},
          addSmall() {},
          init() {
            getDir({"skillResourcesId": 1}).then((result) => {
              console.log(result.data.page);
              this.menus = result.data.page
            }).catch((err) => {
              console.log(err);
            });
          },
          addDirOne(){
            // this.$nextTick(() => {
            //   this.$refs.saveTagInput.focus1()
            // })
            // this.$nextTick(() => {
            //   this.$refs.saveTagInput[0].focus()
            // })

            this.model_first_dirName_show_flag=true;
          },
          addDirOne_cal(){
            this.model_first_dirName_show_flag=false;
            // model_first_dirName
          },
          async addDirOne_confirm(){
            if(this.model_first_dirName==null || this.model_first_dirName==""){
              this.$message.error('目录名称必填');
              return;
            }
            let params = {
              skillResourcesId:this.skillResourcesId,
              parentId: 0,
              name:this.model_first_dirName,
            }
            const  { data } =  await API.pcCourseDirFileExameEdit.saveOrUpdateSkillCourseDir(params)
            // console.log("data=",data);
            if (data && data.code === 0) {
              this.$message.success("添加成功");
              this.init()
              this.model_first_dirName_show_flag=false;
              this.model_first_dirName="";
            }else{
              this.$message.success("添加失败："+data.msg);
            }

          },

          addSubDir_open(id){
            this.model_sub_dir_pId=id;
          },
          addDirSub_cal(id){
            this.model_sub_dir_pId='';
          },
          async addDirSub_confirm(){
            if(this.model_sub_dirName==null || this.model_sub_dirName==""){
              this.$message.error('目录名称必填');
              return;
            }
            let params = {
              skillResourcesId:this.skillResourcesId,
              parentId:this.model_sub_dir_pId,
              name:this.model_sub_dirName,
            }
            const  { data } =  await API.pcCourseDirFileExameEdit.saveOrUpdateSkillCourseDir(params)
            // console.log("data=",data);
            if (data && data.code === 0) {
              this.$message.success("添加成功");
              this.init()
              this.model_sub_dir_pId='';
              this.model_sub_dirName="";
            }else{
              this.$message.success("添加失败："+data.msg);
            }
          },

          // 打开重命名
          renameDirName_open(id,name){
            this.model_rename_dir_cId=id;
            this.model_rename_dirName = name;
          },
          // 取消重命名
          renameDirName_cal(){
            this.model_rename_dir_cId='';
            this.model_rename_dirName = '';
          },
          // 确认重命名
          async renameDirName_confirm(){
            if(this.model_rename_dirName==null || this.model_rename_dirName==""){
              this.$message.error('目录名称必填');
              return;
            }
            let params = {
              skillResourcesId:this.skillResourcesId,
              id:this.model_rename_dir_cId,
              name:this.model_rename_dirName,
            }
            const  { data } =  await API.pcCourseDirFileExameEdit.saveOrUpdateSkillCourseDir(params)
            // console.log("data=",data);
            if (data && data.code === 0) {
              this.$message.success("重命名成功");
              this.init()
              this.model_rename_dir_cId='';
              this.model_rename_dirName="";
            }else{
              this.$message.success("重命名失败："+data.msg);
            }
          },


          //课程目录-上移下移   upAndDownFlag:排序状态调整：1上移2下移
          async upOrDownSkillCourseDir(id,upAndDownFlag){
            let str= '';
            if(upAndDownFlag==1){
              str="上移";
            }else if(upAndDownFlag==1){
              str="下移";
            }
            let params = {
              id:id,
              upAndDownFlag:upAndDownFlag,
            }
            const  { data } =  await API.pcCourseDirFileExameEdit.upOrDownSkillCourseDir(params)
            // console.log("data=",data);
            if (data && data.code === 0) {
              this.$message.success(str+"成功");
              this.init()
            }else{
              this.$message.success(str+"失败："+data.msg);
            }
          },


          deleteSkillCourseDir(id){
            this.deleteDirConfirmVisible=true;
            this.deleteDirConfirmId=id;
          },
          deleteDirConfirmCancel(id){
            this.deleteDirConfirmVisible=false;
            this.deleteDirConfirmId='';
          },
          //目录-删除（子级所有数据都删除）
          async deleteDirConfirm(){
            let params = {
              id:this.deleteDirConfirmId,
            }
            const  { data } =  await API.pcCourseDirFileExameEdit.deleteSkillCourseDir(params)
            // console.log("data=",data);
            if (data && data.code === 0) {
              this.$message.success("删除成功");
              this.init()
              this.deleteDirConfirmCancel();
            }else{
              this.$message.success("删除失败："+data.msg);
            }
          },
          msover_dir(id){
            this.model_bgcolor_dirId=id;
            this.model_bgcolor_class="bgcls";
            this.model_bgcolor_op_class="main_dir_line_right_operator_show";
          },
          msout_dir(id){
            this.model_bgcolor_dirId='';
            this.model_bgcolor_class="";
            this.model_bgcolor_op_class="";
          },
        }
    }
</script>

<style scoped lang="scss">
@import "../../../assets/css/personalCenter/pcmanage/PcmanageLeft.scss";
@import "../../../assets/css/personalCenter/pcCourseDirFileExameEdit.scss";

.menus {
    font-size: 12px;
    width: 100%;
    height: 100%;
    padding: 5px;
    span {
        height: .02rem;
        font-size: .1rem;
    }
}

.course_dirfileexame_pccs{
    min-width: 98px;
    width: 98px;
    display: flex;
    flex-direction: column;
    padding: 0;
  }

.dirFileExame_pccs_col{
  height: 38px;
  display: flex;
  padding-left: 17px;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  /*border: 1px solid red;*/
}

.dirFileExame_pccs_col:hover{
  background-color: #F8F8F8;
}

.main_dir3{
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  .main_dir_line{
    display: flex;
    height: 44px;
    align-items: center;

    font-size: 16px;
    font-family: PingFang SC, PingFang SC-Regular;
    font-weight: 400;
    text-align: left;
    color: #282828;

    //.main_dir_line_icon{
    //  margin-left: 46px;
    //  align-items: center;
    //  .main_dir_line_icon1{
    //    width: 6px;
    //    height: 6px;
    //    background: #c5f6f0;
    //    border: 1px solid #00bda5;
    //    border-radius: 5px;
    //    //margin-top: 3px;
    //    position: relative;
    //    z-index: 1;
    //    top: 19px;
    //  }
    //  .main_dir_line_split1{
    //    width: 1px;
    //    background: #f8f8f8;
    //    height: 44px;
    //    position: relative;
    //    top: -7px;
    //    left: 4px;
    //    z-index: 0;
    //  }
    //
    //}
    .main_dir_line_right{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-left: 20px;
      width: 100%;
      //border:1px solid red;
      height: 44px;

      margin-right: 39px;
      .main_dir_line_right_operator{
        //border: 1px solid black;
        display: flex;
        justify-content: center;
        width: 50px;
        margin-right: 30px;
        font-size: 16px;
        font-family: PingFang SC, PingFang SC-Regular;
        font-weight: 400;
        text-align: left;
        color: #00bda5;
        display: none;
        cursor: pointer;



      }
      .main_dir_line_right_operator_show{
        display: block;
      }
    }

    .bgcls{
      background-color: #F8F8F8;
      border-radius: 4px;
    }
    //.main_dir_line_right:hover{
    //  background-color: #F8F8F8;
    //  border-radius: 4px;
    //}
    //.main_dir_line_right:hover .main_dir_line_right_operator{
    //  display: block;
    //}


  }

  .main_dir_line_right_add1dir{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 74px;
    width: 100%;
    //border:1px solid red;
    height: 44px;
    margin-right: 39px;

    .main_dir_add1dir_input{
      margin-left: 15px;width: 100%;
      height: 30px;
    }
    .main_dir_add1dir_input /deep/ .el-input__inner{
      height: 30px;
      border: 1px solid #d8d8d8;
    }
    .main_dir_add1dir_input /deep/   .el-input__clear{
      display: flex;
      align-items: center;
      //margin-right: 35px;
    }
    .main_dir_line_right_add1dir_operator{
      //border: 1px solid black;
      display: flex;
      justify-content: space-around;
      width: 200px;
      //margin-right: 30px;
      font-size: 16px;
      font-family: PingFang SC, PingFang SC-Regular;
      font-weight: 400;
      text-align: left;

      .main_dir_line_right_add1dir_operator_cal{
        color: #ff4d43;
        cursor: pointer;
      }
      .main_dir_line_right_add1dir_operator_add{
        color: #00BDA5;
        cursor: pointer;
      }

    }
  }

  .main_dir_line_right_add1dir{
    background-color: #F8F8F8;
    border-radius: 4px;
  }

  .main_dir_line2{
    display: flex;
    height: 44px;
    align-items: center;

    font-size: 16px;
    font-family: PingFang SC, PingFang SC-Regular;
    font-weight: 400;
    text-align: left;
    color: #282828;

    .main_dir_line_icon{
      margin-left: 46px;
      align-items: center;
      .main_dir_line_icon1{
        width: 6px;
        height: 6px;
        background: #c5f6f0;
        border: 1px solid #00bda5;
        border-radius: 5px;
        //margin-top: 3px;
        position: relative;
        z-index: 1;
        top: 19px;
      }
      .main_dir_line_split1{
        width: 1px;
        background: #f8f8f8;
        height: 44px;
        position: relative;
        top: -7px;
        left: 4px;
        z-index: 0;
      }

    }
    .main_dir_line_right_add1dir{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-left: 74px;
      width: 100%;
      //border:1px solid red;
      height: 44px;
      margin-right: 39px;

      .main_dir_add1dir_input{
        margin-left: 15px;width: 100%;
        height: 30px;
      }
      .main_dir_add1dir_input /deep/ .el-input__inner{
        height: 30px;
        border: 1px solid #d8d8d8;
      }
      .main_dir_add1dir_input /deep/   .el-input__clear{
        display: flex;
        align-items: center;
        //margin-right: 35px;
      }
      .main_dir_line_right_add1dir_operator{
        //border: 1px solid black;
        display: flex;
        justify-content: space-around;
        width: 200px;
        //margin-right: 30px;
        font-size: 16px;
        font-family: PingFang SC, PingFang SC-Regular;
        font-weight: 400;
        text-align: left;

        .main_dir_line_right_add1dir_operator_cal{
          color: #ff4d43;
          cursor: pointer;
        }
        .main_dir_line_right_add1dir_operator_add{
          color: #00BDA5;
          cursor: pointer;
        }

      }
    }
    .main_dir_line_right_add1dir{
      background-color: #F8F8F8;
      border-radius: 4px;
    }



  }
}
</style>
