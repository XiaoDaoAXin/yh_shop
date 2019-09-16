//保存光标位置
 export function saveRange() {
  var selection = window.getSelection ? window.getSelection() : document.selection;
  if (!selection.rangeCount) return;
  var range = selection.createRange ? selection.createRange() : selection.getRangeAt(0);
  window._range = range;
}
//插入内容
export function insertContent(str) {
  var selection, range = window._range;
  if (!window.getSelection) {
    range.pasteHTML(str);
    range.collapse(false);
    range.select();
  } else {
    selection = window.getSelection ? window.getSelection() : document.selection;
    range.collapse(false);
    var hasR = range.createContextualFragment(str);
    var hasR_lastChild = hasR.lastChild;
    while (hasR_lastChild && hasR_lastChild.nodeName.toLowerCase() == "br" && hasR_lastChild.previousSibling && hasR_lastChild.previousSibling.nodeName.toLowerCase() == "br") {
      var e = hasR_lastChild;
      hasR_lastChild = hasR_lastChild.previousSibling;
      hasR.removeChild(e);
    }
    range.insertNode(hasR);
    if (hasR_lastChild) {
      range.setEndAfter(hasR_lastChild);
      range.setStartAfter(hasR_lastChild);
    }
    selection.removeAllRanges();
    selection.addRange(range);
  }
};

//光标位置
export function keepLastIndex(obj) {
  if (window.getSelection) {//ie11 10 9 ff safari
    //obj.focus(); //解决ff不获取焦点无法定位问题
    var range = window.getSelection();//创建range
    range.selectAllChildren({obj});//range 选择obj下所有子内容
    range.collapseToEnd();//光标移至最后
  }
  else if (document.selection) {//ie10 9 8 7 6 5
    var range = document.selection.createRange();//创建选择对象
    //var range = document.body.createTextRange();
    range.moveToElementText(obj);//range定位到obj
    range.collapse(false);//光标移至最后
    range.select();
  }
}
