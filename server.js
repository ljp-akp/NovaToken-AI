const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/v1/chat/completions", async (req, res) => {
    try {
        const response = await fetch("YOUR_API_URL", {
            method: "POST",
            headers: {
                "Authorization": "Bearer YOUR_API_KEY",
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
            reply: data.choices[0].message.content
        });

    } catch (err) {
        res.status(500).json({
            reply: "服务器错误"
        });
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log("NovaToken AI 已启动");
});
