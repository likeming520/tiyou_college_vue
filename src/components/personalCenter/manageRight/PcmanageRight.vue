<template>
    <div class="exam-main">
        <!-- 循环  判断是单选题还是多选题类型 只需对接数据即可 -->
        <div v-for="item in extype">
            <div class="exam-type">
                <div class="left">
                    <div class="btntype">{{item.type}}</div>
                    <span>王佳欣&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2022.02.18</span>
                </div>
                <div class="right">
                    <div class="edit"><img src="../../../../static/tuImg/bianji@2x.png" alt=""><span>编辑</span></div>
                    <div class="dele"><img src="../../../../static/tuImg/shanchu@2x.png" alt=""><span>删除</span></div>
                </div>
            </div>

            <!-- 题目部分 标题 选项 解析 -->
            <div class="exam-content">
                <div class="exam-title">
                    1、在html中，通过xxxxxxxxx
                </div>
                <!-- 选项 -->
                <div v-for="item in activities" class="exam-opt"  @click="change($event)" :ac="activities.as" >{{item.content}}、{{item.data}}</div>
                <div class="exam-analy">
                    解析：这是一条解析
                </div>
            </div>
        </div>
    </div>
</template> 

<script>
    export default {
        name: "pcmanageRight",
        components:{
        },
        data(){
            return {    
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
                extype:[
                    {
                    type: "多选题",
                    },
                    {
                    type: "单选题",
                    },
                ]
            };
        },
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
