<template>
  <div id="rich_editor">
    <quill-editor
      v-model="content"
      :options="quillOption"
    ></quill-editor>
    {{content}}
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import quillConfig from '@/config/quillConfig'

export default {
  name: 'editor',
  data () {
    return {
      content: '',
      quillOption: quillConfig
    }
  },
  components: {
    quillEditor
  }
}
</script>

<style lang="scss">
#rich_editor {
  .ql-container {
    min-height: 500px;
  }
}
</style>
