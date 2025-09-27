/* 遊戲狀態 */
let state = {
    scene: "login",
    deaths: 0
};

/* ===== 工具函數 ===== */
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

/* 打字機效果 */
let typerTimer = null;
function typeWriter(el, text, speed = 34) {
    if (typerTimer) clearInterval(typerTimer);
    el.textContent = "";
    let i = 0;
    typerTimer = setInterval(() => {
        el.textContent += text.charAt(i++);
        if (i >= text.length) clearInterval(typerTimer);
    }, speed);
}

/* 重置畫面，避免重疊 */
function resetUI() {
    document.getElementById("choices").innerHTML = "";
    document.getElementById("choices").style.display = "none";
    document.getElementById("dialog-text").textContent = "";
    ["char-left", "char-right"].forEach(id => {
        const c = document.getElementById(id);
        c.classList.remove("active");
        c.style.display = "none";
    });
    // 移除小遊戲層
    document.querySelectorAll(".mini-game").forEach(el => el.remove());
}

/* ===== 初始化登入選單 ===== */
(function initLoginButtons() {
    const box = document.getElementById("login-choices");
    box.innerHTML = "";
    scenes.login.choices.forEach(choice => {
        const btn = document.createElement("button");
        btn.textContent = choice.text;
        btn.onclick = () => handleChoice(choice);
        box.appendChild(btn);
    });
})();

/* ===== 背景管理 ===== */
function setBackground(key) {
    const el = document.getElementById("bg");
    if (!key) {
        el.style.backgroundImage = "none";
        return;
    }
    const url = assets.bg[key];
    if (!url) {
        el.style.backgroundImage = "none";
        return;
    }
    const img = new Image();
    img.onload = () => (el.style.backgroundImage = `url('${url}')`);
    img.onerror = () =>
        (el.style.backgroundImage = "radial-gradient(1000px 800px at 50% 120%, #202020, #000)");
    img.src = url;
}

/* ===== 角色顯示（淡入） ===== */
function renderChar(id, who) {
    const wrap = document.getElementById(id);
    if (!who) {
        wrap.style.display = "none";
        wrap.classList.remove("active");
        return;
    }
    const url = assets.chars[who];
    const avatar = wrap.querySelector(".avatar");
    const name = wrap.querySelector(".name");

    const nameMap = {
        player: "郭益閎",
        mom: "媽媽",
        dad: "爸爸",
        teacher: "老師"
    };

    name.textContent = nameMap[who] || who;
    avatar.style.backgroundImage = url ? `url('${url}')` : "none";

    wrap.style.display = "flex";
    wrap.classList.remove("active");
    void wrap.offsetWidth; // 強制重繪，確保動畫觸發
    wrap.classList.add("active");
}

/* ===== 處理選項 ===== */
function handleChoice(choice) {
    // 死亡分支
    if (choice.death) {
        state.deaths++;
        scenes.death.text = choice.death;
        state.scene = "death";
        resetUI();
        renderScene();
        return;
    }

    // 特殊動作
    if (choice.action) choice.action();

    // 進入數學小遊戲
    if (choice.next === "MathGame") {
        resetUI();
        startMathGame(); // 來自 minigames.js
        return;
    }

    // 進入英文小遊戲
    if (choice.next === "englishGame") {
        resetUI();
        startEnglishGame(); // 來自 minigames.js
        return;
    }

    // 切換場景
    if (choice.next) {
        state.scene = choice.next;
        resetUI();
        renderScene();
    }
}

/* ===== 渲染場景 ===== */
function renderScene() {
    const s = scenes[state.scene];

    // 登入畫面顯示
    if (state.scene === "login") {
        document.getElementById("login-layer").style.display = "block";
        document.getElementById("bg").style.display = "none";
        document.getElementById("dialog").style.display = "none";
        return;
    } else {
        document.getElementById("login-layer").style.display = "none";
        document.getElementById("bg").style.display = "block";
        document.getElementById("dialog").style.display = "block";
    }

    // 設定背景與角色
    setBackground(s.bg);
    renderChar("char-left", s.left);
    renderChar("char-right", s.right);

    // 場景標題與文字
    document.getElementById("scene-title").textContent = s.title || "";
    const textEl = document.getElementById("dialog-text");
    const fullText = typeof s.text === "function" ? s.text() : (s.text || "");
    typeWriter(textEl, fullText, 30);

    // 選項
    const box = document.getElementById("choices");
    box.innerHTML = "";
    s.choices.forEach(c => {
        const b = document.createElement("button");
        b.className = "choice-btn";
        b.textContent = c.text;
        b.onclick = () => handleChoice(c);
        box.appendChild(b);
    });
    box.style.display = "flex";
}

/* ===== 初始執行 ===== */
renderScene();
