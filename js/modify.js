// 데이터 가져와서 게시글 출력하기, 빈 값 검사하기, 유저가 입력한 값 알맞은 자리에 넣어주고 저장하기, 뒤로 가기 버튼

// 데이터 가져오기
const modifyForm = document.querySelector("#modify-form");
const modifyFrmList = document.querySelectorAll("#modify-form > div");
const idx = location.search;
const index = idx.split("=")[1];
const boardsObj = JSON.parse(localStorage.getItem("boards"));
const board = boardsObj[index];

// 빈 값이 있는 지 체크
const isEmpty = (subject, writer, content) => {
  if (subject.length === 0) throw new Error("제목을 입력해주세요.");
  if (writer.length === 0) throw new Error("작성자를 입력해주세요.");
  if (content.length === 0) throw new Error("내용을 입력해주세요.");
};

// 수정 시 현재 날짜 반영
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
