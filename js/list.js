// 데이터 가져오기, boards초기값 지정, pagination(데이터 배열로 저장하고 변수 지정 템플릿 생성, 마우스 오버 시 제목 글자 색 변경, 버튼에 따라 데이터 나눠서 보여주기, 버튼 출력, before 버튼/next 버튼, 새로고침 시 최근 글부터 보여주기)

// 데이터 가져오기
const BOARDS = "boards";
const boardsStr = localStorage.getItem(BOARDS);

// boards 초기값 지정
if (boardsStr === null) {
  const listStr = JSON.stringify([]);
  boardsStr = listStr;
  localStorage.setItem(BOARDS, listStr);
}

// pagination

// 데이터 배열로 저장하기
const boardsObj = JSON.parse(localStorage.getItem(BOARDS));

let totalPage = [];
for (let i = 0; i < boardsObj.length; i++) {
  totalPage.push(boardsObj[i]);
}

// pagination 변수 지정

let pageLength = totalPage.length;
let pageNum = 5;
let blockNum = 5;
let totalBlock = Math.ceil(pageLength / pageNum);

// 데이터 출력 함수
const template = (index, objValue) => {
  return `
      <tr 
      onClick="/board/view.html?index=${objValue.index}" 
      style="cursor:pointer;">
          <td>
            ${index + 1}
          </td>
          <td>
          <a
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
        </a>
      </tr>
        
      `;
};

// mouseover 시 글자 색 / 굵기 변경
// const mouseOver = (event) => {
//   event.target.style.color = "rgb(167, 215, 215)";
//   event.target.style.fontWeight = "700";
// };

// const mouseOut = (event) => {
//   event.target.style.color = "#000";
//   event.target.style.fontWeight = "500";
// };

// 버튼에 따라 데이터 나눠서 보여주는 함수
const noticeBoard = document.querySelector(".notice_board");

const sliceDataPrint = (block) => {
  while (noticeBoard.hasChildNodes()) {
    noticeBoard.removeChild(noticeBoard.lastChild);
  }

  // 화면에 pageNum만큼씩의 글 생성
  let startPage = pageLength - pageNum * (block - 1);

  for (let i = startPage; i >= 1 && i > startPage - pageNum; i--) {
    noticeBoard.innerHTML += template(i - 1, boardsObj[i - 1]);
    boardsObj[i - 1].refresh = false;
    const refreshStr = JSON.stringify(boardsObj);
    localStorage.setItem(BOARDS, refreshStr);
  }
};

// 버튼 출력
let page = 1;

const blockPrint = (frontBlock) => {
  page = frontBlock;
  const beforeBtn = document.querySelector(".before_btn");
  const nextBtn = document.querySelector(".next_btn");
  const HIDDEN = "hidden";
  const VISIBLE = "visible";

  if (frontBlock <= 1) {
    beforeBtn.style.visibility = HIDDEN;
  } else {
    beforeBtn.style.visibility = VISIBLE;
  }

  if (frontBlock + blockNum >= totalBlock) {
    nextBtn.style.visibility = HIDDEN;
  } else {
    nextBtn.style.visibility = VISIBLE;
  }

  let blockBox = document.querySelector(".block");
  blockBox.replaceChildren();

  // front_block부터 total_block 또는 block_num까지 버튼 생성 및 추가하기
  // frontBlock부터 totalBlock 또는 block_num까지 버튼 생성 및 추가하기
  for (let i = frontBlock; i <= totalBlock && i < frontBlock + blockNum; i++) {
    // 버튼 생성
    let pageButton = document.createElement("button");
    pageButton.textContent = i;

    // 버튼 클릭 시 게시글 변경
    pageButton.addEventListener("click", function (event) {
      sliceDataPrint(i);
    });

    blockBox.appendChild(pageButton);
  }
};

// before 버튼, next 버튼
function before() {
  blockPrint(page - blockNum);
}

function next() {
  blockPrint(page + blockNum);
}

// 새로고침 시 최근 글(버튼이 1인 경우)부터 보여주기
window.onload = () => {
  sliceDataPrint(1);
  blockPrint(1);
};
