
const DIFFICULTY_POINTS = {
  easy: 50,
  medium: 100,
  hard: 200
};

const MAX_QUESTIONS = 10;

// 1. בנק שאלות מובנה בעברית
const STATIC_QUESTIONS = [
  // מדע וטבע
  { topic: "מדע וטבע", difficulty: "easy", q: "איזה כוכב לכת הוא הקרוב ביותר לשמש?", a: "כוכב חמה", synonyms: ["חמה", "מרקורי"], hint: "כוכב הלכת הקטן ביותר במערכת השמש." },
  { topic: "מדע וטבע", difficulty: "easy", q: "מהו היסוד הכימי הנפוץ ביותר ביקום?", a: "מימן", synonyms: ["הידרוגן"], hint: "הסימול הכימי שלו בטבלה המחזורית הוא H." },
  { topic: "מדע וטבע", difficulty: "easy", q: "איזה גז צמחים קולטים מהאוויר בתהליך הפוטוסינתזה?", a: "פחמן דו חמצני", synonyms: ["co2", "פחמן דו-חמצני"], hint: "הגז שאנו פולטים בנשיפה." },
  { topic: "מדע וטבע", difficulty: "medium", q: "איזה איבר בגוף האדם מסנן את הדם ומייצר שתן?", a: "כליות", synonyms: ["כליה", "הכליות"], hint: "לרוב האנשים יש זוג איברים כאלה בגב התחתון." },
  { topic: "מדע וטבע", difficulty: "medium", q: "מהי המהירות הגבוהה ביותר האפשרית בטבע?", a: "מהירות האור", synonyms: ["אור"], hint: "כ-300,000 קילומטרים בשנייה בריק." },
  { topic: "מדע וטבע", difficulty: "hard", q: "איזה חלקיק תת-אטומי נושא מטען חשמלי שלילי?", a: "אלקטרון", synonyms: ["אלקטרונים"], hint: "נע סביב גרעין האטום." },

  // היסטוריה וישראל
  { topic: "היסטוריה וישראל", difficulty: "easy", q: "באיזו עיר נמצא הקולוסיאום העתיק?", a: "רומא", synonyms: [], hint: "בירת איטליה." },
  { topic: "היסטוריה וישראל", difficulty: "easy", q: "איזה ים הוא המקום הנמוך ביותר על פני כדור הארץ?", a: "ים המלח", synonyms: [], hint: "מפורסם בריכוז המלח הגבוה שבו." },
  { topic: "היסטוריה וישראל", difficulty: "medium", q: "מי היה ראש הממשלה הראשון של מדינת ישראל?", a: "דוד בן גוריון", synonyms: ["בן גוריון", "בן-גוריון"], hint: "הכריז על הקמת המדינה ב-1948." },
  { topic: "היסטוריה וישראל", difficulty: "medium", q: "מי היה הנשיא הראשון של מדינת ישראל?", a: "חיים ויצמן", synonyms: ["ויצמן", "חיים וייצמן"], hint: "היה גם כימאי מפורסם ומנהיג ציוני." },
  { topic: "היסטוריה וישראל", difficulty: "hard", q: "באיזו שנה נחתה החללית אפולו 11 על הירח?", a: "1969", synonyms: [], hint: "סוף שנות ה-60 של המאה ה-20." },

  // טכנולוגיה ומחשבים
  { topic: "טכנולוגיה ומחשבים", difficulty: "easy", q: "מה משמעות הקיצור CPU במחשב?", a: "יחידת עיבוד מרכזית", synonyms: ["מעבד", "central processing unit"], hint: "ה'מוח' שמבצע את החישובים במחשב." },
  { topic: "טכנולוגיה ומחשבים", difficulty: "easy", q: "כמה ביטים יש בבייט (Byte) אחד?", a: "8", synonyms: ["שמונה"], hint: "חזקה של 2 הקטנה מ-10." },
  { topic: "טכנולוגיה ומחשבים", difficulty: "medium", q: "איזו שפת תכנות רצה באופן טבעי בתוך כל דפדפן אינטרנט?", a: "JavaScript", synonyms: ["ג'אווה סקריפט", "גאווה סקריפט", "js"], hint: "ראשי התיבות שלה הם JS." },
  { topic: "טכנולוגיה ומחשבים", difficulty: "hard", q: "איזה פרוטוקול משמש להצפנת תקשורת מאובטחת באתרי אינטרנט?", a: "HTTPS", synonyms: ["tls", "ssl"], hint: "גרסה מאובטחת של HTTP עם סמל מנעול." },

  // גיאוגרפיה ועולם
  { topic: "גיאוגרפיה ועולם", difficulty: "easy", q: "מהו האוקיינוס הגדול ביותר בכדור הארץ?", a: "האוקיינוס השקט", synonyms: ["שקט", "פסיפי"], hint: "נמצא בין אסיה ואוסטרליה לבין אמריקה." },
  { topic: "גיאוגרפיה ועולם", difficulty: "medium", q: "מהי עיר הבירה של יפן?", a: "טוקיו", synonyms: [], hint: "המטרופולין המאוכלס ביותר בעולם." },
  { topic: "גיאוגרפיה ועולם", difficulty: "medium", q: "באיזו יבשת נמצאת מדינת ברזיל?", a: "דרום אמריקה", synonyms: ["אמריקה הדרומית"], hint: "היבשת שבה זורם נהר האמזונס." },
  { topic: "גיאוגרפיה ועולם", difficulty: "hard", q: "איזה נהר נחשב לארוך ביותר באפריקה?", a: "הנילוס", synonyms: ["נילוס"], hint: "זורם צפונה ונשפך לים התיכון דרך מצרים." }
];

// 2. מחוללי שאלות דינמיות בעברית (יוצרים אינסוף וריאציות בלי מודל AI)
const DYNAMIC_GENERATORS = [
  {
    topic: "מדע וטבע",
    difficulty: "easy",
    generate() {
      const items = [
        { element: "זהב", symbol: "Au", hint: "מהמילה הלטינית Aurum." },
        { element: "ברזל", symbol: "Fe", hint: "מהמילה הלטינית Ferrum." },
        { element: "חמצן", symbol: "O", hint: "האות הראשונה של Oxygen." },
        { element: "פחמן", symbol: "C", hint: "האות הראשונה של Carbon." },
        { element: "נתרן", symbol: "Na", hint: "מהמילה הלטינית Natrium." },
        { element: "כסף", symbol: "Ag", hint: "מהמילה הלטינית Argentum." }
      ];
      const pick = items[Math.floor(Math.random() * items.length)];
      return {
        topic: this.topic,
        difficulty: this.difficulty,
        q: `מהו הסימול הכימי בטבלה המחזורית של היסוד ${pick.element}?`,
        a: pick.symbol,
        synonyms: [pick.symbol.toLowerCase()],
        hint: pick.hint
      };
    }
  },
  {
    topic: "גיאוגרפיה ועולם",
    difficulty: "easy",
    generate() {
      const capitals = [
        { country: "צרפת", capital: "פריז", hint: "מפורסמת במגדל אייפל." },
        { country: "ספרד", capital: "מדריד", hint: "נמצאת במרכז חצי האי האיברי." },
        { country: "גרמניה", capital: "ברלין", hint: "חולקה בעבר על ידי חומה מפורסמת." },
        { country: "יוון", capital: "אתונה", hint: "ערש הדמוקרטיה והפילוסופיה העתיקה." },
        { country: "מצרים", capital: "קהיר", hint: "שוכנת לגדות הנילוס סמוך לפירמידות." },
        { country: "קנדה", capital: "אוטווה", hint: "לא טורונטו ולא מונטריאול." },
        { country: "אוסטרליה", capital: "קנברה", hint: "לא סידני ולא מלבורן." }
      ];
      const pick = capitals[Math.floor(Math.random() * capitals.length)];
      return {
        topic: this.topic,
        difficulty: this.difficulty,
        q: `מהי עיר הבירה של ${pick.country}?`,
        a: pick.capital,
        synonyms: [],
        hint: pick.hint
      };
    }
  },
  {
    topic: "טכנולוגיה ומחשבים",
    difficulty: "medium",
    generate() {
      const powers = [4, 5, 6, 7, 8, 10];
      const exp = powers[Math.floor(Math.random() * powers.length)];
      const ans = String(Math.pow(2, exp));
      return {
        topic: this.topic,
        difficulty: this.difficulty,
        q: `כמה ערכים שונים ניתן לייצג באמצעות ${exp} ביטים (2 בחזקת ${exp})?`,
        a: ans,
        synonyms: [],
        hint: `הכפל את המספר 2 בעצמו ${exp} פעמים.`
      };
    }
  },
  {
    topic: "לוגיקה ומספרים",
    difficulty: "easy",
    generate() {
      const start = Math.floor(Math.random() * 12) + 2;
      const step = Math.floor(Math.random() * 7) + 3;
      const seq = [start, start + step, start + step * 2, start + step * 3];
      const next = start + step * 4;
      return {
        topic: this.topic,
        difficulty: this.difficulty,
        q: `מהו המספר הבא בסדרה: ${seq.join(", ")} ?`,
        a: String(next),
        synonyms: [],
        hint: `הפרש קבוע של ${step} בין כל שני איברים עוקבים.`
      };
    }
  },
  {
    topic: "לוגיקה ומספרים",
    difficulty: "medium",
    generate() {
      const base = Math.floor(Math.random() * 4) + 2;
      const seq = [base, base * 2, base * 4, base * 8];
      const next = base * 16;
      return {
        topic: this.topic,
        difficulty: this.difficulty,
        q: `מהו המספר הבא בסדרה ההנדסית: ${seq.join(", ")} ?`,
        a: String(next),
        synonyms: [],
        hint: "כל איבר גדול פי 2 מקודמו."
      };
    }
  },
  {
    topic: "לוגיקה ומספרים",
    difficulty: "hard",
    generate() {
      const a = Math.floor(Math.random() * 15) + 12;
      const b = Math.floor(Math.random() * 9) + 6;
      const ans = a * b;
      return {
        topic: this.topic,
        difficulty: this.difficulty,
        q: `חשב במהירות: כמה הם ${a} כפול ${b}?`,
        a: String(ans),
        synonyms: [],
        hint: `פרק ל-(${a} × 10) או ל-(10 × ${b} + ${a - 10} × ${b}).`
      };
    }
  }
];

// 3. מצב המשחק
const state = {
  score: 0,
  streak: 0,
  answered: 0,
  bestScore: Number(localStorage.getItem("smart_trivia_best") || 0),
  currentQuestion: null,
  hintUsed: false,
  usedStaticIds: new Set(),
  recentQuestions: new Set()
};

// הפניות ל-DOM
const els = {
  score: document.getElementById("score-val"),
  streak: document.getElementById("streak-val"),
  progress: document.getElementById("progress-val"),
  best: document.getElementById("best-val"),
  topicSelect: document.getElementById("topic-select"),
  difficultySelect: document.getElementById("difficulty-select"),
  nextBtn: document.getElementById("next-btn"),
  qTopicBadge: document.getElementById("q-topic-badge"),
  qPointsBadge: document.getElementById("q-points-badge"),
  questionText: document.getElementById("question-text"),
  answerInput: document.getElementById("answer-input"),
  submitBtn: document.getElementById("submit-btn"),
  hintBox: document.getElementById("hint-box"),
  feedbackBox: document.getElementById("feedback-box"),
  hintBtn: document.getElementById("hint-btn"),
  skipBtn: document.getElementById("skip-btn"),
  resetBtn: document.getElementById("reset-btn")
};

function getMultiplier() {
  return 1 + Math.min(state.streak, 5) * 0.2;
}

function updateStats() {
  els.score.textContent = state.score;
  els.streak.textContent = `x${getMultiplier().toFixed(1)}`;
  els.progress.textContent = `${state.answered} / ${MAX_QUESTIONS}`;
  els.best.textContent = state.bestScore;
}

// 4. נירמול חכם של עברית ואנגלית לבדיקת תשובות גמישה
function normalizeAnswer(text) {
  return String(text || "")
    .toLowerCase()
    .trim()
    .replace(/["'״׳.,!?():;\-–—]/g, " ")
    .replace(/\s+/g, " ")
    .split(" ")
    .map((word) => {
      // הסרת ה' הידיעה או אותיות יחס נפוצות בתחילת מילה עברית ארוכה
      if (/^[הבלמכש][א-ת]{2,}$/.test(word)) {
        return word.slice(1);
      }
      return word;
    })
    .join(" ")
    .trim();
}

function isAnswerMatch(userRaw, questionObj) {
  const userNorm = normalizeAnswer(userRaw);
  if (!userNorm) return false;

  const acceptedList = [questionObj.a, ...(questionObj.synonyms || [])];

  return acceptedList.some((candidate) => {
    const candNorm = normalizeAnswer(candidate);
    if (!candNorm) return false;
    if (userNorm === candNorm) return true;
    // התאמה חלקית בטוחה עבור ביטויים בני 3 תווים ומעלה
    if (candNorm.length >= 3 && userNorm.length >= 3) {
      return userNorm.includes(candNorm) || candNorm.includes(userNorm);
    }
    return false;
  });
}

// 5. בחירת שאלה דינמית או קבועה לפי נושא ורמת סיכון
function pickQuestion() {
  const chosenTopic = els.topicSelect.value;
  const chosenDiff = els.difficultySelect.value;
  const basePoints = DIFFICULTY_POINTS[chosenDiff];

  // נסה קודם מחולל דינמי מתאים (כ-55% מהפעמים כשקיים מחולל תואם)
  const matchingGenerators = DYNAMIC_GENERATORS.filter((g) => {
    const topicOk = chosenTopic === "all" || g.topic === chosenTopic;
    const diffOk = g.difficulty === chosenDiff;
    return topicOk && diffOk;
  });

  if (matchingGenerators.length > 0 && Math.random() < 0.6) {
    for (let attempt = 0; attempt < 5; attempt++) {
      const gen = matchingGenerators[Math.floor(Math.random() * matchingGenerators.length)];
      const generated = gen.generate();
      if (!state.recentQuestions.has(generated.q)) {
        state.recentQuestions.add(generated.q);
        return { ...generated, points: basePoints };
      }
    }
  }

  // אחרת, שלוף מבנק השאלות המובנה
  let pool = STATIC_QUESTIONS
    .map((item, idx) => ({ item, idx }))
    .filter(({ item, idx }) => {
      const topicOk = chosenTopic === "all" || item.topic === chosenTopic;
      const diffOk = item.difficulty === chosenDiff;
      return topicOk && diffOk && !state.usedStaticIds.has(idx);
    });

  // הרחבת סינון אם נגמרו השאלות ברמת הקושי הספציפית
  if (pool.length === 0) {
    pool = STATIC_QUESTIONS
      .map((item, idx) => ({ item, idx }))
      .filter(({ item, idx }) => {
        const topicOk = chosenTopic === "all" || item.topic === chosenTopic;
        return topicOk && !state.usedStaticIds.has(idx);
      });
  }

  // איפוס היסטוריה מקומית אם כל הבנק שוחק
  if (pool.length === 0) {
    state.usedStaticIds.clear();
    pool = STATIC_QUESTIONS
      .map((item, idx) => ({ item, idx }))
      .filter(({ item }) => chosenTopic === "all" || item.topic === chosenTopic);
  }

  if (pool.length > 0) {
    const chosen = pool[Math.floor(Math.random() * pool.length)];
    state.usedStaticIds.add(chosen.idx);
    state.recentQuestions.add(chosen.item.q);
    return { ...chosen.item, points: basePoints };
  }

  // גיבוי אחרון: כל מחולל דינמי קיים
  const fallbackGen = DYNAMIC_GENERATORS[Math.floor(Math.random() * DYNAMIC_GENERATORS.length)];
  return { ...fallbackGen.generate(), points: basePoints };
}

function startNextQuestion() {
  if (state.answered >= MAX_QUESTIONS) {
    finishRound();
    return;
  }

  const qObj = pickQuestion();
  state.currentQuestion = qObj;
  state.hintUsed = false;

  els.qTopicBadge.textContent = `${qObj.topic} • שאלה ${state.answered + 1} מתוך ${MAX_QUESTIONS}`;
  els.qPointsBadge.textContent = `+${qObj.points} נקודות בסיס`;
  els.questionText.textContent = qObj.q;

  els.answerInput.value = "";
  els.answerInput.disabled = false;
  els.submitBtn.disabled = false;
  els.hintBtn.disabled = state.score < 25;
  els.skipBtn.disabled = state.score < 15;
  els.nextBtn.disabled = true;

  els.hintBox.classList.add("hidden");
  els.feedbackBox.classList.add("hidden");
  els.feedbackBox.className = "alert hidden";

  els.answerInput.focus();
}

function handleSubmit() {
  if (!state.currentQuestion) return;
  const userText = els.answerInput.value.trim();
  if (!userText) return;

  const correct = isAnswerMatch(userText, state.currentQuestion);
  state.answered += 1;

  els.answerInput.disabled = true;
  els.submitBtn.disabled = true;
  els.hintBtn.disabled = true;
  els.skipBtn.disabled = true;

  els.feedbackBox.classList.remove("hidden");

  if (correct) {
    const earned = Math.round(state.currentQuestion.points * getMultiplier());
    state.score += earned;
    state.streak += 1;

    if (state.score > state.bestScore) {
      state.bestScore = state.score;
      localStorage.setItem("smart_trivia_best", String(state.bestScore));
    }

    els.feedbackBox.classList.add("alert-success");
    els.feedbackBox.innerHTML = `<strong>✓ תשובה נכונה! (+${earned} נקודות)</strong><br>התשובה המלאה: ${state.currentQuestion.a}`;
  } else {
    state.streak = 0;
    els.feedbackBox.classList.add("alert-error");
    els.feedbackBox.innerHTML = `<strong>✗ לא מדויק (הרצף אופס)</strong><br>התשובה הנכונה היא: <strong>${state.currentQuestion.a}</strong>`;
  }

  state.currentQuestion = null;
  updateStats();

  els.nextBtn.disabled = false;
  els.nextBtn.textContent = state.answered >= MAX_QUESTIONS ? "סיים סיבוב 🏆" : "לשאלה הבאה ➔";
}

function handleHint() {
  if (!state.currentQuestion || state.hintUsed || state.score < 25) return;
  state.score -= 25;
  state.hintUsed = true;
  updateStats();

  els.hintBox.textContent = `💡 רמז: ${state.currentQuestion.hint}`;
  els.hintBox.classList.remove("hidden");
  els.hintBtn.disabled = true;
  els.skipBtn.disabled = state.score < 15;
}

function handleSkip() {
  if (!state.currentQuestion || state.score < 15) return;
  state.score -= 15;
  updateStats();
  startNextQuestion();
}

function finishRound() {
  els.qTopicBadge.textContent = "סיכום סיבוב";
  els.qPointsBadge.textContent = `סיום ${MAX_QUESTIONS} שאלות`;
  els.questionText.textContent = `כל הכבוד! סיימת סיבוב עם ${state.score} נקודות (שיא אישי: ${state.bestScore}).`;
  els.feedbackBox.classList.add("hidden");
  els.hintBox.classList.add("hidden");

  state.score = 0;
  state.streak = 0;
  state.answered = 0;
  state.currentQuestion = null;
  updateStats();

  els.nextBtn.disabled = false;
  els.nextBtn.textContent = "סיבוב חדש 🎲";
}

function resetGame() {
  state.score = 0;
  state.streak = 0;
  state.answered = 0;
  state.currentQuestion = null;
  state.usedStaticIds.clear();
  state.recentQuestions.clear();
  updateStats();

  els.qTopicBadge.textContent = "מוכן להתחלה";
  els.qPointsBadge.textContent = "+100 נקודות";
  els.questionText.textContent = 'המשחק אופס. לחץ על "שאלה חדשה" כדי להתחיל!';
  els.answerInput.value = "";
  els.answerInput.disabled = true;
  els.submitBtn.disabled = true;
  els.hintBtn.disabled = true;
  els.skipBtn.disabled = true;
  els.hintBox.classList.add("hidden");
  els.feedbackBox.classList.add("hidden");
  els.nextBtn.disabled = false;
  els.nextBtn.textContent = "שאלה חדשה 🎲";
}

// חיבור אירועים
els.nextBtn.addEventListener("click", startNextQuestion);
els.submitBtn.addEventListener("click", handleSubmit);
els.hintBtn.addEventListener("click", handleHint);
els.skipBtn.addEventListener("click", handleSkip);
els.resetBtn.addEventListener("click", resetGame);
els.answerInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleSubmit();
});

updateStats();
