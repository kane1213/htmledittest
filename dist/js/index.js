var editor=null;function save(){document.getElementById("output").innerText=editor.value}window.onload=function(){(editor=Jodit.make("#editor",{width:"49%",height:500,enter:"div"})).element.addEventListener("change",save)};