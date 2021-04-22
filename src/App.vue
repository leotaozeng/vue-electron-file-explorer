<template>
  <div class="container mt-5">
    <h4>Current Path: {{ appPath }}</h4>

    <div class="form-group mt-4 mb-2">
      <input
        v-model="searchString"
        class="form-control form-control-sm"
        placeholder="File search"
      />
    </div>

    <BaseFilesViewer :files="filteredFiles" />
  </div>
</template>

<script>
import fs from 'fs'
import path from 'path'

import { app } from '@electron/remote'
import { v4 as uuidv4 } from 'uuid'
import { info, error } from 'consola'
import { ref, computed } from 'vue'

import BaseFilesViewer from '@c/BaseFilesViewer'

export default {
  name: 'App',
  components: {BaseFilesViewer},
  setup () {
    // Returns String - The current application directory
    const appPath = ref(app.getAppPath())
    const searchString = ref('')

    const files = computed(() => {
      let results = null

      try {
        // Return an array of file names for all the files and directories in a given path
        const filenames = fs.readdirSync(appPath.value)
        results = filenames
          .map(fielname => {
            const stats = fs.statSync(path.join(appPath.value, fielname))
            return {
              id: uuidv4(),
              name: fielname,
              size: stats.isFile() ? formatBytes(stats.size ?? 0) : null,
              extension: path.extname(fielname),
              directory: stats.isDirectory()
            }
          })
          .sort((a, b) => {
            if (a.directory === b.directory) {
              // A negative number if referenceStr occurs before compareString; 
              // positive if the referenceStr occurs after compareString; 
              // 0 if they are equivalent.
              return a.name.localeCompare(b.name)
            } else {
              // Display directories first then files
              if (a.directory) {
                return -1
              }

              if (!a.directory) {
                return a.name.localeCompare(b.name)
              }
            }
          })
      } catch (e) {
        error(e)
        return false
      }

      return results
    })
    const filteredFiles = computed(() => {
      const results = files.value.filter(file => {
        return searchString.value
          ? file.name.startsWith(searchString.value)
          : files.value
      })

      return results
    })
    info(files.value)
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
      files,
      filteredFiles,
      searchString,
      appPath,

      open,
      back,
      formatBytes
    }
  }
}
</script>
