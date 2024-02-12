// 게시물 클릭 시 해당 게시물 보여주기(Read)

// 게시물 가져오기
const boardsStr = localStorage.getItem("boards");
const boardsObj = JSON.parse(boardsStr);

// 작성한 게시물 중 클릭한 게시물의 쿼리스트링을 가져오기 위해 location객체의 search속성 이용
const idx = location.search;

// index=0 부분에서 0만 잘라내기
const index = idx.split("=")[1];
const board = boardsObj[index];

// 조회수 구현
const beforeUrl = document.referrer;

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
const viewForm = document.querySelectorAll("#viewForm > div");
const subject = document.querySelector("#subject");
const writer = document.querySelector("#writer");
const date = document.querySelector("#date");
const content = document.querySelector("#content");

function paintViewForm() {
  const input = document.createElement("input");
  const textarea = document.createElement("textarea");
  subject.appendChild(input);
  writer.appendChild(input);
  date.appendChild(input);
  content.appendChild(textarea);
}

for (let i = 0; i < viewForm.length; i++) {
  const id = viewForm[i].id;
  viewForm[i].innerHTML += " " + board[id];
}

// 수정 버튼
const modifyBtn = document.querySelector("#modify");

const modifyBtnHandler = (e) => {
  location = "/board/modify.html" + idx;
};

modifyBtn.addEventListener("click", modifyBtnHandler);

// 삭제 버튼
const deleteBtn = document.querySelector("#delete");

console.log(boardsObj);
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
