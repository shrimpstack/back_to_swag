const 重力控制 = (() => {
  let _啟用 = false;
  let _強度 = 12;

  function 落下處理() {
    if(!_啟用) return;
    所有物件
    .filter(物件 => !!物件.重力已啟用)
    .forEach(物件 => {
      物件.y -= _強度 * 物件.重力倍數;
    });
  }

  return Object.defineProperties({}, {
    啟用中: {get: () => _啟用},
    開關: {
      value: (val) => {
        if(typeof val == "boolean") _啟用 = val;
        else if(typeof val == "undefined") _啟用 = !_啟用;
        return _啟用;
      },
      writable: false
    },
    落下處理: {value: 落下處理, writable: false},
    強度: {
      get: () => {
        return _強度;
      },
      set: (val) => {
        if(typeof val == "number") _強度 = val;
        return _強度;
      },
    },
  });
})();
