
const API_KEY = "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";
const chatWindow = document.getElementById('chat-window');

function sendMessage() {
  const input = document.getElementById('user-input');
  const text = input.value.trim();
  if (!text) return;

  showMessage(text, 'user');
  input.value = '';

  fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://yourusername.github.io",
      "X-Title": "Mika AI Chatbot"
    },
    body: JSON.stringify({
      model: "openai/gpt-3.5-turbo",
      messages: [{ role: "user", content: text }]
    })
  })
  .then(res => res.json())
  .then(data => {
    const reply = data.choices[0].message.content;
    showMessage(reply, 'bot');
  })
  .catch(err => {
    showMessage("Có lỗi xảy ra khi gọi Mika: " + err.message, 'bot');
    console.error("Lỗi chi tiết:", err);
  });
}

function showMessage(text, sender) {
  const message = document.createElement('div');
  message.className = sender;
  message.textContent = text;
  chatWindow.appendChild(message);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}
