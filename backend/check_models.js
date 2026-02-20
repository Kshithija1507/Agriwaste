import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function main() {
    try {
        const list = await groq.models.list();
        console.log("--- START MODELS ---");
        list.data.forEach((model) => {
            console.log(model.id);
        });
        console.log("--- END MODELS ---");
    } catch (error) {
        console.error("Error fetching models:", error);
    }
}

main();
