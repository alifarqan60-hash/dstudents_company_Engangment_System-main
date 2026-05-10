const email = "admin@dataverse.com";
const password = "12345678";

fetch("http://localhost:4000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
})
    .then(res => res.json())
    .then(data => console.log("Login response:", data))
    .catch(err => console.error(err));
