<template>
  <div>
    <template v-if="items && items.length">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="form-list-panel"
      >
        <upload
          :label="'图片' + (index + 1)"
          :index="index"
          :item="item"
        ></upload>
        <template v-if="item.click">
          <el-form-item
            class="small"
            label="跳转到："
          >
            <span style="word-break: break-all;">{{ item.click.href }}</span>
          </el-form-item>
        </template>
        <el-form-item
          class="small"
          label="点击配置："
        >
          <el-button
            icon="el-icon-edit"
            round
            @click="showClick(item, index)"
          >配置跳转</el-button>
        </el-form-item>
        <div class="list-item-opt">
          <a
            v-if="index !== 0"
            href="javascript:;"
            @click="upItem(index)"
          >
            <i class="el-icon-arrow-up"></i>
          </a>
          <a
            v-if="index !== items.length - 1"
            href="javascript:;"
            @click="downItem(index)"
          >
            <i class="el-icon-arrow-down"></i>
          </a>
          <a
            v-if="index > 0"
            href="javascript:;"
            @click="delItem(index)"
          >
            <i class="el-icon-delete"></i>
          </a>
        </div>
      </div>
    </template>
    <el-button
      icon="el-icon-plus"
      style="margin-top:15px;"
      round
      @click="addItem"
    >添加点击项</el-button>
  </div>
</template>

<script>
// https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1812758380,2896734985&fm=26&gp=0.jpg
import util from '@/utils/tools.js'
import compConfig from '@/config/comp.config.js'
import upload from '@/components/h5Setting/upload.vue'

export default {
  data () {
    return {
      defaultConf: util.copyObj(compConfig['coupon']),
      items: this.coupons
    }
  },
  components: {
    upload
  },
  props: {
    coupons: {
      type: Array,
      default: null
    }
  },
  watch: {
    coupons: {
      handler (val) {
        this.items = val
      },
      deep: true
    }
  },
  methods: {
    showClick (banner, idx) {
      this.$evt.$emit('click:show', idx, ['outside'])
    },
    upItem (idx) {
      const tmp = util.copyObj(this.items[idx])
      this.items.splice(idx, 1)
      this.items.splice(idx - 1, 0, tmp)
    },
    downItem (idx) {
      const tmp = util.copyObj(this.items[idx])
      this.items.splice(idx, 1)
      this.items.splice(idx + 1, 0, tmp)
    },
    delItem (idx) {
      this.items.splice(idx, 1)
    },
    addItem () {
      if (this.items.length < 10) {
        this.items.push(util.copyObj(this.defaultConf.action.config[0]))
      } else {
        this.$alert('最多添加10个点击项！')
      }
    }
  }
}
</script>
