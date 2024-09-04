function 新增物件_場景物件() {
  let 物件 = 新增物件("場景物件");
  if(!物件) return;

  /* 碰撞 */
  新增碰撞箱("主要", 物件)
  .設定碰撞圖層("場景固定")
  .設定推擠等級("固定物")
  .設定大小(48, 48);
  物件.啟用碰撞箱("主要");

  /* 圖片 */
  物件.style.width = "48px";
  物件.style.height = "48px";
  物件.style.backgroundImage = "url(./imgs/items/scene/藍色方塊.png)";

  return 物件;
}