(function () {
  if (!window.ChatSparkConfig || !window.ChatSparkConfig.chatbotId) {
    console.error("ChatSpark Error: Chatbot ID not configured.");
    return;
  }

  const chatbotId = window.ChatSparkConfig.chatbotId;
  const hostUrl = "https://chatspark-ai-9hwh.vercel.app";

  let theme = window.ChatSparkConfig.theme || "auto";
  if (theme === "auto") {
    const isDark =
      document.documentElement.classList.contains("dark") ||
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    theme = isDark ? "dark" : "light";
  }

  const accentColor = window.ChatSparkConfig.accentColor || "#2563eb";

  const container = document.createElement("div");
  container.id = "chatspark-widget-container";
  container.style.position = "fixed";
  container.style.bottom = "90px";
  container.style.right = "20px";
  container.style.zIndex = "999999";
  container.style.width = "380px";
  container.style.height = "560px";
  container.style.maxHeight = "75vh";
  container.style.maxWidth = "90vw";
  container.style.borderRadius = "16px";
  container.style.overflow = "hidden";
  container.style.boxShadow = "0 8px 30px rgba(0,0,0,0.2)";
  container.style.display = "none";
  container.style.opacity = "0";
  container.style.transform = "translateY(10px)";
  container.style.transition = "opacity 0.2s ease, transform 0.2s ease";

  const iframe = document.createElement("iframe");
  iframe.src = `${hostUrl}/widget/${chatbotId}?theme=${theme}&accent=${encodeURIComponent(accentColor)}`;
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "none";

  container.appendChild(iframe);
  document.body.appendChild(container);

  const robotIcon = `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="8" width="16" height="12" rx="3" fill="white"/>
    <circle cx="9" cy="14" r="1.5" fill="${accentColor}"/>
    <circle cx="15" cy="14" r="1.5" fill="${accentColor}"/>
    <rect x="10.5" y="3" width="3" height="4" rx="1.5" fill="white"/>
    <circle cx="12" cy="3" r="1.5" fill="white"/>
    <path d="M4 13H2M22 13h-2" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`;
  const closeIcon = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 6l12 12M6 18L18 6" stroke="white" stroke-width="2" stroke-linecap="round"/>
  </svg>`;

  const button = document.createElement("button");
  button.innerHTML = robotIcon;
  button.style.position = "fixed";
  button.style.bottom = "20px";
  button.style.right = "20px";
  button.style.zIndex = "1000000";
  button.style.width = "58px";
  button.style.height = "58px";
  button.style.borderRadius = "50%";
  button.style.backgroundColor = accentColor;
  button.style.border = "none";
  button.style.display = "flex";
  button.style.alignItems = "center";
  button.style.justifyContent = "center";
  button.style.cursor = "pointer";
  button.style.boxShadow = "0 4px 16px rgba(0,0,0,0.25)";
  button.style.transition = "transform 0.15s ease";
  button.onmouseenter = () => (button.style.transform = "scale(1.08)");
  button.onmouseleave = () => (button.style.transform = "scale(1)");

  let open = false;
  button.onclick = function () {
    open = !open;
    if (open) {
      container.style.display = "block";
      requestAnimationFrame(() => {
        container.style.opacity = "1";
        container.style.transform = "translateY(0)";
      });
      button.innerHTML = closeIcon;
    } else {
      container.style.opacity = "0";
      container.style.transform = "translateY(10px)";
      setTimeout(() => (container.style.display = "none"), 200);
      button.innerHTML = robotIcon;
    }
  };

  document.body.appendChild(button);
})();