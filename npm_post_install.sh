#!/usr/bin/env sh

npm_post_install() {
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

npm_post_install
