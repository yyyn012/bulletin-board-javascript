const BOARDS = "boards";
const boardsStr = localStorage.getItem(BOARDS);

if (boardsStr) {
  BOARDS = JSON.parse(boardsStr);
  //만약 boardsStr가 있다면 로컬 스토리지에서 가져온 데이터로 할당
} else {
  data = boardsStr.slice();
} // boardsStr가 없으면 data는 더미 데이터를 복사한 그대로. [{글1}. {글2}]

// 더미 데이터를 쌓기 위한 DOM을 세팅하는 작업 (게시판 속 글 1개의 형식)
