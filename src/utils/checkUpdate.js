/**
 * 检测是否需要更新版本
 */

'use strict'

const axios = require('axios')
const chalk = require("chalk")

// 获取项目根目录

const NPM_REGISTRY = 'https://registry.npm.taobao.org/wlw-cli'


async function requestPackageInfo () {
    try {
        let packageInfo = await axios({
            url: NPM_REGISTRY,
            timeout: 1000
        })

        // npm 上的版本号
        let lastVersion = packageInfo.data['dist-tags'].latest

        // 当前版本号
        let curVersion = require('../../package.json').version
        if (lastVersion > curVersion) {
          console.log(chalk.yellow('有新的版本更新，您可以通过 `npm update -g wlw-cli` 命令更新版本!'))
        } else {
          console.log(chalk.green(`wlw-cli当前版本: ${curVersion}`))
        }
    }
    catch (e) { }
}

module.exports = async function () {
  await requestPackageInfo()
}
