#!/usr/bin/env bash
current_pwd=`pwd`

if [[ ${INIT_CWD} != ${current_pwd} ]]; then
  exit 0; # Skip posinstall when we are installed as a dependancy
fi

#if (process.cwd().includes('node_modules')) {
# return; # Skip postinstall when we are installed as a dependancy.
#}

installCodeMirror() {
    sSourceDir="${npm_config_local_prefix}/node_modules"
    sTargetDir="${npm_config_local_prefix}/www/js"

    mkdir -p \
        "${sTargetDir}/codemirror/lib/" \
        "${sTargetDir}/codemirror/mode/css/" \
        "${sTargetDir}/codemirror/mode/htmlmixed/" \
        "${sTargetDir}/codemirror/mode/javascript/" \
        "${sTargetDir}/codemirror/mode/xml/" \
        "${sTargetDir}/codemirror/theme/"

    cp -f "${sSourceDir}/codemirror/lib/codemirror.css" "${sTargetDir}/codemirror/lib/codemirror.css"
    cp -f "${sSourceDir}/codemirror/lib/codemirror.js" "${sTargetDir}/codemirror/lib/codemirror.js"
    cp -f "${sSourceDir}/codemirror/mode/css/css.js" "${sTargetDir}/codemirror/mode/css/css.js"
    cp -f "${sSourceDir}/codemirror/mode/htmlmixed/htmlmixed.js" "${sTargetDir}/codemirror/mode/htmlmixed/htmlmixed.js"
    cp -f "${sSourceDir}/codemirror/mode/javascript/javascript.js" "${sTargetDir}/codemirror/mode/javascript/javascript.js"
    cp -f "${sSourceDir}/codemirror/mode/xml/xml.js" "${sTargetDir}/codemirror/mode/xml/xml.js"
    cp -f "${sSourceDir}/codemirror/theme/base16-dark.css" "${sTargetDir}/codemirror/theme/base16-dark.css"
}

installSimplyEdit() {
    local sSourceDir sTargetDir

    readonly sSourceDir="${npm_config_local_prefix}/node_modules/simplyedit"
    readonly sTargetDir="${npm_config_local_prefix}/www"

    mkdir -p \
        "${sTargetDir}/js/" \
        "${sTargetDir}/hope/" \
        "${sTargetDir}/simply/" \

    cp -a "${sSourceDir}/js/"* "${sTargetDir}/js"
    cp -a "${sSourceDir}/hope/"* "${sTargetDir}/hope"
    cp -a "${sSourceDir}/simply/"* "${sTargetDir}/simply"
}

if [[ ${BASH_SOURCE[0]} != "${0}" ]]; then
    export -f installSimplyEdit
    export -f installCodeMirror
else
    installSimplyEdit
    installCodeMirror
    exit $?
fi


