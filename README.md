# xbear-iconfont
自动化文字库更新插件

##关于xbear-iconfont

#####xbear-iconfont是基于阿里巴巴矢量图标库为文件管理，通过自动化更新，将远程文字库更新到本地服务，实现远程文字库和本地文字库保持统一，极大方便文字库的更新操作。

## 版本更新
    [0.0.1] create by dbxiao

## command
    url   : 文字库远程地址
	path  : 本地文字库目录（可选），默认值：/static/ui/  目录必须存在，不支持动态创建

## 命令demo

    xbear-iconfont updata "//at.alicdn.com/t/font_ec6iu8c9k3u6usor.css" "./static/ui"


## 目录结构
	默认在./static/ui目录下生成iconfont.css 和 font/*****.eot等四个文字库文件


