// 데이터 가져오기, 조회수 설정, 데이터 출력, 수정(해당 수정 페이지로 이동), 삭제 버튼(삭제 후 인덱스 값 앞으로 당기기)

// 데이터 가져오기
const boardsStr = localStorage.getItem("boards");
const boardsObj = JSON.parse(boardsStr);

// idx에 쿼리스트링 저장
const idx = location.search;
const index = idx.split("=")[1];
const board = boardsObj[index];
// beforeUrl에 이전 url 저장
const beforeUrl = document.referrer;

// 조회수 설정
if (!board.refresh) {
  board.views++;
  board.refresh = true;
  // 새로고침 시에도 값이 true이기 때문에 조회수가 오르지 않음
  const viewCountStr = JSON.stringify(boardsObj);
  localStorage.setItem("boards", viewCountStr);
} else {
  if (beforeUrl === " ") {
    // url을 직접 입력하여 들어온 경우 조회수 증가 후 저장
    board.views++;
    const viewCountStr = JSON.stringify(boardsObj);
    localStorage.setItem("boards", viewCountStr);
  }
}

// 데이터 출력
const viewFrmDiv = document.querySelectorAll("#view-form > div");

for (let i = 0; i < viewFrmDiv.length; i++) {
  const id = viewFrmDiv[i].id;
  viewFrmDiv[i].innerHTML += " " + board[id];
}
// i가 0일 경우
// viewFrmDiv[0]은 view-form의 첫번째 div이다.
// id = viewFrmDiv[0].id = subject이다.
// board[id]는 boardsObj[0][subject]이다.
// 따라서 유저가 subject div에 작성한 값이 viewFrmDiv[0]에 출력된다.

// 수정 버튼
const modifyBtn = document.querySelector("#modify");

const modifyBtnHandler = (e) => {
  location = "/board/modify.html" + idx;
  // 현재 보고 있는 페이지의 쿼리스트링이 idx에 저장되어 바로 해당 페이지의 modify.html페이지로 이동하게 된다.
};

modifyBtn.addEventListener("click", modifyBtnHandler);

// 삭제 버튼
const deleteBtn = document.querySelector("#delete");

const deleteBtnHandler = (e) => {
  boardsObj.splice(index, 1);
  // 이벤트가 일어난 boardsObj의 index값이 삭제된다.

  // 삭제된 인덱스를 제외하고 인덱스 값을 앞으로 한 칸씩 당겨준다.
  for (let i = 0; i < boardsObj.length; i++) {
    boardsObj[i].index = i;
  }

  // 데이터 저장
  const setBoardStr = JSON.stringify(boardsObj);
  localStorage.setItem("boards", setBoardStr);

  // list.html로 이동
  location.href = "/board/list.html";

  alert("삭제되었습니다.");
};

deleteBtn.addEventListener("click", deleteBtnHandler);
