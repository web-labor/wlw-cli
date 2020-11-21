/**
 * @Author hanwei
 * @Email wb846022604@gamil.com
 * @LastAuthor hanwei
 * @CreatedTime 2020-11-21 15:51:51
 * @LastModifyTime 2020-11-21 20:31:23
 */
// #!/usr/bin/env node
// --这种用法是为了防止操作系统用户没有将node装在默认的/usr/bin路径里。当系统看到这一行的时候，
// 首先会到env设置里查找node的安装路径，再调用对应路径下的解释器程序完成操作。
const program = require("commander")

const cmdInit = require('./src/cmd/init')
const cmdList = require('./src/cmd/list')
program
  .version("0.0.1", "-v, --version")
  .command("init <name>")
  .action(cmdInit)

program
  .version("0.0.1", "-v, --version")
  .command("list")
  .alias('ls') // 简写
  .action(cmdList)

//解析命令行
program.parse(process.argv)
