import * as cheerio from "cheerio";
import fs from "node:fs"


function htmlToJson(html) {


    // Aq começamos a brincadeira
    const $ = cheerio.load(html);

    let capturas = $("body").find("p, div, blockquote")

    let objeto = {};
    let ultimo_titulo = 0;
    let ultimo_capitulo = 0;
    let ultimo_artigo = 0;
    let ultimo_paragrafo = 0;

    // console.log($(capturas.get(4)).html())

    capturas.each((index, el) => {
        if ($(el).find("strike") > 0) {
            return null;
        }

        const nome = $(el).html() || "";
        // Titulo
        if (new RegExp("\\bt.tulo\\s*[ivxlcdm]+\\b", "i").test(nome)
            // && !(new RegExp("capitulo[i,v,x]").test($(el).text()))

        ) {
            ultimo_titulo = $(el)
            let titulo_encontrado = $(el);
            // console.log("dectado: " + titulo_encontrado.trim())
            objeto[titulo_encontrado.find("name").first().attr("name")] = {};
            writeFile(titulo_encontrado.find("[name]").first().attr("name"));

        }
        // Artigo 
        else if ($(el).attr("id") == "art") {

            let bloco_de_artigos = $(el).find("p");
            let ultimo_artigo_indexador = 0;
            // o^2
            bloco_de_artigos.each((index, art) => {

                //econtrar artigos
                if (new RegExp("Art.").test($(art).text())) {
                    ultimo_artigo = $(art)
                    ultimo_artigo_indexador = ultimo_artigo.find("a").first().attr("[name]");
                    objeto[ultimo_titulo][ultimo_artigo_indexador] =
                        { "text": ultimo_artigo.text(), "paragrafos": new Array() }
                }
                else if (new RegExp(`\\bt${ultimo_artigo.find("a").first().attr("[name]")}\\s*[ivxlcdm]+\\b`)
                    .test($(art).find("[name]").first().attr("name"))) {

                    objeto[ultimo_capitulo][ultimo_artigo_indexador]["paragrafos"].append($(art).text());
                }

            })


            // console.log(artigo_encontrado.text());
            // writeFile(artigo_encontrado.text());
        }
        console.log(objeto);
        // pargrafos
    })


}

function regex_teste(texto, palavra) {
    const regex = new RegExp(`\\b${palavra}\\b`, 'i');
    return regex.test(texto);
}

function writeFile(text) {
    fs.appendFileSync("saida.txt", text + "\n");
}


export default htmlToJson;