<template>
  <div>
    <template v-if="inputs && inputs.length">
      <div
        v-for="(input, index) in inputs"
        :key="index"
        class="form-list-panel"
      >
        <el-form-item
          class="small"
          label="字段描述："
        >
          <el-input
            v-model="input.desc"
            :maxlength="8"
            placeholder="label名称"
          ></el-input>
        </el-form-item>
        <el-form-item
          class="small"
          label="字段名称："
        >
          <el-input
            v-model="input.name"
            :maxlength="128"
            placeholder="接口对应的参数名"
          ></el-input>
        </el-form-item>
        <el-form-item
          class="small"
          label="表单类型："
        >
          <el-select
            v-model="input.type"
            placeholder="默认选项"
          >
            <el-option
              v-for="opt in inputTypes"
              :key="opt.val"
              :label="opt.name"
              :value="opt.val"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          class="small"
          label="是否必填："
        >
          <el-radio
            v-model="input.isNecessary"
            :label="1"
          >是</el-radio>
          <el-radio
            v-model="input.isNecessary"
            :label="0"
          >否</el-radio>
        </el-form-item>
        <el-form-item
          class="small"
          label="为空提示："
        >
          <el-input
            v-model="input.placeholder"
            :maxlength="128"
            placeholder="为空提示文案"
          ></el-input>
        </el-form-item>
        <div class="list-item-opt">
          <a
            v-if="index !== 0"
            href="javascript:;"
            @click="upInput(index)"
          >
            <i class="el-icon-arrow-up"></i>
          </a>
          <a
            v-if="index !== inputs.length - 1"
            href="javascript:;"
            @click="downInput(index)"
          >
            <i class="el-icon-arrow-down"></i>
          </a>
          <a
            v-if="index > 0"
            href="javascript:;"
            @click="delInput(index)"
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
      @click="addInput"
    >添加表单项</el-button>
  </div>
</template>

<script>
import util from '@/utils/tools.js'
import compConfig from '@/config/comp.config.js'

export default {
  data () {
    return {
      inputs: this.forms,
      defaultConf: util.copyObj(compConfig['form']),
      inputTypes: [
        {
          name: '文本',
          val: 'text'
        }, {
          name: '数字',
          val: 'number'
        }, {
          name: '日期选择',
          val: 'date'
        }, {
          name: '下拉选择',
          val: 'select'
        }, {
          name: 'radio单选',
          val: 'radio'
        }, {
          name: 'checkbox多选',
          val: 'checkbox'
        }
      ]
    }
  },
  props: {
    forms: {
      type: Array,
      default: null
    }
  },
  methods: {
    upInput (idx) {
      const tmp = util.copyObj(this.inputs[idx])
      this.inputs.splice(idx, 1)
      this.inputs.splice(idx - 1, 0, tmp)
    },
    downInput (idx) {
      const tmp = util.copyObj(this.inputs[idx])
      this.inputs.splice(idx, 1)
      this.inputs.splice(idx + 1, 0, tmp)
    },
    delInput (idx) {
      this.inputs.splice(idx, 1)
    },
    addInput () {
      if (this.inputs.length < 10) {
        this.inputs.push(util.copyObj(this.defaultConf.action.config[0]))
      } else {
        this.$alert('最多添加10个表单项！')
      }
    }
  }
}
</script>
