import fs from "node:fs"
import * as cheerio from "cheerio";

function htmlToJson(entrada) {
    fs.readFile(entrada, "utf-8", (err, data) => {
        if (err) throw err;
        // Aq começamos a brincadeira
        const $ = cheerio.load(data);

        let xpath = "a[name^='titulo']";
        let capturas = $(xpath)

        capturas.each((index, el) => {
            console.log($(el.parent).html())

        })

    });
}

export default htmlToJson;