var editor = null;
window.onload = function () {
  editor = Jodit.make("#editor", {
    height: 500,
    enter: "div",
  });

  const content = localStorage.getItem("content") || "";

  editor.value = content;

  editor.element.addEventListener("change", () => {
    document.getElementById("output").innerText = editor.value;

    document.getElementById("preview").innerHTML = editor.value;
  });
};

function save() {
  localStorage.setItem("content", editor.value);
}
