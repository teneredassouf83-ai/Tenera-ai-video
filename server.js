const express = require("express");
const cors = require("cors");
const { fal } = require("@fal-ai/client");

const app = express();

app.use(cors());
app.use(express.json());

fal.config({
    credentials: process.env.FAL_KEY
});

app.post("/generate", async (req, res) => {
    try {
        const { prompt, style } = req.body;

        if (!prompt) {
            return res.status(400).json({
                error: "Le prompt est obligatoire."
            });
        }

        const finalPrompt = `${prompt}. Style: ${style || "realistic"}.`;

        const result = await fal.subscribe(
            "fal-ai/vidu/q2/text-to-video",
            {
                input: {
                    prompt: finalPrompt
                }
            }
        );

        res.json({
            success: true,
            data: result.data
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "La génération de la vidéo a échoué."
        });
    }
});


    const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Tenera AI Video démarré sur le port ${PORT}`);
});
                
