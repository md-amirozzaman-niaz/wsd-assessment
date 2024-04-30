const form = document.getElementById("yourFormId");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent default form submission

  const formData = new FormData(form);
  fetch("http://localhost:3001/api/v1/register", {
    method: "POST",
    body: JSON.stringify({
      userName: "admin@ayro.com",
      email: "md.amirozzaman@gmail.com",
      password: "123456",
      redirectUrl: "http://localhost:3000/sso/",
      csrf_token: "csrf_test_token",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(({ redirectUrl, accessToken, refreshToken }) => {
      window.location = `${redirectUrl}?accessToken=${accessToken}&refreshToken=${refreshToken})`;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
