const rowsPerPage = 7;
const rows = document.querySelectorAll("#page-table tbody tr");
const rowsCount = rows.length;
const pageCount = Math.ceil(rowsCount / rowsPerPage);
const numbers = document.querySelector("#numbers");

for (let i = 1; i < pageCount.length; i++) {
  numbers.innerHTML += `<li><a href="">${i}</a></li>`;
}

const numberBtn = numbers.querySelectorAll("a");
console.log(numberBtn);

numberBtn.forEach((item, idx) => {
  item.addEventListener("click", (e) => {
    for (let num of numberBtn) {
      num.classList.remove("active");
    }
    e.target.classList.add("active");
  });
});
