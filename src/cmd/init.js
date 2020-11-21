/**
 * @Author hanwei
 * @Email wb846022604@gamil.com
 * @LastAuthor hanwei
 * @CreatedTime 2020-11-21 20:24:19
 * @LastModifyTime 2020-11-21 20:40:23
 */
const inquirer = require("inquirer")
const download = require("download-git-repo")
const handlebars = require("handlebars")
const fs = require("fs")
const ora = require("ora")
const chalk = require("chalk")
const symbols = require("../plugin/symbols")
const templateList = require('../config/template')

module.exports = (name) => {
  if (fs.existsSync(name)) {
    // 错误提示项目已存在，避免覆盖原有项目
    console.log(symbols.error, chalk.red(`${name}`), '项目已存在')
    return
  }
  inquirer
    .prompt([
      {
        name: 'description',
        message: '项目描述'
      },
      {
        name: 'author',
        message: '作者'
      }
    ])
    .then(async answers => {
      // 选择模版列表
      const { value: templateValue } = await inquirer.prompt([{
        type: "list",
        message: "选择需要安装的模版:",
        name: "value",
        choices: templateList
      }])
      const spinner = ora(`正在下载模板${templateValue}...`)
      const selectedTemplate = templateList.filter(v => templateValue === v.value)[0]
      spinner.start()
      download(
        selectedTemplate.git,
        name,
        err => {
          if (!err) {
            spinner.succeed()
            const meta = {
              name,
              description: answers.description,
              author: answers.author
            }
            const fileName = `${name}/package.json`
            if (fs.existsSync(fileName)) {
              const content = fs.readFileSync(fileName).toString()
              // 替换package.json模版参数
              const result = handlebars.compile(content)(meta)
              fs.writeFileSync(fileName, result)
            }
            console.log(symbols.success, chalk.green('项目初始化完成'))
          } else {
            spinner.fail()
            console.log(symbols.error, chalk.red(`从${selectedTemplate.git}拉取远程仓库失败${err}`))
          }
        }
      )
    })
}