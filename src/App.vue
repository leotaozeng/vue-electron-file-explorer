<template>
  <div class="container">
    <!-- <h4>{{ path }}</h4> -->

    <div class="form-group mt-4 mb-2">
      <input class="form-control form-control-sm" v-model="searchString" placeholder="File search" />
    </div>
  </div>
</template>

<script>
import fs from 'fs-extra'
import path from 'path'

import { app } from '@electron/remote'
import { ref, computed } from 'vue'
console.info(app.getAppPath())
export default {
  name: 'App',
  setup () {
    const appPath = ref(app.getAppPath())
    const files = computed(() => {
      // Return an array of file names for all the files and directories in a given path
      const fileNames = fs.readdirSync(appPath.value)
      const result = fileNames.map((file) => {
        const stats = fs.statSync(path.join(appPath.value, file))

        return {
          name: file,
          size: stats.isFile() ? stats.size ?? 0 : null,
          directory: stats.isDirectory()
        }
      })

      return result
    })
    console.info('Files:', files.value)
    const searchString = ref('')

    function open (folder) {
      // The path.join() method joins all given path segments together using the platform-specific separator as a delimiter, 
      // then normalizes the resulting path.
      appPath.value = path.join(appPath.value, folder)
    }
    function back () {
      appPath.value = path.dirname(appPath.value)
    }

    return {
      files,
      searchString,

      open,
      back
    }
  }
}
</script>
