const Koa = require("koa");
const Router = require("@koa/router");
const fs = require("fs").promises;
const serve = require("koa-static");
const path = require("path");

const app = new Koa();
const router = new Router();

async function getRandomQuote() {
    try {
        const fileContent = await fs.readFile("quotes.txt", "utf-8");
        const quotes = fileContent.split("\n").filter(q => q.trim() !== "");
        if (quotes.length === 0) throw new Error("No quotes available");
        return quotes[Math.floor(Math.random() * quotes.length)];
    } catch (error) {
        console.error("Error reading file:", error);
        return "Error fetching quote.";
    }
}

router.get("/quote", async (ctx) => {
    ctx.set("Content-Type", "application/json");
    ctx.body = { quote: await getRandomQuote() };
});

app.use(async (ctx, next) => {
    if (ctx.path === "/beans") {
        ctx.status = 403;
        ctx.body = "Access denied";
    } else {
        await next();
    }
});

app.use(router.routes()).use(router.allowedMethods());
app.use(serve(path.join(__dirname, "public"))); // Serves static files (like index.html)

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
