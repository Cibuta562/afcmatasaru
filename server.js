import express from "express";
import cors from "cors";
import chromium from "chrome-aws-lambda";
import puppeteer from "puppeteer-core";
import {cheerio} from "cheerio/src/__fixtures__/fixtures.js";

const app = express();
app.use(cors());

// URLs
const STANDINGS_URL = "https://www.frf-ajf.ro/dambovita/competitii-fotbal/liga-6-vest-14991/clasament";
const MATCHES_URL = "https://www.frf-ajf.ro/dambovita/competitii-fotbal/liga-6-vest-14991/program";

async function loadPage(url) {
    const browser = await puppeteer.launch({
        args: chromium.args,
        executablePath: await chromium.executablePath,
        headless: true,
    });

    const page = await browser.newPage();

    await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118 Safari/537.36"
    );

    await page.goto(url, { waitUntil: "networkidle2" });

    const html = await page.content();
    await browser.close();
    return html;
}

/* ============================
   STANDINGS
===============================*/
app.get("/api/standings", async (req, res) => {
    try {
        const html = await loadPage(STANDINGS_URL);
        const $ = cheerio.load(html);

        const teams = [];

        $("table tbody tr").each((i, row) => {
            const cells = $(row).find("td");
            if (cells.length < 7) return;

            teams.push({
                loc: $(cells[0]).text().trim(),
                nume: $(cells[1]).text().trim(),
                m: $(cells[2]).text().trim(),
                v: $(cells[3]).text().trim(),
                e: $(cells[4]).text().trim(),
                i: $(cells[5]).text().trim(),
                pct: $(cells[cells.length - 1]).text().trim(),
            });
        });

        res.json({ teams });
    } catch (e) {
        console.error("Standings error:", e);
        res.json({ teams: [], error: "scraping-failed" });
    }
});

/* ============================
   MATCHES
===============================*/
app.get("/api/matches", async (req, res) => {
    try {
        const html = await loadPage(MATCHES_URL);
        const $ = cheerio.load(html);
        const matches = [];

        $("table tbody tr").each((i, row) => {
            const cells = $(row).find("td");
            if (cells.length < 4) return;

            const round = $(cells[0]).text().trim();
            const date = $(cells[1]).text().trim();
            const teamsText = $(cells[2]).text().trim();
            const score = $(cells[3]).text().trim();

            if (!teamsText.includes("-")) return;

            const [team1, team2] = teamsText.split("-").map(t => t.trim());

            if (!/matasaru/i.test(team1) && !/matasaru/i.test(team2)) return;

            matches.push({ round, date, team1, team2, score });
        });

        res.json({ matches });
    } catch (e) {
        console.error("Matches error:", e);
        res.json({ matches: [], error: "scraping-failed" });
    }
});

// HEALTH
app.get("/healthz", (req, res) => res.send("OK"));

// START
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log("Server running on " + PORT));
