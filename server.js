import express from "express";
import fetch from "node-fetch";
import * as cheerio from "cheerio";
import cors from "cors";

const app = express();
app.use(cors());

const TARGET_URL =
    "https://www.frf-ajf.ro/dambovita/competitii-fotbal/liga-6-vest-14991/clasament";

app.get("/api/standings", async (req, res) => {
    try {
        const response = await fetch(TARGET_URL);
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

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server online pe portul ${PORT}`);
});


// URL program competițional
const PROGRAM_URL =
    "https://www.frf-ajf.ro/dambovita/competitii-fotbal/liga-6-vest-14991/program";

app.get("/api/matches", async (req, res) => {
    try {
        const response = await fetch(PROGRAM_URL);
        const html = await response.text();

        const $ = cheerio.load(html);
        const matches = [];

        $("tr").each((_, row) => {
            const cells = $(row).find("td");
            if (cells.length < 4) return;

            const rawMatch = $(cells[0]).text().replace(/\s+/g, " ").trim();
            if (!rawMatch.includes("-")) return; // nu e linie de meci

            // filtrăm doar meciurile cu Matasaru
            if (!/matasaru/i.test(rawMatch)) return;

            const round = $(cells[1]).text().trim();     // Etapa
            const date = $(cells[2]).text().trim();      // Data (poate fi goală la viitoare îndepărtate)
            const score = $(cells[3]).text().trim();     // Scor (poate fi gol pt. viitoare)

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

