<template>
  <div class="container mt-5">
    <h4>{{ appPath }}</h4>

    <div class="form-group mt-4 mb-2">
      <input
        v-model="searchString"
        class="form-control form-control-sm"
        placeholder="File search"
      />
    </div>
  </div>
</template>

<script>
import fs from 'fs-extra'
import path from 'path'

import { app } from '@electron/remote'
import { ref, computed } from 'vue'

export default {
  name: 'App',
  setup () {
    const appPath = ref(app.getAppPath()) // Returns String - The current application directory
    const searchString = ref('')

    const files = computed(() => {
      const arrayFileNames = fs.readdirSync(appPath.value) // Return an array of file names for all the files and directories in a given path
      const result = arrayFileNames.map((file) => {
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
    const filteredFiles = computed(() => {
      const result = files.value.filter((file) => {
        return searchString.value ? file.name.startsWith(searchString.value) : files.value
      })

      return result
    })

    function formatBytes (bytes, decimals = 2) {
      if (bytes === 0) return '0 Bytes'

      const k = 1024
      const dm = decimals < 0 ? 0 : decimals
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

      const i = Math.floor(Math.log(bytes) / Math.log(k))

      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
    }
    function open (folder) {
      // The path.join() method joins all given path segments together using the platform-specific separator as a delimiter,
      // then normalizes the resulting path.
      appPath.value = path.join(appPath.value, folder)
    }
    function back () {
      appPath.value = path.dirname(appPath.value)
    }

    return {
      appPath,
      files,
      filteredFiles,
      searchString,

      open,
      back,
      formatBytes
    }
  }
}
</script>
