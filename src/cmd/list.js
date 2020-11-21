/**
 * @Author hanwei
 * @Email wb846022604@gamil.com
 * @LastAuthor hanwei
 * @CreatedTime 2020-11-21 20:18:43
 * @LastModifyTime 2020-11-21 21:07:11
 */
const chalk = require("chalk")
const symbols = require("../plugin/symbols")
const templateList = require('../config/template')
const Table = require('cli-table')

module.exports = () => {
  console.log('\n', symbols.info, chalk.green('当前可以安装的模版'))
  const table = new Table({
    head: ['name', 'desc', 'git-url'],
    style: {
      head: ['cyan'],
    }
  });
  table.push(...templateList.map(v => [v.name, `${v.desc}`, v.git]))
  console.log(table.toString())
}
