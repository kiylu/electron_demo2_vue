; 自定义安装脚本
; 这个文件允许我们自定义安装程序的行为

; 添加自定义页面和选项
!macro customInstall
  ; 在这里可以添加自定义的安装逻辑
  DetailPrint "正在安装 Electron Vue3 Demo..."
!macroend

!macro customUnInstall
  ; 在这里可以添加自定义的卸载逻辑
  DetailPrint "正在卸载 Electron Vue3 Demo..."
!macroend

; 自定义安装完成页面
!macro customFinishPage
  ; 可以添加自定义的完成页面内容
!macroend

; 添加许可协议页面
!macro customLicense
  ; 如果有许可协议文件，可以在这里指定
!macroend

; 自定义安装器图标和样式
!macro customHeader
  ; 可以自定义安装器的外观
!macroend
