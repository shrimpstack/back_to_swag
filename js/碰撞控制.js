const 碰撞箱_推擠等級列 = ["人物", "固定物"];
const 碰撞箱_圖層名稱列 = ["人物", "場景固定"];
const 碰撞箱_碰撞表 = {
  一般: [],
  人物: ["場景固定"],
  場景固定: ["人物"],
};

const 碰撞控制 = (() => {
  function 落下碰撞處理() {
    let 所有碰撞物件 = 所有物件.filter(物件 => !!物件.目前碰撞箱)
    .sort((a, b) => b.目前碰撞箱.推擠等級值 - a.目前碰撞箱.推擠等級值);
    所有碰撞物件.forEach((物件, cur_i) => {
      for(let tar_i = cur_i + 1; tar_i < 所有碰撞物件.length; tar_i++) {
        let 目標物件 = 所有碰撞物件[tar_i];
        落下碰撞處理_針對兩物件(物件, 目標物件);
      }
    });
    觸發處理(true);
  }
  function 落下碰撞處理_針對兩物件(物件A, 物件B) {
    let 碰撞箱A = 物件A.目前碰撞箱;
    let 碰撞箱B = 物件B.目前碰撞箱;
    if(!檢查可碰撞(碰撞箱A, 碰撞箱B)) return;
    if(檢查重疊(碰撞箱A, 碰撞箱B)) {
      物件B.y += Math.abs(碰撞箱A.最大y - 碰撞箱B.最小y);
    }
  }

  function 運動碰撞處理() {
    let 所有碰撞物件 = 所有物件.filter(物件 => !!物件.目前碰撞箱)
    .sort((a, b) => b.目前碰撞箱.推擠等級值 - a.目前碰撞箱.推擠等級值);
    所有碰撞物件.forEach((物件, cur_i) => {
      for(let tar_i = cur_i + 1; tar_i < 所有碰撞物件.length; tar_i++) {
        let 目標物件 = 所有碰撞物件[tar_i];
        運動碰撞處理_針對兩物件(物件, 目標物件);
      }
    });
    觸發處理();
  }
  function 運動碰撞處理_針對兩物件(物件A, 物件B) {
    let 碰撞箱A = 物件A.目前碰撞箱;
    let 碰撞箱B = 物件B.目前碰撞箱;
    if(!檢查可碰撞(碰撞箱A, 碰撞箱B)) return;
    if(檢查重疊(碰撞箱A, 碰撞箱B)) {
      let 左疊 = Math.abs(碰撞箱A.最小x - 碰撞箱B.最大x);
      let 右疊 = Math.abs(碰撞箱A.最大x - 碰撞箱B.最小x);
      let 下疊 = Math.abs(碰撞箱A.最小y - 碰撞箱B.最大y);
      let 上疊 = Math.abs(碰撞箱A.最大y - 碰撞箱B.最小y);
      switch(Math.min(左疊, 右疊, 下疊, 上疊)) {
        case 左疊: 物件B.x -= 左疊; break;
        case 右疊: 物件B.x += 右疊; break;
        case 下疊: 物件B.y -= 下疊; break;
        case 上疊: 物件B.y += 上疊; break;
      }
    }
    觸發處理();
  }

  function 觸發處理() {
    let 所有碰撞物件 = 所有物件.filter(物件 => !!物件.目前碰撞箱);
    所有碰撞物件.forEach((物件, cur_i) => {
      for(let tar_i = cur_i + 1; tar_i < 所有碰撞物件.length; tar_i++) {
        let 目標物件 = 所有碰撞物件[tar_i];
        觸發處理_針對兩物件(物件, 目標物件);
      }
    });
  }
  function 觸發處理_針對兩物件(物件A, 物件B) {
    let 碰撞箱A = 物件A.目前碰撞箱;
    let 碰撞箱B = 物件B.目前碰撞箱;
    let 有接觸 = 檢查接觸(碰撞箱A, 碰撞箱B);
    let 接觸中 = 碰撞箱A.是接觸中(碰撞箱B) || 碰撞箱B.是接觸中(碰撞箱A);
    let 觸發事件類型 = "";
    if(有接觸 && !接觸中) 觸發事件類型 = "碰觸";
    else if(有接觸 && 接觸中) 觸發事件類型 = "停留";
    else if(!有接觸 && 接觸中) 觸發事件類型 = "分開";
    if(觸發事件類型) {
      碰撞箱A.觸發(觸發事件類型, 物件B);
      碰撞箱B.觸發(觸發事件類型, 物件A);
    }
  }

  function 檢查可碰撞(碰撞箱A, 碰撞箱B) {
    let A可碰撞列 = 碰撞箱_碰撞表[碰撞箱A.碰撞圖層];
    if(A可碰撞列 && A可碰撞列.includes(碰撞箱B.碰撞圖層)) return true;
    let B可碰撞列 = 碰撞箱_碰撞表[碰撞箱B.碰撞圖層];
    if(B可碰撞列 && B可碰撞列.includes(碰撞箱A.碰撞圖層)) return true;
    return false;
  }
  function 檢查重疊(碰撞箱A, 碰撞箱B) {
    let y疊 = 碰撞箱A.最小y < 碰撞箱B.最大y && 碰撞箱B.最小y < 碰撞箱A.最大y;
    let x疊 = 碰撞箱A.最小x < 碰撞箱B.最大x && 碰撞箱B.最小x < 碰撞箱A.最大x;
    return x疊 && y疊;
  }
  function 檢查接觸(碰撞箱A, 碰撞箱B) {
    let y疊 = 碰撞箱A.最小y <= 碰撞箱B.最大y && 碰撞箱B.最小y <= 碰撞箱A.最大y;
    let x疊 = 碰撞箱A.最小x <= 碰撞箱B.最大x && 碰撞箱B.最小x <= 碰撞箱A.最大x;
    return x疊 && y疊;
  }

  return Object.defineProperties({}, {
    落下碰撞處理: {value: 落下碰撞處理, writable: false},
    運動碰撞處理: {value: 運動碰撞處理, writable: false},
    檢查可碰撞: {value: 檢查可碰撞, writable: false},
  });
})();
