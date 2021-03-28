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
import path from 'path'

import { app } from '@electron/remote'
import { ref, computed } from 'vue'

export default {
  name: 'App',
  setup() {
    const { value: appPath } = ref(app.getAppPath())
    const files = computed(() => {
      // Return an array of file names
      const fileNames = fs.readdirSync(path.value)

      return fileNames.map((file) => {
        const stats = fs.statSync(path.join(appPath, file))

        return {
          name: file,
          size: stats.isFile() ? stats.size ?? 0 : null,
          directory: stats.isDirectory()
        }
      })
    })

    console.info('Test leo --- show files', files.value)

    return {}
  }
}
</script>
