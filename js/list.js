// 키 값(boards)로 데이터 가져오기
let boardsStr = localStorage.getItem("boards");

// boards가 빈 값인 경우 초기값 지정하기
if (boardsStr === null) {
  const listStr = JSON.stringify([]);
  localStorage.setItem("boards", listStr);
  boardsStr = listStr;
}
// boards가 빈 값인 경우 초기값은 빈 배열이다.

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
  // tbody에 boardsObj의 길이만큼 템플릿 반영
  boardsObj[i].refresh = false;
  // 템플릿 반영 시 조회수가 올라가는 것을 막기 위해 refresh의 값을 false로 지정
  const refreshStr = JSON.stringify(boardsObj);
  // boardsObj를 json 객체로 변경
  localStorage.setItem("boards", refreshStr);
  // localStorage에 지금까지의 데이터를 저장하기 위해 키 boards와 값 refreshStr 저장
}

// mouseover 시 제목 글자 색 변경
function mouseOver(event) {
  event.target.style.color = "#ccc";
}

function mouseOut(event) {
  event.target.style.color = "#000";
}
