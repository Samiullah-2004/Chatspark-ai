(function () {
  if (!window.ChatSparkConfig || !window.ChatSparkConfig.chatbotId) {
    console.error("ChatSpark Error: Chatbot ID not configured.");
    return;
  }

  const chatbotId = window.ChatSparkConfig.chatbotId;
  const hostUrl = "https://chatspark-ai-9hwh.vercel.app";
  const POSITION_KEY = `chatspark-position-${chatbotId}`;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let theme = window.ChatSparkConfig.theme || "auto";
  if (theme === "auto") {
    const isDark =
      document.documentElement.classList.contains("dark") ||
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    theme = isDark ? "dark" : "light";
  }

  const accentColor = window.ChatSparkConfig.accentColor || "#2563eb";

  // Container holds both the button and the panel, so dragging the button
  // moves the panel's anchor point too.
  const wrapper = document.createElement("div");
  wrapper.style.position = "fixed";
  wrapper.style.zIndex = "999999";

  // Restore a previously-dragged position, if any.
  let savedPosition = null;
  try {
    const raw = localStorage.getItem(POSITION_KEY);
    if (raw) savedPosition = JSON.parse(raw);
  } catch (e) {
    savedPosition = null;
  }
  wrapper.style.bottom = (savedPosition && savedPosition.bottom) || "20px";
  wrapper.style.right = (savedPosition && savedPosition.right) || "20px";

  const container = document.createElement("div");
  container.id = "chatspark-widget-container";
  container.setAttribute("role", "dialog");
  container.setAttribute("aria-label", "ChatSpark AI chat");
  container.style.position = "absolute";
  container.style.bottom = "70px";
  container.style.right = "0";
  container.style.width = "380px";
  container.style.height = "560px";
  container.style.maxHeight = "75vh";
  container.style.maxWidth = "90vw";
  container.style.borderRadius = "16px";
  container.style.overflow = "hidden";
  container.style.boxShadow = "0 8px 30px rgba(0,0,0,0.2)";
  container.style.display = "none";
  container.style.opacity = "0";
  container.style.transform = prefersReducedMotion ? "none" : "translateY(10px)";
  container.style.transition = prefersReducedMotion
    ? "opacity 0.15s ease"
    : "opacity 0.2s ease, transform 0.2s ease";
  container.style.backgroundColor = theme === "dark" ? "#1a1a1a" : "#ffffff";

  const iframe = document.createElement("iframe");
  iframe.title = "ChatSpark AI chat widget";
  iframe.src = `${hostUrl}/widget/${chatbotId}?theme=${theme}&accent=${encodeURIComponent(accentColor)}`;
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "none";
  iframe.style.opacity = "0";
  iframe.style.transition = "opacity 0.25s ease";
  iframe.addEventListener("load", () => {
    iframe.style.opacity = "1";
  });

  container.appendChild(iframe);

  // Close button that floats on top-right corner of the panel itself
  const panelCloseBtn = document.createElement("button");
  panelCloseBtn.setAttribute("aria-label", "Close chat");
  panelCloseBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M6 18L18 6" stroke="white" stroke-width="2.5" stroke-linecap="round"/></svg>`;
  panelCloseBtn.style.position = "absolute";
  panelCloseBtn.style.top = "-10px";
  panelCloseBtn.style.right = "-10px";
  panelCloseBtn.style.width = "28px";
  panelCloseBtn.style.height = "28px";
  panelCloseBtn.style.borderRadius = "50%";
  panelCloseBtn.style.backgroundColor = accentColor;
  panelCloseBtn.style.border = "2px solid white";
  panelCloseBtn.style.display = "flex";
  panelCloseBtn.style.alignItems = "center";
  panelCloseBtn.style.justifyContent = "center";
  panelCloseBtn.style.cursor = "pointer";
  panelCloseBtn.style.boxShadow = "0 2px 8px rgba(0,0,0,0.3)";
  panelCloseBtn.style.zIndex = "10";

  const panelWrap = document.createElement("div");
  panelWrap.style.position = "relative";
  panelWrap.appendChild(container);
  panelWrap.appendChild(panelCloseBtn);

  wrapper.appendChild(panelWrap);

  const robotIcon = `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="8" width="16" height="12" rx="3" fill="white"/>
    <circle cx="9" cy="14" r="1.5" fill="${accentColor}"/>
    <circle cx="15" cy="14" r="1.5" fill="${accentColor}"/>
    <rect x="10.5" y="3" width="3" height="4" rx="1.5" fill="white"/>
    <circle cx="12" cy="3" r="1.5" fill="white"/>
    <path d="M4 13H2M22 13h-2" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`;

  const button = document.createElement("button");
  button.innerHTML = robotIcon;
  button.setAttribute("aria-label", "Open ChatSpark AI chat");
  button.setAttribute("aria-expanded", "false");
  button.style.width = "58px";
  button.style.height = "58px";
  button.style.borderRadius = "50%";
  button.style.backgroundColor = accentColor;
  button.style.border = "none";
  button.style.display = "flex";
  button.style.alignItems = "center";
  button.style.justifyContent = "center";
  button.style.cursor = "grab";
  button.style.boxShadow = "0 4px 16px rgba(0,0,0,0.25)";
  button.style.transition = prefersReducedMotion ? "none" : "transform 0.15s ease";
  button.style.userSelect = "none";
  button.style.touchAction = "none";

  wrapper.appendChild(button);
  document.body.appendChild(wrapper);

  function openPanel() {
    container.style.display = "block";
    panelCloseBtn.style.display = "flex";
    button.setAttribute("aria-label", "Close ChatSpark AI chat");
    button.setAttribute("aria-expanded", "true");
    requestAnimationFrame(() => {
      container.style.opacity = "1";
      container.style.transform = "translateY(0)";
    });
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onOutsideClick, true);
  }

  function closePanel() {
    container.style.opacity = "0";
    container.style.transform = prefersReducedMotion ? "none" : "translateY(10px)";
    button.setAttribute("aria-label", "Open ChatSpark AI chat");
    button.setAttribute("aria-expanded", "false");
    setTimeout(() => {
      container.style.display = "none";
      panelCloseBtn.style.display = "none";
    }, prefersReducedMotion ? 0 : 200);
    document.removeEventListener("keydown", onKeyDown);
    document.removeEventListener("mousedown", onOutsideClick, true);
  }

  function isOpen() {
    return container.style.display === "block";
  }

  function onKeyDown(e) {
    if (e.key === "Escape") closePanel();
  }

  function onOutsideClick(e) {
    if (!wrapper.contains(e.target)) closePanel();
  }

  panelCloseBtn.style.display = "none";
  panelCloseBtn.onclick = closePanel;

  // --- Drag logic for the floating button ---
  let isDragging = false;
  let hasMoved = false;
  let startX = 0;
  let startY = 0;
  let originRight = 20;
  let originBottom = 20;

  function onPointerDown(e) {
    isDragging = true;
    hasMoved = false;
    button.style.cursor = "grabbing";
    const point = e.touches ? e.touches[0] : e;
    startX = point.clientX;
    startY = point.clientY;
    const rect = wrapper.getBoundingClientRect();
    originRight = window.innerWidth - rect.right;
    originBottom = window.innerHeight - rect.bottom;
    document.addEventListener("mousemove", onPointerMove);
    document.addEventListener("mouseup", onPointerUp);
    document.addEventListener("touchmove", onPointerMove, { passive: false });
    document.addEventListener("touchend", onPointerUp);
  }

  function onPointerMove(e) {
    if (!isDragging) return;
    const point = e.touches ? e.touches[0] : e;
    const dx = point.clientX - startX;
    const dy = point.clientY - startY;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) hasMoved = true;
    if (hasMoved && e.cancelable) e.preventDefault();

    let newRight = originRight - dx;
    let newBottom = originBottom - dy;

    const margin = 8;
    const maxRight = window.innerWidth - 58 - margin;
    const maxBottom = window.innerHeight - 58 - margin;
    newRight = Math.max(margin, Math.min(newRight, maxRight));
    newBottom = Math.max(margin, Math.min(newBottom, maxBottom));

    wrapper.style.right = newRight + "px";
    wrapper.style.bottom = newBottom + "px";
  }

  function onPointerUp() {
    isDragging = false;
    button.style.cursor = "grab";
    document.removeEventListener("mousemove", onPointerMove);
    document.removeEventListener("mouseup", onPointerUp);
    document.removeEventListener("touchmove", onPointerMove);
    document.removeEventListener("touchend", onPointerUp);

    // Persist the dropped position so it survives a full page reload.
    try {
      localStorage.setItem(
        POSITION_KEY,
        JSON.stringify({ right: wrapper.style.right, bottom: wrapper.style.bottom })
      );
    } catch (e) {
      // localStorage unavailable (private mode, etc.) — fail silently.
    }
  }

  button.addEventListener("mousedown", onPointerDown);
  button.addEventListener("touchstart", onPointerDown, { passive: true });

  button.onclick = function () {
    if (hasMoved) return; // don't toggle if this click was actually a drag
    if (isOpen()) {
      closePanel();
    } else {
      openPanel();
    }
  };
})();