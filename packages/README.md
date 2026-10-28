# 离线安装包 · 1.1.0

- `fxtool-windows-x64.exe`：Windows x64 免安装程序，双击运行。使用 Git LFS 保存完整二进制文件。
- `fxtool-android.apk`：Android 7.0 及以上离线安装包，调试签名。
- `../dist/`：网页生产构建，可部署到静态 Web 服务器。

克隆仓库时需要安装 Git LFS，并执行以下命令下载完整 Windows 程序：

```sh
git lfs install
git lfs pull
```

安装包未做真机运行测试。Windows 未配置商业代码签名。应用数据保存在各设备本机，可在应用内导出备份。

`SHA256SUMS` 包含两个安装包的 SHA-256 校验值。
