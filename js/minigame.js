/* ========== 小遊戲：實數與簡單代數混合題 ========== */

/* 啟動數學遊戲 */
function startMathGame() {
    const root = document.getElementById("game-root");
    const layer = document.createElement("div");
    layer.className = "mini-game";
    layer.innerHTML = `
    <div class="mini-card">
      <div class="mini-title">✨ 保命題（10 題全對才過）</div>
      <div class="mini-question" id="mq"></div>
      <div class="mini-options" id="mo"></div>
      <div class="mini-progress" id="mp"></div>
    </div>`;
    root.appendChild(layer);

    let correct = 0;
    renderQ();

    /** 渲染題目 */
    function renderQ() {
        const { q, ans, options } = genAlgebraQ();
        document.getElementById("mq").textContent = q;
        const mo = document.getElementById("mo");
        mo.innerHTML = "";

        options.forEach((opt, i) => {
            const b = document.createElement("button");
            b.className = "mini-btn";
            b.textContent = `${"ABCD"[i]}. ${opt}`;
            b.onclick = () => {
                if (opt === ans) {
                    correct++;
                    if (correct >= 10) {
                        root.removeChild(layer);
                        state.scene = "lunch"; // 完成後回到劇情
                        resetUI();
                        renderScene();
                        return;
                    }
                    document.getElementById("mp").textContent = `正確！還差 ${10 - correct} 題`;
                    renderQ();
                } else {
                    root.removeChild(layer);
                    state.deaths++;
                    scenes.death.text = "亞服特色：錯一題 = 回家躺平。🪦【算錯一題，人生 Game Over】";
                    state.scene = "death";
                    resetUI();
                    renderScene();
                }
            };
            mo.appendChild(b);
        });
        document.getElementById("mp").textContent = `目前連對：${correct} / 10`;
    }
}

/** 生成實數與簡單代數題目 */
function genAlgebraQ() {
    const types = ["arithmetic", "algebra1", "algebra2"];
    const pick = types[rand(0, types.length - 1)];

    if (pick === "arithmetic") {
        return genRealQ(); // 純實數題
    } else if (pick === "algebra1") {
        return genSolveForX(); // 單變數 x
    } else {
        return genSolveForXY(); // 簡單代入兩個變數
    }
}

/* ===== 1. 基本實數題 ===== */
function genRealQ() {
    const ops = ["+", "-", "×", "÷"];
    const op = ops[rand(0, ops.length - 1)];

    let a = rand(2, 20);
    let b = rand(2, 20);
    let ans = 0;

    if (op === "+") {
        ans = a + b;
    } else if (op === "-") {
        if (b > a) [a, b] = [b, a];
        ans = a - b;
    } else if (op === "×") {
        ans = a * b;
    } else if (op === "÷") {
        // 保證整除
        b = rand(2, 9);
        ans = rand(2, 12);
        a = ans * b;
    }

    const q = `${a} ${op} ${b} = ?`;

    // 干擾選項
    const wrongOptions = [];
    while (wrongOptions.length < 3) {
        let w = ans + rand(-3, 3);
        if (w !== ans && w >= 0 && !wrongOptions.includes(w)) {
            wrongOptions.push(w);
        }
    }

    const options = shuffle([ans, ...wrongOptions]).slice(0, 4);
    return { q, ans, options };
}

/* ===== 2. 單變數方程題 ===== */
function genSolveForX() {
    // 隨機生成：ax + b = c
    const a = rand(1, 9);
    const x = rand(1, 12);
    const b = rand(0, 10);
    const c = a * x + b;

    const q = `${a}x + ${b} = ${c}，求 x`;

    const wrongOptions = [];
    while (wrongOptions.length < 3) {
        let w = x + rand(-3, 3);
        if (w !== x && w >= -10 && !wrongOptions.includes(w)) {
            wrongOptions.push(w);
        }
    }

    const options = shuffle([x, ...wrongOptions]);
    return { q, ans: x, options };
}

/* ===== 3. 兩變數簡單代入 ===== */
function genSolveForXY() {
    // 先隨機出 x 和 y 的真值
    const x = rand(1, 9);
    const y = rand(1, 9);

    // 題目形式：3x + 2y
    const c1 = rand(1, 5);
    const c2 = rand(1, 5);
    const result = c1 * x + c2 * y;

    const q = `若 x=${x} 且 y=${y}，求 ${c1}x + ${c2}y`;

    const wrongOptions = [];
    while (wrongOptions.length < 3) {
        let w = result + rand(-5, 5);
        if (w !== result && !wrongOptions.includes(w) && w >= 0) {
            wrongOptions.push(w);
        }
    }

    const options = shuffle([result, ...wrongOptions]);
    return { q, ans: result, options };
}

/* ===== 亂數工具 ===== */
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

/* ========== 小遊戲：英文填空 ========== */
function startEnglishGame() {
    const root = document.getElementById("game-root");
    const layer = document.createElement("div");
    layer.className = "mini-game";
    layer.innerHTML = `
    <div class="mini-card">
      <div class="mini-title">📝 英文填空（錯一題 Game Over）</div>
      <div class="mini-question" id="eq"></div>
      <div class="mini-options" id="eo"></div>
      <div class="mini-progress" id="ep"></div>
    </div>`;
    root.appendChild(layer);

    const qs = [
        { q: "Never gonna ____ you up", a: "give", options: ["give", "take", "love", "play"] },
        { q: "Super idol 的笑容 都沒你的 ____", a: "甜", options: ["甜", "鹹", "酸", "苦"] },
        { q: "Join the Hell ____", a: "divers", options: ["divers", "drivers", "lovers", "diners"] }
    ];

    let i = 0;
    render();

    function render() {
        const cur = qs[i];
        document.getElementById("eq").textContent = cur.q;
        const eo = document.getElementById("eo");
        eo.innerHTML = "";

        cur.options.forEach(opt => {
            const b = document.createElement("button");
            b.className = "mini-btn";
            b.textContent = opt;
            b.onclick = () => {
                if (opt === cur.a) {
                    i++;
                    if (i >= qs.length) {
                        root.removeChild(layer);
                        state.scene = "home";
                        resetUI();
                        renderScene();
                        return;
                    }
                    render();
                } else {
                    root.removeChild(layer);
                    state.deaths++;
                    scenes.death.text = "🪦【英語沒背好，社會提前爆破】";
                    state.scene = "death";
                    resetUI();
                    renderScene();
                }
            };
            eo.appendChild(b);
        });
        document.getElementById("ep").textContent = `第 ${i + 1} / ${qs.length} 題`;
    }
}
