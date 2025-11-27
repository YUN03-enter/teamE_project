// state 5에서 쓰는 함수들

function mouseOvercss(btn, w, h) {
  btn.elt.addEventListener("mouseenter", function() {
    if (!btn._ispressed) {
  btn.size(w*1.02, h*1.02);
  btn.style("background-color", "#f5f5ff");
  btn.style("font-size", "21px");
  btn.style("font-weight", "bold");
}});

  btn.elt.addEventListener("mouseleave", function() {
    if (!btn._ispressed) {
  btn.size(w, h);
  btn.style("background-color", "#ffffff");
  btn.style("font-size", "20px");
  btn.style("font-weight", "normal");
}}); 
}

function mouseClcikedcss(btn, w,h) {
  btn.mousePressed(() => {
    btn._ispressed = !btn._ispressed; 
  if (!btn._ispressed) {
      btn.size(w, h);
      btn.style("background-color", "#ffffff");
      btn.style("font-size", "20px");
      btn.style("font-weight", "normal");
    } else {
      btn.size(w*1.02, h*1.02);
      btn.style("background-color", "#f5f5ff");
      btn.style("font-size", "21px");
      btn.style("font-weight", "bold");
    }});
}

function handleCameraButton() {
  /// 카메라 실행 동작 및 이미지 저장 예정
  /// TODO
}

// 커스텀 된 것들 초기화
function resetCustomInputs() {
  inputName.value(''); 
  inputName.hide();
  let totalW = width - 50;

  for (let mbtn of customMoodbuttons) {
    mbtn._ispressed = false;
    mbtn.size(totalW/5 - 15, 55);
    mbtn.style("background-color", "#ffffff");
    mbtn.style("font-size", "20px");
    mbtn.style("font-weight", "normal");
    mbtn.hide();                  
  }

  for (let cbtn of customColorbuttons) {
    cbtn._ispressed = false;
    cbtn.size(totalW/5 - 15, 55);
    cbtn.style("background-color", "#ffffff");
    cbtn.style("font-size", "20px");
    cbtn.style("font-weight", "normal");
    cbtn.hide();                  
  }

  for (let fbtn of customFontbuttons) {
    fbtn._ispressed = false;
    fbtn.size(totalW/5 - 15, 55);
    fbtn.style("background-color", "#ffffff");
    fbtn.style("font-size", "20px");
    fbtn.style("font-weight", "normal");
    fbtn.hide();                  
  }
  
}