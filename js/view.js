// 게시물 클릭 시 해당 게시물 보여주기(Read)

// 게시물 가져오기
const boardsStr = localStorage.getItem("boards");
const boardsObj = JSON.parse(boardsStr);

// 작성한 게시물 중 클릭한 게시물의 쿼리스트링을 가져오기 위해 location객체의 search속성 이용
const idx = location.search;

// 우리가 필요한 index=0 부분에서 0만 잘라내기 위해 split메서드 이용
const index = idx.split("=")[1];
const board = boardsObj[index];

const viewForm = document.querySelectorAll("#viewForm > div");

for (let i = 0; i < viewForm.length; i++) {
  const id = viewForm[i].id;
  viewForm[i].innerHTML += " " + board[id];
}
