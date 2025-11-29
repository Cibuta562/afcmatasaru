/* eslint-env node */

import express from "express";
import fetch from "node-fetch";
import * as cheerio from "cheerio";
import cors from "cors";

const app = express();
app.use(cors());

// ———————————————————————————————
// HEADERE necesare ca FRF să nu blocheze requestul
// ———————————————————————————————
const HEADERS = {
    "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
    "Accept":
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Language": "ro-RO,ro;q=0.9,en-US;q=0.8,en;q=0.7",
};

// ———————————————————————————————
// URL-uri FRF
// ———————————————————————————————
const STANDINGS_URL =
    "https://www.frf-ajf.ro/dambovita/competitii-fotbal/liga-6-vest-14991/clasament";

const MATCHES_URL =
    "https://www.frf-ajf.ro/dambovita/competitii-fotbal/liga-6-vest-14991/program";

// ============================================================
// 🟡 API — STANDINGS (Clasament)
// ============================================================
app.get("/api/standings", async (req, res) => {
    try {
        const response = await fetch(STANDINGS_URL, { headers: HEADERS });
        const html = await response.text();
        const $ = cheerio.load(html);

        const teams = [];

        $("table tbody tr").each((i, row) => {
            const cells = $(row).find("td");
            if (cells.length < 7) return;

            const loc = $(cells[0]).text().trim();
            if (!loc || isNaN(Number(loc))) return;

            teams.push({
                loc,
                nume: $(cells[1]).text().trim(),
                m: $(cells[2]).text().trim(),
                v: $(cells[3]).text().trim(),
                e: $(cells[4]).text().trim(),
                i: $(cells[5]).text().trim(),
                pct: $(cells[cells.length - 1]).text().trim(),
            });
        });

        res.json({ teams });
    } catch (err) {
        console.error("Eroare scraping standings:", err);
        res.json({ teams: [], error: "Scraping failed" });
    }
});

// ============================================================
// 🟡 API — MATCHES (Program + Rezultate doar pt. Mătăsaru)
// ============================================================
app.get("/api/matches", async (req, res) => {
    try {
        const response = await fetch(MATCHES_URL, { headers: HEADERS });
        const html = await response.text();
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

            const [team1, team2] = teamsText.split("-").map((t) => t.trim());

            // doar meciuri unde apare Mătăsaru
            if (!/matasaru/i.test(team1) && !/matasaru/i.test(team2)) return;

            matches.push({
                round,
                date,
                team1,
                team2,
                score,
            });
        });

        res.json({ matches });
    } catch (err) {
        console.error("Eroare scraping matches:", err);
        res.json({ matches: [], error: "Scraping failed" });
    }
});

// ============================================================
// HEALTH CHECK (pentru UptimeRobot / Render Keep Alive)
// ============================================================
app.get("/healthz", (req, res) => res.send("OK"));

// ============================================================
// PORNEȘTE SERVERUL
// ============================================================
const PORT = process.env.PORT || 3001;

app.listen(PORT, "0.0.0.0", () =>
    console.log(`Backend pornit pe portul ${PORT}`)
);
