<template>
  <div
    :class="['comp-content', component.active ? 'active' : '']"
    :style="getStyle"
  >
    <div class="image-box">
      <img
        v-if="imgUrl"
        :src="imgUrl"
      >
      <div
        v-else
        class="image-placeholder"
      >
        <i class="el-icon-picture-outline"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseImage',
  props: {
    component: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      imgUrl: this.component.style[1].val
    }
  },
  computed: {
    getStyle () {
      const ret = []
      this.component.style.forEach((item) => {
        const unit = item.unit || ''
        item.val && ret.push(item.attr + ':' + item.val + unit)
      })
      return ret.join(';')
    }
  },
  watch: {
    component: {
      handler () {
        this.imgUrl = this.component.style[1].val
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
.image-box {
  overflow: hidden;

  .image-placeholder {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100px;
    text-align: center;

    > i {
      font-size: 40px;
    }
  }

  img {
    display: block;
    margin: 0;
    width: 100%;
    height: auto;
    border: 0;
    -webkit-user-drag: none;
  }
}
</style>
