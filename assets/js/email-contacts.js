(() => {
  const groups = document.querySelectorAll("[data-email-contacts]");
  if (!groups.length) return;

  async function copyAddress(address, group) {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(address);
        return true;
      } catch (_) {
        // Older browsers and restricted contexts can use the selection fallback.
      }
    }

    const field = document.createElement("textarea");
    field.value = address;
    field.readOnly = true;
    field.className = "email-copy-buffer";
    field.setAttribute("aria-hidden", "true");
    const focused = document.activeElement;
    group.append(field);
    field.select();
    field.setSelectionRange(0, address.length);
    let copied = false;
    try {
      copied = document.execCommand("copy");
    } catch (_) {
      copied = false;
    }
    field.remove();
    if (focused instanceof HTMLElement) focused.focus({ preventScroll: true });
    return copied;
  }

  groups.forEach((group) => {
    const status = group.querySelector("[data-email-status]");
    const fallback = group.querySelector("[data-email-fallback]");
    const field = group.querySelector("[data-email-field]");
    const timers = new WeakMap();

    group.querySelectorAll("[data-copy-email]").forEach((button) => {
      button.addEventListener("click", async () => {
        status.textContent = "";
        const copied = await copyAddress(button.dataset.copyEmail, group);
        if (!copied) {
          fallback.hidden = false;
          field.value = button.dataset.copyEmail;
          field.focus();
          field.select();
          status.textContent = "Select and copy the email address.";
          return;
        }

        fallback.hidden = true;
        clearTimeout(timers.get(button));
        button.textContent = "Copied";
        button.classList.add("is-copied");
        status.textContent = `${button.dataset.contactLabel} email copied.`;
        timers.set(
          button,
          setTimeout(() => {
            button.textContent = button.dataset.contactLabel;
            button.classList.remove("is-copied");
          }, 1400)
        );
      });
    });
  });
})();
