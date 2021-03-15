let res = []
let status = ['Expired', 'Low Stock']

let xhr = new XMLHttpRequest();

const headDiv = `
  <div class="head-div">
    <h5 class="id">ID</h5>
    <h5 class="name">Product Name</h5>
    <h5 class="brand">Product Brand</h5>
    <h5 class="exp">Expiry Date</h5>
    <h5 class="price">Unit Price</h5>
    <h5 class="stock">Stock</h5>
  </div>`

const productDiv = (pro, id) => `
  <div class="pro-card" id=${pro.id}>
    <h5 class="id">${pro["id"]}</h5>
    <h5 class="name">${pro["medicineName"]}</h5>
    <h5 class="brand">${pro["medicineBrand"]}</h5>
    <h5 class="exp">${pro["expiryDate"]}</h5>
    <h5 class="price">$${pro["unitPrice"]}</h5>
    <h5 class="stock">${pro["stock"]}</h5>
  </div>`

xhr.onreadystatechange = () => {
  if (xhr.readyState == 4 && xhr.status == 200) {
    res = JSON.parse(xhr.responseText);    
    console.log(res[0]);
    refreshMain(res);
  }
};

xhr.open(
  "GET",
  "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products",
  true
);

xhr.send();

const refreshMain = (res) => {
  let mainDiv = document.getElementById("main");
  mainDiv.innerHTML = headDiv;
  document.getElementById("list-count").innerHTML = res.length

  for (let id in res) {
    mainDiv.innerHTML += productDiv(res[id], id);
  }
}

const status_filter = document.getElementsByClassName("status")

for (let s of status_filter) {
  s.addEventListener("change",(e) => {
    if (e.target.checked) status.push(e.target.value)
    else status.splice(status.indexOf(e.target.value), 1)
    let res_filter = res
    
    if (!status.includes("Expired")) res_filter = res_filter.filter((s) => {
      let now = new Date();
      let exp = new Date(s.expiryDate);
      return now<exp;      
    })
    if (!status.includes("Low Stock")) res_filter = res_filter.filter((s) => s.stock>=100)
    
    refreshMain(res_filter)
  })
}
