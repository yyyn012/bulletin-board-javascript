// 데이터 가져오기, boards초기값 지정, 템플릿 생성 및 반영, 마우스 오버 시 제목 글자 색 변경

// 데이터 가져오기
const BOARDS = "boards";
const boardsStr = localStorage.getItem(BOARDS);

// boards 초기값 지정
if (boardsStr === null) {
  const listStr = JSON.stringify([]);
  boardsStr = listStr;
  localStorage.setItem(BOARDS, listStr);
}

// template 생성
const template = (index, objValue) => {
  return `
  <tr>
    <td>${index + 1}</td>
    <td>
      <a href="/board/view.html?index=${objValue.index}"
        onmouseover={mouseOver(event)}
        onmouseout={mouseOut(event)}
        style="
        display:inline-block;
        width:90px;
        "
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

// mouseover 시 글자 색 / 굵기 변경
const mouseOver = (event) => {
  event.target.style.color = "rgb(167, 215, 215)";
  event.target.style.fontWeight = "700";
};

const mouseOut = (event) => {
  event.target.style.color = "#000";
  event.target.style.fontWeight = "500";
};

// template 반영

const boardsObj = JSON.parse(localStorage.getItem(BOARDS));
const tbody = document.querySelector("tbody");

for (let i = 0; i < boardsObj.length; i++) {
  tbody.innerHTML += template(i, boardsObj[i]);
  boardsObj[i].refresh = false;
  const refreshStr = JSON.stringify(boardsObj);
  localStorage.setItem(BOARDS, refreshStr);
}

// pagination

let totalPage = boardsObj.length;
let page_num = 5;
let block_num = 5;
let total_block = totalPage % 5 == 0 ? totalPage / 5 : totalPage / 5 + 1;
let current_block = 1;

let block = document.querySelectorAll(".block");
let noticeBoard = document.querySelector(".notice_board");

// 페이지에 맞게 게시글 데이터 출력하는 함수
function pagePrint(block) {
  tbody.remove();
  console.log(template(0));

  for (let i = totalPage / 5; i < 0; i--) {
    tbody.innerHTML += template(i, boardsObj[i]);
  }

  // 게시글 가져오기
}

// pagePrint();

// 블럭 출력하기
// 매개변수 : 가장 앞에 오는 블럭
function blockPrint(front_block) {
  current_block = front_block;
  const beforeBtn = document.querySelector(".before_move");
  const nextBtn = document.querySelector(".next_move");

  if (front_block <= 1) {
    beforeBtn.style.visibility = "hidden";
  } else {
    beforeBtn.style.visibility = "visible";
  }

  // 다음으로 갈 블럭이 없으면
  if (front_block + block_num >= total_block) {
    nextBtn.style.visibility = "hidden";
  } else {
    nextBtn.style.visibility = "visible";
  }

  // 블럭을 추가할 공간
  let block_box = document.querySelector(".block");
  // 기존 블럭 모두 삭제
  block_box.replaceChildren();

  console.log("remove");

  //front_block부터 total_block 또는 block_num까지 생성 및 추가
  for (
    let i = front_block;
    i <= total_block && i < front_block + block_num;
    i++
  ) {
    console.log("add element");

    // 버튼을 생성한다.
    let pageButton = document.createElement("button");
    pageButton.textContent = i;
    // 버튼을 클릭하면 게시글이 변경되는 이벤트 추가
    pageButton.addEventListener("click", function (event) {
      pagePrint(i);
    });
    // 블럭에 추가한다.
    block_box.appendChild(pageButton);
  }
}

function before() {
  blockPrint(current_block - block_num);
  console.log("이전");
}

function next() {
  blockPrint(current_block + block_num);
  console.log("다음");
}
// 화면 로드 시 실행되는 이벤트
window.onload = function () {
  pagePrint(0);
  blockPrint(0);
};
