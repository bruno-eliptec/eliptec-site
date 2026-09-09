// ============================================================
// ELIPTEC TECNOLOGIA — interações do site
// ============================================================

document.getElementById("year").textContent = new Date().getFullYear();

/* Header: sombra ao rolar */
const header = document.getElementById("siteHeader");
const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

/* Menu mobile */
const navToggle = document.getElementById("navToggle");
navToggle.addEventListener("click", () => {
  const open = header.classList.toggle("nav-open");
  navToggle.setAttribute("aria-expanded", open ? "true" : "false");
});
document.querySelectorAll(".main-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

/* ---------------------------------------------------------
   Teca — assistente virtual (respostas rápidas, sem backend)
--------------------------------------------------------- */
const tecaWidget = document.getElementById("tecaWidget");
const tecaLauncher = document.getElementById("tecaLauncher");
const tecaClose = document.getElementById("tecaClose");
const tecaBody = document.getElementById("tecaBody");
const tecaQuick = document.getElementById("tecaQuick");

const tecaReplies = {
  solucoes: {
    text: "Temos soluções para NFC-e, NF-e, mobilidade de garçons, gestão via web e emissão de boletos. Quer dar uma olhada?",
    action: () => scrollToSection("#solucoes"),
  },
  suporte: {
    text: "Sem robôs, prometo! Vou te levar direto para o nosso WhatsApp para falar com um técnico de verdade.",
    action: () => window.open("https://wa.me/5531984534108", "_blank", "noopener"),
  },
  demo: {
    text: "Ótimo! Preenche o formulário aqui embaixo que a gente liga em até 2 minutos em horário comercial.",
    action: () => scrollToSection("#contato"),
  },
};

function scrollToSection(selector) {
  const el = document.querySelector(selector);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function openTeca() {
  tecaWidget.classList.add("open");
}
function closeTeca() {
  tecaWidget.classList.remove("open");
}

tecaLauncher.addEventListener("click", () => {
  tecaWidget.classList.contains("open") ? closeTeca() : openTeca();
});
tecaClose.addEventListener("click", closeTeca);

tecaQuick.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-reply]");
  if (!btn) return;
  const key = btn.dataset.reply;
  const reply = tecaReplies[key];
  if (!reply) return;

  const msg = document.createElement("div");
  msg.className = "teca-msg";
  msg.textContent = reply.text;
  tecaBody.appendChild(msg);
  tecaBody.scrollTop = tecaBody.scrollHeight;

  btn.disabled = true;
  btn.style.opacity = "0.5";

  setTimeout(() => {
    closeTeca();
    reply.action();
  }, 900);
});

/* Fecha o painel da Teca ao clicar fora */
document.addEventListener("click", (e) => {
  if (!tecaWidget.contains(e.target)) closeTeca();
});
