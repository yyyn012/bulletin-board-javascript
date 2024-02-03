// 게시물 클릭 시 해당 게시물 보여주기(Read)

// 게시물 가져오기
const boardsStr = localStorage.getItem("boards");
const boardsObj = JSON.parse(boardsStr);

// 작성한 게시물 중 클릭한 게시물의 쿼리스트링을 가져오기 위해 location객체의 search속성 이용
const idx = location.search;

// 우리가 필요한 index=0 부분에서 0만 잘라내기 위해 split메서드 이용
const index = idx.split("=")[1];
const board = boardsObj[index];

// 조회수 구현
const beforeUrl = document.referrer;
//  변수 beforeUrl을 선언하고 여기에 글 작성 직후 조회수가 올라가지 않도록 이전 페이지의 url이 담겨있는 document.referrer을 저장해준다.

// 조회수
const viewCount = (beforeUrl) => {
  if (beforeUrl.split("/").pop() === "list.html") {
    board.views++;
    const viewCountStr = JSON.stringify(boardsObj);
    localStorage.setItem("boards", viewCountStr);
  }
};
viewCount(beforeUrl);

// 데이터 출력
const viewForm = document.querySelectorAll("#viewForm > div");

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
};

deleteBtn.addEventListener("click", deleteBtnHandler);
