//    총 게시글 수
let totalPage = 1000;

//  한 페이지 당 출력되는 게시글 갯수
let page_num = 10;

//   한번에 출력될 수 있는 최대 블록 수
// ex ) [1][2][3][4][5] -> 블록
let block_num = 5;

// 블록의 총 수를 계산한다.
let total_block = totalPage % 5 == 0 ? totalPage / 5 : totalPage / 5 + 1;

// 현재 블록 위치를 알려준다
let current_block = 1;
/*
        게시글 데이터를 담고 있는 객체 배열
        번호 : data[게시글 번호].notice_num
        제목 : data[게시글 번호].title
        작성자 : data[게시글 번호].writer
        작성일 : data[게시글 번호].date_created
        조회 : data[게시글 번호].Lookkup_num
        좋아요 : data[게시글 번호].like
        */
let data = new Array();

// 게시글 데이터 출력하기
// 매개변수 : 선택 블럭
function post_data_print(block) {
  // 초기화
  // 게시글 title 제외하고 모두 제거
  // let post_list = document.querySelectorAll(".data_row");
  // post_list.forEach(function (item) {
  //   item.remove();
  // });

  // 게시글 출력 공간
  let notice_board = document.querySelector(".notice_board");
  // 출력 첫 페이지 번호
  let start = totalPage - page_num * (block - 1);
}

// 블럭 출력하기
// 매개변수 : 가장 앞에 오는 블럭
function block_print(front_block) {
  /*
            1. 이전, 다음 블럭 속성 처리
            2. 기존 블럭 모두 삭제
            3. 범위 안의 블럭 생성 및 추가
            */
  current_block = front_block;

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
    let button = document.createElement("button");
    button.textContent = i;
    // 버튼을 클릭하면 게시글이 변경되는 이벤트 추가
    button.addEventListener("click", function (event) {
      post_data_print(i);
    });
    // 블럭에 추가한다.
    block_box.appendChild(button);
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
// 화면 로드 시 실행되는 이벤트
window.onload = function () {
  // 게시글 데이터 출력하기
  post_data_print(1);

  // 블럭 출력하기
  block_print(1);
};
