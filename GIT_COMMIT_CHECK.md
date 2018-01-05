# Git commit之前添加ESlint验证
1. 新增`.hooks`文件夹，并新建`pre-commit`文件
```shell
// copy from react
#!/bin/sh
#
# To enable this hook, symlink or copy this file to .git/hooks/pre-commit.

# Redirect output to stderr.
exec 1>&2

git diff --cached --name-only --diff-filter=ACMRTUB | \
  grep '\.js$' | \
  xargs ./node_modules/.bin/eslint --
```
2. 下载`babel-eslint`库
```js
npm install -D babel-eslint
```
3. 修改`.eslintrc.js`
```js
// 加入
"parser": "babel-eslint",
```
4. 添加执行脚本,将`pre-commit`文件拷贝到`.git/hooks/`下
```js
"postinstall": "cp .hooks/* .git/hooks/"
```
