const 所有物件 = [];

function 新增物件(類型) {
  let 物件 = document.createElement("div");
  所有物件.push(物件);
  物件.classList.add("item");

  Object.defineProperty(物件, "類型", {value: 類型 || "基礎", writable: false});
  Object.defineProperty(物件, "是物件", {value: true, writable: false});
  物件屬性_位置(物件);
  物件屬性_碰撞(物件);

  return 物件;
}

function 物件屬性_位置(物件) {
  let _x = 0;
  let _y = 0;
  Object.defineProperties(物件, {
    x: {
      get: () => {
        return _x;
      },
      set: (value) => {
        if(typeof value == "number") _x = value;
      },
    },
    y: {
      get: () => {
        return _y;
      },
      set: (value) => {
        if(typeof value == "number") _y = value;
      },
    },
    直接設定位置值: {
      value: (x, y) => {
        if(typeof x == "number") 物件.x = x;
        if(typeof y == "number") 物件.y = y;
        return 物件;
      },
      writable: false,
    },
  });
}

function 物件屬性_會移動(物件) {
  if(物件.會移動) return;
  let _上一個中心位置 = null;
  Object.defineProperties(物件, {
    會移動: {value: true, writable: false},
    儲存位置: {
      value: () => {
        _上一個中心位置 = [物件.x, 物件.y];
      },
      writable: false,
    },
    取得移動方向: {
      get: () => {
        if(!_上一個中心位置) return "下";
        let [上次x, 上次y] = _上一個中心位置;
        let x差 = 物件.x - 上次x;
        let y差 = 物件.y - 上次y;
        if(Math.abs(y差) > Math.abs(x差) && y差 != 0) {
          return y差 < 0 ? "下" : "下";
        }
        else {
          return x差 < 0 ? "左" : "右";
        }
      },
    },
  });
}

function 物件屬性_重力(物件) {
  物件屬性_會移動(物件);
  let _重力倍數 = 1;
  let _啟用 = true;
  Object.defineProperties(物件, {
    重力倍數: {
      get: () => {
        return _重力倍數;
      },
      set: (val) => {
        if(typeof val == "number") _重力倍數 = val;
      },
    },
    重力已啟用: {
      get: () => {
        return !物件.觸地 && _啟用;
      },
    },
    重力開關: {
      value: (val) => {
        if(typeof val == "boolean") _啟用 = val;
        else if(typeof val == "undefined") _啟用 = !_啟用;
      },
      writable: false,
    },
    觸地: {
      get: () => {
        if(!物件.目前碰撞箱) return false;
        return !!所有物件.find(檢查物件 => {
          return 檢查物件.目前碰撞箱 &&
          碰撞控制.檢查可碰撞(物件.目前碰撞箱, 檢查物件.目前碰撞箱) &&
          物件.目前碰撞箱.最小y == 檢查物件.目前碰撞箱.最大y &&
          物件.目前碰撞箱.最大x > 檢查物件.目前碰撞箱.最小x &&
          檢查物件.目前碰撞箱.最大x > 物件.目前碰撞箱.最小x;
        });
      },
    },
  });
}

function 物件屬性_動力(物件) {
  物件屬性_會移動(物件);
  let _運動力度x = 0;
  let _運動力度y = 0;
  Object.defineProperties(物件, {
    運動力度x: {
      get: () => {
        return _運動力度x;
      },
      set: (val) => {
        if(typeof val == "number") _運動力度x = val;
      },
    },
    運動力度y: {
      get: () => {
        return _運動力度y;
      },
      set: (val) => {
        if(typeof val == "number") _運動力度y = val;
      },
    },
  });
}

function 物件屬性_碰撞(物件) {
  const _碰撞箱們 = {};
  let 啟用中id = null;
  Object.defineProperties(物件, {
    目前碰撞箱: {
      get: () => {
        if(啟用中id == null) return null;
        return _碰撞箱們[啟用中id];
      },
    },
    加入碰撞箱: {
      value: (id, 碰撞箱) => {
        if(碰撞箱.是碰撞箱 && !_碰撞箱們[id]) _碰撞箱們[id] = 碰撞箱;
        return 物件;
      },
      writable: false,
    },
    啟用碰撞箱: {
      value: (id) => {
        if(id == null || !_碰撞箱們[id]) 啟用中id = null;
        else 啟用中id = id;
        return 物件;
      },
      writable: false,
    },
  });
}
