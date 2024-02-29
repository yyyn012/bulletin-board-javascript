const modifyForm = document.querySelector("#modify-form");
const modifyFrmList = document.querySelectorAll("#modify-form > div");
const idx = location.search;
const index = location.search.split("=")[1];
const boardsObj = JSON.parse(localStorage.getItem("boards"));
const board = boardsObj[index];

// 게시글 데이터 값 출력
for (let i = 0; i < modifyFrmList.length; i++) {
  const element = modifyFrmList[i].childNodes[3];
  const id = element.name;
  element.value = board[id];
}

// 작성한 입력 값이 빈 값인 지 검사
const isEmpty = (subject, writer, content) => {
  if (subject.length === 0) throw new Error("제목을 입력하세요.");
  if (writer.length === 0) throw new Error("작성자를 입력하세요.");
  if (content.length === 0) throw new Error("내용을 입력하세요.");
};

// 날짜 변환 함수
const recordDate = () => {
  const date = new Date();
  const yyyy = date.getFullYear();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();

  mm = (mm > 9 ? "" : 0) + mm;
  dd = (dd > 9 ? "" : 0) + dd;

  const arr = [yyyy, mm, dd];

  return arr.join("-");
};

// 수정 완료 버튼
const modifyHandler = (e) => {
  e.preventDefault();
  const subject = e.target.subject.value;
  const writer = e.target.writer.value;
  const content = e.target.content.value;

  try {
    isEmpty(subject, writer, content);
    board.subject = subject;
    board.writer = writer;
    board.content = content;

    const boardsStr = JSON.stringify(boardsObj);
    localStorage.setItem("boards", boardsStr);
    location.href = "/board/view.html" + idx;
  } catch (e) {
    alert(e.message);
    console.error(e);
  }
};

//  뒤로 가기 버튼
const backBtn = document.querySelector("#back");
const backBtnHandler = (e) => {
  location.href = document.referrer;
};

modifyForm.addEventListener("submit", modifyHandler);
backBtn.addEventListener("click", backBtnHandler);
