let boardsStr = localStorage.getItem("boards");

if (boardsStr === null) {
  const listStr = JSON.stringify([]);
  localStorage.setItem("boards", listStr);
  boardsStr = listStr;
}

const boardsObj = JSON.parse(boardsStr);

// 두 개의 매개 변수를 생성하여 boards의 데이터에 있는 값들이 들어갈 수 있도록 하는 함수
const template = (index, objValue) => {
  return `
  <tr>
  <td>${index + 1}</td>
  <td>
    <a href = "/board/view.html?index=${objValue.index}">
    ${objValue.subject}
    </a>    
  </td>
  <td>${objValue.writer}</td>
  <td>${objValue.date}</td>
  <td>${objValue.views}</td>
  </tr>
  `;
};
// 글제목(objValue.subject)을 클릭하면 해당 게시물로 이동할 수 있도록 a태그 안에 url을 입력해준다.
// 몇 번째 게시물을 클릭했는 지 알려주기 위해 (a태그 안에 입력한 url안에) objValue.index를 매개변수로 데이터의 인덱스를 넘겨준다.

const tbody = document.querySelector("tbody");

for (let i = 0; i < boardsObj.length; i++) {
  tbody.innerHTML += template(i, boardsObj[i]);
  console.log(template(i, boardsObj[i]));
}

// template함수에서 index와 objVaule를 받을 수 있도록 했다.
// index는 list페이지에서 보여줄 데이터의 순서로 실제 boards안의 index를 의미하지는 않는다.
// objVaule는 i 값에 해당하는 index에 위치한 boards 안에 있는 데이터를 의미한다.
