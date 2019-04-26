<template>
    <div class="message page-container">
        <el-tabs :tab-position="tabPosition" style="height: 100%;">
            <el-tab-pane>
                <span slot="label"><i class="el-icon-user"></i> 基本资料</span>
                <div class="tab1">
                    基本资料修改
                </div>
            </el-tab-pane>

            
        </el-tabs>
    </div>
</template>

<script>
export default {
    name: 'personal',
    data() {
        return {
            tabPosition: 'left'
        }
    },
}
</script>


<style lang='scss'>
    
    

</style>