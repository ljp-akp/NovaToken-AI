const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/v1/chat/completions", async (req, res) => {
    try {
const response = await fetch("https://aix.6os.net/v1/chat/completions", {
  method: "POST",
  headers: {
"Authorization": `Bearer ${process.env.API_KEY}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: req.body.message
      }
    ]
  })
});

const data = await response.json();

console.log("HTTP 状态：", response.status);
console.log("AI 返回：", data);

if (!response.ok) {
  return res.status(response.status).json({
    reply: JSON.stringify(data)
  });
}

res.json({
  reply: data.choices?.[0]?.message?.content || "没有返回内容"
});
}
});

app.listen(process.env.PORT || 3000, () => {
    console.log("NovaToken AI 已启动");
});
