var editor = null;
window.onload = function () {
  editor = Jodit.make("#editor", { width: "49%", height: 500, enter: "div" });
  editor.element.addEventListener("change", save);
};

function save() {
  document.getElementById("output").innerText = editor.value;
}
