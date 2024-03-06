// 데이터 가져와서 게시글 출력하기, 빈 값 검사하기, 수정 완료 버튼(유저가 입력한 값 알맞은 자리에 넣어주고 저장하기), 뒤로 가기 버튼

// 데이터 가져오기
const modifyForm = document.querySelector("#modify-form");
const modifyFormList = document.querySelectorAll("#modify-form > div");
const idx = location.search;
const index = idx.split("=")[1];
const boardsObj = JSON.parse(localStorage.getItem("boards"));
const board = boardsObj[index];

// 게시글 데이터 값 출력하기
for (let i = 0; i < modifyFormList.length; i++) {
  const element = modifyFormList[i].childNodes[3];
  const id = element.name;
  element.value = board[id];
}

// 빈 값이 있는 지 검사하기
const isEmpty = (subject, writer, content) => {
  if (subject.length === 0) throw new Error("제목을 입력해주세요.");
  if (writer.length === 0) throw new Error("작성자를 입력해주세요.");
  if (content.length === 0) throw new Error("내용을 입력해주세요.");
};

// 수정 시 현재 날짜 반환하기
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

// 수정 완료 버튼 (유저가 입력한 값 알맞은 자리에 넣어주기)
const modifyBtnHandler = (e) => {
  e.preventDefault();
  const subject = e.target.subject.value;
  const writer = e.target.writer.value;
  const content = e.target.content.value;

  try {
    isEmpty(subject, writer, content);
    board.subject = subject;
    board.writer = writer;
    board.content = content;
    board.date = recordDate();

    const boardsStr = JSON.stringify(boardsObj);
    localStorage.setItem("boards", boardsStr);
    location.href = "/board/view.html" + idx;
  } catch (e) {
    alert(e.message);
    console.error(e);
  }
};

// 뒤로 가기 버튼
const backBtn = document.querySelector("#back");

const backBtnHandler = (e) => {
  location.href = document.referrer;
};

modifyForm.addEventListener("submit", modifyBtnHandler);
backBtn.addEventListener("click", backBtnHandler);
