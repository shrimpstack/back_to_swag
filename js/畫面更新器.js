const 畫面更新器 = (() => {
  let _fps = 60;
  let _time = 0;
  let _啟用 = false;

  function 每幀() {
    物理();
    渲染();
  }
  function 物理() {
    玩家操作.動力更新();
    運動控制.運動處理();
    運動控制.動力衰退處理();
    碰撞控制.運動碰撞處理();
    重力控制.落下處理();
    碰撞控制.落下碰撞處理();
    所有物件.forEach(物件 => 物件.儲存位置 && 物件.儲存位置());
  }
  function 渲染() {
    渲染_所有物件();
  }
  function 渲染_所有物件() {
    所有物件.forEach(物件 => {
      物件.style.left = 物件.x + "px";
      物件.style.bottom = 物件.y + "px";
    });
  }
  function 每刻() {
    if(_啟用) {
      let interval = Math.round(1e3 / 16 / _fps);
      _time = (_time + 1) % interval;
      if(!_time) 每幀();
    }
    requestAnimationFrame(每刻);
  }
  requestAnimationFrame(每刻);

  return Object.defineProperties({}, {
    啟用中: {get: () => _啟用},
    開關: {
      value: (val) => {
        if(typeof val == "boolean") _啟用 = val;
        else if(typeof val == "undefined") _啟用 = !_啟用;
        return _啟用;
      },
      writable: false,
    },
    渲染: {value: 渲染, writable: false},
  });
})();