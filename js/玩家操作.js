const 玩家操作 = (() => {
  let 跳躍_向上中 = false;
  let 跳躍力 = 48 * 2 + 10;
  let 累積已跳 = 0;
  function 開始跳() {
    if(人物item.觸地) {
      人物item.重力開關(false);
      跳躍_向上中 = true;
    }
  }
  function 跳躍更新() {
    if(跳躍_向上中) {
      if(累積已跳 < 跳躍力) {
        let 要跳的 = 跳躍力 * 0.1;
        人物item.運動力度y = 要跳的;
        累積已跳 += 要跳的;
      }
      if(Math.abs(跳躍力 - 累積已跳) < 1) {
        停止跳();
      }
    }
  }
  function 停止跳() {
    累積已跳 = 0;
    跳躍_向上中 = false;
    人物item.重力開關(true);
  }

  let 跑步方向 = 0;
  let 最大速度 = 1;
  function 開始跑(方向) {
    跑步方向 = 方向;
  }
  function 跑步更新() {
    if(跑步方向 != 0) {
      人物item.運動力度x = 最大速度 * 跑步方向;
    }
  }
  function 停止跑(方向) {
    if(跑步方向 == 方向) 跑步方向 = 0;
  }

  window.addEventListener("keydown", event => {
    switch(event.code) {
      case "ArrowRight": 開始跑(1); break;
      case "ArrowLeft": 開始跑(-1); break;
      case "Space": 開始跳(); break;
    }
  });

  window.addEventListener("keyup", event => {
    switch(event.code) {
      case "ArrowRight": 停止跑(1); break;
      case "ArrowLeft": 停止跑(-1); break;
      case "ArrowUp": break;
      case "Space": 停止跳(); break;
    }
  });

  function 動力更新() {
    跳躍更新();
    跑步更新();
  }

  function 測試用_切換角色數值(名字) {
    switch(名字) {
      case "托": 跳躍力 = 48 * 1.0 + 10; 最大速度 = 4; break;
      case "普": 跳躍力 = 48 * 1.5 + 10; 最大速度 = 5; break;
      case "17": 跳躍力 = 48 * 1.5 + 10; 最大速度 = 6; break;
      case "敏": 跳躍力 = 48 * 2.0 + 10; 最大速度 = 5; break;
      case "梵": 跳躍力 = 48 * 2.0 + 10; 最大速度 = 6; break;
    }
  }
  測試用_切換角色數值("梵");

  return {
    測試用_切換角色數值,
    動力更新,
  };
})();
