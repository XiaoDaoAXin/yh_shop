export function G_copy(obj) {
  if (document.body.createTextRange) {
    var range = document.body.createTextRange();
    range.moveToElementText(obj);
    range.select();
  } else if (window.getSelection) {
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(obj);
    selection.removeAllRanges();
    selection.addRange(range);
  } else {
    console.warn("none");
  }
  document.execCommand("Copy"); // 执行浏览器复制命令
}
