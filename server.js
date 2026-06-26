const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/v1/chat/completions", async (req, res) => {
    try {
        const response = await fetch(" https://aix.6os.net/v1/chat/completionsv1", {
  method: "POST",
  headers: {
    "Authorization": "Bearer sk-rTQKF5k81tKU9YMNllA3H0DDxuyojLhgo88sbXWDTxdPQnMH",
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

        res.json({
    reply: data.choices?.[0]?.message?.content || "没有返回内容"
});

    } catch (err) {
    console.error(err);

    res.status(500).json({
        reply: "服务器错误"
    });
}
});

app.listen(process.env.PORT || 3000, () => {
    console.log("NovaToken AI 已启动");
});
