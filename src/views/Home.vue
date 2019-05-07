<template>
  <div class="home page-container">
    <div class="tips">
      <el-progress type="circle" :percentage="parseFloat($store.state.user.userInfo.use_size/$store.state.user.userInfo.total_size*100) || 0" color="#8e71c7" :width="100" status="text">{{ (($store.state.user.userInfo.use_size/$store.state.user.userInfo.total_size)*100).toFixed(2) }} %</el-progress>
      <p>{{ $global.easyFileSize($store.state.user.userInfo.use_size) }} / {{ $global.easyFileSize($store.state.user.userInfo.total_size) }} </p>
    </div>
    <el-tabs :tab-position="tabPosition" style="height: 100%;" v-model="$store.state.page.home.tab_active" @tab-click="TabClick">
      <el-tab-pane name="1" :ptitle="'全部文件'">
        <span slot="label"><i class="el-icon-user"></i> 全部文件</span>
        <vue-scroll>
          <div class="tab tab1">
            <div class="tools">
              <el-button type="success" icon="el-icon-refresh" circle @click="$store.dispatch('data/setHomeNav', $store.state.data.home_nav_path.active_item)"></el-button>
              <el-button type="primary" @click=" alert_upFolder = true" ><i class="el-icon-upload el-icon--right"></i> 上传</el-button>
              <el-button type="primary" @click="open_createFolder" ><i class="el-icon-folder-add el-icon--right"></i> 新建文件夹</el-button>
              <el-button-group :class="'btns'" v-show=" selected_file.length+selected_folder.length > 0 ">
                <el-button type="primary" plain @click="fileShare" size="mini"><i class="el-icon-share el-icon--right"></i> 分享</el-button>
                <el-button type="primary" plain @click="fileEdit" v-show=" selected_file.length+selected_folder.length==1 " size="mini"><i class="el-icon-edit el-icon--right"></i> 编辑</el-button>
                <el-button type="primary" plain @click="fileDown" v-show=" selected_file.length==1 && selected_folder.length==0" size="mini"><i class="el-icon-download el-icon--right"></i> 下载</el-button>
                <el-button type="primary" plain @click="fileCopy" size="mini"><i class="el-icon-copy-document el-icon--right"></i> 复制</el-button>
                <el-button type="primary" plain @click="fileMove" size="mini"><i class="el-icon-scissors el-icon--right"></i> 移动</el-button>
                <el-button type="primary" plain @click="fileDel" size="mini"><i class="el-icon-delete el-icon--right"></i> 删除</el-button>
              </el-button-group>
              <p>
                <el-breadcrumb separator-class="el-icon-arrow-right">
                  <el-breadcrumb-item v-for="(item, index) in $store.state.data.home_nav_path.active_path" :v-key='index' ><el-link :underline="false" type="primary" @click="enter_folder({id: parseInt($store.state.data.home_nav_path.active_pid_path[index]), name: item})">{{ item }}</el-link></el-breadcrumb-item>
                </el-breadcrumb>
              </p>

              <div class="search" v-show="false">
                <el-input
                  placeholder="请输入搜索内容"
                  suffix-icon="el-icon-date"
                  v-model="search_text">
                </el-input>
              </div>
              <div class="thead">
                <el-row>
                  <el-col :span="12">
                    <div class="">
                      <el-checkbox v-model="tab1_checked" @change="tab1_allSelect">{{ tab1_checked ? `全不选` : `全选` }}</el-checkbox>
                       文件名 <span v-show="selected_file.length+selected_folder.length > 0">(已选中{{ selected_file.length+selected_folder.length }}个文件/文件夹)</span>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="">
                      <el-divider direction="vertical"></el-divider>
                    </div>
                  </el-col>
                  <el-col :span="6"><div class=""><el-divider direction="vertical"></el-divider>3</div></el-col>
                </el-row>
              </div>

            </div>
            <div class="file-container">

                  <div class="file-box" :class="{'active': selected_folder.includes(item.id) }"  v-for="(item, index) in $store.state.data.home_nav_items[$store.state.data.home_nav_path.active_item].list.folder" :v-key="index">
                    <i class="el-icon-success" :class="{'active': selected_folder.includes(item.id) }" @click="select_file(item, 1)"></i>
                    <div class='img-box' @click="enter_folder(item)">
                      <img src='../assets/icons/folder.png' @contextmenu.prevent="test" />
                    </div>
                    <el-tooltip placement="bottom">
                      <div slot="content">{{item.name}}
                        <p v-show="item.remark_context"><br/>[描述] {{item.remark_context}}</p>

                      </div>
                    <div class="filename ellipsis">{{ item.name }}</div>
                    </el-tooltip>
                  </div>

                  <div class="file-box" :class="{'active': selected_file.includes(item.id) }" v-for="(item, index) in $store.state.data.home_nav_items[$store.state.data.home_nav_path.active_item].list.file" :v-key="index">
                    <i class="el-icon-success" :class="{'active': selected_file.includes(item.id) }" @click="select_file(item, 2)"></i>
                    <div class='img-box'>
                      <!-- <img src='../assets/icons/file1.png' class="file" /> -->
                      <img :src="getIcon(item.ext)" alt="">
                    </div>
                    <el-tooltip placement="bottom">
                      <div slot="content">{{item.name}}
                        <p v-show="item.description_context"><br/>[描述] {{item.description_context}}</p>
                        <p v-show="item.size"><br/>[大小] {{ $global.easyFileSize(item.size) }}</p>
                      </div>
                    <div class="filename ellipsis">{{ item.name }}</div>
                    </el-tooltip>
                  </div>
                
            </el-row>
            </div>
            
          </div>
        </vue-scroll>
      </el-tab-pane>


      <el-tab-pane name="2" :ptitle="'我的分享'">
          <span slot="label"><i class="el-icon-user"></i> 我的分享</span>
          <vue-scroll>
            <div class="tab tab2">
                <div class="btn-box" style="text-align:left;">
                    <el-button type="danger" round :disabled="myshare_selected.length == 0" @click="delMyShare" size="mini">删除分享</el-button>
                    <el-button type="warning" round :disabled="myshare_selected.length == 0" @click="hideMyShare" size="mini">取消分享</el-button>
                    <el-button type="success" round :disabled="myshare_selected.length == 0" @click="showMyShare" size="mini">恢复分享</el-button>
                </div>
                <el-table 
                  ref="multipleTable"
                  :data="$store.state.share.myshare"
                  tooltip-effect="dark"
                  style="width: 100%"
                  stripe
                  size="small"
                  @selection-change="handleSelectionChangeShare">
                  <el-table-column type="selection" width="55"></el-table-column>
                  <el-table-column label="名称" show-overflow-tooltip min-width="250">
                    <template slot-scope="scope">
                      <el-link type="primary" :href="scope.row.downUrl" target="_blank" title="查看详情">
                      <span v-if="scope.row.isfolder" style="cursor: pointer;">
                          <img src="../assets/icons/Folder_24.png" alt="">&nbsp;&nbsp;
                          {{ scope.row.name }}
                      </span>
                      <span v-if="!scope.row.isfolder" style="cursor: pointer;">
                          <img src="../assets/icons/file1.png" width="24" height="24" alt="">&nbsp;&nbsp;
                          {{ scope.row.name }}
                      </span>
                      </el-link>
                    </template>
                  </el-table-column>
                  <el-table-column label="提取码" show-overflow-tooltip width="150">
                    <template slot-scope="scope">
                      <span style="display: inline-block;width: 50px; margin-right: 5px;">
                      <span v-if="!scope.row.is_encrypt">无加密</span>
                      <span v-if="scope.row.is_encrypt" :data-clipboard-text="scope.row.share_password" class="copyBtn" @click="$global.copy()" style="cursor:pointer;" :title="`点击复制提取码`">{{ scope.row.share_password }}</span>
                      </span>
                      <el-button type="primary" icon="el-icon-document-copy" size="mini" :title="`复制链接和密码`" circle :data-clipboard-text="`链接: ${scope.row.downUrl}  提取码: ${scope.row.share_password} [来自${$store.state.user.userInfo.nickname}的分享]`" class="copyBtn" @click="$global.copy()"></el-button>
                    </template>
                  </el-table-column>
                  <el-table-column label="下载次数" show-overflow-tooltip width="150">
                    <template slot-scope="scope">
                      {{ scope.row.use_frequency || 0 }}
                    </template>
                  </el-table-column>
                  <el-table-column label="次数上限" show-overflow-tooltip width="150">
                    <template slot-scope="scope">
                      <span v-if="scope.row.is_frequency">{{ scope.row.frequency }}</span>
                      <span v-if="!scope.row.is_frequency">无上限</span>
                      
                    </template>
                  </el-table-column>
                  <el-table-column show-overflow-tooltip label="修改时间" width="150">
                    
                    <template slot-scope="scope" v-if="scope.row.uptime">
                      
                      {{ $global.formatTime(scope.row.uptime, 'Y-m-d H:i') }}
                      
                    </template>
                  </el-table-column>

                  <el-table-column show-overflow-tooltip label="到期时间" width="150">
                    
                    <template slot-scope="scope">
                      <span v-if="scope.row.is_expire"> {{ $global.formatTime(scope.row.expire_time, 'Y-m-d H:i:s') }} </span>
                      <span v-if="!scope.row.is_expire"> 永久有效 </span>
 
                    </template>
                  </el-table-column>

                  <el-table-column show-overflow-tooltip label="状态" width="150">
                    
                    <template slot-scope="scope">
                      <span v-if="!scope.row.status" style="color: #F56C6C;"> 分享已被取消 </span>
                      <span v-if="scope.row.status" style="color: #409EFF;"> 正在分享 </span>
 
                    </template>
                  </el-table-column>
                  
                </el-table>
            </div>
          </vue-scroll>
      </el-tab-pane>

      <!-- <el-tab-pane name="3" :ptitle="'我的评论'">
          <span slot="label"><i class="el-icon-user"></i> 我的评论</span>
          <vue-scroll>
            <div class="tab tab3">
                <el-row :gutter="20">
                    <el-col :span="10">
                        我的评论
                    </el-col>
                    
                    <el-col :span="10">
                        
                    </el-col>
                </el-row>
            </div>
          </vue-scroll>
      </el-tab-pane> -->


      <el-tab-pane name="4" :ptitle="'我的下载'">
          <span slot="label"><i class="el-icon-user"></i> 我的下载</span>
          <vue-scroll>
            <div class="tab tab4">
              <div class="btn-box" style="text-align:left;">
                <el-button type="danger" round :disabled="mydown_selected.length == 0" @click="delMyDown" size="mini">删除</el-button>
              </div>
                <el-table 
                  ref="multipleTable"
                  :data="$store.state.data.mydown"
                  tooltip-effect="dark"
                  style="width: 100%"
                  stripe
                  size="small"
                  @selection-change="handleSelectionChangeDown">
                  <el-table-column type="selection" width="55"></el-table-column>
                  <el-table-column label="日期" width='150'>
                    <template slot-scope="scope" v-if="scope.row.regtime">{{ $global.formatTime(scope.row.regtime, 'Y-m-d') }}</template>
                  </el-table-column>
                  <el-table-column label="大小" show-overflow-tooltip width='150'>
                    <template slot-scope="scope" v-if="scope.row.file">{{ $global.easyFileSize(scope.row.file.size)  }}</template>
                  </el-table-column>
                  <el-table-column show-overflow-tooltip label="文件名" width='450'>
                    
                    <template slot-scope="scope" v-if="scope.row.file">
                      
                      {{ scope.row.file.name }}
                      
                    </template>
                  </el-table-column>
                  <el-table-column label="位置" show-overflow-tooltip width='200'>
                    
                    <template slot-scope="scope" v-if="scope.row.folder">

                      {{ scope.row.folder.path+scope.row.folder.name }}
                      
                    </template>
                    
                  </el-table-column>
                  <el-table-column label="描述" show-overflow-tooltip min-width='100'>
                    
                    <template slot-scope="scope" v-if="scope.row.file">

                      {{ scope.row.file.description_context }}
                      
                    </template>
 
                  </el-table-column>
                </el-table>
                
            </div>
          </vue-scroll>
      </el-tab-pane>


      <el-tab-pane name="5" :ptitle="'我的上传'">
          <span slot="label"><i class="el-icon-user"></i> 我的上传</span>
          <vue-scroll>
            <div class="tab tab5">
              <div class="btn-box" style="text-align:left;">
                <el-button type="danger" round :disabled="myup_selected.length == 0" @click="delMyUp" size="mini">删除</el-button>
              </div>
                <el-table 
                  ref="multipleTable"
                  :data="$store.state.data.myup"
                  tooltip-effect="dark"
                  style="width: 100%"
                  stripe
                  size="small"
                  @selection-change="handleSelectionChangeUp">
                  <el-table-column type="selection" width="55"></el-table-column>
                  <el-table-column label="日期" width='150'>
                    <template slot-scope="scope" v-if="scope.row.regtime">{{ $global.formatTime(scope.row.regtime, 'Y-m-d') }}</template>
                  </el-table-column>
                  <el-table-column label="大小" show-overflow-tooltip width='150'>
                    <template slot-scope="scope" v-if="scope.row.file">{{ $global.easyFileSize(scope.row.file.size)  }}</template>
                  </el-table-column>
                  <el-table-column show-overflow-tooltip label="文件名" width='450'>
                    
                    <template slot-scope="scope" v-if="scope.row.file">
                      
                      {{ scope.row.file.name }}
                      
                    </template>
                  </el-table-column>
                  <el-table-column label="位置" show-overflow-tooltip width='200'>
                    
                    <template slot-scope="scope" v-if="scope.row.folder">

                      {{ scope.row.folder.path+scope.row.folder.name }}
                      
                    </template>
                    
                  </el-table-column>
                  <el-table-column label="描述" show-overflow-tooltip min-width='100'>
                    
                    <template slot-scope="scope" v-if="scope.row.file">

                      {{ scope.row.file.description_context }}
                      
                    </template>
 
                  </el-table-column>
                </el-table>
                
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

    <!-- 编辑 -->
    <el-dialog :title="`编辑${alert_editTitle}`" :visible.sync="alert_edit" :width="`500px`">
        <el-form :model="editForm">
            <el-form-item label="名称" :label-width="'80px'">
                <el-input v-model="editForm.name" autocomplete="off" autofocus="true" type='text'></el-input>
            </el-form-item>
            <el-form-item label="描述" :label-width="'80px'">
                <el-input type="textarea" maxlength="140" show-word-limit v-model="editForm.context" rows="4"></el-input>
            </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="alert_edit = false">取 消</el-button>
            <el-button type="primary" @click="onSubmitEdit">确 定</el-button>
        </div>
    </el-dialog>

    <!-- 移动复制 -->
    <el-dialog :title="`${alert_copyMoveTitle}`" :visible.sync="alert_copyMove" :width="`500px`">
      <el-input
        placeholder="输入关键字进行过滤"
        v-model="folderTreeText">
      </el-input>
        <el-tree
          :data="$store.state.data.folderTree"
          show-checkbox
          check-strictly
          @check-change="changeFolderTreeSelect"
          node-key="id"
          ref="folderTree"
          highlight-current
          :filter-node-method="filterFolderTree"
          check-on-click-node
          :props="defaultProps">
        </el-tree>

        <div slot="footer" class="dialog-footer">
            <el-button @click="alert_copyMove = false">取 消</el-button>
            <el-button type="primary" @click="onSubmitCopyMove">确 定</el-button>
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
          <div class="el-upload__tip" slot="tip">允许上传{{ $store.state.data.file_allow.allow_ext }}文件，且不超过{{ ($store.state.data.file_allow.allow_size/1014/1024).toFixed(0) }}mb</div>
      </el-upload>
    </el-dialog>

    <transition name="el-zoom-in-top">
        <el-dialog title="分享" :visible.sync="alert_share" :width="`500px`" :class="'transition-box'">
            <el-form :model="shareForm">
                <el-form-item label="发布动态" :label-width="'80px'">
                    <el-col :span="6">
                        <el-switch v-model="shareForm.is_open"></el-switch>
                    </el-col>
                    <!-- <el-col class="line" :span="2">-</el-col> -->
                    <el-col :span="16" v-show="shareForm.is_open">
                        <el-form-item label="允许评论" :label-width="'80px'">
                            <el-switch v-model="shareForm.allow_comment"></el-switch>
                        </el-form-item>
                    </el-col>
                    
                </el-form-item>
                <el-form-item label="主题" :label-width="'80px'" v-show="shareForm.is_open">
                    <el-input v-model="shareForm.subject" autocomplete="off" autofocus="true" type='text' placeholder="填写主题"></el-input>
                </el-form-item>
                <el-form-item label="描述" :label-width="'80px'" v-show="shareForm.is_open">
                    <el-input type="textarea" maxlength="140" show-word-limit v-model="shareForm.content" rows="4" placeholder="填写描述"></el-input>
                </el-form-item>
                <el-form-item label="加密" :label-width="'80px'">
                    <el-switch v-model="shareForm.is_encrypt"></el-switch>
                </el-form-item>
                <el-form-item label="设置期限" :label-width="'80px'">
                    <el-col :span="6">
                        <el-switch v-model="shareForm.is_expire"></el-switch>
                    </el-col>
                    <!-- <el-col class="line" :span="2">-</el-col> -->
                    <el-col :span="16" v-show="shareForm.is_expire">
                        <el-radio v-model="shareForm.expire_type" label="1">1天</el-radio>
                        <el-radio v-model="shareForm.expire_type" label="2">7天</el-radio>
                        <el-radio v-model="shareForm.expire_type" label="3">1个月</el-radio>
                    </el-col>
                    
                </el-form-item>
                <el-form-item label="下载次数" :label-width="'80px'">
                    <el-col :span="6">
                        <el-switch v-model="shareForm.is_frequency"></el-switch>
                    </el-col>
                    <!-- <el-col class="line" :span="2">-</el-col> -->
                    <el-col :span="16" v-show="shareForm.is_frequency">
                        <el-input-number v-model="shareForm.frequency" @change="" :min="1" label="下载次数" :step="10"></el-input-number>
                    </el-col>
                </el-form-item>
                <el-form-item label="显示位置" :label-width="'80px'" v-show="shareForm.is_open">
                    <el-col :span="6">
                        <el-switch v-model="shareForm.show_location"></el-switch>
                    </el-col>
                    <!-- <el-col class="line" :span="2">-</el-col> -->
                    <el-col :span="16" v-show="shareForm.show_location">
                        <el-input v-model="shareForm.custom_location" autocomplete="off" autofocus="true" type='text' placeholder="自定义位置(可不填)"></el-input>
                    </el-col>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="alert_share = false">取 消</el-button>
                <el-button type="primary" @click="onSubmitShare">分 享</el-button>
            </div>
        </el-dialog>
    </transition>

    <el-dialog title="分享成功" :visible.sync="$store.state.share.share_success" :width="`500px`">
        <el-row :gutter="20">
            <el-col :span="16">
                <el-input v-model="$store.state.share.shareSuccess.share_link" readonly size="small">
                    <template slot="prepend"><i class="el-icon-link"></i> 链接</template>
                </el-input>
                
            </el-col>
            <el-col :span="8" :style="{'text-align': 'right'}">
                <el-button type="primary" icon="el-icon-document-copy" class="copyBtn" :data-clipboard-text="$store.state.share.shareSuccess.share_link" @click="$global.copy()" size="small">复制链接</el-button>
                
            </el-col>
        </el-row>
        <el-row :gutter="20" :style="{'margin-top': '20px'}">
            <el-col :span="16">
                <el-input v-model="$store.state.share.shareSuccess.share_password" readonly size="small">
                    <template slot="prepend"><i class="el-icon-lock"></i> 提取码</template>
                </el-input>
            </el-col>
                
            <el-col :span="8" :style="{'text-align': 'right'}">
                <el-button type="primary" icon="el-icon-document-copy" class="copyBtn" :data-clipboard-text="$store.state.share.shareSuccess.copy_link_pwd" @click="$global.copy()" size="small">复制链接和密码</el-button>
            </el-col>

        </el-row>
            
        <el-divider></el-divider>
        <p v-show="$store.state.share.shareSuccess.expire_day"><span>{{ $store.state.share.shareSuccess.expire_day }} ({{ $store.state.share.shareSuccess.expire_time }}到期)</span></p>
        <p v-show="$store.state.share.shareSuccess.frequency"><span>{{ $store.state.share.shareSuccess.frequency }}</span></p>

        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="$store.commit('share/set_share_success', false)">关 闭</el-button>
        </div>
    </el-dialog>
    
    <el-card class="box-card box-card-up" shadow="hover" v-show="up_box" :style="{ height: up_box_height }">
      <div slot="header" class="clearfix">
        <span>上传记录</span>
        <i style="float: right; padding: 3px 0;margin-left: 10px;cursor:pointer;" class="el-icon-close" @click="show_upbox(`关闭`)"></i> <el-button style="float: right; padding: 3px 0" type="text" @click="show_upbox(up_box)">{{ up_box }}</el-button> 
      </div>
      <vue-scroll>
      <div class="uplist-box">
        
        <div v-for="item, index in uplist" :key='index'>
           
          <p>
            <span class="num">{{ uplist.length-index }}.</span> 
            <span class="name ellipsis">{{ item.name }}</span> 
            <span class="progress">{{ item.progress }}%</span> 
            <span class="type">{{ item.type }}</span>
            <span class="icon">
              <el-tooltip class="item" effect="dark" :content="item.error" placement="top">
                <i :class="item.icon"></i>
              </el-tooltip>
            </span>
          </p>
           
        </div>
      </div>
      </vue-scroll>
    </el-card>
    

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
            folder_id: ''
        },
        selected_file: [],
        selected_folder: [],
        //file_items: this.$store.state.data.home_nav_items[this.$store.state.data.home_nav_path.active_item].list,
        tab1_checked: false,
        alert_upFolder: false,
        uplist: [],
        up_box: '',
        up_box_height: '',
        myup_selected: [],
        mydown_selected: [],
        myshare_selected: [],
        mycomment_selected: [],
        alert_edit: false,
        editForm: {
            name: '',
            context: '',
            id: '',
            type: ''
        },
        alert_editTitle: '',
        alert_copyMove: false,
        alert_copyMoveTitle: '',
        defaultProps: {
        children: 'child',
            label: 'name'
        },
        folderTreeText: '',    
        last_selected_file: {},
        alert_share: false,
        shareForm: {
            subject: '', //主题
            content: '', //内容
            is_open: false, //是否公开发布到动态
            is_encrypt: true, //是否加密
            is_expire: false, //是否有期限
            is_frequency: false, //是否有次数
            expire_type: '2', //到期时间类型 1: 1天, 2: 7天, 3: 1月, 其他就是默认的7天
            frequency: 1, //设定次数
            allow_comment: true, //是否允许评论
            show_location: false, //是否显示地理位置
            custom_location: '' //自定义地理位置
        },
        

    }
  },
  methods: {
    TabClick(e) {
      //console.log(e)
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
              this.$store.dispatch('data/getFolderMenu')
              this.alert_createFolder = false
          }else if(res.code == -100){
                    this.$notify({
                        title: '警告',
                        message: res.msg,
                        type: 'warnning',
                        duration: 1500
                    })
                    this.$router.push('/login')
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
    select_file(item, type) {
      let id = item.id
      this.alert_editTitle = type == 1 ? `文件` : `文件夹`

      if(type == 1){
        let ind = this.selected_folder.indexOf(id)
        if(ind > -1){
          this.selected_folder.splice(ind, 1)
          this.editForm = {
            name: ``,
            context: ``,
            id: ``,
            type: ``
          }
        }else{
          this.selected_folder.push(id)
          this.editForm = {
            name: item.name,
            context: item.remark_context,
            id: item.id,
            type: 1
          }
        }
      }
      else if(type == 2){
        let ind = this.selected_file.indexOf(id)
        if(ind > -1){
          this.selected_file.splice(ind, 1)
          this.editForm = {
            name: ``,
            context: ``,
            id: ``,
            type: ``
          }
          this.last_selected_file = {}
        }else{
          this.selected_file.push(id)
          this.editForm = {
            name: this.$global.getName_Ext(item.name).name,
            context: item.description_context,
            id: item.id,
            type: 2
          }
          this.last_selected_file = item
        }
      }
        if(this.selected_file.length + this.selected_folder.length == this.$store.state.data.home_nav_items[this.$store.state.data.home_nav_path.active_item].list.file.length + this.$store.state.data.home_nav_items[this.$store.state.data.home_nav_path.active_item].list.folder.length)
            this.tab1_checked = true
        else
            this.tab1_checked = false
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
      this.up_box = `最小化`
      let fileObject = param.file
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

      let file_name_ext = this.$global.getName_Ext(fileObject.name)

      if(this.$store.state.data.file_allow.allow_ext != '*')
      if(!this.$store.state.data.file_allow.allow_ext.split(',').includes(file_name_ext.ext)){
        this.$notify({
            title: '失败',
            message: `不在允许的文件类型内(上传文件类型为: ${this.$store.state.data.file_allow.allow_ext})`,
            type: 'error',
            duration: 2500
        })
        return
      }
      let status = {
        name: fileObject.name,
        size: fileObject.size,
        type: '正在校验',
        progress: 0,
        error: `noerror`,
        icon: `el-icon-warning info`
      }
      this.uplist.unshift(status)
      

      let self = this

      this.$global.getFileMd5_2(fileObject, self, status, md5 => {
        console.log(md5)
        self.uplist[self.uplist.indexOf(status)].type = `正在上传`
        //console.log(this.uplist)
        //return
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
                  self.uplist[self.uplist.indexOf(status)].type = `秒传`
                  self.uplist[self.uplist.indexOf(status)].icon = `el-icon-success success`
                  //this.$store.dispatch('data/setHomeNav', this.$store.state.data.home_nav_path.active_item)
                  let extend = res.data.extend
                  this.$store.commit('data/setHomeNavItemsList', {a: this.$store.state.data.home_nav_path.active_item, b: {th: extend.th, list: {folder: extend.list.folder, file: extend.list.file}}})
                  //this.$store.commit('user/setUseSize', fileObject.size)
                  this.$store.commit('data/setMyUp', extend.my_up)
                  //console.log(this.$store.state.user.userInfo.use_size)
                  //this.$store.commit('user/setAvatar', res.data.net_path)
              }else if(res.code == -100){
                    this.$notify({
                        title: '警告',
                        message: res.msg,
                        type: 'warnning',
                        duration: 1500
                    })
                    this.$router.push('/login')
                }
              else if(res.code == 0){
                self.uplist[self.uplist.indexOf(status)].type = `上传失败`
                self.uplist[self.uplist.indexOf(status)].error = res.msg
                self.uplist[self.uplist.indexOf(status)].progress = 0
                self.uplist[self.uplist.indexOf(status)].icon = `el-icon-error error`
                  this.$notify.error({
                      title: '错误',
                      message: res.msg,
                      duration: 2000
                  })
              }
              else if(res.code == -1){
                //self.uplist[self.uplist.indexOf(status)].progress = 0
                self.uplist[self.uplist.indexOf(status)].type = `正在上传`
                //let load = this.$loading({ fullscreen: true })
                formData.append('type', 2)
                formData.append('size', fileObject.size)
                formData.append('folder_id', this.$store.state.data.home_nav_path.active_item)
                formData.append('name', fileObject.name)
                //this.$apis.fileApi.upFile(formData)
                this.$axios.post('/api/file/up_file', formData, {
                  onUploadProgress: progressEvent => {
                      let complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
                      console.log(self.uplist)
                      let ind = self.uplist.indexOf(status)
                      self.uplist[ind].progress = complete
                      if(complete == 100)
                        self.uplist[ind].error = `上传成功`
                      
                      //console.log(complete)
                    }
              }).then(res => {
                    //load.close()
                    res = res.data
                    self.uplist[self.uplist.indexOf(status)].error = res.msg
                    if(res.code == 1){
                        this.$notify({
                            title: '成功',
                            message: res.msg,
                            type: 'success',
                            duration: 1500
                        })
                        self.uplist[self.uplist.indexOf(status)].type = `上传成功`
                        self.uplist[self.uplist.indexOf(status)].icon = `el-icon-success success`
                        //this.$store.dispatch('data/setHomeNav', this.$store.state.data.home_nav_path.active_item)
                        let extend = res.data.extend
                        this.$store.commit('data/setHomeNavItemsList', {a: this.$store.state.data.home_nav_path.active_item, b: {th: extend.th, list: {folder: extend.list.folder, file: extend.list.file}}})
                        this.$store.commit('user/setUseSize', fileObject.size)
                        this.$store.commit('data/setMyUp', extend.my_up)
                        //console.log(this.$store.state.user.userInfo.use_size)
                        //this.$store.commit('user/setAvatar', res.data.url)
                    }else if(res.code == -100){
                        this.$notify({
                            title: '警告',
                            message: res.msg,
                            type: 'warnning',
                            duration: 1500
                        })
                        this.$router.push('/login')
                    }else{
                      self.uplist[self.uplist.indexOf(status)].type = `上传失败`
                      self.uplist[self.uplist.indexOf(status)].progress = 0
                      self.uplist[self.uplist.indexOf(status)].icon = `el-icon-error error`
                        this.$notify.error({
                            title: '错误',
                            message: res.msg,
                            duration: 2000
                        })

                    }
                })
                .catch(err => {
                  self.uplist[self.uplist.indexOf(status)].type = `请求出错`
                  self.uplist[self.uplist.indexOf(status)].error = `请求出错`
                  //self.uplist[self.uplist.indexOf(status)].progress = 0
                  self.uplist[self.uplist.indexOf(status)].icon = `el-icon-info info`
                    //load.close()
                    this.$notify.error({
                        title: '错误',
                        message: `请求出错`,
                        duration: 2000
                    })
                    this.$store.dispatch('data/setHomeNav', this.$store.state.data.home_nav_path.active_item)
                    this.$store.commit('user/setUseSize', fileObject.size)
                    console.log(err)
                })
              }
          })
      })
    },
    show_upbox(text) {
      if(text == `最小化`){
        this.up_box = `最大化`
        this.up_box_height = `50px`
      }
        
      else if(text == `最大化`){
        this.up_box = `最小化`
        this.up_box_height = `auto`
      }
      else if(text == `关闭`)
        this.up_box = ``
        
    },
    enter_folder(folder) {
      //console.log(folder)
      //console.log(`进入${folder.name}文件夹`)
      //先判断store中有没有该文件夹信息，若有就直接获取
      //清空选择
      this.selected_file = []
      this.selected_folder = []
      this.tab1_checked = false
      this.$store.dispatch('data/enterFolder', folder)
    },
    fileShare() {
        console.log(`分享`)
        //分享是分享，分享文件夾也不能下載文件夾，智能點開文件夾一個個文件下載，文件夾的下載後續再開放
        if(this.selected_file.length + this.selected_folder.length == 0){
            this.$message({
                message: '请选择一项进行操作',
                type: 'warning'
            })
            return
        }
        this.alert_share = true
    },
    fileEdit() {
      console.log(`编辑`)
      //console.log(this.selected_file.length + this.selected_folder.length)
      if(this.selected_file.length + this.selected_folder.length != 1){
        this.$message({
          message: '请选择一项进行编辑',
          type: 'warning'
        })
        return
      }
      // type[1:编辑文件夹，2:编辑文件]
      this.alert_edit = true
    },
    fileDown() {
      //目前只能单个下载
      console.log(`下载`)
      if(this.selected_file.length != 1){
        this.$message({
          message: '请选择一项进行下载',
          type: 'warning'
        })
        return
      }
      this.$store.dispatch('data/download', {id: this.selected_file[0]})
      this.selected_file = []

    },
    fileCopy() {
      console.log(`复制`)
      this.alert_copyMoveTitle = `复制`
      this.alert_copyMove = true

    },
    fileMove() {
      console.log(`移动`)
      this.alert_copyMoveTitle = `移动`
      this.alert_copyMove = true

    },
    filterFolderTree(value, data) {
      if (!value)
        return true
      return data.name.indexOf(value) !== -1
    },
    // 该结点对象，该结点是否被选中，该结点是否有子节点被选中
    changeFolderTreeSelect(a, b, c) {
      if(b){
        this.$refs.folderTree.setCheckedKeys([a.id]);
      }
    },
    fileDel() {
      console.log(`删除`)
      if(this.selected_file.length + this.selected_folder.length == 0){
        this.$message({
          message: '请至少选择一项操作',
          type: 'warning'
        })
        return
      }
      let data = {
        folder: this.selected_folder,
        file: this.selected_file,
        folder_id: this.$store.state.data.home_nav_path.active_item
      }
      this.$confirm('此操作将删除该您选中的文件/文件夹, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$store.dispatch('data/del', data)
            this.selected_file = []
            this.selected_folder = []
            this.tab1_checked = false
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });          
          })

    },
    onSubmitEdit() {
      console.log(`提交编辑`)
      //console.log(this.editForm)
      this.alert_edit = false
      //this.selected_file = []
      //this.selected_folder = []
      this.$store.dispatch('data/edit', this.editForm)
    },
    onSubmitCopyMove() {
      console.log(`提交${this.alert_copyMoveTitle}`)
      let node = this.$refs.folderTree.getCheckedNodes()
      let key = this.$refs.folderTree.getCheckedKeys()
      //console.log(node)
      //console.log(key)
      //提交判断 不能移动和复制到当前目录中，同时后台判断目标文件夹中是否存在同名的文件/文件夹，可以存在同名的文件和文件夹，但不能存在同名的文件和同名的文件夹
      //查看选中文件夹是否在此文件夹中
      //第一个循环判断key中是否存在this.selected_folder
      //this.selected_folder.splice(0, -1, this.$store.state.data.home_nav_path.active_item)
      let pid_path = (node[0].pid_path+node[0].id).split('/')
      pid_path = pid_path.map(item => {
        return +item
      })
      //console.log(pid_path)
      //console.log(this.selected_folder)

      if(key[0] == this.$store.state.data.home_nav_path.active_item){
        this.$message({
            message: `不能${this.alert_copyMoveTitle}到当前目录以及自身与自身的子目录`,
            type: 'error'
        })
        return
      }
      for(let item of pid_path){
        if(this.selected_folder.includes(item)){
          this.$message({
            message: `不能${this.alert_copyMoveTitle}到当前目录以及自身与自身的子目录`,
            type: 'error'
          })
          return
        }
      }
      //提交更改
      //this.selected_folder.splice(0, 1)
      let data = {
        folder: this.selected_folder,
        file: this.selected_file,
        folder_id: this.$store.state.data.home_nav_path.active_item,
        to_node: node[0],
        to_key: key[0]
      }
      console.log(data)
      if(this.alert_copyMoveTitle == `复制`)
        this.$store.dispatch('data/copy', data)
      else if(this.alert_copyMoveTitle == `移动`)
        this.$store.dispatch('data/move', data)
      this.alert_copyMove = false
      
    },
    // 提交分享
    onSubmitShare() {
        console.log(this.shareForm)
        this.alert_share = false
        let data = {
            folder: this.selected_folder,
            file: this.selected_file,
            share: this.shareForm
        }
        this.$store.dispatch('share/share', data)
    },

    /* 我的上传 */
    handleSelectionChangeUp(val) {
      this.myup_selected = val
      console.log(this.myup_selected)
    },
    delMyUp() {
      if(this.myup_selected.length == 0)
        this.$message({
          message: '请至少选择一项再操作',
          type: 'warning'
        })
      else
        this.$confirm('此操作将删除该您的上传记录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$store.dispatch('data/delMyUp', this.myup_selected)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });          
          }) 
    },
    /* 我的下载 */
    handleSelectionChangeDown(val) {
      this.mydown_selected = val
      console.log(this.mydown_selected)
    },
    delMyDown() {
      if(this.mydown_selected.length == 0)
        this.$message({
          message: '请至少选择一项再操作',
          type: 'warning'
        })
      else
        this.$confirm('此操作将删除该您的下载记录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$store.dispatch('data/delMyDown', this.mydown_selected)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });          
          }) 
    },
    /* 我的分享 */
    handleSelectionChangeShare(val) {
      this.myshare_selected = val
      console.log(this.myshare_selected)
    },
    delMyShare() {
      if(this.myshare_selected.length == 0)
        this.$message({
          message: '请至少选择一项再操作',
          type: 'warning'
        })
      else
        this.$confirm('此操作将删除该您的分享(删除并取消分享), 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$store.dispatch('share/delMyShare', this.myshare_selected)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });          
          }) 
    },
    hideMyShare() {
      if(this.myshare_selected.length == 0)
        this.$message({
          message: '请至少选择一项再操作',
          type: 'warning'
        })
      else
        this.$confirm('此操作将取消该分享(取消分享), 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$store.dispatch('share/hideMyShare', this.myshare_selected)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作'
            });          
          }) 
    },
    showMyShare() {
      if(this.myshare_selected.length == 0)
        this.$message({
          message: '请至少选择一项再操作',
          type: 'warning'
        })
      else
        this.$confirm('此操作将恢复该的分享(已删除的分享不可恢复), 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$store.dispatch('share/showMyShare', this.myshare_selected)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消操作'
            });          
          }) 
    },
    getIcon(ext){
      let x = this.$global.getIcon(ext)
      console.log(x)
      return require('../assets/icons/files/file.png')
    },
    test() {
      this.$notify({
          title: '上传提示',
          dangerouslyUseHTMLString: true,
          message: `<div>'' 正在校验</div>`,
          duration: 0
        });
    },
    test1() {
      //this.uplist[0].close()
      this.uplist = [1, 2, 3]
    },

  },
  computed: {
    
  },
  created() {
    this.$store.commit('page/setTitle', this.$global.name + ' - 首页')
    //console.log(this.$store.state.user.userInfo.use_size/this.$store.state.user.userInfo.total_size*100)
    //console.log((this.$store.state.user.userInfo.use_size/this.$store.state.user.userInfo.total_size*100).toFixed(2))
    // 获取文件
    
  },
  watch: {
    folderTreeText(val) {
      this.$refs.folderTree.filter(val)
    }
  },
}
</script>

<style lang="scss">
.home{
  .box-card-up{
    text-align: left;
    position: fixed;
    background: #fff;
    z-index: 100;
    bottom: 10px;
    right: 10px;
    width: 480px;
    transition: .5s;
    max-height: 400px;
    .uplist-box{
      max-height: 300px;
      font-size: 14px;
      color: #606266;
      p{
        width: 100%;
        white-space: nowrap;
        margin-top: 5px;
        overflow: hidden;
      }
      span{
        display: inline-block;
        vertical-align: middle;
      }
      .num{
        width: 20px;
        text-align: right;
        margin-right: 10px;
      }
      .name{
        width: 260px;
      }
      .progress{
        width: 50px;
        text-align: center;
      }
      .type{
        width: 60px;
      }
      .icon{
        width: 30px;
        text-align: center;
        i{
          cursor: pointer;
        }
        .success{
          color: #67C23A;
        }
        .error{
          color: #F56C6C;
        }
        .info{
          color: #409EFF;
        }

      }
    }
    .__view{
      max-height: 300px;
    }
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
    min-height: 115px;
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
      cursor: pointer;
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

