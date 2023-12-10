window.addEventListener("DOMContentLoaded", () => {
  const installButton = document.getElementById("pwa-install-btn");
  let beforeInstallPromptEvent;

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    beforeInstallPromptEvent = e;
    installButton.removeAttribute("hidden");
  });

  installButton.addEventListener("click", () =>
    beforeInstallPromptEvent.prompt(),
  );
});
