// 데이터 가져오기, 조회수 설정, 데이터 출력, 수정(해당 수정 페이지로 이동), 삭제 버튼(삭제 후 인덱스 값 앞으로 당기기)

// 데이터 가져오기
const boardsObj = JSON.parse(localStorage.getItem("boards"));

const idx = location.search;
const index = idx.split("=")[1];
const board = boardsObj[index];

const beforeUrl = document.referrer;

// 조회수 설정
if (!board.refresh) {
  board.views++;
  board.refresh = true;
  const viewCountStr = JSON.stringify(boardsObj);
  localStorage.setItem("boards", viewCountStr);
} else {
  if (beforeUrl === " ") {
    board.views++;
    const viewCountStr = JSON.stringify(boardsObj);
    localStorage.setItem("boards", viewCountStr);
  }
}

// 데이터 출력
const viewFormList = document.querySelectorAll("#view-form > div");

for (let i = 0; i < viewFormList.length; i++) {
  const id = viewFormList[i].id;
  viewFormList[i].innerHTML += " " + board[id];
  const boardsStr = JSON.stringify(boardsObj);
  localStorage.setItem("boards", boardsStr);
}

// 수정 버튼
const modifyBtn = document.querySelector("#modify");

const modifyBtnHandler = (e) => {
  location.href = "/board/modify.html" + idx;
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
