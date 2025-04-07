document.getElementById("insertBtn").addEventListener("click", async () => {
                            const link = document.getElementById("link").value.trim();
                            const password = document.getElementById("password").value.trim();
                            const expiry = document.getElementById("expiry").value;

                            if (!link) {
                                alert("Podaj link do pliku OneDrive!");
                                return;
                            }

                            let html = `<div style="border:1px solid #0078D4; padding:15px; border-radius:8px;">
                            <p><strong>📁 Plik OneDrive:</strong> <a href="${link}" target="_blank">${link}</a></p>`;
                            if (password) {
                                html += `<p><strong>🔐 Hasło:</strong> ${password}</p>`;
                            }
                            if (expiry) {
                                html += `<p><strong>⏳ Ważne do:</strong> ${expiry}</p>`;
                            }
                            html += `</div><br>`;

                            try {
                                const tabs = await browser.tabs.query({ active: true, currentWindow: true });
                                const tabId = tabs[0].id;
                                const details = await browser.compose.getComposeDetails(tabId);
                                const newBody = html + details.body;
                                await browser.compose.setComposeDetails(tabId, { body: newBody });
                                alert("HTML został wstawiony na początku wiadomości!");
                            } catch (error) {
                                console.error("Błąd podczas wstawiania HTML do wiadomości:", error);
                            }
                        });