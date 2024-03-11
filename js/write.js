// 유저가 입력한 값들을 인스턴스 객체로 전달하여 저장 후 view.html로 넘어가기
// 데이터 기본 틀 만들기, 빈 값일 경우 에러 메시지 출력, 날짜 변환 함수, 글 작성 버튼(데이터 가져오기, 가져온 데이터를 사용하여 new Board의 새로운 객체 생성하고 push해주기, 저장하기, view.html페이지로 넘어가기)

const writeForm = document.querySelector("#write-form");

// 데이터 기본 틀 만들기
class Board {
  constructor(indexNum, subjectStr, writerStr, contentStr) {
    this.index = indexNum;
    this.Subject = subjectStr;
    this.Writer = writerStr;
    this.Content = contentStr;
    this.date = recordDate();
    this.views = -1;
    this.refresh = false;
  }

  // 빈 값일 경우 에러메시지 출력
  set Subject(value) {
    if (value.length === 0) throw new Error("제목을 입력해주세요.");
    this.subject = value;
  }

  set Writer(value) {
    if (value.length === 0) throw new Error("작성자를 입력해주세요.");
    this.writer = value;
  }

  set Content(value) {
    if (value.length === 0) throw new Error("내용을 입력해주세요.");
    this.content = value;
  }
}

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

// 글 작성 버튼(데이터 가져오기, 가져온 데이터를 사용하여 new Board의 새로운 객체 생성하고 push해주기, 저장하기, view.html페이지로 넘어가기)
const submitHandler = (e) => {
  e.preventDefault();
  const subject = e.target.subject.value;
  const writer = e.target.writer.value;
  const content = e.target.content.value;

  try {
    // new Board의 새로운 객체 생성하고 push하기
    const boardsObj = JSON.parse(localStorage.getItem("boards"));
    const index = boardsObj.length;
    const instance = new Board(index, subject, writer, content);
    boardsObj.push(instance);

    // 저장하고 view.html로 넘어가기
    const boardsStr = JSON.stringify(boardsObj);
    localStorage.setItem("boards", boardsStr);

    location.href = "/board/view.html?index=" + index;
  } catch (e) {
    alert(e.message);
    console.error(e);
  }
};

writeForm.addEventListener("submit", submitHandler);
