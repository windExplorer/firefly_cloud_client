<template>
  <div class="home page-container">
    <div class="tips">
      <el-progress type="circle" :percentage="parseFloat($store.state.user.userInfo.use_size/$store.state.user.userInfo.total_size*100) || 0" color="#8e71c7" :width="100" status="text">{{ (($store.state.user.userInfo.use_size/$store.state.user.userInfo.total_size)*100).toFixed(2) }} %</el-progress>
      <p>{{ ($store.state.user.userInfo.use_size/1024/1024).toFixed(2) }} MB / {{ ($store.state.user.userInfo.total_size/1024/1024).toFixed(0) }} MB</p>
    </div>
    <el-tabs :tab-position="tabPosition" style="height: 100%;" v-model="$store.state.page.home.tab_active" @tab-click="TabClick">
      <el-tab-pane name="1" :ptitle="'全部文件'">
        <span slot="label"><i class="el-icon-user"></i> 全部文件</span>
        <vue-scroll>
          <div class="tab tab1">
            <div class="tools">
              <el-button type="primary" @click=" alert_upFolder = true "><i class="el-icon-upload el-icon--right"></i> 上传</el-button>
              <el-button type="primary" @click="open_createFolder"><i class="el-icon-folder-add el-icon--right"></i> 新建文件夹</el-button>
              {{ uploadMessage }}
              <el-button-group :class="'btns'" v-show=" selected_file.length+selected_folder.length > 0 ">
                <el-button type="primary" plain ><i class="el-icon-share el-icon--right"></i> 分享</el-button>
                <el-button type="primary" plain ><i class="el-icon-edit el-icon--right"></i> 重命名</el-button>
                <el-button type="primary" plain ><i class="el-icon-download el-icon--right"></i> 下载</el-button>
                <el-button type="primary" plain ><i class="el-icon-copy-document el-icon--right"></i> 复制</el-button>
                <el-button type="primary" plain ><i class="el-icon-scissors el-icon--right"></i> 移动</el-button>
                <el-button type="primary" plain ><i class="el-icon-delete el-icon--right"></i> 删除</el-button>
              </el-button-group>
              <p>
                <el-breadcrumb separator-class="el-icon-arrow-right">
                  <el-breadcrumb-item v-for="(item, index) in $store.state.data.home_nav_items" :v-key='index'>{{ item.name }}</el-breadcrumb-item>

                </el-breadcrumb>
              </p>

              <div class="search">
                <el-input
                  placeholder="请选择日期"
                  suffix-icon="el-icon-date"
                  v-model="search_text">
                </el-input>
              </div>
              <div class="thead">
                <el-row>
                  <el-col :span="12"><div class=""><el-checkbox v-model="tab1_checked" @change="tab1_allSelect">{{ tab1_checked ? `全不选` : `全选` }}</el-checkbox> 文件名 <span v-show="selected_file.length+selected_folder.length > 0">(已选中{{ selected_file.length+selected_folder.length }}个文件/文件夹)</span></div></el-col>
                  <el-col :span="6"><div class=""><el-divider direction="vertical"></el-divider>2</div></el-col>
                  <el-col :span="6"><div class=""><el-divider direction="vertical"></el-divider>3</div></el-col>
                </el-row>
                <div class="progress" :style="{backgroundImage:'linear-gradient(to right,#C0C7CB 0%,#C0C7CB '+progress+',#E1E6E9 '+progress+',#E1E6E9 100%)'}"></div>
              </div>
            </div>
            <div class="file-container">

                  <div class="file-box" :class="{'active': selected_folder.includes(item.id) }"  v-for="(item, index) in $store.state.data.home_nav_items[$store.state.data.home_nav_path.active_item].list.folder" :v-key="index">
                    <i class="el-icon-success" :class="{'active': selected_folder.includes(item.id) }" @click="select_file(item.id, 1)"></i>
                    <div class='img-box'>
                      <img src='../assets/icons/folder.png' @contextmenu.prevent="test" />
                    </div>
                    <div class="filename ellipsis">{{ item.name }}</div>
                  </div>

                  <div class="file-box" :class="{'active': selected_file.includes(item.id) }" v-for="(item, index) in $store.state.data.home_nav_items[$store.state.data.home_nav_path.active_item].list.file" :v-key="index">
                    <i class="el-icon-success" :class="{'active': selected_file.includes(item.id) }" @click="select_file(item.id, 2)"></i>
                    <div class='img-box'>
                      <img src='../assets/icons/file1.png' class="file" />
                    </div>
                    <div class="filename ellipsis">{{ item.name }}</div>
                  </div>
                


                
            </el-row>
            </div>
            
          </div>
        </vue-scroll>
      </el-tab-pane>


      <el-tab-pane name="2" :ptitle="'我的分享'">
          <span slot="label"><i class="el-icon-user"></i> 我的分享</span>
          <vue-scroll>
            <div class="tab tab1">
                <el-row :gutter="20">
                    <el-col :span="10">
                        我的分享
                    </el-col>
                    
                    <el-col :span="10">
                        
                    </el-col>
                </el-row>
            </div>
          </vue-scroll>
      </el-tab-pane>

      <el-tab-pane name="3" :ptitle="'我的评论'">
          <span slot="label"><i class="el-icon-user"></i> 我的评论</span>
          <vue-scroll>
            <div class="tab tab1">
                <el-row :gutter="20">
                    <el-col :span="10">
                        我的评论
                    </el-col>
                    
                    <el-col :span="10">
                        
                    </el-col>
                </el-row>
            </div>
          </vue-scroll>
      </el-tab-pane>


      <el-tab-pane name="4" :ptitle="'我的下载'">
          <span slot="label"><i class="el-icon-user"></i> 我的下载</span>
          <vue-scroll>
            <div class="tab tab1">
                <el-row :gutter="20">
                    <el-col :span="10">
                        我的下载
                    </el-col>
                    
                    <el-col :span="10">
                        
                    </el-col>
                </el-row>
            </div>
          </vue-scroll>
      </el-tab-pane>


      <el-tab-pane name="5" :ptitle="'我的上传'">
          <span slot="label"><i class="el-icon-user"></i> 我的上传</span>
          <vue-scroll>
            <div class="tab tab1">
                <el-row :gutter="20">
                    <el-col :span="10">
                        我的上传
                    </el-col>
                    
                    <el-col :span="10">
                        
                    </el-col>
                </el-row>
            </div>
          </vue-scroll>
      </el-tab-pane>

      
    </el-tabs>

    <!-- 其他(弹窗等) -->
    <el-dialog title="新建文件夹" :visible.sync="alert_createFolder" :width="`500px`">
        <el-form :model="createFolder">
            <el-form-item label="名称" :label-width="'80px'">
                <el-input v-model="createFolder.name" autocomplete="off" autofocus="true" type='text'></el-input>
            </el-form-item>
            <el-form-item label="描述" :label-width="'80px'">
                <el-input type="textarea" maxlength="140" show-word-limit v-model="createFolder.remark_context" rows="4"></el-input>
            </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="alert_createFolder = false">取 消</el-button>
            <el-button type="primary" @click="onSubmitCreateFolder">确 定</el-button>
        </div>
    </el-dialog>

    <el-dialog title="上传文件" :visible.sync="alert_upFolder" :width="`500px`">
      <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          :http-request="uploadFileMethod"
          :drag="true"
          :multiple="true"
          :name="'file'"
          >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传{{ $store.state.data.file_allow.allow_ext }}文件，且不超过{{ ($store.state.data.file_allow.allow_size/1014/1024).toFixed(0) }}mb</div>
      </el-upload>
    </el-dialog>

  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'home',
  components: {
    
  },
  data() {
    return {
      tabPosition: 'left',
      search_text: '',
      alert_createFolder: false,
      formLabelWidth: '120px',
      createFolder: {
        name: '',
        remark_context: '',
        folder_id: this.$store.state.data.home_nav_path.active_item
      },
      selected_file: [],
      selected_folder: [],
      file_items: this.$store.state.data.home_nav_items[this.$store.state.data.home_nav_path.active_item].list,
      tab1_checked: false,
      alert_upFolder: false,
      progress: 30,
      uploadMessage: '123',
      
    }
  },
  methods: {
    TabClick(e) {
      console.log(e)
      this.$store.commit('page/setHome_tabActive', e.name)
      this.$store.commit('page/setTitle', this.$global.name + ' - ' + e.$attrs.ptitle)
    },
    navClick(e) {

    },
    open_createFolder() {
      this.alert_createFolder = true
    },
    onSubmitCreateFolder() {
      console.log(this.createFolder)
      //创建文件夹
      let load = this.$loading({ fullscreen: true })
      this.createFolder.folder_id = this.$store.state.data.home_nav_path.active_item
      this.$apis.fileApi.createFolder(this.createFolder).then(res => {
          load.close()
          res = res.data
          if(res.code == 1){
              this.$notify({
                  title: '成功',
                  message: res.msg,
                  type: 'success',
                  duration: 1500
              })
              this.$store.dispatch('data/setHomeNav', this.$store.state.data.home_nav_path.active_item)
              this.alert_createFolder = false
              console.log(this.file_items)
          }else{
              this.$notify.error({
                  title: '错误',
                  message: res.msg,
                  duration: 2000
              })
          }
      })
      .catch(err => {
          load.close()
          this.$notify.error({
              title: '错误',
              message: `请求出错`,
              duration: 2000
          })
          console.log(err)
      })
    },
    select_file(id, type) {
      if(type == 1){
        let ind = this.selected_folder.indexOf(id)
        if(ind > -1){
          this.selected_folder.splice(ind, 1)
        }else{
          this.selected_folder.push(id)
        }
      }
      else if(type == 2){
        let ind = this.selected_file.indexOf(id)
        if(ind > -1){
          this.selected_file.splice(ind, 1)
        }else{
          this.selected_file.push(id)
        }
      }
      
      //console.log(this.selected_file)
      //console.log(this.selected_folder)

    },
    tab1_allSelect() {
      if(!this.tab1_checked){
        this.selected_file = []
        this.selected_folder = []
      }else{
        this.$store.state.data.home_nav_items[this.$store.state.data.home_nav_path.active_item].list.file.map(item => {
          this.selected_file.push(item.id)
        })
        this.$store.state.data.home_nav_items[this.$store.state.data.home_nav_path.active_item].list.folder.map(item => {
          this.selected_folder.push(item.id)
        })
      }
    },
    uploadFileMethod(param) {
      this.alert_upFolder = false
      let fileObject = param.file;
      let formData = new FormData()
      formData.append("file", fileObject)
      //console.log(fileObject)
      //前置操作，判断
      if(fileObject.size > this.$store.state.data.file_allow.allow_size){
        this.$notify({
            title: '失败',
            message: `超出上传大小限制(上传文件不得大于${(this.$store.state.data.file_allow.allow_size/1024/1024).toFixed(0)}MB)`,
            type: 'error',
            duration: 2500
        })
        return
      }
      if(!this.$store.state.data.file_allow.allow_ext.split(',').includes(fileObject.name.split('.')[1])){
        this.$notify({
            title: '失败',
            message: `不在允许的文件类型内(上传文件类型为: ${this.$store.state.data.file_allow.allow_ext})`,
            type: 'error',
            duration: 2500
        })
        return
      }
      let self = this
      var config = {
        /* onUploadProgress: progressEvent => {
          var complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
          this.progress = complete
        } */
        /* onUploadProgress: progressEvent => {
          let complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
          self.uploadMessage = '上传 ' + complete
          console.log(complete)
        } */
      }
      //console.log(config)

      this.$global.getFileMd5_2(fileObject, md5 => {
        console.log(md5)
          //let load = this.$loading({ fullscreen: true })
          this.$apis.fileApi.checkFileMd5({md5: md5, type: 2, folder_id: this.$store.state.data.home_nav_path.active_item, name: fileObject.name})
          .then(res => {
              //load.close()
              res = res.data
              console.log(res)
              //return
              if(res.code == 1){    
                  this.$notify({
                      title: '成功',
                      message: `文件上传成功`,
                      type: 'success',
                      duration: 1500
                  })
                  this.$store.dispatch('data/setHomeNav', this.$store.state.data.home_nav_path.active_item)
                  this.$store.commit('user/setUseSize', fileObject.size)
                  //console.log(this.$store.state.user.userInfo.use_size)
                  //this.$store.commit('user/setAvatar', res.data.net_path)
              }
              else if(res.code == 0){
                  this.$notify.error({
                      title: '错误',
                      message: res.msg,
                      duration: 2000
                  })
              }
              else if(res.code == -1){
                //let load = this.$loading({ fullscreen: true })
                formData.append('type', 2)
                formData.append('size', fileObject.size)
                formData.append('folder_id', this.$store.state.data.home_nav_path.active_item)
                formData.append('name', fileObject.name)
                //this.$apis.fileApi.upFile(formData)
                this.$axios.post('/api/file/up_file', formData, {
                  onUploadProgress: progressEvent => {
                      let complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
                      self.uploadMessage = '上传 ' + complete
                      self.progress = complete
                      //console.log(complete)
                    }
              })
                .then((res, config, self) => {
                    //load.close()
                    res = res.data
                    if(res.code == 1){
                        this.$notify({
                            title: '成功',
                            message: res.msg,
                            type: 'success',
                            duration: 1500
                        })
                        this.$store.dispatch('data/setHomeNav', this.$store.state.data.home_nav_path.active_item)
                        this.$store.commit('user/setUseSize', fileObject.size)
                        //console.log(this.$store.state.user.userInfo.use_size)
                        //this.$store.commit('user/setAvatar', res.data.url)
                    }else{
                        this.$notify.error({
                            title: '错误',
                            message: res.msg,
                            duration: 2000
                        })
                    }
                })
                .catch(err => {
                    //load.close()
                    this.$notify.error({
                        title: '错误',
                        message: `请求出错`,
                        duration: 2000
                    })
                    console.log(err)
                })
              }
          })
      })
    },
    test() {
      console.log(1)
    }

  },
  computed: {
    
  },
  created() {
    this.$store.commit('page/setTitle', this.$global.name + ' - 首页')
    //console.log(this.$store.state.user.userInfo.use_size/this.$store.state.user.userInfo.total_size*100)
    //console.log((this.$store.state.user.userInfo.use_size/this.$store.state.user.userInfo.total_size*100).toFixed(2))
    // 获取文件
    this.$store.dispatch('data/setHomeNav', this.$store.state.data.home_nav_path.active_item)
    this.$store.dispatch('data/setFileAllow')
    
  }
}
</script>

<style lang="scss">
.home{
  .progress{
    height: 10px;
    width: 100%;
  }
  .tips{
    background: rgba(255, 255, 255, 0);
    padding: 5px;
    position: absolute;
    left: 20px;
    bottom: 30px;
    font-size: 12px;
    color: #fff;
    .el-progress__text{
      color: #fff;
    }
  }
  .tab1{
    padding: 10px !important;
  }
  .tools{
    height: auto;
    text-align: left;
    .btns{
      margin-left: 10px;
      button{
        padding: 12px 10px;
      }
    }
    p{
      margin-top: 15px;
    }
    .search{
      position: absolute;
      right: 10px;
      top: 10px;
    }
    .thead{
      height: 30px;
      line-height: 30px;
      font-size: 12px;
      margin-top: 10px;
      border-bottom: 1px solid #d8d8d8;
    }
  }
  .file-container{
    margin-top: 10px;
    text-align: left;
  }
  .file-box{
    margin: 0 10px 10px;
    height: 130px;
    width: 120px;
    padding: 0 10px;
    border-radius: 4px;
    display: inline-block;
    text-align: center;
    position: relative;
    i{
      position: absolute;
      left: 10px;
      top: 10px;
      cursor: pointer;
      color: #ccc;
      font-size: 20px;
      transition: .2s;
      opacity: 0;
    }
    i:hover{
      color: #333;
    }
    i.active{
      color: #66B1FF;
    }
    .img-box{
      height: 60px;
      margin-top: 20px;
    }
    img{
      width: 70px;
      height: 70px;
    }
    .file{
      height: 50px;
      margin-top: 10px;
      width: 50px;
    }
    .filename{
      width: 100%;
      font-size: 12px;
      height: 20px;
      line-height: 20px;
      margin-top: 20px;
    }
  }
  .file-box.active,
  .file-box:hover{
    background: #F1F5FA;
    i{
      opacity: 1;
    }
  }
}
</style>

