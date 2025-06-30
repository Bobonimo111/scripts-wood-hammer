import fs from "node:fs"
import * as cheerio from "cheerio";

function htmlToJson(entrada) {
    fs.readFile(entrada, "utf-8", (err, data) => {
        if (err) throw err;
        // Aq começamos a brincadeira
        const $ = cheerio.load(data);

        let xpath = "a[name]";
        let capturas = $(xpath)

        let objeto = {};
        let ultimo_titulo = 0;
        let ultimo_capitulo = 0;
        let ultimo_artigo = 0;
        let ultimo_paragrafo = 0;


        capturas.each((index, el) => {
            let parent = el.parent
            if ($(parent).find("a").attr("name").substring(0, 6) == "titulo" && $(parent).find("a").attr("name").length <= 9) {
                console.log($(parent).html())
            }

        })

    });
}

export default htmlToJson;