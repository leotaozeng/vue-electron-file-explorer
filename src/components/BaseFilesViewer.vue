<template>
  <div class="files-viewer mt-3">
    <table class="table align-middle">
      <tbody>
        <tr class="header-row cursor-pointer" @click="goToParentDir">
          <td class="icon-wrapper">
            <BaseIconDirOpen />
          </td>
          <td>...</td>
        </tr>

        <tr
          v-for="file in files"
          :key="file.id"
          class="file-row"
          :class="{ 'cursor-pointer': file.isDirectory, 'pointer-events-none': !file.isDirectory }"
          @click="onFileClick(file)"
        >
          <td class="icon-wrapper">
            <BaseIconDir v-if="file.isDirectory" />
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
    function onFileClick (file) {
      if (file.isDirectory) {
        context.emit('folder-click', file.name)
      }
    }

    function goToParentDir () {
      context.emit('back')
    }

    return { onFileClick, goToParentDir }
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
}
</style>
