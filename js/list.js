// 데이터 가져오기, boards초기값 지정, 템플릿 생성 및 반영, 마우스 오버 시 제목 글자 색 변경
let boardsStr = localStorage.getItem("boards");

// boards가 빈 값인 경우 초기값 지정하기
if (boardsStr === null) {
  const listStr = JSON.stringify([]);
  // boards가 빈 값인 경우 초기값은 빈 배열이다.
  localStorage.setItem("boards", listStr);
  boardsStr = listStr;
}

const boardsObj = JSON.parse(boardsStr);
// boardsObj는 boardsStr의 자바스크립트 객체 버전이다.

// 템플릿 생성
const template = (index, objValue) => {
  return `
    <tr>
      <td>${index + 1}</td>
      <td>
        <a onmouseover={mouseOver(event)}
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
  // refresh가 false인 상태로 view.js로 가면 조회수가 +1이 된다.
  boardsObj[i].refresh = false;
  // 지금까지의 값 저장
  const refreshStr = JSON.stringify(boardsObj);
  localStorage.setItem("boards", refreshStr);
}

// mouseover 시 제목 글자 색 변경
function mouseOver(event) {
  event.target.style.color = "#ccc";
}

function mouseOut(event) {
  event.target.style.color = "#000";
}
