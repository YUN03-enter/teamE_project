// ==================================================================
// 6. 백엔드/API 연동 함수 (Backend Integration)
// ==================================================================

/**
 * ★★ [TODO 1: LLM 문장 생성 API 호출] ★★
 * 사용자의 선택(category, goal)을 서버로 보내고, 
 * 추천 문장 3개가 담긴 JSON을 받아와야 합니다.
 */
async function fetchSentencesFromLLM(selectionData) {
  console.log("▶ [API Request] 문장 생성 요청:", selectionData);
  
  /* [구현 가이드]
  try {
    const response = await fetch('/api/generate-sentences', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(selectionData)
    });
    const data = await response.json();
    recommendedSentences = data.sentences; // 응답 배열로 교체
    isDataLoaded = true; 
  } catch (error) {
    console.error("API Error:", error);
    // 에러 발생 시 기본 문장 사용 처리 필요
    isDataLoaded = true; 
  }
  */

  // ▼ [프로토타입용] 2초 뒤에 가짜 데이터가 도착했다고 가정
  setTimeout(() => {
    recommendedSentences = [
      `"${selectionData.goal}"을(를) 향한 당신의 열정을 응원합니다.`,
      "가장 아름다운 꽃은 끈기라는 뿌리에서 피어납니다.",
      "당신의 2026년은 그 어느 때보다 빛날 것입니다."
    ];
    console.log("▶ [API Response] 데이터 수신 완료:", recommendedSentences);
    isDataLoaded = true; 
  }, 2000);
}

/**
 * ★★ [TODO 2: 이미지 업로드 및 QR 생성] ★★
 * finalResultImage(p5.Graphics)를 서버에 업로드하고,
 * 그 URL을 담은 QR 코드를 생성해야 합니다.
 */
function uploadAndGenerateQR() {
  console.log("▶ [Server Request] 이미지 업로드 및 QR 생성 요청");
  
  /* [구현 가이드]
  finalResultImage.canvas.toBlob(async (blob) => {
    const formData = new FormData();
    formData.append('file', blob);
    
    // 서버 업로드 API 호출 (예: Cloudinary, Supabase Storage)
    // QR 코드 생성 API 호출
  });
  */
}