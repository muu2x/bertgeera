
document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");
  const passwordField = document.getElementById("passwordField");
  const errorMsg = document.getElementById("loginError");

  const showError = (text) => {
    if (!errorMsg) return;
    errorMsg.textContent = text;
    errorMsg.hidden = false;
  };
  const clearError = () => { if (errorMsg) errorMsg.hidden = true; };

  // The password IS the page name: typing 't-rex' opens 't-rex.html'.
  // Check the page exists before navigating, so a wrong guess reports back here
  // instead of dropping the visitor on the site's 404 page.
  const accessContent = async () => {
    const password = passwordField.value.trim().toLowerCase();
    clearError();

    if (password === "") {
      showError("Please enter a password.");
      passwordField.focus();
      return;
    }
    // plain page name only - no slashes, dots or absolute URLs
    if (!/^[a-z0-9][a-z0-9_-]*$/.test(password)) {
      showError("That password isn’t right — try again.");
      passwordField.select();
      return;
    }

    const target = password + ".html";
    loginBtn.disabled = true;
    try {
      const res = await fetch(target, { method: "HEAD" });
      if (res.ok) {
        window.location.href = target;
        return;
      }
    } catch (e) {
      // fetch blocked or offline: let the browser try the navigation instead
      window.location.href = target;
      return;
    }
    loginBtn.disabled = false;
    showError("That password isn’t right — try again.");
    passwordField.select();
  };

  // Trigger on button click
  loginBtn.addEventListener("click", accessContent);

  // Trigger on 'Enter' key press
  passwordField.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      accessContent();
    }
  });
  passwordField.addEventListener("input", clearError);
});
