const boardsStr = localStorage.getItem("boards");
const boardsObj = JSON.parse(boardsStr);

//url물음표 뒤에 있는 파라미터(쿼리스트링)을 변수 idx에 저장
const idx = location.search;
const index = idx.split("=")[1];
const board = boardsObj[index];
// 이전 페이지 주소
const beforeUrl = document.referrer;

// 조회수
if (!board.refresh) {
  // boards.refresh가 false일 때
  board.views++;
  // 조회수가 오르고
  board.refresh = true;
  // board.refresh의 값을 true로 바꿈
  const viewCountStr = JSON.stringify(boardsObj);
  // boardsObj를 json언어로 바꾼 데이터를 viewCountStr에 저장
  localStorage.setItem("boards", viewCountStr);
  // 지금까지의 데이터 저장
} else {
  // board.refresh의 값이 false가 아닐 경우
  if (beforeUrl === " ") {
    // 만약 이전 url이 빈 값이라면(페이지를 이동한 적 없다면)
    board.views++;
    // 조회수가 오르고
    const viewCountStr = JSON.stringify(boardsObj);
    localStorage.setItem("boards", viewCountStr);
    // 지금까지의 값을 저장한다.
  }
}

// 데이터 출력
const viewForm = document.querySelectorAll("#view-form > div");

for (let i = 0; i < viewForm.length; i++) {
  const id = viewForm[i].id;
  // viewForm[0].id는 subject, viewForm[1].id는 writer이다.
  viewForm[i].innerHTML += " " + board[id];
  // board[subject]는 유저가 입력한 제목의 값이다.
  // 따라서 view.html에 입력한 각각의 id값에 따라 유저가 입력한 value가 innerHTML로 적히게 된다.
}

// 수정 버튼
const modifyBtn = document.querySelector("#modify");

const modifyBtnHandler = (e) => {
  location = "/board/modify.html" + idx;
  // modify.html페이지로 이동한다. (idx는 쿼리스트링으로 저장되어 있음)
};

modifyBtn.addEventListener("click", modifyBtnHandler);

// 삭제 버튼
const deleteBtn = document.querySelector("#delete");

const deleteBtnHandler = (e) => {
  boardsObj.splice(index, 1);
  for (let i = 0; i < boardsObj.length; i++) {
    boardsObj[i].index = i;
  }

  const setBoardsStr = JSON.stringify(boardsObj);
  localStorage.setItem("boards", setBoardsStr);
  location.href = "/board/list.html";

  alert("삭제되었습니다.");
};

deleteBtn.addEventListener("click", deleteBtnHandler);
