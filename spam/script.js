(function () {
  var textbox = document.getElementsByClassName('emoji-wysiwyg-editor')[0];
  var msg = prompt("Type your message here");
  msg += " ";
  var repeat = prompt("How many times you want to repeat", "Type number less than a million ");
  textbox.innerHTML = msg.repeat(repeat);
})();
