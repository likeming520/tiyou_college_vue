<template>
    <div>
        <div class="left-top">
            <div>
                <el-button type="primary" @click="addBig" style=" width: 90px;">+ 专项类型</el-button>
                <el-button type="primary" @click="addSmall" style=" width: 70px;">+ 子专项</el-button>
            </div>
            <div>
                <img style="margin-left:45px" src="../../../../static/tuImg/sahng@2x.png" alt="">
                <img src="../../../../static/tuImg/xia2@2x.png" alt="">
            </div>
        </div>

        <el-row class="tac">
            <el-col>
                <!-- 一级目录 -->
                <el-menu
                default-active="2"
                class="el-menu-vertical-demo">
                    <el-submenu v-for="(first, f_index) in menus" :key="first.name" :index="f_index+1">
                        <template slot="title">
                            <span>{{first.name}}</span>
                        </template>
                        <!-- 二级目录 -->
                        <el-menu-item-group v-if="first.childList">
                            <el-submenu v-for="(second,s_index) in first.childList" :key="second.name" :index="f_index +'-' + (s_index+1)">
                                <template slot="title">
                                    <span>{{second.name}}</span>
                                </template>
                                <!-- 三级目录 -->
                                <el-menu-item-grroup v-if="second.childList">
                                    <el-submenu v-for="(thirst,t_index) in second.childList" :key="thirst.name" :index="f_index+ '-' +s_index+ '-' +(t_index)">
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
        </el-row>
        
        <div class="line">
            <div class="main_dir_line2" v-if="model_first_dirName_show_flag">
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
        </div>
    </div>
</template>

<script>
import {doGetMenu} from '../../../api/modules/question_bank/menu.js'
    export default {
        name: "PcmanageLeft",
        data() {
            return {
                menus: [],
                model_first_dirName_show_flag: false
            }
        },
        created() {
            doGetMenu({"skillResourcesId": 1}).then((result) => {
                console.log(result.data.page);
                this.menus = result.data.page
            }).catch((err) => {
                console.log(err);
            });
        },

        components:{},

        methods: {
            addBig() {},
            addSmall() {},
        }
    }
</script>

<style scoped lang="scss">
@import "../../../assets/css/personalCenter/pcmanage/PcmanageLeft.scss";

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
</style>
