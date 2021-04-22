<template>
  <div class="files-viewer mt-3">
    <table class="table align-middle">
      <tbody>
        <tr class="header-row">
          <td class="icon-wrapper">
            <BaseIconDirOpen />
          </td>
          <td>...</td>
        </tr>

        <tr
          v-for="file in files"
          :key="file.id"
          class="file-row"
          :class="{ clickable: file.directory }"
        >
          <td class="icon-wrapper">
            <BaseIconDir v-if="file.directory" />
            <BaseIconFile v-else />
          </td>

          <td class="file-name">
            <span>{{ file.name }}</span>
          </td>

          <td class="file-size">
            <span class="float-right">{{ file.size }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import consola from 'consola'

import BaseIconDir from './BaseIconDir'
import BaseIconDirOpen from './BaseIconDirOpen'
import BaseIconFile from './BaseIconFile'

export default {
  name: 'BaseFilesViewer',
  components: { BaseIconDir, BaseIconDirOpen, BaseIconFile },
  props: {
    files: {
      type: Array,
      default () {
        return []
      }
    }
  },
  setup (props, context) {
    function handleClickOnFile (file) {
      consola.info('Click on file')
      if (file.directory) {
        context.emit('folder-click', file)
      }
    }

    return {
      handleClickOnFile
    }
  }
}
</script>

<style lang="scss" scoped>
.files-viewer {
  .header-row {
    .icon-wrapper {
      width: 2.4rem;
    }
  }

  .file-row {
    &.clickable {
      cursor: pointer;
    }
  }
}
</style>
