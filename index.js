let res = []

let status = ['New', 'Packed', 'InTransit', 'Delivered']

let xhr = new XMLHttpRequest();

const headDiv = `
  <div class="head-div">
    <h5 class="id">ID</h5>
    <h5 class="name">Customer</h5>
    <h5 class="date">Date</h5>
    <h5 class="amt">Amount</h5>
    <h5 class="status">Status</h5>
  </div>`

const orderDiv = (ord, id) => `
  <div class="order-card" id=${ord.id}>
    <h5 class="id">${ord["id"]}</h5>
    <h5 class="name">${ord["customerName"]}</h5>
    <h5 class="date">${ord["orderDate"]}<br/>${ord["orderTime"]}</h5>
    <h5 class="amt">$${ord["amount"]}</h5>
    <h5 class="status">${ord["orderStatus"]}</h5>
  </div>`

xhr.onreadystatechange = () => {
  if (xhr.readyState == 4 && xhr.status == 200) {
    res = JSON.parse(xhr.responseText);
    refreshMain(res);
  }
};

xhr.open(
  "GET",
  "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders",
  true
);

xhr.send();

const refreshMain = (res) => {
  let mainDiv = document.getElementById("main");
  mainDiv.innerHTML = headDiv;
  document.getElementById("list-count").innerHTML = res.length

  for (let id in res) {
    mainDiv.innerHTML += orderDiv(res[id], id);
  }
}

const status_filter = document.getElementsByClassName("status")

for (let s of status_filter) {
  s.addEventListener("change",(e) => {
    if (e.target.checked) status.push(e.target.value)
    else status.splice(status.indexOf(e.target.value), 1)
    refreshMain(res.filter((s) => status.includes(s.orderStatus)))
  })
  
}
