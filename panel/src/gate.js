// Sign-in page.
import { GLYPH } from "./ui/icons.js";

const T = {
  uz: { brand: "davomat tizimi", title: "Xush kelibsiz <b>ichkariga</b>", sub: "Admin va menejerlar uchun boshqaruv paneli", login: "Login", pw: "Parol",
    enter: "Kirish", foot: "Akkauntni Super Admin beradi", wait: "Tekshirilmoqda…", empty: "Login va parolni kiriting",
    bad: "Login yoki parol noto'g'ri", many: "Urinishlar ko'p. 10 daqiqadan keyin qayta urinib ko'ring", net: "Server bilan aloqa yo'q" },
  ru: { brand: "учёт посещаемости", title: "Добро пожаловать <b>внутрь</b>", sub: "Панель для админов и менеджеров", login: "Логин", pw: "Пароль",
    enter: "Войти", foot: "Аккаунт выдаёт супер-админ", wait: "Проверка…", empty: "Введите логин и пароль",
    bad: "Неверный логин или пароль", many: "Слишком много попыток. Повторите через 10 минут", net: "Нет связи с сервером" },
  en: { brand: "attendance system", title: "Welcome <b>inside</b>", sub: "Control panel for admins and managers", login: "Username", pw: "Password",
    enter: "Sign in", foot: "Accounts come from the Super Admin", wait: "Checking…", empty: "Enter your username and password",
    bad: "Wrong username or password", many: "Too many attempts. Try again in 10 minutes", net: "Cannot reach the server" },
};
let lang = "uz";
try { const l = localStorage.getItem("sevencore.lang"); if (T[l]) lang = l; } catch (e) { /* ignore */ }
document.getElementById("glyph").innerHTML = GLYPH;

function paint() {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-t]").forEach(el => {
    const v = T[lang][el.dataset.t] || "";
    if (el.hasAttribute("data-rich")) { el.textContent = ""; const [a, b] = v.split("<b>"); el.append(a); if (b) { const s = document.createElement("b"); s.textContent = b.replace("</b>", ""); el.append(s); } }
    else el.textContent = v;
  });
  const box = document.getElementById("langs");
  box.replaceChildren(...Object.keys(T).map(l => {
    const b = document.createElement("button");
    b.type = "button"; b.textContent = l.toUpperCase(); if (l === lang) b.className = "on";
    b.onclick = () => { lang = l; try { localStorage.setItem("sevencore.lang", l); } catch (e) { /* ignore */ } paint(); };
    return b;
  }));
}

const form = document.getElementById("form"), err = document.getElementById("err"), go = document.getElementById("go");
document.getElementById("eye").onclick = () => { form.password.type = form.password.type === "password" ? "text" : "password"; form.password.focus(); };
form.addEventListener("submit", async e => {
  e.preventDefault();
  err.hidden = true;
  const username = form.username.value.trim(), password = form.password.value;
  if (!username || !password) { err.textContent = T[lang].empty; err.hidden = false; return; }
  go.disabled = true; go.textContent = T[lang].wait;
  try {
    const res = await fetch("/auth/login", { method: "POST", credentials: "same-origin",
      headers: { "Content-Type": "application/json", "X-Requested-With": "sevencore" }, body: JSON.stringify({ username, password }) });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.ok) { location.replace(data.redirect || "/app"); return; }
    err.textContent = res.status === 401 ? T[lang].bad : res.status === 429 ? T[lang].many : (data.message || T[lang].net);
  } catch (x) { err.textContent = T[lang].net; }
  err.hidden = false; go.disabled = false; go.textContent = T[lang].enter;
});
paint();
form.username.focus();
