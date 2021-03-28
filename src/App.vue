<template>
  <div class="container">
    <!-- <h4>{{ path }}</h4> -->

    <div class="form-group mt-4 mb-2">
      <input class="form-control form-control-sm" placeholder="File search" />
    </div>
  </div>
</template>

<script>
import fs from 'fs'

import { app } from '@electron/remote'
import { ref, computed } from 'vue'

export default {
  name: 'App',
  setup() {
    const path = ref(app.getAppPath())
    const files = computed(() => {
      return fs.readdirSync(path.value)
    })

    console.info('Test leo --- show files', files.value)

    return {}
  }
}
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
