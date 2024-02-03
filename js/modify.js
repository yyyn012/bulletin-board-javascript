const modifyForm = document.querySelector("#modifyForm");
const modifyFormList = document.querySelectorAll("#modifyForm > div");

// location.search를 이용해 이전 페이지에서 넘겨준 인덱스 받아오기
const idx = location.search;
const index = location.search.split("=")[1];
const boardsObj = JSON.parse(localStorage.getItem("boards"));
const board = boardsObj[index];

console.log(boardsObj[index]);
//수정하기 전 데이터가 미리 들어가야 할 위치 찾기
for (let i = 0; i < modifyFormList.length; i++) {
  const element = modifyFormList[i].childNodes[1];
  const id = element.name;
  element.value = board[id];
}

// 빈 값이 있는 지 체크
const isEmpty = (subject, writer, content) => {
  if (subject.length === 0) throw new Error("제목을 입력해주세요");
  if (writer.length === 0) throw new Error("작성자를 입력해주세요");
  if (content.length === 0) throw new Error("내용을 입력해주세요");
};

// 수정완료를 눌렀을 때 input박스와 textarea의 값들 가져오기
const modifyHandler = (e) => {
  e.preventDefault();
  const subject = e.target.subject.value;
  const writer = e.target.writer.value;
  const content = e.target.content.value;

  try {
    isEmpty(subject, writer, content);

    // 수정한 값들을 boards에 저장
    board.subject = subject;
    board.writer = writer;
    board.content = content;

    const boardsStr = JSON.stringify(boardsObj);
    localStorage.setItem("boards", boardsStr);

    // view 페이지로 이동
    location.href = "/board/view.html" + idx;
  } catch (e) {
    alert(e.message);
    console.error(e);
  }
};

const backBtn = document.querySelector("#back");

const backBtnHandler = (e) => {
  location.href = document.referrer;
};

modifyForm.addEventListener("submit", modifyHandler);
backBtn.addEventListener("click", backBtnHandler);
