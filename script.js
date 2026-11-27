
/* =================================
   AI STUDY GUIDE
   실제 기능 연결
================================= */

// 1. 프롬프트 라이브러리

const prompts = [
  {
    category: "개념 이해",
    title: "전공 개념 쉽게 이해하기",
    content: "나는 대학생이야. 다음 개념을 기초부터 이해하기 쉽게 설명해 줘. 어려운 용어는 먼저 정의하고 실제 사례와 함께 설명해 줘. 마지막에는 핵심 내용을 정리해 줘."
  },
  {
    category: "수식 풀이",
    title: "수학 및 공학 문제 풀이",
    content: "다음 문제를 대학생 수준에 맞춰 단계별로 풀이해 줘. 사용한 공식의 의미와 계산 과정을 설명하고 단위와 최종 답도 확인해 줘. 문제: [문제 입력]"
  },
  {
    category: "자료 조사",
    title: "신뢰할 수 있는 자료 조사",
    content: "다음 주제에 대해 신뢰할 수 있는 자료를 바탕으로 조사해 줘. 자료의 출처와 발행 기관을 제시하고 확인되지 않은 정보는 사실처럼 단정하지 말아 줘. 주제: [주제 입력]"
  },
  {
    category: "보고서 작성",
    title: "보고서 구성 및 검토",
    content: "다음 주제로 대학 과제 보고서의 개요를 작성해 줘. 서론, 본론, 결론으로 구분하고 각 부분에 들어갈 핵심 내용을 제안해 줘. 최종 문장은 내가 직접 작성할 수 있도록 개요 중심으로 제시해 줘. 주제: [주제 입력]"
  },
  {
    category: "발표 준비",
    title: "발표 및 예상 질문 준비",
    content: "다음 발표 주제를 바탕으로 발표 흐름을 구성하고 청중이 물어볼 만한 예상 질문 5개와 답변 방향을 제시해 줘. 주제: [주제 입력]"
  }
];

// 프롬프트 목록 화면에 표시

function showPrompts() {
  const area = document.getElementById("prompt-list");

  if (!area) return;

  area.innerHTML = prompts.map((item, index) => `
    <div class="prompt-item">
      <small>${item.category}</small>
      <h3>${item.title}</h3>
      <p>${item.content}</p>
      <button onclick="copyPrompt(${index})">
        프롬프트 복사
      </button>
    </div>
  `).join("");
}

// 프롬프트 복사

async function copyPrompt(index) {
  try {
    await navigator.clipboard.writeText(prompts[index].content);
    showToast("프롬프트가 복사되었습니다!");
  } catch (error) {
    showToast("복사에 실패했습니다. 브라우저 권한을 확인해 주세요.");
  }
}


// 2. 전공별 가이드

const majorGuides = {
  environment: {
    title: "환경공학",
    content: "환경공학 전공 대학생 수준에서 설명해 줘. 환경오염의 원인과 해결 원리를 설명하고 실제 환경공학 기술의 적용 사례를 제시해 줘. 관련 근거와 출처를 구분하고 불확실한 정보는 별도로 표시해 줘."
  },

  chemistry: {
    title: "일반화학",
    content: "일반화학의 개념을 기초부터 설명해 줘. 화학식과 반응 원리를 단계별로 설명하고 계산 문제가 있다면 사용한 공식과 단위를 함께 제시해 줘."
  },

  biology: {
    title: "생명과학",
    content: "생명과학 개념을 대학생 수준에 맞춰 설명해 줘. 생물학적 원리와 작용 과정을 순서대로 설명하고 실제 생명 현상과 연결해 줘."
  },

  math: {
    title: "수학·통계",
    content: "수학 및 통계 문제를 단계별로 풀이해 줘. 사용한 공식의 의미와 계산 과정을 설명하고 최종 답을 검산해 줘."
  }
};

function showMajorGuide() {
  const select = document.getElementById("major-select");
  const result = document.getElementById("major-result");

  if (!select || !result) return;

  const guide = majorGuides[select.value];

  result.textContent =
    guide.title + " 맞춤 프롬프트\n\n" +
    guide.content +
    "\n\n이 내용을 복사하여 원하는 AI 서비스에 붙여넣어 사용하세요.";
}



// 3. AI 활용 내역서 자동 생성

function makeCitation() {
  const tool = document.getElementById("ai-tool").value.trim();
  const purpose = document.getElementById("ai-purpose").value.trim();
  const content = document.getElementById("ai-content").value.trim();
  const prompt = document.getElementById("ai-prompt").value.trim();
  const link = document.getElementById("ai-link").value.trim();
  const date = document.getElementById("ai-date").value;

  const result = document.getElementById("citation-result");

  if (!tool || !purpose || !content || !prompt || !link || !date) {
    showToast("모든 항목을 입력해 주세요.");
    return;
  }

  // 대화 링크 형식 확인
  try {
    const url = new URL(link);

    if (url.protocol !== "https:" && url.protocol !== "http:") {
      showToast("올바른 대화 링크를 입력해 주세요.");
      return;
    }
  } catch (error) {
    showToast("올바른 대화 링크를 입력해 주세요.");
    return;
  }

  const citation =
`[AI 활용 내역서]

1. 활용 도구: ${tool}
2. 활용 목적: ${purpose}
3. 활용 내용: ${content}
4. 사용한 프롬프트: ${prompt}
5. 대화 링크: ${link}
6. 사용 날짜: ${date}

※ 실제 활용 내역을 바탕으로 작성되었으며, 제출 전 내용과 출처를 확인해 주세요.`;

  result.textContent = citation;

  const copyButton = document.createElement("button");
  copyButton.textContent = "내역서 복사하기";

  copyButton.onclick = async () => {
    try {
      await navigator.clipboard.writeText(citation);
      showToast("AI 활용 내역서가 복사되었습니다!");
    } catch (error) {
      showToast("복사에 실패했습니다. 브라우저 권한을 확인해 주세요.");
    }
  };

  result.appendChild(document.createElement("br"));
  result.appendChild(document.createElement("br"));
  result.appendChild(copyButton);
}

  const tool = document.getElementById("ai-tool").value.trim();
  const purpose = document.getElementById("ai-purpose").value.trim();
  const content = document.getElementById("ai-content").value.trim();
  const prompt = document.getElementById("ai-prompt").value.trim();
  const date = document.getElementById("ai-date").value;

  const result = document.getElementById("citation-result");

  if (!tool || !purpose || !content || !prompt || !date) {
    showToast("모든 항목을 입력해 주세요.");
    return;
  }

  const citation =
`[AI 활용 내역서]

1. 활용 도구: ${tool}
2. 활용 목적: ${purpose}
3. 활용 내용: ${content}
4. 사용한 프롬프트: ${prompt}
5. 사용 날짜: ${date}

※ 실제 활용 내역을 바탕으로 작성되었으며, 제출 전 내용과 출처를 확인해 주세요.`;

  result.textContent = citation;

  const copyButton = document.createElement("button");
  copyButton.textContent = "내역서 복사하기";
  copyButton.onclick = async () => {
    try {
      await navigator.clipboard.writeText(citation);
      showToast("AI 활용 내역서가 복사되었습니다!");
    } catch (error) {
      showToast("복사에 실패했습니다. 브라우저 권한을 확인해 주세요.");
    }
  };

  result.appendChild(document.createElement("br"));
  result.appendChild(document.createElement("br"));
  result.appendChild(copyButton);
}


// 4. 윤리 체크리스트 진행률

function updateProgress() {
  const checks = document.querySelectorAll(".ethics-check");
  const checked = document.querySelectorAll(".ethics-check:checked");

  const percentage = Math.round(
    (checked.length / checks.length) * 100
  );

  const text = document.getElementById("progress-text");
  const fill = document.getElementById("progress-fill");

  if (text) {
    text.textContent =
      `확인 진행률: ${percentage}% (${checked.length}/${checks.length})`;
  }

  if (fill) {
    fill.style.width = percentage + "%";
  }
}


// 5. 홈페이지 초기 실행

document.addEventListener("DOMContentLoaded", () => {

  // 프롬프트 표시
  showPrompts();

  // 전공별 가이드 표시
  const majorSelect = document.getElementById("major-select");

  if (majorSelect) {
    showMajorGuide();

    majorSelect.addEventListener("change", showMajorGuide);
  }

  // 체크리스트 진행률 계산
  const checks = document.querySelectorAll(".ethics-check");

  checks.forEach(check => {
    check.addEventListener("change", updateProgress);
  });

  updateProgress();

  console.log("AI STUDY GUIDE 실행 완료!");
});
function showToast(message) {
  let toast = document.getElementById("toast-message");

  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast-message";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(window.toastTimer);

  window.toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}