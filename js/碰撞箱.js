function 新增碰撞箱(碰撞箱id, 物件) {
  const 碰撞箱 = new (class 碰撞箱 {})();
  Object.defineProperty(碰撞箱, "是碰撞箱", {value: true, writable: false});
  物件.加入碰撞箱(碰撞箱id, 碰撞箱);

  let _碰撞圖層 = "一般";
  let _綁定物件 = 物件;
  let _推擠等級 = null;
  let _寬度 = 0;
  let _高度 = 0;
  let _偏移x = 0;
  let _偏移y = 0;
  let _取x = null;
  let _取y = null;
  let _上一個中心位置 = null;

  Object.defineProperties(碰撞箱, {
    設定偏移: {
      value: (offset_x, offset_y) => {
        if(typeof offset_x == "number") _偏移x = offset_x;
        if(typeof offset_y == "number") _偏移y = offset_x;
        return 碰撞箱;
      },
      writable: false,
    },
    綁定x: {
      value: (val) => {
        if(typeof val == "function") _取x = val;
        else if(val == null) _取x = null;
        return 碰撞箱;
      },
      writable: false,
    },
    綁定y: {
      value: (val) => {
        if(typeof val == "function") _取y = val;
        else if(val == null) _取y = null;
        return 碰撞箱;
      },
      writable: false,
    },
    設定大小: {
      value: (w, h) => {
        if(typeof w == "number") _寬度 = w;
        if(typeof h == "number") _高度 = h;
        return 碰撞箱;
      },
      writable: false,
    },
    設定推擠等級: {
      value: (val) => {
        if(typeof val == "string" && 碰撞箱_推擠等級列.includes(val)) {
          _推擠等級 = val;
        }
        return 碰撞箱;
      },
      writable: false,
    },
    推擠等級值: {
      get: () => {
        return 碰撞箱_推擠等級列.indexOf(_推擠等級);
      },
    },
    設定碰撞圖層: {
      value: (val) => {
        if(typeof val == "string" && 碰撞箱_圖層名稱列.includes(val)) {
          _碰撞圖層 = val;
        }
        return 碰撞箱;
      },
      writable: false,
    },
    碰撞圖層: {
      get: () => {
        return _碰撞圖層;
      },
    },
    最小x: {
      get: () => {
        return _取x ? _取x() : (_綁定物件.x + _偏移x);
      },
    },
    最小y: {
      get: () => {
        return _取y ? _取y() : (_綁定物件.y + _偏移y);
      },
    },
    中心x: {
      get: () => {
        return 碰撞箱.最小x + _寬度 / 2;
      },
    },
    中心y: {
      get: () => {
        return 碰撞箱.最小y + _高度 / 2;
      },
    },
    最大x: {
      get: () => {
        return 碰撞箱.最小x + _寬度;
      },
    },
    最大y: {
      get: () => {
        return 碰撞箱.最小y + _高度;
      },
    },
  });

  碰撞箱屬性_觸發事件(碰撞箱);

  return 碰撞箱;
}

function 碰撞箱屬性_觸發事件(碰撞箱) {
  碰撞箱.事件列 = {
    碰觸: [],
    停留: [],
    分開: [],
  };

  碰撞箱.接觸中 = [];

  Object.defineProperties(碰撞箱, {
    是接觸中: {
      value: (目標碰撞箱) => {
        return 碰撞箱.接觸中.includes(目標碰撞箱);
      },
      writable: false,
    },
    設定觸發: {
      value: (類型, 執行) => {
        if(!碰撞箱.事件列[類型] || 碰撞箱.事件列[類型].includes(執行)) return;
        碰撞箱.事件列[類型].push(執行);
        return 碰撞箱;
      },
      writable: false,
    },
    觸發: {
      value: (類型, 目標物件) => {
        let 目標碰撞箱 = 目標物件.目前碰撞箱;
        let 目標index = -1;
        if(類型 == "碰觸") {
          if(!碰撞箱.是接觸中(目標碰撞箱)) {
            碰撞箱.接觸中.push(目標碰撞箱);
          }
        }
        else if(類型 == "分開") {
          let index = 碰撞箱.接觸中.indexOf(目標碰撞箱);
          if(index != -1) {
            碰撞箱.接觸中.splice(index, 1);
          }
        }
        if(碰撞箱.事件列[類型]) 碰撞箱.事件列[類型].forEach(執行 => 執行(目標物件));
      },
      writable: false,
    },
  });
}
