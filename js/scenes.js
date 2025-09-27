const assets = {

    bg: {
        morning:  "assets/backgrounds/morning.jpg",
        train:    "assets/backgrounds/train.jpg",
        exam:     "assets/backgrounds/exam.jpg",
        lunch:    "assets/backgrounds/lunch.jpg",
        english:  "assets/backgrounds/english.jpg",
        home:     "assets/backgrounds/home.jpg",
        dinner:   "assets/backgrounds/dinner.jpg",
        final:    "assets/backgrounds/final.jpg",
        death:    "assets/backgrounds/death.jpg",
        ending:   "assets/backgrounds/ending.jpg",
    },
    chars: {
        player:  "assets/characters/player.png",
        mom:     "assets/characters/mom.png",
        dad:     "assets/characters/dad.png",
        teacher: "assets/characters/teacher.png",
    },

};

const scenes = {
    login: {
        title: "登入伺服器",
        text: "歡迎來到《地球Online》v0.0.1 亞洲黑色幽默增強版\n請選擇伺服器：",
        bg: null,
        left: null,
        right: null,
        choices: [
            { text: "亞洲（熱門，內卷修羅場）", next: "role" },
            { text: "美洲（須排隊800小時，美式快樂教育測試服）", death: "【失敗】伺服器排隊中，人生已過完一輪。" },
            { text: "歐洲（已爆滿，系統掛機養老模式）", death: "【失敗】伺服器滿員，請轉生至亞洲伺服器。" },
            { text: "非洲（尚未開放，資源不足伺服器）", death: "【失敗】伺服器不存在，夢想也不存在。" },
        ]
    },
    role: {
        title: "角色創建",
        text: "選擇角色：",
        bg: null,
        left: null, right: null,
        choices: [
            { text: "男性（自帶「打工人」天賦）", next: "intro" },
            { text: "女性（80% 被丟進河裡，20% 客服）", death: "【失敗】你還沒出生就被送去客服上班。" },
            { text: "購物袋（測試中，存活率未知）", death: "【失敗】一陣風起，你被吹走了。" },
        ]
    },
    intro: {
        title: "主角資訊",
        text: "名稱：郭益閎\n性別：男\n等級：15\n主線任務：讓父母開心，並設法活下來（亞洲服限定挑戰模式）",
        bg: "morning",
        left: "player",
        right: null,
        choices: [{text: "開始遊戲", next: "morning"}]
    },

    morning: {
        title: "早晨起床",
        text: "🎵 起床音樂：《Super Idol 的笑容》",
        bg: "morning", left: "mom", right: "player",
        choices: [
            { text: "A. 醒來關鬧鐘", next: "train" },
            { text: "B. 繼續睡", death: "你錯過段考，被母親「閃電衣架劈」+ 父親「皮帶大法好」處決。\n🪦【別人起床拼未來，你起床拼喪禮】" }
        ]
    },

    train: {
        title: "火車通勤",
        text: "火車通勤選項",
        bg: "train", left: null, right: "player",
        choices: [
            { text: "A. 複習數學 ", next: "exam" },
            { text: "B. 小憩一下 ", death: "睡到高雄，下車發現段考結束，媽見打。\n🪦【高雄歡迎你，但你已無人生】" }
        ]
    },

    exam: {
        title: "數學考試",
        text: "結果：你複習錯範圍，全是 sin、cos。",
        bg: "exam", left: "teacher", right: "player",
        choices: [
            { text: "A. 祈禱神蹟", death: "佛祖保佑也救不了，回家鍋子伺候。\n🪦【神不救亞洲孩子】" },
            { text: "B. 尋找會做的題目", next: "MathGame" },
            { text: "C. 直接睡覺 ", death: "0 分，老爹施展「踹你死功夫」。\n🪦【睡眠是自由，代價是生命】" }
        ]
    },

    lunch: {
        title: "午餐抉擇",
        text: "別人都在背書，你選擇：",
        bg: "lunch", left: null, right: "player",
        choices: [
            { text: "A. 吃飯休息 → 【失敗】", death: "內卷社會不允許你喘息。\n🪦【休息等於死亡】" },
            { text: "B. 繼續背單字 → 劇情繼續。", next: "englishExam" }
        ]
    },

    englishExam: {
        title: "英文考試",
        text: "✨ 小遊戲觸發：填空題（錯一題就死）",
        bg: "english", left: "teacher", right: "player",
        choices: [{ text: "開始英文小遊戲", next: "englishGame" }]
    },

    home: {
        title: "回家後",
        text: "媽媽：「阿你怎麼又在打電動！上恩每次都第一名，你勒？」",
        bg: "home", left: "mom", right: "player",
        choices: [
            { text: "A. 一言不發走回房間 → 劇情繼續。", next: "parents" },
            { text: "B. 「可是我會 cosplay ㄟ Okaasan～」 → 【失敗】", death: "媽見打，亂棍伺候。\n🪦【角色扮演換不來角色尊嚴】" },
            { text: "C. 「我要休學！」 → 【失敗】", death: "家裡 PUA buff 疊滿，退學單還沒交出去就被打爆。\n🪦【教育不許退課，家暴就是畢業證】" }
        ]
    },

    parents: {
        title: "父母責難",
        text: "媽媽：「阿你什麼態度！我養你養這麼大，就這樣回報我？」",
        bg: "home", left: "mom", right: "dad",
        choices: [
            { text: "A. 「蝦毀啦？講話就這樣啊！」 → 【失敗】", death: "全家打出 GG。\n🪦【反骨是自由，代價是全滅】" },
            { text: "B. 「妳沒能力養幹嘛生？我是高中女廁出的嗎？」 → 【失敗】", death: "社會性死亡。\n🪦【嘴快一秒，社死一生】" },
            { text: "C. 假裝自己是晴天娃娃 → ✅ 隱藏通關。", next: "hiddenEnding" },
            { text: "D. 沉默不語，腦袋浮現「離家出走」buff → 劇情繼續。", next: "dinner" }
        ]
    },

    dinner: {
        title: "晚餐事件",
        text: "媽媽：「益閎，吃飯了！」",
        bg: "dinner", left: "mom", right: "dad",
        choices: [
            { text: "A. 只吃白飯 → 劇情繼續。", next: "dinner2" },
            { text: "B. 不理媽媽 → 【失敗】", death: "頭爆裂致死。\n🪦【不吃即死，吃了更死】" },
            { text: "C. 偷買高鐵票落跑 → 【失敗】", death: "未成年無法購票，當場被抓。\n🪦【逃不出高鐵，也逃不出原生家庭】" }
        ]
    },

    dinner2: {
        title: "媽媽嘆氣",
        text: "媽媽嘆氣：「我煮這麼多，你不想吃就直說嘛！」",
        bg: "dinner", left: "mom", right: "player",
        choices: [
            { text: "A. 「你煮的像車諾比輻射三十年螢光料理。」 → 【失敗】", death: "媽見打 + 爸參戰。\n🪦【嘴臭換來家庭連坐】" },
            { text: "B. 「我們生活，我們愛，我們說謊，在亞特蘭提斯…」 → 【失敗】", death: "被認定嘉豪症候群，送走火化。\n🪦【中二是病，社會來醫】" },
            { text: "C. 認慫，乖乖吃菜 → 劇情繼續。", next: "finalEvent" }
        ]
    },

    finalEvent: {
        title: "飯後選擇",
        text: "今晚你決定：",
        bg: "final", left: "player", right: null,
        choices: [
            { text: "A. 去 7-11 買飲料（台灣限定 Buff） → 【失敗】", death: "被貨車來回輾壓。\n🪦【飲料漲價只是序曲，貨車才是主旋律】" },
            { text: "B. 去洗澡，準備好好休息 → 【失敗】", death: "在浴室滑倒。\n🪦【亞洲家庭不允許放鬆，你的骨頭會證明】" },
            { text: "C. 回房讀書，立志證明自己 → 【失敗】", death: "熬夜猝死。\n🪦【知識改變命運，但先改變你的壽命】" },
            { text: "D. 直接睡覺 → 結算", next: "ending" }
        ]
    },

    hiddenEnding: {
        title: "隱藏通關",
        text: "✨ 成功裝成晴天娃娃 = 通關，但只是進入「新手村地獄副本」。",
        bg: "ending", left: null, right: null,
        choices: [ { text: "重新投胎（回登入）", next: "login" } ]
    },

    ending: {
        title: "遊戲結算",
        text: () => `📊 存活時間：18 小時 32 分鐘\n死亡次數：${state.deaths}\nBuff：內卷 MAX、比較心態 +999、亞洲式陰影 永久綁定\n\n⚠️ 《地球Online》亞洲伺服器為永久 Hard 模式，無法調整難度。\nDLC：補習班煉獄篇（必買）／相親安排篇（中國服）／養老醫院排隊篇（歐洲測試中）`,
        bg: "ending", left: null, right: null,
        choices: [ { text: "重新投胎（回登入）", next: "login", action: () => { state.deaths = 0; } } ]
    },

    death: {
        title: "你死了",
        text: "……",
        bg: "death", left: null, right: null,
        choices: [ { text: "回到登入畫面", next: "login", action: () => { state.deaths = 0; } } ]
    }
};
