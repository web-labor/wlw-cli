/**
 * @Author hanwei
 * @Email wb846022604@gamil.com
 * @LastAuthor wangbo
 * @CreatedTime 2020-11-21 15:51:51
 * @LastModifyTime 2020-11-23 17:28:50
 */
// --这种用法是为了防止操作系统用户没有将node装在默认的/usr/bin路径里。当系统看到这一行的时候，
// 首先会到env设置里查找node的安装路径，再调用对应路径下的解释器程序完成操作。
const program = require("commander")
const packageInfo = require('./package.json');
const cmdInit = require('./src/cmd/init')
const cmdList = require('./src/cmd/list')
// 检查版本更新方法
const checkUpdate = require('./src/utils/checkUpdate');
const version = process.env.VERSION || require('./package.json').version;

checkUpdate().then(async () => {
  program
  .version(packageInfo.version)

  program
  .command("init <name>")
  .description('初始化模版')
  .action(cmdInit)

  program
  .command("list")
  .description('查看模版列表')
  .alias('ls') // 简写
  .action(cmdList)

  //解析命令行
  program.parse(process.argv)
})
