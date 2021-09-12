# FaasJS Demo

### 准备动作

- 将 OS X 升级至最新稳定版
- 安装最新稳定版 Docker https://www.docker.com/
  - 建议调大 Docker 的内存限制以获取更好的开发体验
- 安装最新稳定版 VS Code https://code.visualstudio.com/
  - 安装 VS Code 的命令行工具（在 VS Code 中按组合键 `⇧⌘P`，选择 `Shell Command: Install 'code' command in PATH`）
  - 安装 VS Code 插件 Remote `code --install-extension ms-vscode-remote.remote-containers`

### 启动开发环境

1. 下载本代码库
2. 在代码库中执行 `code .code-workspace`
3. 点击左下角绿色按钮，选择 `Remote-Containers: Reopen in Container`
4. 在容器中打开命令行，输入 `start api www`
5. 待编译成功后，在浏览器打开 `http://localhost:3000/` 确认是否启动成功
