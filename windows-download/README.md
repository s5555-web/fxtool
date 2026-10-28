# Windows 11 x64 完整包下载

这个目录的文件直接保存在 Git 中，不使用 Git LFS。下载源码 ZIP 时也能获得完整内容。

1. 在 GitHub 仓库首页选择 **Code → Download ZIP**。
2. 完整解压 ZIP，进入 `windows-download` 文件夹。
3. 双击 `build-windows.cmd`。脚本将三个分片合并，并自动校验 SHA-256。
4. 出现 `Verified successfully` 后，双击生成的 `fxtool-windows-x64.exe`。

不要直接打开 `.part1`、`.part2`、`.part3` 文件，也不要在 ZIP 内运行脚本。

生成的程序为 1.1.0 Windows x64 免安装版，适用于 Intel / AMD 64 位电脑。此下载方式排除了 Git LFS 指针和文件不完整的问题，不代表已经确认此前运行失败的具体原因；安装包尚未经过 Windows 11 真机验证。

完整 EXE 大小：111733479 字节。

SHA-256：`f792322dfe9a5cdcafbcb1641208e25cf530ded922db8be4a95908ef8a26b7b8`

如果完整包仍提示无法在电脑上运行，请提供 Windows 错误截图和「设置 → 系统 → 系统信息 → 系统类型」，以便继续判断。
