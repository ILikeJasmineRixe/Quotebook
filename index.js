const Koa = require("koa");
const Router = require("@koa/router");
const fs = require("fs").promises;
const serve = require("koa-static");
const path = require("path");

const app = new Koa();
const router = new Router();

async function getQuotesFromFile(filename) {
    try {
        const filePath = path.join(__dirname, "data", filename);
        const fileContent = await fs.readFile(filePath, "utf-8");
        return fileContent.split("\n").filter(q => q.trim() !== "");
    } catch (error) {
        console.error(`Error reading ${filename}:`, error);
        return [];
    }
}

async function getRandomQuote(includeGerman, includeNSFW) {
    let quotes = await getQuotesFromFile("baseQuotes.txt");

    if (includeGerman) {
        const germanQuotes = await getQuotesFromFile("germanQuotes.txt");
        quotes = quotes.concat(germanQuotes);
    }

    if (includeNSFW) {
        const nsfwQuotes = await getQuotesFromFile("nsfwQuotes.txt");
        quotes = quotes.concat(nsfwQuotes);
    }

    if (quotes.length === 0) {
        return "No quotes available.";
    }

    return quotes[Math.floor(Math.random() * quotes.length)];
}

router.get("/quote", async (ctx) => {
    const includeGerman = ctx.query.german === "true";
    const includeNSFW = ctx.query.nsfw === "true";

    ctx.set("Content-Type", "application/json");
    ctx.body = { quote: await getRandomQuote(includeGerman, includeNSFW) };
});

app.use(router.routes()).use(router.allowedMethods());
app.use(serve(path.join(__dirname, "public")));

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
