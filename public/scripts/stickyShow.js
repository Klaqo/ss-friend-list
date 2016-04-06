var stickyShow = function(element, dist){
  var $elementToStick = $(element);
  var distFromTop = $elementToStick.scrollTop();
  if (distFromTop > dist){
    return true;
  } else {
    return false;
  }
};

var stickyShowTest = function(){
  return true;
};
