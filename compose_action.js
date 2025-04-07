document.getElementById("insertBtn").addEventListener("click", async () => {
    const link = document.getElementById("link").value.trim();
    const password = document.getElementById("password").value.trim();
    const expiry = document.getElementById("expiry").value;

    if (!link) {
        alert("Podaj link do pliku OneDrive!");
        return;
    }

    let html = `<div style="border:1px solid #0078D4; padding:15px; border-radius:8px;">
                            <p><strong>📁 ${browser.i18n.getMessage("file")}:</strong> <a href="${link}" target="_blank">${link}</a></p>`;
    if (password) {
        html += `<p><strong>🔐 ${browser.i18n.getMessage("password")}:</strong> ${password}</p>`;
    }
    if (expiry) {
        html += `<p><strong>⏳ ${browser.i18n.getMessage("expiry")}:</strong> ${expiry}</p>`;
    }
    html += `</div><br>`;

    try {
        const tabs = await browser.tabs.query({ active: true, currentWindow: true });
        const tabId = tabs[0].id;
        const details = await browser.compose.getComposeDetails(tabId);
        const bodyContent = details.body;
        let newBody;

        if (bodyContent.includes('<div class="moz-signature">')) {
            newBody = bodyContent.replace('<div class="moz-signature">', `${html}<div class="moz-signature">`);
        } else {
            newBody = bodyContent + html;
        }

        await browser.compose.setComposeDetails(tabId, { body: newBody });
    } catch (error) {
        console.error("Błąd podczas wstawiania HTML do wiadomości:", error);
    }
});