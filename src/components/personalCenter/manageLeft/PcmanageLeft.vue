<template>
    <div>
        <div class="left-top">
            <div>
                <el-button type="primary" @click="openMainDir1Add(null, true)" style=" width: 90px;">+ 专项类型</el-button>
                <el-button type="primary" @click="openMainDir2Add" style=" width: 70px;">+ 子专项</el-button>
            </div>
            <div class="right-icon">
                <img @click="upOrDownSkillCourseDir(1)" style="margin-left:45px" src="../../../../static/tuImg/sahng@2x.png" alt="">
                <img @click="upOrDownSkillCourseDir(2)" src="../../../../static/tuImg/xia2@2x.png" alt="">
            </div>
        </div>
<!--        <div class="main_dir3" style="font-size: 12px;" v-if="menus.length>0">
          <div v-for="(item1) in menus">
            &lt;!&ndash;  一级目录列表 &ndash;&gt;
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
              &lt;!&ndash;重命名一级目录 s&ndash;&gt;
              <div class="main_dir_line_right main_dir_line_right_add1dir" v-show="model_rename_dir_cId==item1.id " style="margin-left: 20px;">
                <div style="" class="main_dir_add1dir_input">
                  <el-input  v-model="model_rename_dirName"  placeholder="请输入目录名称" style="width: 100%;margin-left: -6px;" clearable></el-input>
                </div>
                <div class="main_dir_line_right_add1dir_operator"  >
                  <div class="main_dir_line_right_add1dir_operator_cal" @click="renameDirName_cal">取消</div>
                  <div class="main_dir_line_right_add1dir_operator_add" @click="renameDirName_confirm">确定</div>
                </div>
              </div>
              &lt;!&ndash;重命名一级目录 e&ndash;&gt;

            </div>

            &lt;!&ndash;  二级目录列表 &ndash;&gt;
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
                &lt;!&ndash;重命名二级目录 s&ndash;&gt;
                <div class="main_dir_line_right main_dir_line_right_add1dir" v-show="model_rename_dir_cId==item2.id " style="margin-left: 20px;">
                  <div style="" class="main_dir_add1dir_input">
                    <el-input  v-model="model_rename_dirName"   v-fo  placeholder="请输入目录名称" style="width: 100%;margin-left: -6px;" clearable></el-input>
                  </div>
                  <div class="main_dir_line_right_add1dir_operator"  >
                    <div class="main_dir_line_right_add1dir_operator_cal" @click="renameDirName_cal">取消</div>
                    <div class="main_dir_line_right_add1dir_operator_add" @click="renameDirName_confirm">确定</div>
                  </div>
                </div>
                &lt;!&ndash;重命名二级目录 e&ndash;&gt;
              </div>


              &lt;!&ndash;  三级目录列表 &ndash;&gt;
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
                          &lt;!&ndash;<div class="dirFileExame_pccs_col">添加子目录</div>&ndash;&gt;
                        </div>
                      </el-popover>
                    </div>
                  </div>
                  &lt;!&ndash;重命名二级目录 s&ndash;&gt;
                  <div class="main_dir_line_right main_dir_line_right_add1dir" v-show="model_rename_dir_cId==item3.id " style="margin-left: 20px;">
                    <div style="" class="main_dir_add1dir_input">
                      <el-input  v-model="model_rename_dirName"   v-fo  placeholder="请输入目录名称" style="width: 100%;margin-left: -6px;" clearable></el-input>
                    </div>
                    <div class="main_dir_line_right_add1dir_operator"  >
                      <div class="main_dir_line_right_add1dir_operator_cal" @click="renameDirName_cal">取消</div>
                      <div class="main_dir_line_right_add1dir_operator_add" @click="renameDirName_confirm">确定</div>
                    </div>
                  </div>
                  &lt;!&ndash;重命名二级目录 e&ndash;&gt;

                </div>

              </div>

              &lt;!&ndash;  【新增修改目录-输入框】【三级目录】开始 &ndash;&gt;
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
              &lt;!&ndash;  【新增修改目录-输入框】【三级目录】结束 &ndash;&gt;
            </div>

            &lt;!&ndash;  【新增修改目录-输入框】【二级目录】开始 &ndash;&gt;
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
            &lt;!&ndash;  【新增修改目录-输入框】【二级目录】结束 &ndash;&gt;
          </div>
        </div>

      &lt;!&ndash;  【新增目录-输入框】开始 &ndash;&gt;
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
      &lt;!&ndash;  【新增目录-输入框】结束 &ndash;&gt;-->

      <div class="main_dir" v-if="menus.length > 0">
<!--        :style="'height:' + (36+(item1.childList.length-1)*36) + 'px'"-->
        <div class="main_dir_1"
             :style="'min-height:' + ((item1.childList.length+1)*36)"
             v-for="(item1, index1) in menus">
          <div @click="msover_dir(item1.id)" class="main_dir_1_item" :class="{'active': dir_bgColor == item1.id}" style="cursor: pointer;user-select: none;" v-if="item1.childList.length>0">
            <div style="display: inline-block; width: 20px;height: 30px;line-height: 30px;margin-left: 20px" id="spread-icon"><i class="el-icon-arrow-down"></i></div>
            <span>第{{index1+1}}章：{{item1.name}}</span>

            <img v-popover::ref="'popover_'+item1.id"  style="width: 20px;height: 20px;position: absolute;top: 5px;right: 20px;z-index: 999"
                 :src="require('../../../assets/images/menu.png')" alt="">
            <el-popover
              popper-class="my_el-popover"
              :ref="'popover_'+item1.id"
              placement="bottom-start"
              trigger="click"
            >
              <div style="min-width: 50px; border: 0px solid red;" @mouseover="msover_dir(item1.id)" @mouseout="msout_dir(item1.id)">
                <div
                  @click="openMainDir1Add(item1, false)"
                  style="width: 50px;font-size: 14px;cursor: pointer;
                            font-family: PingFang SC, PingFang SC-Regular;font-weight: 400;text-align: left;color: #393939;line-height: 36px;" >
                  编辑</div>
                <div
                  @click="deleteMainDir(item1.id)"
                  style="width: 50px;font-size: 14px;cursor: pointer;
                font-family: PingFang SC, PingFang SC-Regular;font-weight: 400;text-align: left;color: #FF6E67;line-height: 36px;" >
                  删除</div>
              </div>
            </el-popover>
<!--            <span style="display: inline-block; position: absolute;top: 0px;right: 20px" ><img style="width: 20px;height: 20px;" :src="require('../../../assets/images/menu.png')" alt=""></span>-->
            <!-- 二级子目录 Start -->
            <div class="main_dir_2" :style="'min-height:'+((item2.childList.length+1)*36)" v-for="(item2, index2) in item1.childList">
              <div @click.prevent="msover_dir(item2.id)" class="main_dir_2_item" :class="{'active': dir_bgColor == item2.id}" style="cursor: pointer;user-select: none;z-index: 9">
                <span style="margin-left: 60px"></span>
                <div style="display: inline-block">{{item2.name}}</div>
                <div class="main_dir_3" v-for="(item3, index3) in item2.childList">
                  <div @click.prevent="msover_dir(item3.id)" class="main_dir_3_item" :class="{'active': dir_bgColor == item3.id}" style="display: flex; align-items: center;cursor: pointer;user-select: none;z-index: 99">
                    <span style="margin-left: 80px"></span>
                    <span>{{item3.name}}</span>
                  </div>
                  <!-- 三级子目录添加或修改 Start -->
<!--                  <div class="main_dir_3_add" v-if="false">
                    <input type="text" v-model="main_dir_1_add_text" placeholder="请输入专项名称" />
                    <i class="el-icon-success" style="color: #00BDA5;margin-left: 10px; margin-right: 10px"></i>
                    <i class="el-icon-error" style="color: #FF6E67"  @click="closeMainDir1Add"></i>
                  </div>-->
                  <!-- 三级子目录添加或修改 End -->
                </div>
              </div>
            </div>
            <!-- 二级子目录 End -->

            <!-- 二级子目录添加或修改 Start -->
<!--            <div class="main_dir_2_add" v-if="main_dir_2_add_show">
              <input type="text" v-model="main_dir_2_add_text" placeholder="请输入新子项名称" />
              <i class="el-icon-success" style="color: #00BDA5;margin-left: 10px; margin-right: 10px"></i>
              <i class="el-icon-error" style="color: #FF6E67" @click="closeMainDir2Add"></i>
            </div>-->
            <!-- 二级子目录添加或修改 End -->
          </div>
          <div @click="msover_dir(item1.id)" class="main_dir_1_item" :class="{'active': dir_bgColor == item1.id}"
               style="display: flex;align-items: center; cursor: pointer;user-select: none;" v-else>
            <div style="display: inline-block; width: 20px;height: 30px;line-height: 30px;margin-left: 20px" id="spread-icon"></div>
            <span>第{{index1+1}}章：{{item1.name}}</span>
            <img v-popover::ref="'popover_'+item1.id"  style="width: 20px;height: 20px;position: absolute;top: 5px;right: 20px;z-index: 999"
                 :src="require('../../../assets/images/menu.png')" alt="">
            <el-popover
              popper-class="my_el-popover"
              :ref="'popover_'+item1.id"
              placement="bottom-start"
              trigger="click"
            >
              <div style="min-width: 50px; border: 0px solid red;" @mouseover="msover_dir(item1.id)" @mouseout="msout_dir(item1.id)">
                <div
                  @click="openMainDir1Add(item1, false)"
                  style="width: 50px;font-size: 14px;cursor: pointer;
                            font-family: PingFang SC, PingFang SC-Regular;font-weight: 400;text-align: left;color: #393939;line-height: 36px;" >
                  编辑</div>
                <div
                  @click="deleteMainDir(item1.id)"
                  style="width: 50px;font-size: 14px;cursor: pointer;
                font-family: PingFang SC, PingFang SC-Regular;font-weight: 400;text-align: left;color: #FF6E67;line-height: 36px;" >
                  删除</div>
              </div>
            </el-popover>
          </div>


        </div>

        <!-- 三级子目录添加或修改 Start -->
<!--        <div class="main_dir_3_add" v-if="closeMainDir3Add">
          <input type="text" v-model="main_dir_3_add_text" placeholder="请输入专项名称" />
          <i class="el-icon-success" style="color: #00BDA5;margin-left: 10px; margin-right: 10px"></i>
          <i class="el-icon-error" style="color: #FF6E67"  @click="closeMainDir3Add"></i>
        </div>-->
        <!-- 三级子目录添加或修改 End -->

        <!-- 二级子目录添加或修改 Start -->
        <div class="main_dir_2_add" v-if="main_dir_2_add_show">
          <input type="text" v-model="main_dir_2_add_text" placeholder="请输入新子项名称" />
          <i class="el-icon-success" style="color: #00BDA5;margin-left: 10px; margin-right: 10px"></i>
          <i class="el-icon-error" style="color: #FF6E67" @click="closeMainDir2Add"></i>
        </div>
        <!-- 二级子目录添加或修改 End -->

        <!-- 一级目录添加或修改 Start -->
        <div class="main_dir_1_add" v-if="main_dir_1_add_show">
          <input type="text" v-model="main_dir_1_add_text" placeholder="请输入专项名称" />
          <i class="el-icon-success" v-show="main_dir_1_add" @click="submitMainDir1" style="color: #00BDA5;margin-left: 10px; margin-right: 10px"></i>
          <i class="el-icon-success" v-show="!main_dir_1_add" @click="renameMainDir1" style="color: #00BDA5;margin-left: 10px; margin-right: 10px"></i>
          <i class="el-icon-error" style="color: #FF6E67"  @click="closeMainDir1Add"></i>
        </div>
        <!-- 一级目录添加或修改 End -->
      </div>

    </div>
</template>

<script>
import API from '@/api'
import {getDir, update, moveUpAndDown,save, deleteDir} from "../../../api/modules/question/question_manage";

export default {
  name: "PcmanageLeft",
  data() {
      return {
        menus: [
          {
            id: 10001,
            name: "web简介",
            childList: [
              {
                id: 10011,
                name: "web基础概念",
                childList: [
                  {
                    id: 10111,
                    name: "web基础概念1"
                  }
                ]
              },
              {
                id:10012,
                name: "web进阶概念",
                childList: [
                  {
                    id: 10112,
                    name: "web进阶概念1"
                  }
                ]
              }
            ]
          },
          {
            id: 10002,
            name: "HTML基础",
            childList: [
              {
                id: 20011,
                name: "web基础概念",
                childList: [
                  {
                    id: 20111,
                    name: "web基础概念1"
                  }
                ]
              },
              {
                id:21012,
                name: "web进阶概念",
                childList: [
                  {
                    id: 21112,
                    name: "web进阶概念1"
                  }
                ]
              }
            ]
          },
          {
            id: 10003,
            name: "CSS基础",
            childList: []
          },
        ],
        skillResourcesId:1,

        curr_select_main_dir:  "",

        dir_bgColor: true,

        main_dir_1_add_text: "",
        main_dir_1_add: true,       // true：新增，false：修改
        main_dir_1_add_show: false,

        main_dir_2_add_text: "",
        main_dir_2_add:true,        // true：新增，false：修改
        main_dir_2_add_show: false,

        main_dir_3_add_text: "",
        main_dir_3_add_show: false,
      }
  },
  created() {
      this.init()
  },
  mounted() {
  },
  components:{},

  methods: {
    init() {
      getDir({"skillResourcesId": 1}).then((result) => {
        console.log(result.data.page);
        this.menus = result.data.page
      }).catch((err) => {
        console.log(err);
      });
    },
    openMainDir1Add(menu, method) {
      if (menu != null) {
        this.main_dir_1_add_text = menu.name
      } else {
        this.main_dir_1_add_text = ""
      }
      this.curr_select_main_dir = menu
      this.main_dir_1_add = method
      this.main_dir_1_add_show = true
    },
    closeMainDir1Add() {
      this.main_dir_1_add_show = false;
    },
    // 新增专项
    submitMainDir1() {
      if (this.main_dir_1_add_text === "" || this.main_dir_1_add_text === null) {
        this.$message.warning("目录名不能为空")
        return
      }
      // this.$message.success("新增成功: " + this.main_dir_1_add_text)
      // this.main_dir_1_add_show = false
      // this.init()
      save({
        skillResourcesId: this.skillResourcesId,
        parentId: null,
        parentName: null,
        type: 1,
        name: this.main_dir_1_add_text,
        orderNum: this.menus.length
      }).then(({data}) => {
        console.log(data)
        if (data && data.code === 0) {
          this.$message.success("新增成功")
          this.main_dir_1_add_show = false
          // 新增之后调用初始化方法，重新请求目录
          this.init()
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 编辑专项目录名称
    renameMainDir1() {
      if (this.main_dir_1_add_text === "" || this.main_dir_1_add_text === null) {
        this.$message.warning("目录名不能为空")
        return
      }
      // this.$message.success("修改成功成功: " + this.main_dir_1_add_text)
      // this.main_dir_1_add_show = false
      // 修改之后调用初始化方法，重新请求目录
      // this.init()
      let params = this.curr_select_main_dir
      params.name = this.main_dir_1_add_text
      save({
        "id":params.id,
        "skillResourcesId":1,
        "parentId":null,
        "name":this.main_dir_1_add_text,
        "nodeNum":this.menus.length
      }).then(({data}) => {
        console.log(data)
        if (data && data.code === 0) {
          this.$message.success("修改成功")
          this.main_dir_1_add_show = false
          // 新增之后调用初始化方法，重新请求目录
          this.init()
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    openMainDir2Add(menu, methdo) {
      if (this.curr_select_dir_id === "" || this.main_dir_2_add_text === undefined) {
        this.$message.warning("请选择一个子项")
        return
      }
      this.main_dir_2_add_show = true
    },
    closeMainDir2Add() {
      this.main_dir_2_add_show = false
    },
    openMainDir3Add() {
      this.main_dir_3_add_show = true
    },
    closeMainDir3Add() {
      this.main_dir_3_add_show = false
    },

    // 删除专项目录
    deleteMainDir(id) {
      this.$confirm("确定删除改目录吗？").then(() => {
        // this.$message.success("删除成功"+id)
        // this.init()
        deleteDir({
          "id": id
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.$message.success("删除成功")
          } else {
            this.$message.error("删除失败：" + data.msg)
          }
        })
      })
    },

    //课程目录-上移下移   upAndDownFlag:排序状态调整：1上移2下移
    async upOrDownSkillCourseDir(upAndDownFlag){
      let str= '';
      if(upAndDownFlag==1){
        str="上移";
      }else if(upAndDownFlag==1){
        str="下移";
      }
      let params = {
        id:this.curr_select_dir_id,
        upAndDownFlag:upAndDownFlag,
      }
      const  { data } =  await moveUpAndDown(params)
      // console.log("data=",data);
      if (data && data.code === 0) {
        this.$message.success(str+"成功");
        this.init()
      }else{
        this.$message.error(str+"失败："+data.msg);
      }
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
      this.curr_select_dir_id = id
      this.dir_bgColor = id
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

.main_dir {
  font-size: 14px ;
  margin-top: 30px;
  color: #393939;
  .main_dir_1 {
    width: 340px;
    min-height: 36px;
    line-height: 36px;
    box-sizing: border-box;
    position: relative;
    .main_dir_1_item {
      position: relative;
      &.active::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 36px;
        background: rgba(147, 147, 147, .1);
      }
    }

    .main_dir_2 {
      min-height: 36px;
      line-height: 36px;
      .main_dir_2_item {
        position: relative;
        &.active::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 36px;
          background: rgba(147, 147, 147, .1);
        }
      }
      .main_dir_3 {
        min-height: 36px;
        line-height: 36px;
        .main_dir_3_item {
          position: relative;
          &.active::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 36px;
            background: rgba(147, 147, 147, .1);
          }
        }
      }
      //.main_dir_3_add {
      //  display: flex;
      //  width: 301px;
      //  min-height: 36px;
      //  margin-top: 5px;
      //  padding-left: 53px;
      //  align-items: center;
      //  background: #f9f9f9;
      //  input {
      //    width: 200px;
      //    height: 28px;
      //    border: 2px solid #00BDA5;
      //    border-radius: 3px;
      //    padding-left: 10px;
      //    padding-top: 7px;
      //    padding-bottom: 6px;
      //    outline: none;
      //    font-size: 14px;
      //    font-weight: 400;
      //    color: #393939;
      //  }
      //  i {
      //    font-size: 22px;
      //    cursor: pointer;
      //  }
      //}
    }
    //.main_dir_2_add {
    //  display: flex;
    //  width: 301px;
    //  min-height: 36px;
    //  margin-top: 5px;
    //  padding-left: 39px;
    //  align-items: center;
    //  background: #f9f9f9;
    //  input {
    //    width: 214px;
    //    height: 28px;
    //    border: 2px solid #00BDA5;
    //    border-radius: 3px;
    //    padding-left: 10px;
    //    padding-top: 7px;
    //    padding-bottom: 6px;
    //    outline: none;
    //    font-size: 14px;
    //    font-weight: 400;
    //    color: #393939;
    //  }
    //  i {
    //    font-size: 22px;
    //    cursor: pointer;
    //  }
    //}
  }
  .main_dir_1_add {
    display: flex;
    width: 315px;
    min-height: 36px;
    margin-top: 5px;
    padding-left: 25px;
    align-items: center;
    background: #f9f9f9;
    input {
      width: 228px;
      height: 28px;
      border: 2px solid #00BDA5;
      border-radius: 3px;
      padding-left: 10px;
      padding-top: 7px;
      padding-bottom: 6px;
      outline: none;
      font-size: 14px;
      font-weight: 400;
      color: #393939;
    }
    i {
      font-size: 22px;
      cursor: pointer;
    }
  }
  .main_dir_2_add {
    display: flex;
    width: 301px;
    min-height: 36px;
    margin-top: 5px;
    padding-left: 39px;
    align-items: center;
    background: #f9f9f9;
    input {
      width: 214px;
      height: 28px;
      border: 2px solid #00BDA5;
      border-radius: 3px;
      padding-left: 10px;
      padding-top: 7px;
      padding-bottom: 6px;
      outline: none;
      font-size: 14px;
      font-weight: 400;
      color: #393939;
    }
    i {
      font-size: 22px;
      cursor: pointer;
    }
  }
  .main_dir_3_add {
    display: flex;
    width: 287px;
    min-height: 36px;
    margin-top: 5px;
    padding-left: 53px;
    align-items: center;
    background: #f9f9f9;
    input {
      width: 200px;
      height: 28px;
      border: 2px solid #00BDA5;
      border-radius: 3px;
      padding-left: 10px;
      padding-top: 7px;
      padding-bottom: 6px;
      outline: none;
      font-size: 14px;
      font-weight: 400;
      color: #393939;
    }
    i {
      font-size: 22px;
      cursor: pointer;
    }
  }
  .my_el-popover {
    min-width: 50px !important;
    max-width: 50px !important;
  }
}
</style>
