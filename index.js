import htmlToJson from "./htmlToJson.js"
import fs from "node:fs"
import iconv from "iconv-lite"

import axios from "axios"

// axios.get("https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm", {
//     headers: {
//         "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
//         "Accept": "text/html",
//         "Accept-Language": "pt-BR,pt;q=0.9"
//     }, timeout: 10000
// })
//     .then(function (response) {
//         console.log(response);
//     }).catch(err => {
//         console.log(err);
//     })

// è so pra definir a entrada pra um arquivo
fs.readFile("./read_archives/entrada.html", (err, data) => {
    if (err) throw err;
    let decoded_file = iconv.decode(data, "windows-1252");
    htmlToJson(iconv.encode(decoded_file, "utf-8"));
})
