'use strict'

/**
 * Electron entry file(for Electron's main process)
 */
import _ from 'lodash'
import { app, powerSaveBlocker } from 'electron'
import ElectronManager from '@/lib/ElectronManager'

const id = powerSaveBlocker.start('prevent-display-sleep')
console.log(powerSaveBlocker.isStarted(id))
const cmdLineOptions = [
  '-disable-web-security',
  '--disable-pinch',
  '--disable-renderer-backgrounding',
  '--disable-background-timer-throttling',
  '--override-plugin-power-saver-for-testing=never',
  '--force_high_performance_gpu',
  '--ignore-connection-limit=dev.orchestration.mgto.ps-dev.cn,futuredns.com',
  '--disable-extensions-http-throttling',
  '--enable-accelerated-mjpeg-decode',
  '--enable-accelerated-video',
  '--ignore-gpu-blacklist',
  '--enable-native-gpu-memory-buffers',
  '--enable-gpu-rasterization',
  ['--disable-features', 'OutOfBlinkCors'],
  ['--high-dpi-support', 1],
  ['--force-device-scale-factor', 1],
  ['--js-flags', '--max-old-space-size=4096', '--use-largepages=mode=on']
]
_.forEach(cmdLineOptions, (option) => {
  if (_.isArray(option)) {
    app.commandLine.appendSwitch(...option)
  } else {
    app.commandLine.appendSwitch(option)
  }
})

ElectronManager.init()
