let res = []
let status = ['Expired', 'Low Stock']

let xhr = new XMLHttpRequest();

const headDiv = `
  <div class="head-div">
    <h5 class="id">ID</h5>
    <h5 class="avatar">User Avatar</h5>
    <h5 class="name">Full Name</h5>
    <h5 class="dob">DoB</h5>
    <h5 class="gender">Gender</h5>
    <h5 class="location">Current Location</h5>
  </div>`

const usertDiv = (usr, id) => `
  <div class="user-card" id=${usr.id}>
    <h5 class="id">${usr["id"]}</h5>
    <div class="avatar"><img src="${usr["profilePic"]}"/></div>
    <h5 class="name">${usr["fullName"]}</h5>
    <h5 class="dob">${usr["dob"]}</h5>
    <h5 class="gender">${usr["gender"]}</h5>
    <h5 class="location">${usr["currentCity"]}, ${usr["currentCountry"]}</h5>
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
  "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users",
  true
);

xhr.send();

const refreshMain = (res) => {
  let mainDiv = document.getElementById("main");
  mainDiv.innerHTML = headDiv;
  // document.getElementById("list-count").innerHTML = res.length

  for (let id in res) {
    mainDiv.innerHTML += usertDiv(res[id], id);
  }
}

const searchInput = document.getElementById("search")

searchInput.addEventListener("search", (e) => {
  if (e.target.value.length >= 2) {
    xhr.open(
      "GET",
      "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users?fullName="+e.target.value,
      true
    );
    xhr.send();
  }
  else if (e.target.value !== "") window.alert("Please enter atleast 2 characters in the Search field");
})

searchInput.addEventListener("input", (e) => {
  if (e.target.value === "") {
    xhr.open(
      "GET",
      "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users",
      true
    );
    xhr.send();
  }
})

document.getElementById("reset").addEventListener("click", (e) => {
  if (e.target.value === "") {
    document.getElementById("search").value = ""
    xhr.open(
      "GET",
      "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users",
      true
    );
    xhr.send();
  }
})