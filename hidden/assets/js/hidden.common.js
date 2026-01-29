
document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");
  const passwordField = document.getElementById("passwordField");

  // Function to handle redirect
  const accessContent = () => {
      const password = passwordField.value.trim().toLowerCase();

      if (password === "") {
          alert("Please enter a password!");
          return;
      }

      // Redirects to [password].html
      // Example: typing 't-rex' will try to open 't-rex.html'
      window.location.href = password + ".html";
  };

  // Trigger on button click
  loginBtn.addEventListener("click", accessContent);

  // Trigger on 'Enter' key press
  passwordField.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
          accessContent();
      }
  });
});