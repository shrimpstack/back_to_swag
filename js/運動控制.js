const 運動控制 = (() => {
  function 運動處理() {
    所有物件
    .filter(物件 => !!物件.運動力度x || !!物件.運動力度y)
    .forEach(物件 => {
      if(物件.運動力度x) 物件.x += 物件.運動力度x;
      if(物件.運動力度y) 物件.y += 物件.運動力度y;
    });
  }

  function 動力衰退處理() {
    所有物件
    .filter(物件 => !!物件.運動力度x)
    .forEach(物件 => {
      if(物件.運動力度x <= 0.001) 物件.運動力度x = 0;
      else 物件.運動力度x *= 0.33;
    });
    所有物件
    .filter(物件 => !!物件.運動力度y)
    .forEach(物件 => {
      if(物件.運動力度y <= 0.001) 物件.運動力度y = 0;
      else 物件.運動力度y *= 0.9;
    });
  }

  return Object.defineProperties({}, {
    運動處理: {value: 運動處理, writable: false},
    動力衰退處理: {value: 動力衰退處理, writable: false},
  });
})();
