const user = sessionStorage.getItem("user")

if (!user) window.location.href = "./login.html";

const navbar = `
  <div class="topbar">
    <img src="https://cdn.glitch.com/d4d9084e-5368-43bf-8d30-a2e904e6fd97%2Flogo.58169365.png?v=1615791226167" />
    <span class="kafene">Kafene</span>
    <a id="/" href="/">Orders</a>
    <a id="/products.html" href="/products.html">Products</a>
    <a id="/users.html" href="/users.html">Users</a>
  </div>
  <button onclick="onLogout(event)" id="logout">LogOut</button>
`

document.getElementById("nav").innerHTML = navbar;

const onLogout = (e) => {
  sessionStorage.setItem("user", "")
  window.location.href = "./login.html";  
}

document.getElementById(window.location.pathname==='/index.html'?'/':window.location.pathname).classList.add("green")