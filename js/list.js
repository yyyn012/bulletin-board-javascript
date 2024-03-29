// 데이터 가져오기, boards초기값 지정, 템플릿 생성 및 반영, 마우스 오버 시 제목 글자 색 변경

// 데이터 가져오기
const BOARDS = "boards";
let boardsStr = localStorage.getItem(BOARDS);

// boards 초기값 지정
if (boardsStr === null) {
  const listStr = JSON.stringify([]);
  boardsStr = listStr;
  localStorage.setItem(BOARDS, listStr);
}

const boardsObj = JSON.parse(boardsStr);

// template 생성
const template = (index, objValue) => {
  return `
    <tr>
      <td>${index + 1}</td>
      <td>
        <a href="/board/view.html?index=${objValue.index}"
        onmouseover={mouseOver(event)}
        onmouseout={mouseOut(event)}
        >${objValue.subject}</a>
      </td>
      <td>${objValue.writer}</td>
      <td>${objValue.date}</td>
      <td>${objValue.views}</td>
    </tr>
  `;
};

// mouseover 시 글자 색 변경
const mouseOver = (event) => {
  event.target.style.color = "#ccc";
};

const mouseOut = (event) => {
  event.target.style.color = "#000";
};

// template 반영
const tbody = document.querySelector("tbody");

for (let i = 0; i < boardsObj.length; i++) {
  tbody.innerHTML += template(i, boardsObj[i]);
  boardsObj[i].refresh = false;
  const refreshStr = JSON.stringify(boardsObj);
  localStorage.setItem(BOARDS, refreshStr);
}
