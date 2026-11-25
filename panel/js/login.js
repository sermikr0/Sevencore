// Sign-in page for admins and managers.
const T = {
  uz: { brand_sub: "Davomat paneli", hero: "Har bir smena — <em>aniq</em>, har bir daqiqa — hisobda.",
    hero_sub: "Xodimlar Telegram'da Face ID bilan belgi qo'yadi. Siz bu yerda ko'rasiz, tuzatasiz va hisobot olasiz.",
    f1: "yuz va jonlilik", f2: "ofis hududi", f3: "jonli lenta", title: "Panelga kirish", sub: "Admin va menejerlar uchun",
    username: "Login", password: "Parol", enter: "Kirish", foot: "Akkauntni Super Admin yaratadi.", wait: "Tekshirilmoqda…",
    empty: "Login va parolni kiriting.", bad: "Login yoki parol noto'g'ri.", many: "Urinishlar ko'p. 10 daqiqadan keyin qayta urinib ko'ring.", net: "Server bilan aloqa yo'q. Qayta urinib ko'ring." },
  ru: { brand_sub: "Панель посещаемости", hero: "Каждая смена — <em>точно</em>, каждая минута — на учёте.",
    hero_sub: "Сотрудники отмечаются в Telegram по Face ID. Здесь вы видите, исправляете и получаете отчёты.",
    f1: "лицо и живость", f2: "зона офиса", f3: "лента в реальном времени", title: "Вход в панель", sub: "Для админов и менеджеров",
    username: "Логин", password: "Пароль", enter: "Войти", foot: "Аккаунт создаёт супер-админ.", wait: "Проверка…",
    empty: "Введите логин и пароль.", bad: "Неверный логин или пароль.", many: "Слишком много попыток. Повторите через 10 минут.", net: "Нет связи с сервером. Попробуйте ещё раз." },
  en: { brand_sub: "Attendance panel", hero: "Every shift <em>exact</em>, every minute counted.",
    hero_sub: "Employees check in on Telegram with Face ID. Here you see it, fix it and report on it.",
    f1: "face and liveness", f2: "office area", f3: "live feed", title: "Sign in to the panel", sub: "For admins and managers",
    username: "Username", password: "Password", enter: "Sign in", foot: "Accounts are created by the Super Admin.", wait: "Checking…",
    empty: "Enter your username and password.", bad: "Wrong username or password.", many: "Too many attempts. Try again in 10 minutes.", net: "Cannot reach the server. Please try again." },
};
let lang = "uz";
try { const l = localStorage.getItem("sc_panel_lang"); if (T[l]) lang = l; } catch (e) { /* ignore */ }

function paint() {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-t]").forEach(el => {
    const v = T[lang][el.dataset.t] || "";
    if (el.hasAttribute("data-html")) el.innerHTML = v; else el.textContent = v;
  });
  const row = document.getElementById("langs");
  row.innerHTML = Object.keys(T).map(l => `<button type="button" data-l="${l}" class="${l === lang ? "on" : ""}">${l.toUpperCase()}</button>`).join("");
  row.querySelectorAll("[data-l]").forEach(b => b.onclick = () => {
    lang = b.dataset.l;
    try { localStorage.setItem("sc_panel_lang", lang); } catch (e) { /* ignore */ }
    paint();
  });
}

const form = document.getElementById("form");
const err = document.getElementById("err");
const go = document.getElementById("go");
document.getElementById("eye").onclick = () => {
  const p = form.password; p.type = p.type === "password" ? "text" : "password"; p.focus();
};
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
    err.hidden = false;
  } catch (x) {
    err.textContent = T[lang].net; err.hidden = false;
  }
  go.disabled = false; go.textContent = T[lang].enter;
});
paint();
form.username.focus();
