const signUpBtn = document.querySelector("#signUpBtn");
const signInBtn = document.querySelector("#signInBtn");
const logOutBtn = document.querySelector("#logOutBtn");
const createVisitBtn = document.querySelector("#createVisitBtn");

const token = JSON.parse(localStorage.getItem("authToken"));

if (!token) {
  signUpBtn.classList = "btn btn-primary";
  signInBtn.classList = "btn btn-outline-success";
}

if (token) {
  logOutBtn.classList = "btn btn-danger";
  createVisitBtn.classList = "btn btn-outline-success";
}

logOutBtn.addEventListener("click", () => {
  localStorage.clear();
  logOutBtn.classList = "btn btn-danger d-none";
  createVisitBtn.classList = "btn btn-outline-success d-none";
  signUpBtn.classList = "btn btn-primary";
  signInBtn.classList = "btn btn-outline-success";
  window.location.reload();
});

signInBtn.addEventListener("click", () => {
  const signInSubmit = document.querySelector("#signInSubmit");
  signInSubmit.addEventListener("click", () => {
    const emailInput = document.querySelector("#inputEmail").value;
    const passwordInput = document.querySelector("#inputPassword").value;
    if (emailInput && passwordInput) {
      fetch("https://ajax.test-danit.com/api/v2/cards/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailInput, password: passwordInput }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.text();
        })
        .then((token) => {
          localStorage.setItem("authToken", JSON.stringify(token));
          signUpBtn.classList = "btn btn-primary d-none";
          signInBtn.classList = "btn btn-outline-success d-none";
          logOutBtn.classList = "btn btn-danger";
          createVisitBtn.classList = "btn btn-outline-success";
          // Do any other operations after successful login here
          window.location.reload();
        })
        .catch((error) => {
          // Handle the error
          console.error("Error:", error);
          alert("Error occurred during login. Please try again later.");
        });
    } else {
      alert("Fill in both email and password fields.");
    }
  });
});
