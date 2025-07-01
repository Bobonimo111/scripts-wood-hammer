import * as cheerio from "cheerio";
import { error } from "node:console";
import fs from "node:fs"


function htmlToJson(html) {


    // Aq começamos a brincadeira
    const $ = cheerio.load(html);

    let capturas = $("body").find("p, div, blockquote")

    let objeto = {};

    let ultimo_titulo = null;
    let ultimo_artigo = null;

    let art_regex = /<a name="art[0-9]+(\.\.\.)?">/i;
    capturas.each((index, el) => {

        if ($(el).find("strike") > 0) {
            return null;
        }

        const nome = $(el).html() || "";
        // Titulo
        if (new RegExp("\\bt.tulo\\s*[ivxlcdm]+\\b", "i").test(nome)
        ) {
            ultimo_titulo = $(el).find("a[name]").first().attr("name");
            objeto[ultimo_titulo] = {};
        }
        // Artigo 
        else if ($(el).attr("id") == "art") {
            $(el).children("p").each((index, artHtml) => {
                // console.log($(artHtml).text())
                if (art_regex.test($(artHtml).html())) {
                    ultimo_artigo = $(artHtml).find("a[name]").eq(1).attr("name");
                    objeto[ultimo_titulo][ultimo_artigo] = { "texto": $(artHtml).text().trim(), "paragrafos": [] }
                } else {
                    objeto[ultimo_titulo][ultimo_artigo]["paragrafos"].push(
                        $(artHtml).text().replace(/[\r\n\t]+/g, '').trim()
                    );
                }

            })
            // throw new error();
            // console.log(artigo_encontrado.text());
            // writeFile(artigo_encontrado.text());
        }

        // pargrafos
    })
    writeFile(JSON.stringify(objeto))
}

function regex_teste(texto, palavra) {
    const regex = new RegExp(`\\b${palavra}\\b`, 'i');
    return regex.test(texto);
}

function writeFile(text) {
    fs.appendFileSync("./ig/saida.json", text + "\n");
}


export default htmlToJson;