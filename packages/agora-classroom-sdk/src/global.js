const globalData = {};
export function setGlobalData(key, val) {
  globalData[key] = val;
}
export function getGlobalData(key) {
  let a = [];
  try {
    a = globalData[key] ? globalData[key] : [];
  } catch (e) {
    a = [];
  }
  return a;
}

export function handleShareStreamWindowClick() {
  const fullarea = document.getElementsByClassName('remote-screen-share-container')[0];
  if (fullarea.fullscreen) {
    // 退出全屏
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  } else {
    // 进入全屏
    if (fullarea.requestFullscreen) {
      fullarea.requestFullscreen();
    } else if (fullarea.webkitRequestFullScreen) {
      fullarea.webkitRequestFullScreen();
    } else if (fullarea.mozRequestFullScreen) {
      fullarea.mozRequestFullScreen();
    } else if (fullarea.msRequestFullscreen) {
      // IE11
      fullarea.msRequestFullscreen();
    }
  }
  fullarea.fullscreen = !fullarea.fullscreen;
}
