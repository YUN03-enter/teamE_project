// ==================================================================
// 4. 화면별 렌더링 함수 (View Rendering)
// ==================================================================

function drawSplash() {
  // [State 0] 메인 화면: 플로팅 애니메이션과 타이틀
  let floatY1 = sin(frameCount * 0.03) * 10; 
  let floatY2 = sin(frameCount * 0.04 + PI) * 10; 

  // 모서리 장식 요소 그리기
  if (imgSun) image(imgSun, 50, 50 + floatY1, 150, 150);
  if (imgCloud) image(imgCloud, width - 250, 50 + floatY2, 200, 100);
  if (imgGrass) image(imgGrass, 50, height - 250 + floatY2, 200, 200);
  if (imgHorse) image(imgHorse, width - 250, height - 250 + floatY1, 200, 200);

  // 중앙 타이틀
  imageMode(CENTER);
  if (imgBgText) {
    let imgW = width * 0.6;
    let imgH = imgW * (imgBgText.height / imgBgText.width);
    image(imgBgText, width/2, height/2 - 50, imgW, imgH);
  } else {
    // 이미지가 없을 때 텍스트 대체
    textAlign(CENTER, CENTER); textSize(50); fill(200);
    text("Make your own\nSeason's Greeting", width/2, height/2 - 50);
  }

  textAlign(CENTER, CENTER);
  textSize(120); fill(100, 200, 255); textStyle(BOLD);
  text("2026", width/2, height/2 - 50);

  // 안내 문구
  textStyle(NORMAL); fill(80); textSize(24); textLeading(40);
  let alpha = map(sin(frameCount * 0.1), -1, 1, 100, 255);
  fill(80, 80, 80, alpha);
  text("문학 문장을 선택하고,\n나만의 2026 시즌 그리팅을 만들어보세요!", width/2, height/2 + 200);
}

function drawQ1() {
  // [State 1] 첫 번째 질문
  textAlign(CENTER); textSize(28); fill(0); textStyle(BOLD);
  text("Q1. 어떤 것을 이루는 한 해를 보내고 싶으신가요?", width/2, 100);
  textStyle(NORMAL);
  
  let startY = 200; let gap = 90;
  for (let i = 0; i < q1Data.length; i++) {
    drawButton(width/2, startY + (i * gap), 600, 70, q1Data[i].label);
  }
}

function drawQ2() {
  // [State 2] 두 번째 질문 (Q1 선택값에 따라 항목 달라짐)
  textAlign(CENTER); textSize(28); fill(0); textStyle(BOLD);
  text("Q2. 세부 목표를 선택해주세요.", width/2, 100);
  textStyle(NORMAL);
  
  let currentOptions = q2Data[userSelections.category];
  if (currentOptions) {
    let startY = 200; let gap = 90;
    for (let i = 0; i < currentOptions.length; i++) {
      drawButton(width/2, startY + (i * gap), 700, 70, currentOptions[i].label);
    }
  } else {
    textSize(20); fill(150); text("선택된 항목이 없습니다.", width/2, height/2);
  }
}

function drawAILoading() {
  // [State 3] AI 로딩 화면 (백엔드 통신 대기)
  textAlign(CENTER); textSize(28); fill(50); textStyle(NORMAL);
  text("당신에게 어울리는 문장을 찾고 있습니다...", width/2, height/2 + 60);
  
  noFill(); stroke(100, 200, 255); strokeWeight(6);
  let angle = millis() / 300;
  arc(width/2, height/2 - 50, 60, 60, angle, angle + PI + HALF_PI);
  
  // 백엔드에서 데이터가 로드되면(isDataLoaded === true) 다음 단계로 이동
  if (isDataLoaded && millis() - lastInputTime > 1000) { // 최소 1초 대기(UX)
     changeState(4);
  }
}

function drawSelectSentence() {
  // [State 4] 추천 문장 3개 선택
  textAlign(CENTER); textSize(30); noStroke(); fill(0); textStyle(BOLD);
  text("마음에 드는 문장을 선택하세요", width/2, 100);
  textStyle(NORMAL);
  
  for(let i=0; i<recommendedSentences.length; i++) {
    drawButton(width/2, 250 + (i*100), 700, 80, recommendedSentences[i]);
  }
}

function drawCustomization() {
  // [State 5] 결과 확인 및 새로고침 (랜덤 레이아웃)
  textAlign(CENTER); textSize(20); noStroke(); fill(0);
  text("이제 꾸밀 단계예요!", width/2, 50);
  textAlign(CENTER); textSize(18); noStroke(); fill(0);
  text("선호하는 스타일을 알려주시면, 저희가 제작해드릴게요.", width/2, 80);

  const questionArea = select('#questionArea')
  questionArea.style('display', 'block');
  document.body.style.overflowY = "auto";
  questionArea.html(""); // 기존 내용 초기화

  // 질문 로드
  for (let i=0;i<customQuestions.length;i++){
    const custom_question = customQuestions[i]
    const questionText = createDiv(custom_question);
    questionText.parent(questionArea);
    questionText.style("position", "absolute")
    questionText.style("top", (120 + i*200)+"px");
    questionText.style("left", 40+"px");
    questionText.style("font-size", "24px");
  }

  // 이름 입력
  inputName.show();

  // custom buttons -> 이거 계속 draw()에서 냅다 불러오면 오류가 나서 setup()에서 처음 한 번만 만들고 보이는 방식으로 구현했음.
  // 즉 관련 요소를 수정하려면 sketch.js 의 setup()으로 가셔야 합니다.
  for (let mbtn of customMoodbuttons) {
    mbtn.parent('questionArea');
    mbtn.show();
  }
  for (let cbtn of customColorbuttons) {
    cbtn.parent('questionArea');
    cbtn.show();
  }
  for (let fbtn of customFontbuttons) {
    fbtn.parent('questionArea');
    fbtn.show();
  }

  // 카메라 버튼
  cameraButton.parent("questionArea");
  cameraButton.show();

  // 컨트롤 버튼
  createBTN.parent("questionArea");
  resetBTN.parent("questionArea");
  
  // 새로고침
  // 근데 목업 보면 이 버튼도 없긴 한데 sketch.js의 captureResult() 의 TODO 부분을 봐주시면 좋을 것 같습니다.
  // 새로고침이라 함은 화면에 띄워주는 후보군이 바뀐다는 이야기로 받아들여도 될지요?
  resetBTN.mousePressed(() => {
    // 디자인 요소 새로고침 하는 함수 로드 예정
    generateRandomLayout()
  });

  // 선택지 저장하고 다음 단계로 넘어가기
  // TODO
  // customResponse에 제대로된 값이 담기는지 확인 필요
  createBTN.mousePressed(() => {
    customResponse['name'] = inputName.value();
    customResponse['mood']= customMoodbuttons.filter(btn => btn._ispressed).map(btn => btn._value);
    customResponse['color'] = customColorbuttons.filter(btn => btn._ispressed).map(btn => btn._value);
    customResponse['font'] = customFontbuttons.filter(btn => btn._ispressed).map(btn => btn._value);
    // TODO : 변수에 이미지 어떻게 저장할지(함수) 고안 필요
    //customResponse['img'] = cameraImg
    
    // 다음 단계로 넘어감
    captureResult();
    uploadAndGenerateQR(); // 서버 전송 및 QR 생성 요청
    changeState(6);
    questionArea.html("");
    questionArea.style('display', 'none');
    document.body.style.overflowY = "hidden";
    resetCustomInputs();
  });

}

function drawFinalizing() {
  // [State 6] 최종 생성 대기 (컨페티 준비 등)
  background(253, 253, 240, 200);
  fill(0); textSize(30); textAlign(CENTER, CENTER);
  text("나만의 시즌 그리팅 생성 중...", width/2, height/2);
  
  if (confettis.length === 0) {
    for (let i = 0; i < 100; i++) confettis.push(new Confetti());
  }

  if (frameCount % 120 == 0) changeState(7);
}

function drawResult() {
  // [State 7] 결과 화면 (썸네일 + QR)
  
  // 컨페티 효과 재생
  for (let c of confettis) { c.update(); c.display(); }

  textAlign(CENTER, CENTER); textSize(40); fill(0);
  textStyle(NORMAL); 
  text("완성되었습니다!", width/2, 100);
  
  let contentY = height/2 + 20;
  
  // 1. 좌측: 내가 만든 이미지 썸네일
  if (finalResultImage) {
    imageMode(CENTER);
    let thumbH = 350;
    let thumbW = thumbH * (width / height);
    let thumbX = width/2 - 250; 
    
    // 폴라로이드 테두리 효과
    rectMode(CENTER); fill(255); stroke(200); strokeWeight(1);
    rect(thumbX, contentY, thumbW + 20, thumbH + 20); 
    
    image(finalResultImage, thumbX, contentY, thumbW, thumbH);
    noStroke(); fill(100); textSize(14);
    text("MY CARD", thumbX, contentY + thumbH/2 + 30);
  }

  // 2. 우측: QR 코드 영역
  let qrX = width/2 + 250;
  let qrSize = 200;
  
  // ★★ [TODO: 실제 QR 코드 이미지 렌더링] ★★
  // 현재는 네모 박스(Placeholder)입니다.
  // 서버에서 생성된 QR 이미지 URL을 로드하여 여기에 그려야 합니다.
  rectMode(CENTER); noFill(); stroke(0); strokeWeight(2);
  rect(qrX, contentY, qrSize, qrSize);
  
  fill(0); noStroke(); textSize(16);
  text("QR을 스캔하여 저장하세요", qrX, contentY + qrSize/2 + 30);

  drawButton(width/2, height - 100, 200, 60, "처음으로");
}

function drawNavButtons() {
  drawButton(80, 50, 100, 40, "< 뒤로");
  drawButton(width - 80, 50, 100, 40, "처음으로");
}