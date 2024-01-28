const writeForm = document.querySelector("#writeForm");

const submitHandler = (e) => {
  e.preventDefault();
  const subject = e.target.subject.value;
  const writer = e.target.writer.value;
  const content = e.target.content.value;

  console.log(subject);
  console.log(writer);
  console.log(content);
};

writeForm.addEventListener("submit", submitHandler);

class Board {
  constructor(indexNum, subjectStr, writerStr, contentStr) {
    this.index = indexNum;
    this.Subject = subjectStr;
    this.Writer = writerStr;
    this.Content = contentStr;
    this.date = recordDate();
    this.views = 0;
  }
  // 객체를 생성할 때 4개의 매개변수(indexNum, subjectStr, writerStr, contentStr)를 받아오고 각 속성에 맞춰 값을 할당해놓는다.

  set Subject(value) {
    if (value.length === 0) throw new Error("제목을 입력해주세요");
    this.subject = value;
  }
  //  setter로 매개 변수 subjectStr을 받게 되면 길이가 0이 아닌 지 검사하고 subject속성에 subjectStr 값이 할당된다.
  //  길이가 0이라면 예외를 발생시킨다.

  set Writer(value) {
    if (value.length === 0) throw new Error("작성자를 입력해주세요");
    this.writer = value;
  }

  set Content(value) {
    if (value.length === 0) throw new Error("내용을 입력해주세요");
    this.content = value;
  }
}

// recordDate()함수는 현재의 날짜를 계산(yyyy-mm-dd형식으로 반환)해주는 함수이다. date속성의 값이 된다.
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
