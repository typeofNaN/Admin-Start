<template>
  <div id="message_layer">
    <el-tabs
      v-model="activeTabName"
      type="border-card"
      @tab-click="changeTab"
    >
      <el-tab-pane
        label="消息弹窗"
        name="tab1"
      >
        <message></message>
      </el-tab-pane>
      <el-tab-pane
        label="消息弹框"
        name="tab2"
      >
        <message-box></message-box>
      </el-tab-pane>
      <el-tab-pane
        label="通知"
        name="tab3"
      >
        <notification></notification>
      </el-tab-pane>
      <el-tab-pane
        label="文字提示"
        name="tab4"
      >
        <tooltip></tooltip>
      </el-tab-pane>
      <el-tab-pane
        label="弹出框"
        name="tab5"
      >
        <popover></popover>
      </el-tab-pane>
      <el-tab-pane
        label="气泡确认框"
        name="tab6"
      >
        <popconfirm></popconfirm>
      </el-tab-pane>
      <el-tab-pane
        label="提示信息"
        name="tab7"
      >
        <tips tip-type="success">
          <h4 slot="title">成功提示信息标题</h4>
          <p>提示信息内容</p>
        </tips>
        <tips tip-type="danger">
          <h4 slot="title">危险提示信息标题</h4>
          <p>提示信息内容</p>
        </tips>
        <tips tip-type="warning">
          <h4 slot="title">警告提示信息标题</h4>
          <p>提示信息内容</p>
        </tips>
        <tips>
          <h4 slot="title">提示信息标题</h4>
          <p>提示信息内容</p>
        </tips>
      </el-tab-pane>
      <el-tab-pane
        label="遮罩层"
        name=tab8
      >
        <el-button @click="openZzc">弹出遮罩层</el-button>
        <div
          v-if="loading"
          class="zzc"
        >
          <i class="el-icon-loading"></i>
        </div>
      </el-tab-pane>
      <el-tab-pane
        label="步骤条"
        name="tab9"
      >
        <step></step>
      </el-tab-pane>
      <el-tab-pane
        label="dialog弹窗"
        name="tab10"
      >
        <d-dialog></d-dialog>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Message from '@/components/messages/message'
import MessageBox from '@/components/messages/messageBox'
import Notification from '@/components/messages/notification'
import Tooltip from '@/components/messages/tooltip'
import Popover from '@/components/messages/popover'
import Popconfirm from '@/components/messages/popconfirm'
import Tips from '@/components/public/tips'
import Step from '@/components/public/step'
import DDialog from '@/components/messages/dialog'

export default {
  name: 'message_layer',
  data () {
    return {
      activeTabName: 'tab1',
      loading: false
    }
  },
  components: {
    Message,
    MessageBox,
    Notification,
    Tooltip,
    Popover,
    Popconfirm,
    Tips,
    Step,
    DDialog
  },
  methods: {
    changeTab (tab, event) {
      console.log(tab, event)
    },

    openZzc () {
      this.loading = true

      setTimeout(() => {
        this.loading = false
      }, 3000)
    }
  }
}
</script>

<style lang="scss">
#message_layer {
  .el-tabs__header {
    background-color: #f2f4f5;

    .el-tabs__item {
      margin-right: 4px;
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
      border: none;
      height: 40px;
      font-size: 13px;
      background-color: #e8edf0;
      color: #95a5a6;

      &:hover {
        color: #7b8a8b;
        background-color: #dee2e4;
      }

      &.is-active {
        background-color: #fff;
        color: #7b8a8b;

        &:hover {
          color: #7b8a8b;
          background-color: #fff;
        }
      }
    }
  }

  .zzc {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, .6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 5000;

    i {
      font-size: 40px;
      color: #409eff;
    }
  }
}
</style>
