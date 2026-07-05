// Sophia Question Copier
// Supports two Sophia quiz layouts and copies the prompt + answer choices as
// minimal plain text. Detection is anchored on the radio input's `name`
// attribute (functional markup, the most stable signal), with class-based
// extraction and fallbacks.

function extractQuestion() {
  let prompt = null;
  let lis = [];
  let textSel = null; // selector for the option text within each <li>

  // --- Primary detection: which radio inputs are present? ---
  const isLayoutA = !!document.querySelector('input[name="answers"]');
  const isLayoutB = !!document.querySelector('input[name="answer_cb"]');

  if (isLayoutA) {
    // Layout A: challenge-v2 (practice/challenge) — has A.) B.) letters
    const p = document.querySelector(".challenge-v2-question__text");
    const list = document.querySelector(".challenge-v2-answer__list");
    if (p) prompt = p.innerText;
    if (list) lis = [...list.querySelectorAll(":scope > li")];
    textSel = ".challenge-v2-answer__text > div";
  } else if (isLayoutB) {
    // Layout B: milestone — no letters
    const p =
      document.querySelector(".assessment-question-block .question") ||
      document.querySelector(".question");
    const list = document.querySelector(".answer-fields");
    if (p) prompt = p.innerText;
    if (list) lis = [...list.querySelectorAll(":scope > li.answer-block")];
    textSel = ".milestone-answer__input > div";
  }

  // Last-resort fallback: derive options straight from whichever inputs exist.
  if (!lis.length) {
    const inputs = document.querySelectorAll(
      'input[name="answers"], input[name="answer_cb"]'
    );
    lis = [...inputs].map((inp) => inp.closest("label, li") || inp.parentElement);
  }

  if (!prompt || !lis.length) return null;

  const clean = (s) => s.replace(/\s+/g, " ").trim();

  // Build each option line. If the page shows a letter (A.) B.) ...) grab it;
  // otherwise just the bare text. Keeps output minimal.
  const choices = lis.map((li) => {
    const textEl =
      (textSel && li.querySelector(textSel)) ||
      li.querySelector("label div") ||
      li.querySelector("div") ||
      li;
    const text = clean(textEl.innerText);
    const letterEl = li.querySelector(".letter");
    const letter = letterEl ? clean(letterEl.innerText) : "";
    return letter ? `${letter} ${text}` : text;
  });

  return `${clean(prompt)}\n${choices.join("\n")}`;
}

async function copyQuestion() {
  const text = extractQuestion();
  if (!text) {
    toast("No question found on this page.");
    return;
  }
  try {
    await navigator.clipboard.writeText(text);
    toast("Question copied ✓");
  } catch (e) {
    // Fallback for clipboard permission edge cases.
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
    toast("Question copied ✓");
  }
}

// Small toast notification.
function toast(msg) {
  let el = document.getElementById("__sophia_copy_toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "__sophia_copy_toast";
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove("show"), 1500);
}

// Floating button.
function injectButton() {
  if (document.getElementById("__sophia_copy_btn")) return;
  const btn = document.createElement("button");
  btn.id = "__sophia_copy_btn";
  btn.textContent = "Copy Q";
  btn.addEventListener("click", copyQuestion);
  document.body.appendChild(btn);
}

injectButton();

// Keyboard shortcut handled in-page (works without a background script).
document.addEventListener("keydown", (e) => {
  if (e.altKey && (e.key === "q" || e.key === "Q")) {
    e.preventDefault();
    copyQuestion();
  }
});
