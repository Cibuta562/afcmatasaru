import express from "express";
import fetch from "node-fetch";
import * as cheerio from "cheerio";
import cors from "cors";

const app = express();
app.use(cors());

// ---------------------- STANDINGS ----------------------

const TARGET_URL =
    "https://www.frf-ajf.ro/dambovita/competitii-fotbal/liga-6-vest-14991/clasament";

app.get("/api/standings", async (req, res) => {
    try {
        const response = await fetch(TARGET_URL, {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
                "Accept": "text/html"
            }
        });

        const html = await response.text();
        const $ = cheerio.load(html);
        const teams = [];

        $("tr").each((_, row) => {
            const cells = $(row).find("td");

            if (cells.length > 7) {
                const locText = $(cells[0]).text().trim();

                if (locText && !isNaN(Number(locText))) {
                    teams.push({
                        loc: locText,
                        nume: $(cells[1]).text().trim(),
                        m: $(cells[2]).text().trim(),
                        v: $(cells[3]).text().trim(),
                        e: $(cells[4]).text().trim(),
                        i: $(cells[5]).text().trim(),
                        pct: $(cells[cells.length - 1]).text().trim()
                    });
                }
            }
        });

        res.json({ teams });
    } catch (error) {
        console.error("Scraping error:", error);
        res.status(500).json({ error: "Nu am putut prelua datele." });
    }
});

// ---------------------- MATCHES ----------------------

const PROGRAM_URL =
    "https://www.frf-ajf.ro/dambovita/competitii-fotbal/liga-6-vest-14991/program";

app.get("/api/matches", async (req, res) => {
    try {
        const response = await fetch(PROGRAM_URL, {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
                "Accept": "text/html"
            }
        });

        const html = await response.text();
        const $ = cheerio.load(html);
        const matches = [];

        $("tr").each((_, row) => {
            const cells = $(row).find("td");
            if (cells.length < 4) return;

            const rawMatch = $(cells[0]).text().replace(/\s+/g, " ").trim();
            if (!rawMatch.includes("-")) return;

            if (!/matasaru/i.test(rawMatch)) return;

            const round = $(cells[1]).text().trim();
            const date = $(cells[2]).text().trim();
            const score = $(cells[3]).text().trim();

            const parts = rawMatch.split(" - ");
            const team1 = parts[0]?.trim() || "";
            const team2 = parts[1]?.trim() || "";

            matches.push({
                round,
                date,
                score,
                team1,
                team2,
            });
        });

        res.json({ matches });
    } catch (err) {
        console.error("Eroare scraping /api/matches:", err);
        res.status(500).json({ error: "Nu am putut prelua meciurile." });
    }
});

// ---------------------- SERVER ----------------------

const PORT = process.env.PORT || 3001;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Backend pornit pe portul ${PORT}`);
});
