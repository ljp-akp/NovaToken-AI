const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        status: "running",
        message: "NovaToken AI Proxy Online"
    });
});

app.post("/v1/chat/completions", async (req, res) => {

    try {

        const response = await fetch("https://aix.6os.net/v1/chat/completions", {

            method: "POST",

            headers: {

                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,

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

        console.log(data);

        if (!response.ok) {

            return res.status(response.status).json({

                reply: data

            });

        }

        res.json({

            reply: data.choices[0].message.content

        });

    } catch (e) {

        console.error(e);

        res.status(500).json({

            reply: e.message

        });

    }

});

app.listen(process.env.PORT || 3000, () => {

    console.log("NovaToken AI 已启动");

});