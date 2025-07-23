; NSIS脚本用于注册自定义协议testq://

; 在安装完成后执行的回调函数
!macro customInstall
  ; 注册testq://协议
  WriteRegStr HKCR "testq" "" "TestQProtocol"
  WriteRegStr HKCR "testq" "URL Protocol" ""
  WriteRegStr HKCR "testq\DefaultIcon" "" "$INSTDIR\${APP_EXECUTABLE_FILENAME},1"
  WriteRegStr HKCR "testq\shell" "" ""
  WriteRegStr HKCR "testq\shell\open" "" ""
  WriteRegStr HKCR "testq\shell\open\command" "" '"$INSTDIR\${APP_EXECUTABLE_FILENAME}" "%1"'
!macroend

; 在卸载时执行的回调函数
!macro customUnInstall
  ; 删除testq://协议注册表项
  DeleteRegKey HKCR "testq"
!macroend 