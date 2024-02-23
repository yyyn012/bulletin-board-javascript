let boardsStr = localStorage.getItem("boards");

// localStorage 초기값 지정
if (boardsStr === null) {
  const listStr = JSON.stringify([]);
  localStorage.setItem("boards", listStr);
  boardsStr = listStr;
}

const boardsObj = JSON.parse(boardsStr);

// 템플릿 생성
const template = (index, objValue) => {
  return `
  <tr>
  <td>${index + 1}</td>
  <td>
  <a 
  onmouseover={mouseOver(event)} 
  onmouseout={mouseOut(event)} 
  href="/board/view.html?index=${objValue.index}"
  >
  ${objValue.subject}
  </a>
  </td>
  <td>${objValue.writer}</td>
  <td>${objValue.date}</td>
  <td>${objValue.views}</td>
  </tr>
  `;
};

// 템플릿 반영
const tbody = document.querySelector("tbody");

for (let i = 0; i < boardsObj.length; i++) {
  tbody.innerHTML += template(i, boardsObj[i]);
  boardsObj[i].refresh = false;
  const refreshStr = JSON.stringify(boardsObj);
  localStorage.setItem("boards", refreshStr);
}

// mouse 호버 시 제목 글자 색 변경
const td = document.querySelectorAll("td");
const td_a = document.querySelectorAll("td > a");

function mouseOver(event) {
  event.target.style.color = "#ccc";
}

function mouseOut(event) {
  event.target.style.color = "#000";
}
