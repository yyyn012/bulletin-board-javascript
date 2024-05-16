//    총 게시글 수
const totalPage = 100;

//  한 페이지 당 출력되는 게시글 갯수
const page_num = 5;

//   한번에 출력될 수 있는 최대 블록 수
// ex ) [1][2][3][4][5] -> 블록
const block_num = 5;

// 블록의 총 수를 계산한다.
let total_block = totalPage % 5 == 0 ? totalPage / 5 : totalPage / 5 + 1;

// 현재 블록 위치를 알려준다
let current_block = 1;

let data = new Board(index, subsect, writer, date, views);

//    게시글 데이터를 담고 있는 객체를 1000개 추가한다.
for (let i = 1; i <= totalPage; i++) {
  boardsStr.data[i] = {
    index: i,
    subject: subsect,
    writer: writer,
    date: recordDate(),
    views: views,
  };
}

// 게시글 데이터 출력하기
function post_data_print(block) {
  // 게시글 title 제외하고 모두 제거
  const post_list = document.querySelector("tbody");
  post_list.forEach(function (item) {
    item.remove();
  });

  // 게시글 출력 공간
  const notice_board = document.querySelector(".notice_board");

  // 출력 첫 페이지 번호
  let start = totalPage - page_num * (block - 1);

  for (let i = start; i >= 1 && i > start - page_num; i--) {
    notice_board.innerHTML += template(i, boardsObj[i]);
    boardsObj[i].refresh = false;
    const refreshStr = JSON.stringify(boardsObj);
    localStorage.setItem(BOARDS, refreshStr);
  }

  // post.appendChild(postTemplate);
}

// 블럭 출력하기
// 매개변수 : 가장 앞에 오는 블럭
function block_print(front_block) {
  /*
            1. 이전, 다음 블럭 속성 처리
            2. 기존 블럭 모두 삭제
            3. 범위 안의 블럭 생성 및 추가
            */

  // let front_block = current_block;

  // 이전으로 갈 블럭이 없으면
  if (front_block <= 1) {
    document.querySelector(".before_move").style.visibility = "hidden";
  } else {
    document.querySelector(".before_move").style.visibility = "visible";
  }

  // 다음으로 갈 블럭이 없으면
  if (front_block + block_num >= total_block) {
    document.querySelector(".next_move").style.visibility = "hidden";
  } else {
    document.querySelector(".next_move").style.visibility = "visible";
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
    let blockButton = document.createElement("button");
    blockButton.textContent = i;
    // 버튼을 클릭하면 게시글이 변경되는 이벤트 추가
    blockButton.addEventListener("click", function (event) {
      post_data_print(i);
    });
    // 블럭에 추가한다.
    block_box.appendChild(blockButton);
  }
}

function before() {
  block_print(current_block - block_num);
  console.log("이전");
}

function next() {
  block_print(current_block + block_num);
  console.log("다음");
}
