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

// pagination
let totalPage = [];

for (let i = 0; i < boardsObj.length; i++) {
  totalPage.push(boardsObj[i]);
}

let pageLength = boardsObj.length - 1;
let pageNum = 5;
let blockNum = 5;
let totalBlock = totalPage % 5 == 0 ? totalPage / 5 : totalPage / 5 + 1;
let currentBlock = 1;

let dataBlock = [];

const sliceBoardsStr = () => {
  for (let i = 0; i <= pageLength; i += 5) {
    data = totalPage.slice(i, i + 5);

    // template(i, boardsObj[i]);

    for (let j = data.length - 1; j <= data.length; j--) {
      tbody.innerHTML += template(j, boardsObj[j]);
      boardsObj[j].refresh = false;
      const refreshStr = JSON.stringify(boardsObj);
      localStorage.setItem(BOARDS, refreshStr);
    }
  }
};

console.log(sliceBoardsStr());

// let dataPrint = (block) => {
//   tbody.remove();

//   let start = totalPage - pageNum * (block - 1);

//   for (let i = start; i >= 1 && i > start - pageNum; i--) {
//     tbody.innerHTML += template(i, boardsObj[i]);
//     boardsObj[i].refresh = false;
//     const refreshStr = JSON.stringify(boardsObj);
//     localStorage.setItem(BOARDS, refreshStr);
//   }
// };

// 게시글 데이터 출력하기

// function blockPrint(frontBlock) {
//   currentBlock = frontBlock;
//   const beforeBtn = document.querySelector(".before_move");
//   const nextBtn = document.querySelector(".next_move");

//   if (frontBlock <= 1) {
//     beforeBtn.style.visibility = "hidden";
//   } else {
//     beforeBtn.style.visibility = "visible";
//   }

// if (frontBlock + blockNum >= totalBlock) {
//   nextBtn.style.visibility = "hidden";
// } else {
//   nextBtn.style.visibility = "visible";
// }

// let blockBox = document.querySelector(".block");
// blockBox.replaceChildren();

// console.log("remove");

//front_block부터 total_block 또는 block_num까지 생성 및 추가
//   for (let i = frontBlock; i <= totalBlock && i < frontBlock + blockNum; i++) {
//     console.log("add element");

//     // 버튼을 생성한다.s
//     let pageButton = document.createElement("button");
//     pageButton.textContent = i;
//     // 버튼을 클릭하면 게시글이 변경되는 이벤트 추가
//     pageButton.addEventListener("click", function (event) {
//       pagePrint(i);
//     });
//     // 블럭에 추가한다.
//     blockBox.appendChild(pageButton);
//   }
// }

// function before() {
//   blockPrint(currentBlock - blockNum);
//   console.log("이전");
// }

// function next() {
//   blockPrint(currentBlock + blockNum);
//   console.log("다음");
// }
// // 화면 로드 시 실행되는 이벤트
// window.onload = function () {
//   dataPrint(1);
//   blockPrint(1);
// };
