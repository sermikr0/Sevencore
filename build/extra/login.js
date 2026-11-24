(function () {
  "use strict";
  var form = document.getElementById("login");
  var box = document.getElementById("error");
  var text = document.getElementById("error-text");
  var submit = document.getElementById("submit");
  var label = submit.innerHTML;
  var pw = form.elements.password;

  // a fresh sign-in must not inherit a previous browser session of the app
  try {
    sessionStorage.removeItem("7core_admin_user");
    localStorage.removeItem("7core_manager_session");
    localStorage.removeItem("7core_dev_session");
  } catch (e) { /* storage blocked */ }

  document.getElementById("toggle").addEventListener("click", function () {
    var show = pw.type === "password";
    pw.type = show ? "text" : "password";
    this.classList.toggle("on", show);
    this.setAttribute("aria-label", show ? "Hide password" : "Show password");
    pw.focus();
  });

  function fail(message) {
    text.textContent = message;
    box.hidden = false;
  }

  form.addEventListener("input", function () { box.hidden = true; });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var username = form.elements.username.value.trim();
    if (!username || !pw.value) { fail("Enter your username and password."); return; }
    submit.disabled = true;
    submit.innerHTML = '<span class="spinner"></span>';
    fetch("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Requested-With": "sevencore" },
      body: JSON.stringify({ username: username, password: pw.value })
    }).then(function (res) {
      return res.json().catch(function () { return {}; }).then(function (body) {
        if (res.ok && body.redirect) { location.replace(body.redirect); return; }
        fail(body.message || "Sign-in failed.");
        submit.disabled = false; submit.innerHTML = label; pw.select();
      });
    }).catch(function () {
      fail("The server is not reachable.");
      submit.disabled = false; submit.innerHTML = label;
    });
  });
}());
