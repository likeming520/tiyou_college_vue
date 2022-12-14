<template>
  <div>
    <div class="left-top">
      <div>
        <el-button @click="insertAfterRoot" type="primary" style=" width: 92px;height: 28px;">+ 专项类型</el-button>
        <el-button v-if="activeTreeNode&&activeTreeNode.level!==3" @click="insertAfterChildren" type="primary"
                   style=" width: 84px;height: 28px;">
          + 子专项
        </el-button>
        <el-button type="primary" v-if="!activeTreeNode || activeTreeNode.level===3"
                   style="width: 84px;height: 28px;background-color: #c5c5c5;border-color: #c5c5c5;color: #FFFFFF;"
                   disabled>+ 子专项
        </el-button>
      </div>
      <div class="right-icon">
        <img v-if="activeTreeNode&&activeTreeNode.up" @click="upOrDownSkillCourseDir(1)"
             src="../../../../static/tuImg/sahng@2x.png"
             alt=""
             style="cursor: pointer">
        <img v-if="!(activeTreeNode&&activeTreeNode.up)" src="../../../../static/tuImg/sahng2@2x.png"
             alt=""
             style="cursor: not-allowed">
        <img v-if="activeTreeNode&&activeTreeNode.down" @click="upOrDownSkillCourseDir(2)"
             style="margin-left: 12px;cursor: pointer"
             src="../../../../static/tuImg/xai@2x.png"
             alt=""
        >
        <img v-if="!(activeTreeNode&&activeTreeNode.down)" style="margin-left: 12px;cursor: not-allowed"
             src="../../../../static/tuImg/xia2@2x.png"
             alt="">
      </div>
    </div>
    <div class="line"></div>
    <div class="left-content">
      <el-tree :data="treeData" :default-expand-all="true" :props="{
        children:'childList',
        label:'name',
      }" ref="tree" @node-click="nodeClickHandle"
               :expand-on-click-node="false">
        <div class="slot-container" slot-scope="{ node, data }">
          <div v-if="!data.input" class="label" :title="data.name">{{ data.name }}</div>
          <div v-if="data.input" class="input">
            <input type="text" :style="{
            width:inputLevel===2?'200px':inputLevel===3?'180px':'220px'
          }" v-model.trim="name" placeholder="请输入专项名称"/>
            <i v-if="name&&oper==='addRoot'" class="el-icon-success" @click.stop="saveInsertAfterRoot"
               style="color: #00BDA5;font-size: 18px;margin-left: 4px"></i>
            <i v-if="name&&oper==='addChildren'" class="el-icon-success" @click.stop="saveInsertAfterChildren"
               style="color: #00BDA5;font-size: 18px;margin-left: 4px"></i>
            <i v-if="name&&oper==='edit'" class="el-icon-success" @click.stop="saveEdit"
               style="color: #00BDA5;font-size: 18px;margin-left: 4px"></i>
            <i v-if="!name" class="el-icon-success"
               style="color: #767676;font-size: 18px;margin-left: 4px"></i>
            <i v-if="oper==='addRoot'" class="el-icon-error" @click.stop="deleteRootLast"
               style="color: #FF6E67;font-size: 18px;margin-left: 2px"></i>
            <i v-if="oper==='addChildren'" class="el-icon-error" @click.stop="deleteChildrenLast"
               style="color: #FF6E67;font-size: 18px;margin-left: 2px"></i>
            <i v-if="oper==='edit'" class="el-icon-error" @click.stop="cancelEdit"
               style="color: #FF6E67;font-size: 18px;margin-left: 2px"></i>
          </div>
          <div v-if="!data.input" class="operation" :style="{
            right:data.level===2?'-1px':data.level===3?'3px':'-5px',
          }">
            <el-dropdown
              placement="bottom-start"
              trigger="click"
              @command="operation">
              <img src="../../../assets/images/menu.png" alt="">
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item style="color:#393939;" :command="1">编辑</el-dropdown-item>
                <el-dropdown-item style="color:#FF4D43;" :command="2">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </el-tree>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash.debounce'
import {getDir, moveUpAndDown, save, deleteDir} from "../../../api/modules/question/question_manage";

export default {
  name: "PcmanageLeft",
  data() {
    return {
      data: [],
      activeTreeNode: null,
      name: '',
      oper: '',
      inputLevel: null
    }
  },
  mounted() {
    this.init()
  },
  computed: {
    treeData() {
      const data = this.data.map((first) => {
        first.up = true
        first.down = true

        first.childList = first.childList.map((second) => {
          second.up = true
          second.down = true
          second.childList = second.childList.map((third) => {
            third.up = true
            third.down = true
            return third
          })
          if (second.childList.length !== 0) {
            second.childList[0].up = false
            second.childList[second.childList.length - 1].down = false;
          }
          return second
        })

        if (first.childList.length !== 0) {
          first.childList[0].up = false
          first.childList[first.childList.length - 1].down = false;
        }

        return first
      })
      if (data.length !== 0) {
        data[0].up = false
        data[data.length - 1].down = false
      }
      return data;
    }
  },
  methods: {
    deleteRootLast() {
      if (this.oper === 'addRoot') {
        this.oper = ''
        this.name = ''
        this.data.pop()
      }
    },
    deleteChildrenLast() {
      if (this.oper === 'addChildren') {
        this.oper = ''
        this.name = ''
        this.activeTreeNode.childList.pop()
        this.activeTreeNode = null
      }
    },
    cancelEdit() {
      if (this.oper === 'edit') {
        this.oper = ''
        this.name = ''
        this.$set(this.activeTreeNode, 'input', false)
        this.activeTreeNode = null
      }
    },
    operation(command) {
      if (command === 1) {
        if (!this.oper){
          this.oper = 'edit'
          this.$set(this.activeTreeNode, 'input', true)
          this.inputLevel = this.activeTreeNode.level
          this.name=this.activeTreeNode.name
        }
      } else {
        this.deleteMainDir(this.activeTreeNode.id)
      }
    },
    init() {
      this.activeTreeNode = null
      getDir({"skillResourcesId": 113}).then((result) => {
        this.data = result.data.page
        this.name = ''
        this.oper = ''
      })
    },
    nodeClickHandle(data, node) {
      if (!this.oper) {
        this.activeTreeNode = data
      }
    },
    insertAfterRoot() {
      if (!this.oper) {
        this.oper = 'addRoot'
        this.inputLevel = 1
        this.data = [...this.data, {
          input: true,
          name: '',
          childList: []
        }]
      }
    },
    insertAfterChildren() {
      if (!this.oper) {
        this.oper = 'addChildren';
        this.inputLevel = this.activeTreeNode.level + 1
        this.activeTreeNode.childList = [...this.activeTreeNode.childList, {
          input: true,
          name: '',
          childList: []
        }]
      }
    },
    // 新增二、三级目录
    saveInsertAfterChildren: debounce(function () {
      save({
        skillResourcesId: 113,
        parentId: this.activeTreeNode.id,
        parentName: this.activeTreeNode.name,
        name: this.name,
        // type: 1,
        // orderNum: this.menus.length
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.$message.success("新增成功")
          this.init()
          this.name = ''
          this.oper = ''
        } else {
          this.$message.error(data.msg)
        }
      })
    }),
    // 编辑专项目录名称
    saveEdit: debounce(function (preNode) {

      save({
        "id": this.activeTreeNode.id,
        "skillResourcesId": 113,
        "parentId": preNode.id,
        "parentName": preNode.name,
        "name": this.name,
        // "orderNum":this.menus.length
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.$message.success("修改成功")
          this.init()
          this.name = ''
          this.oper = ''
        } else {
          this.$message.error(data.msg)
        }
      })
    }),
    // 新增一级目录
    saveInsertAfterRoot: debounce(function () {
      save({
        skillResourcesId: 113,
        parentId: 0,
        parentName: 0,
        name: this.name,
        // type: 1,
        // orderNum: this.menus.length
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.$message.success("新增成功")
          this.init()
          this.name = ''
          this.oper = ''
        } else {
          this.$message.error(data.msg)
        }
      })
    }),
    // 删除专项目录
    deleteMainDir: debounce(function (id) {
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
    }, 300),
    //课程目录-上移下移   upAndDownFlag:排序状态调整：1上移2下移
    upOrDownSkillCourseDir: debounce(async function (upAndDownFlag) {
      if (!this.activeTreeNode) {
        this.$message.warning("请先选择目录");
        return
      }
      let str = '';
      if (upAndDownFlag === 1) {
        str = "上移";
      } else if (upAndDownFlag === 1) {
        str = "下移";
      }
      let params = {
        id: this.activeTreeNode.id,
        upAndDownFlag: upAndDownFlag,
      }
      const {data} = await moveUpAndDown(params)
      if (data && data.code === 0) {
        this.$message.success(str + "成功");
        this.init()
      } else {
        this.$message.error(str + "失败：" + data.msg);
      }
    }, 300),

  }
}
</script>

<style scoped lang="scss">
@import "../../../assets/css/personalCenter/pcmanage/PcmanageLeft.scss";
</style>

