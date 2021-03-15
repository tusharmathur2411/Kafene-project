let xhr = new XMLHttpRequest();

if (sessionStorage.getItem("user")) window.location.href = "./index.html";

const navbar = `
  <div class="topbar">
    <img src="https://cdn.glitch.com/d4d9084e-5368-43bf-8d30-a2e904e6fd97%2Flogo.58169365.png?v=1615791226167" />
    <span class="kafene">Kafene</span>
    <a id="/" href="/">Orders</a>
    <a id="/products.html" href="/products.html">Products</a>
    <a id="/users.html" href="/users.html">Users</a>
  </div>
  <div></div>
`
document.getElementById("nav").innerHTML = navbar;

xhr.onreadystatechange = () => {
  console.log(xhr.readyState);
  if (xhr.readyState === 4) {
    sessionStorage.setItem("user", JSON.parse(xhr.responseText)['username']);
    window.alert("Login Successful");
    window.location.href = "./index.html";
  }
};

const onLogin = (e) => {
  
  const username = document.getElementById("user").value
  const password = document.getElementById("password").value
  
  if (username === password && username) {
    
    xhr.open(
      "POST",
      "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/login",
      true
    );
    
    xhr.send({username, password});
  }
  else {
    // document.getElementById("error").style.display = "block";
    window.alert("Please enter valid credentials!");
  }
}

document.getElementById("submit").onclick = onLogin;