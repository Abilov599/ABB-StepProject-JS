const signInBtn = document.querySelector("#signInBtn");
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
          // Do any other operations after successful login here
          window.location.href = "index.html";
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
