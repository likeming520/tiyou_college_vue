<template>
    <div>
      <div class="left-top">
            <div>
                <el-button type="primary" @click="dir_add_show = true" style=" width: 90px;">+ 专项类型</el-button>
                <el-button type="primary" @click="openSubDirAdd('add')" style=" width: 70px;">+ 子专项</el-button>
            </div>
            <div class="right-icon">
                <img @click="upOrDownSkillCourseDir(1)" style="margin-left:45px" src="../../../../static/tuImg/sahng@2x.png" alt="">
                <img @click="upOrDownSkillCourseDir(2)" src="../../../../static/tuImg/xai@2x.png" alt="">
            </div>
        </div>
      <!-- 新增专项 Start -->
      <div style="margin-top: 16px">
        <div class="dir-add" v-if="dir_add_show" >
          <input type="text" v-model="add_update_name" placeholder="请输入专项名称" />
          <i class="el-icon-success" @click="submitMainDir" style="left: 263px;" :class="{'active':add_update_name.length>0}"></i>
          <i class="el-icon-error" style="color: #FF6E67; left: 289px"  @click="dir_add_show = false"></i>
        </div>
      </div>
      <!-- 新增专项 End -->
      <!-- 目录 Start -->
      <div class="dir-wrapper" v-if="menus.length > 0">
        <div class="main-dir-wrapper" v-for="(item1, index1) in menus">
          <!-- 一级目录 Start -->
          <div :ref="'main-ref-' + item1.id" class="main-dir clearfix" :title="item1.name" :class="[{'active':item1.id==active_dir.id},{'collapse':item1.childList.length>0}]" @click="msclick_dir(item1)">
            <!-- 可下拉图标 Start -->
            <div class="dropdown-icon-wrapper">
              <i v-if="item1.childList.length>0" class="el-icon-arrow-down"></i>
            </div>
            <!-- 可下拉图标 End -->
            <!-- 目录名称 Start -->
            <div class="dir-content">
              第{{index1+1}}章：{{item1.name}}
            </div>
            <!-- 目录名称 End -->
            <!-- 操作按钮 Start -->
            <div class="operate-wrapper">
              <img v-show="item1.id==active_dir.id"  v-popover::ref="'popover_'+item1.id" :src="require('../../../assets/images/menu.png')" alt="">
              <el-popover
                popper-class="my_el-popover"
                :ref="'popover_'+item1.id"
                placement="bottom-start"
                trigger="click"
              >
                <div style="min-width: 50px; border: 0px solid red;">
                  <div
                    @click="openRenameMainDir(item1)"
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
            <!-- 操作按钮 End -->
          </div>
          <div class="dir-add" v-if="main_dir_add_show && item1.id==active_dir.id">
            <input type="text" v-model="add_update_name" placeholder="请输入专项名称" />
            <i class="el-icon-success" v-show="sub_dir_add_update=='add'" @click="submitMainDir" style="left: 263px;" :class="{'active':add_update_name.length>0}"></i>
            <i class="el-icon-success" v-show="sub_dir_add_update=='update'" @click="submitRenameMainDir" style="color: #00BDA5;left: 263px;"></i>
            <i class="el-icon-error" style="color: #FF6E67; left: 289px"  @click="closeMainDirAdd"></i>
          </div>
          <!-- 一级目录 End -->
          <div class="menu-spread" :ref="'sub-ref-'+item1.id"   v-if="item1.childList.length > 0" >
            <div class="sub-dir-wrapper" v-for="(item2, index2) in item1.childList">
              <!-- 二级目录 Start -->
              <div class="sub-dir clearfix" :title="item2.name" :class="{'active':item2.id==active_dir.id}" @click="msclick_dir(item2,2)">
                <div class="dropdown-icon-wrapper">
                  <i class="el-icon-arrow-down" v-if="show_sub_dir_icon_operate"></i>
                </div>
                <div class="dir-content">
                  {{index1+1}}.{{index2+1}}.&nbsp;&nbsp;{{item2.name}}
                </div>
                <div class="operate-wrapper">
<!--                  <img :src="require('../../../assets/images/menu.png')" v-if="show_sub_dir_icon_operate" alt="">-->
                  <img v-show="item2.id==active_dir.id"  v-popover::ref="'popover_'+item2.id" :src="require('../../../assets/images/menu.png')" alt="">
                  <el-popover
                    popper-class="my_el-popover"
                    :ref="'popover_'+item2.id"
                    placement="bottom-start"
                    trigger="click"
                  >
                    <div style="min-width: 50px; border: 0px solid red;">
                      <div
                        @click="openRenameSubDir(item2)"
                        style="width: 50px;font-size: 14px;cursor: pointer;
                            font-family: PingFang SC, PingFang SC-Regular;font-weight: 400;text-align: left;color: #393939;line-height: 36px;" >
                        编辑</div>
                      <div
                        @click="deleteMainDir(item2.id)"
                        style="width: 50px;font-size: 14px;cursor: pointer;
                font-family: PingFang SC, PingFang SC-Regular;font-weight: 400;text-align: left;color: #FF6E67;line-height: 36px;" >
                        删除</div>
                    </div>
                  </el-popover>
                </div>
              </div>
              <!-- 二级目录 End -->
              <!-- 三级目录修改或新增 Start -->
              <div class="sub-sub-dir-add" v-if="sub_dir_add_show && item2.id==active_dir.id">
                <input type="text" v-model="add_update_name" placeholder="请输入子项名称" />
                <i class="el-icon-success" v-show="sub_dir_add_update=='add'" @click="submitSubDir" style="left: 263px;" :class="{'active':add_update_name.length>0}"></i>
                <i class="el-icon-success" v-show="sub_dir_add_update=='update'" @click="renameSubDir" style="color: #00BDA5;left: 263px;"></i>
                <i class="el-icon-error" style="color: #FF6E67; left: 289px"  @click="closeSubDirAdd"></i>
              </div>
              <!-- 三级目录修改或新增 End -->
              <div v-if="item2.childList.length > 0">
                <div class="sub-sub-dir-wrapper" v-for="(item3, index3) in item2.childList">
                  <!-- 三级目录 Start -->
                  <div class="sub-sub-dir clearfix" :title="item3.name" :class="{'active':item3.id==active_dir.id}" @click="msclick_dir(item3,3)">
                    <div class="dropdown-icon-wrapper">
                      <i class="el-icon-arrow-down" v-if="show_sub_dir_icon_operate"></i>
                    </div>
                    <div class="dir-content">
                      {{index1+1}}.{{index2+1}}.{{index3+1}}&nbsp;&nbsp;{{item3.name}}
                    </div>
                    <div class="operate-wrapper">
<!--                      <img :src="require('../../../assets/images/menu.png')" v-if="show_sub_dir_icon_operate" alt="">-->
                      <img v-show="item3.id==active_dir.id"  v-popover::ref="'popover_'+item3.id" :src="require('../../../assets/images/menu.png')" alt="">
                      <el-popover
                        popper-class="my_el-popover"
                        :ref="'popover_'+item3.id"
                        placement="bottom-start"
                        trigger="click"
                      >
                        <div style="min-width: 50px; border: 0px solid red;">
                          <div
                            @click="openRenameSubDir(item3)"
                            style="width: 50px;font-size: 14px;cursor: pointer;
                            font-family: PingFang SC, PingFang SC-Regular;font-weight: 400;text-align: left;color: #393939;line-height: 36px;" >
                            编辑</div>
                          <div
                            @click="deleteMainDir(item3.id)"
                            style="width: 50px;font-size: 14px;cursor: pointer;
                font-family: PingFang SC, PingFang SC-Regular;font-weight: 400;text-align: left;color: #FF6E67;line-height: 36px;" >
                            删除</div>
                        </div>
                      </el-popover>
                    </div>

                  </div>
                  <div class="sub-sub-dir-add" v-if="sub_dir_add_show && item3.id==active_dir.id">
                    <input type="text" v-model="add_update_name" placeholder="请输入子项名称" />
                    <i class="el-icon-success" @click="openSubSubDirUpdate(item3,item2)" style="color: #00BDA5;left: 263px;"></i>
                    <i class="el-icon-error" style="color: #FF6E67; left: 289px"  @click="closeSubDirAdd"></i>
                  </div>
                  <!-- 三级目录 End -->
                </div>
              </div>

            </div>
          </div>
          <!-- 二级目录修改或新增 Start -->
          <div class="sub-dir-add" v-if="sub_dir_add_show && item1.id==active_dir.id">
            <input type="text" v-model="add_update_name" placeholder="请输入专项名称" />
            <i class="el-icon-success" v-show="sub_dir_add_update=='add'" @click="submitSubDir" style="left: 263px;" :class="{'active':add_update_name.length>0}"></i>
            <i class="el-icon-success" v-show="sub_dir_add_update=='update'" @click="renameSubDir" style="color: #00BDA5;left: 263px;"></i>
            <i class="el-icon-error" style="color: #FF6E67; left: 289px"  @click="closeSubDirAdd"></i>
          </div>
          <!-- 二级目录修改或新增 End -->
        </div>
      </div>
      <!-- 目录 End -->

    </div>
</template>

<script>
import API from '@/api'
import debounce from 'lodash.debounce'
import {getDir, moveUpAndDown,save, deleteDir} from "../../../api/modules/question/question_manage";

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
        active_dir: -1,         // 激活的菜单
        dir_add_show: false,    // 控制新增一级菜单的显示
        add_update_name: "",    // 绑定修改或新增目录的目录名
        sub_dir_add_update: "",     //记录当前二级、三级目录输入框是用来修改还是新增{add || update}
        main_dir_add_show: false,   // 控制一级目录新增或修改的显示
        sub_dir_add_show:false,     //控制二级、三级目录增加或修改的显示
        show_sub_dir_icon_operate: false,     // 控制二级菜单的下拉图标和操作图标是否显示
      }
  },
  created() {
      this.init()
  },
  mounted() {
  },
  components:{},

  computed: {

  },

  methods: {
    init() {
      getDir({"skillResourcesId": 113}).then((result) => {
        console.log(result.data.page);
        this.menus = result.data.page
      })
    },
    // 打开二、三级目录新增或修改
    openSubDirAdd(method) {
      if (this.active_dir.level !== 1 && this.active_dir.level !== 2) {
        this.$message.warning("请选择一级或二级目录")
        return
      }
      if (method === "" || method === undefined || method === null) {
        this.$message.error("提交方法未指定")
        return
      }
      this.sub_dir_add_update = method
      this.sub_dir_add_show = true
    },
    // 关闭二、三级目录新增或编辑
    closeSubDirAdd() {
      this.sub_dir_add_show = false
      this.add_update_name = ""
    },
    openRenameSubDir(node) {
      this.add_update_name = node.name
      this.sub_dir_add_update = 'update'
      this.openRenameSubSubDir(this.active_dir)
    },
    openRenameSubSubDir(node) {
      this.add_update_name = node.name
      this.sub_dir_add_show = true
    },
    openSubSubDirUpdate(node, prenode) {
      if (this.add_update_name === "" || this.add_update_name === undefined || this.add_update_name === null) {
        this.$message.warning("目录名不能为空")
        return
      }
      save({
        skillResourcesId: 113,
        id: node.id,
        parentId: prenode.id,
        parentName: prenode.name,
        name: this.add_update_name,
        // type: 1,
        // orderNum: this.menus.length
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.$message.success("修改成功")
          this.sub_dir_add_show = false
          // 新增之后调用初始化方法，重新请求目录
          this.init()
          this.add_update_name = ""
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 新增二、三级目录
    submitSubDir() {
      console.log("add")
      if (this.add_update_name === "" || this.add_update_name === undefined || this.add_update_name === null) {
        this.$message.warning("目录名不能为空")
        return
      }
      if (this.active_dir === "" || this.active_dir === undefined || this.active_dir === null) {
        this.$message.warning("请选择父目录")
        return
      }
      save({
        skillResourcesId: 113,
        parentId: this.active_dir.id,
        parentName: this.active_dir.name,
        name: this.add_update_name,
        // type: 1,
        // orderNum: this.menus.length
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.$message.success("新增成功")
          this.sub_dir_add_show = false
          // 新增之后调用初始化方法，重新请求目录
          this.init()
          this.add_update_name = ""
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 编辑专项目录名称
    renameSubDir(preNode) {
      if (this.add_update_name === "" || this.add_update_name === undefined || this.add_update_name === null) {
        this.$message.warning("目录名不能为空")
        return
      }
      save({
        "id":this.active_dir.id,
        "skillResourcesId":113,
        "parentId":preNode.id,
        "parentName": preNode.name,
        "name":this.add_update_name,
        // "orderNum":this.menus.length
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.$message.success("修改成功")
          this.sub_dir_add_show = false
          // 新增之后调用初始化方法，重新请求目录
          this.init()
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 打开新增一级目录
    openMainDirAdd(method) {
      if (method === "" || method === undefined || method === null) {
        this.$message.error("提交方法未指定")
        return
      }
      this.sub_dir_add_update = method
      this.main_dir_add_show = true
    },
    // 关闭新增一级目录
    closeMainDirAdd() {
      this.main_dir_add_show = false
      this.add_update_name = ""
    },
    // 新增一级目录
    submitMainDir() {
      if (this.add_update_name === "" || this.add_update_name === undefined || this.add_update_name === null) {
        this.$message.warning("目录名不能为空")
        return
      }
      if (this.active_dir === "" || this.active_dir === undefined || this.active_dir === null) {
        this.$message.warning("请选择父目录")
        return
      }
      save({
        skillResourcesId: 113,
        parentId: 0,
        parentName: 0,
        name: this.add_update_name,
        // type: 1,
        // orderNum: this.menus.length
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.$message.success("新增成功")
          this.dir_add_show = false
          // 新增之后调用初始化方法，重新请求目录
          this.init()
          this.add_update_name = ""
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    openRenameMainDir(node){
      this.add_update_name = node.name
      this.openMainDirAdd('update')
    },
    submitRenameMainDir() {
      if (this.add_update_name === "" || this.add_update_name === undefined || this.add_update_name === null) {
        this.$message.warning("目录名不能为空")
        return
      }
      save({
        "id":this.active_dir.id,
        "skillResourcesId":113,
        "parentId":0,
        "parentName": 0,
        "name":this.add_update_name,
        // "orderNum":this.menus.length
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.$message.success("修改成功")
          this.main_dir_add_show = false
          // 新增之后调用初始化方法，重新请求目录
          this.init()
        } else {
          this.$message.error(data.msg)
        }
      })
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
            this.init()
          } else {
            this.$message.error("删除失败：" + data.msg)
          }
        })
      })
    },

    //课程目录-上移下移   upAndDownFlag:排序状态调整：1上移2下移
    upOrDownSkillCourseDir: debounce(  async function (upAndDownFlag){
      let str= '';
      if(upAndDownFlag==1){
        str="上移";
      }else if(upAndDownFlag==1){
        str="下移";
      }
      let params = {
        id:this.active_dir.id,
        upAndDownFlag:upAndDownFlag,
      }
      const  { data } = await moveUpAndDown(params)
      // const  { data } =  debounce( moveUpAndDown(params), 1000)()
      if (data && data.code === 0) {
        this.$message.success(str+"成功");
        this.init()
      }else{
        this.$message.error(str+"失败："+data.msg);
      }
    }, 300),
    msclick_dir(dir){
      this.active_dir = dir
      let mainDom = this.$refs[`main-ref-${dir.id}`]
      if (mainDom !== null && mainDom !== undefined) {
        mainDom[0].classList.toggle("collapse")
      }
      let subDom = this.$refs[`sub-ref-${dir.id}`]
      if (subDom !== null && subDom !== undefined) {
        subDom[0].classList.toggle("collapse")
      }
    },
  }
}
</script>

<style scoped lang="scss">
@import "../../../assets/css/personalCenter/pcmanage/PcmanageLeft.scss";

.clearfix:after{visibility:hidden;clear:both;display:block;content:".";height:0}
.clearfix{*zoom:1}

.dir-wrapper {
  font-size: 14px;
  //margin-top: 16px;
}
.main-dir {
  position: relative;
  display: flex;
  align-items: center;
  //background: #f9f9f9;
  width: 321px;
  height: 36px;
  .dropdown-icon-wrapper {
    position: absolute;
    width: 10px;
    left: 18px;
    margin-right: 14px;
    display: flex;
    justify-content: center;
    transition: all .4s;
  }
  .dir-content {
    position: absolute;
    left: 42px;
    width: 170px;
    overflow:hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow:ellipsis;
  }
  .operate-wrapper {
    position: absolute;
    left: 291px;
    width: 14px;
    height: 12px;
  }
  &.collapse .dropdown-icon-wrapper {
    transform: rotate(180deg);
  }
}
.sub-dir {
  position: relative;
  display: flex;
  align-items: center;
  width: 321px;
  height: 36px;
  .dropdown-icon-wrapper {
    position: absolute;
    width: 10px;
    left: 28px;
    margin-right: 14px;
  }
  .dir-content {
    position: absolute;
    left: 52px;
    width: 170px;
    overflow:hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow:ellipsis;
  }
  .operate-wrapper {
    position: absolute;
    left: 291px;
    width: 14px;
    height: 12px;
  }
}
.sub-sub-dir {
  position: relative;
  display: flex;
  align-items: center;
  width: 321px;
  height: 36px;
  .dropdown-icon-wrapper {
    position: absolute;
    width: 10px;
    left: 38px;
    margin-right: 14px;
  }
  .dir-content {
    position: absolute;
    left: 62px;
    width: 170px;
    overflow:hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow:ellipsis;
  }
  .operate-wrapper {
    position: absolute;
    left: 291px;
    width: 14px;
    height: 12px;
  }
}
.main-dir.active,
.sub-dir.active,
.sub-sub-dir.active,{
  background: #f9f9f9;
}

.dir-add {
  position: relative;
  display: flex;
  align-items: center;
  width: 325px;
  height: 36px;
  input {
    position: absolute;
    box-sizing: border-box;
    width: 228px;
    height: 28px;
    border: 2px solid #00BDA5;
    border-radius: 3px;
    padding-left: 10px;
    left: 25px;
    outline: none;
    font-weight: 400;
    color: #393939;
  }
  i{
    position: absolute;
    font-size: 18px;
    cursor: pointer;
    color: #767676;;
  }
  i.active {
    color: #00BDA5;
  }
}
.sub-dir-add {
  position: relative;
  display: flex;
  align-items: center;
  width: 325px;
  height: 36px;
  input {
    position: absolute;
    box-sizing: border-box;
    width: 214px;
    height: 28px;
    border: 2px solid #00BDA5;
    border-radius: 3px;
    padding-left: 10px;
    left: 39px;
    outline: none;
    font-weight: 400;
    color: #393939;
  }
  i{
    position: absolute;
    font-size: 18px;
    cursor: pointer;
    color: #767676;;
  }
  i.active {
    color: #00BDA5;
  }
}
.sub-sub-dir-add {
  position: relative;
  display: flex;
  align-items: center;
  width: 325px;
  height: 36px;
  input {
    position: absolute;
    box-sizing: border-box;
    width: 200px;
    height: 28px;
    border: 2px solid #00BDA5;
    border-radius: 3px;
    padding-left: 10px;
    left: 53px;
    outline: none;
    font-weight: 400;
    color: #393939;
  }
  i{
    position: absolute;
    font-size: 18px;
    cursor: pointer;
    color: #767676;;
  }
  i.active {
    color: #00BDA5;
  }
}

.el-popover .my_el-popover{
  min-width: 50px;
}

.menu-spread {
  transition: all .4s;
  overflow: hidden;
  max-height: 50vh;
}
.menu-spread.collapse {
  max-height: 0;
}
</style>
