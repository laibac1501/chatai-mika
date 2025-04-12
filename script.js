
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
      "Content-Type": "application/json"
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
    showMessage("Có lỗi xảy ra khi gọi Mika.", 'bot');
    console.error(err);
  });
}

function showMessage(text, sender) {
  const message = document.createElement('div');
  message.className = sender;
  message.textContent = text;
  chatWindow.appendChild(message);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}
