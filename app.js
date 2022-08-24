
"use strict";

try {
    var pseudo_random_ISBN_generator = () => {
        let stringie = '';
        for (let indx_iterator = 0; indx_iterator <= 12; indx_iterator++) {
            stringie += String(Math.floor(Math.random() * 10));
            if (
                (indx_iterator === 2) ||
                (indx_iterator === 3) ||
                (indx_iterator === 5) ||
                (indx_iterator === 11)
            ) stringie += '-';
        };
        return (stringie);
    };
} catch (err) {
    if (err) console.log(err);
};

try {

    require("http").createServer((req, res) => {
        if (req.url === '/') {
            require("fs").readFile("start.htm", (err, data) => {
                if (err) throw err;
                res.writeHead(200, { "Content-Type": "text/html" });
                res.write(data);
                return res.end();
            });
        }
        else if (
            require("url").parse(req.url, true).query.initialized === "true"
        ) {
            require("mongodb").MongoClient.connect("mongodb://localhost:27017", (err, db) => {
                if (err) throw err;
                db.db("tryout_db").createCollection("books_collection", (err, rslt) => {
                    if (err) throw err;
                    db.close();
                });
                db.db("tryout_db").collection("books_collection").insertMany([
                    {
                        ISBN: `${pseudo_random_ISBN_generator.call()}`,
                        title: "A Walk By Sand Trees", author: "Bukekele Mengva"
                    },
                    {
                        ISBN: `${pseudo_random_ISBN_generator.call()}`,
                        title: "Moonlight Wall", author: "Frederick Oline"
                    },
                    {
                        ISBN: `${pseudo_random_ISBN_generator.call()}`,
                        title: "Before Big Bangs", author: "Jeffrey Khajyti"
                    },
                    {
                        ISBN: `${pseudo_random_ISBN_generator.call()}`,
                        title: "After Vacuum", author: "Alan Von Wolfram"
                    },
                    {
                        ISBN: `${pseudo_random_ISBN_generator.call()}`,
                        title: "Misinterpretation And The Bug", author: "Andrew Owens"
                    },
                    {
                        ISBN: `${pseudo_random_ISBN_generator.call()}`,
                        title: "Boogie & Skating Woogie", author: "Osvald Carti"
                    },
                    {
                        ISBN: `${pseudo_random_ISBN_generator.call()}`,
                        title: "Ch-room And Where Turings At?", author: "Natasha Quigley Foy"
                    }
                ], (err, rslt) => {
                    if (err) throw err;
                    db.close();
                });
            });
            require("fs").readFile("CRUD.htm", (err, data) => {
                if (err) throw err;
                res.writeHead(200, { "Content-Type": "text/html" });
                res.write(data);
                return res.end();
            });
        }
        else if (
            require("url").parse(req.url, true).query.operation === "create"
        ) {
            if (
                (typeof require("url").parse(req.url, true).query.title !== "undefined") &&
                (typeof require("url").parse(req.url, true).query.author !== "undefined")
            ) {
                require("mongodb").MongoClient.connect("mongodb://localhost:27017", (err, db) => {
                    if (err) throw err;
                    db.db("tryout_db").collection("books_collection").insertOne({
                        ISBN: String(pseudo_random_ISBN_generator()),
                        title: String(decodeURIComponent(require("url").parse(req.url, true).query.title)),
                        author: String(decodeURIComponent(require("url").parse(req.url, true).query.author))
                    }, (err, rslt) => {
                        if (err) throw err;
                        db.close();
                    });
                });
                require("fs").readFile("CRUD.htm", (err, data) => {
                    if (err) throw err;
                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.write(data);
                    return res.end();
                });
            }
            else {
                require("fs").readFile("create.htm", (err, data) => {
                    if (err) throw err;
                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.write(data);
                    return res.end();
                });
            };
        }
        else if (
            require("url").parse(req.url, true).query.operation === "read"
        ) {
            require("mongodb").MongoClient.connect("mongodb://localhost:27017", (err, db) => {
                if (err) throw err;
                db.db("tryout_db").collection("books_collection").find({}).toArray((err, rslt) => {
                    if (err) throw err;
                    if (rslt.length === 0) {
                        require("fs").readFile("redirect_DB_null.htm", (err, data) => {
                            if (err) throw err;
                            res.writeHead(200, { "Content-Type": "text/html" });
                            res.write(data);
                            return res.end();
                        });
                        db.close();
                    } else {
                        res.writeHead(200, { "Content-Type": "text/html" });
                        res.write(`` +
                            `<!DOCTYPE html>` +
                            `<html lang="en">` +
                            `` +
                            `<head>` +
                            `<meta charset="UTF-8" />` +
                            `<meta name="viewport" content="width=device-width, initial-scale=1.0" />` +
                            `<meta name="author" content="dodo : jozef.javorsky.strom44zem88@gmail.com" />` +
                            `<meta name="description" content="Node.js & MongoDB tryouts." />` +
                            `<title>eLibrary v0.04</title>` +
                            `<link rel="icon" type="image/x-icon" sizes="16x16" href="data:image/x-icon;` +
                            `base64,` +
                            `iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAAXNS` +
                            `R0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7D` +
                            `AcdvqGQAAABXSURBVDhPzYxhCkAhDIJ34278zlI9hwuhtf71IaRD` +
                            `s8nX/ueE18ZzJd9UiBocPoCAXHjXvDOMmneGMTIF5ML74lJ0kMy0` +
                            `8PIgEWuTcClewwd1+abCqJl1ymiErwObpFQAAAAASUVORK5CYII=" />` +
                            `<style>` +
                            `#html-body {` +
                            `background-color: rgb(122, 122, 122);` +
                            `user-select: none;` +
                            `}` +
                            `` +
                            `.hrElement {` +
                            `width: 11cm;` +
                            `margin-left: 2mm;` +
                            `margin-top: 4mm;` +
                            `margin-bottom: 4mm;` +
                            `background-color: rgb(0, 0, 0);` +
                            `height: 2mm;` +
                            `}` +
                            `` +
                            `#header-h2 {` +
                            `font-family: cursive;` +
                            `text-decoration: overline underline;` +
                            `margin-left: 2cm;` +
                            `display: inline-block;` +
                            `border: 1mm dotted rgba(0, 0, 0, 1);` +
                            `box-shadow: 0 0 8mm 4mm rgb(0, 0, 0);` +
                            `color: rgba(0, 0, 0, 1);` +
                            `}` +
                            `` +
                            `.footerParagraph {` +
                            `margin-left: 2cm;` +
                            `font-family: cursive;` +
                            `font-weight: 900;` +
                            `font-size: 4mm;` +
                            `color: rgba(0, 0, 0, 1);` +
                            `}` +
                            `</style>` +
                            `</head>` +
                            `` +
                            `<body id="html-body">` +
                            `<hr class="hrElement" />` +
                            `<header>` +
                            `<h2 id="header-h2">|eLibrary v0.04|</h2>` +
                            `</header>` +
                            `<hr class="hrElement" />` +
                            `<main id="body-main"></main>` +
                            `<hr class="hrElement" />` +
                            `<footer>` +
                            `<p id="footer-p" class="footerParagraph">ISBN : </p>` +
                            `<p id="footer-p-p" class="footerParagraph">title : </p>` +
                            `<p id="footer-p-p-p" class="footerParagraph">author : </p>` +
                            `<p id="footer-p-p-p-p" class="footerParagraph">ID : </p>` +
                            `</footer>` +
                            `<hr class="hrElement" />` +
                            `<button id="redirect-bttn"></button>` +
                            `<script>` +
                            `"use strict";` +
                            `try {` +
                            `let info_p = document.createElement('p');` +
                            `info_p.innerHTML = "Please select, <br />which book You want to see details of.";` +
                            `info_p.style.marginLeft = "2cm";` +
                            `info_p.style.fontFamily = "cursive";` +
                            `info_p.style.fontWeight = "900";` +
                            `info_p.style.fontSize = "4mm";` +
                            `document.querySelector("#body-main").appendChild(info_p);` +
                            `let select_box = document.createElement("select");` +
                            `select_box.setAttribute("id", "main-SelectBox");` +
                            `document.querySelector("#body-main").appendChild(select_box);` +
                            `document.querySelector("#main-SelectBox").style.marginLeft = "1cm";` +
                            `document.querySelector("#main-SelectBox").style.backgroundColor = "rgb(222, 222, 222)";` +
                            `document.querySelector("#main-SelectBox").style.borderRadius = "2mm";` +
                            `let pseudo_placeholder = document.createElement("option");` +
                            `pseudo_placeholder.innerText = " ISBN : ";` +
                            `pseudo_placeholder.setAttribute("value", '');` +
                            `pseudo_placeholder.setAttribute("selected", "selected");` +
                            `pseudo_placeholder.setAttribute("hidden", "hidden");` +
                            `pseudo_placeholder.setAttribute("disabled", "disabled");` +
                            `document.querySelector("#main-SelectBox").appendChild(pseudo_placeholder);` +
                            `[...${JSON.stringify(rslt)}].map(_b => {` +
                            `let ISBN_option = document.createElement("option");` +
                            `ISBN_option.innerText = String(_b["ISBN"]);` +
                            `ISBN_option.setAttribute("value", String(_b["ISBN"]));` +
                            `document.querySelector("#main-SelectBox").appendChild(ISBN_option);` +
                            `});` +
                            `document.querySelector("#main-SelectBox").addEventListener("input", (ev) => {` +
                            `[...${JSON.stringify(rslt)}].map(_b___ => {` +
                            `if (_b___["ISBN"] === ev.target.value) {` +
                            `document.querySelector("#footer-p").innerText = "ISBN : " + String(_b___["ISBN"]);` +
                            `document.querySelector("#footer-p-p").innerText = "title : " + String(_b___["title"]);` +
                            `document.querySelector("#footer-p-p-p").innerText = "author : " + String(_b___["author"]);` +
                            `document.querySelector("#footer-p-p-p-p").innerText = "ID : " + String(_b___["_id"]);` +
                            `} else { };` +
                            `});` +
                            `});` +
                            `document.querySelector("#redirect-bttn").innerText = "redirect";` +
                            `document.querySelector("#redirect-bttn").style.marginLeft = "2cm";` +
                            `document.querySelector("#redirect-bttn").style.border = '0';` +
                            `document.querySelector("#redirect-bttn").style.fontFamily = "cursive";` +
                            `document.querySelector("#redirect-bttn").style.fontWeight = "900";` +
                            `document.querySelector("#redirect-bttn").style.fontColor = "rgba(0, 0, 0, 1)";` +
                            `document.querySelector("#redirect-bttn").style.fontSize = "4mm";` +
                            `document.querySelector("#redirect-bttn").style.backgroundColor = "rgb(0, 200, 100)";` +
                            `document.querySelector("#redirect-bttn").style.padding = "1mm 3mm 1mm 3mm";` +
                            `document.querySelector("#redirect-bttn").style.borderRadius = "2mm";` +
                            `document.querySelector("#redirect-bttn").addEventListener("mouseenter", (ev) => {` +
                            `ev.target.style.cursor = "pointer";` +
                            `ev.target.style.backgroundColor = "rgb(0, 0, 0)";` +
                            `ev.target.style.color = "rgba(0, 200, 100, 1)";` +
                            `});` +
                            `document.querySelector("#redirect-bttn").addEventListener("mouseleave", (ev) => {` +
                            `ev.target.style.backgroundColor = "rgb(0, 200, 100)";` +
                            `ev.target.style.color = "rgba(0, 0, 0, 1)";` +
                            `});` +
                            `document.querySelector("#redirect-bttn").addEventListener("click", (ev) => {` +
                            `window.location = "/?redirect=true";` +
                            `});` +
                            `} catch (err) {` +
                            `if (err) console.log(err);` +
                            `};` +
                            `</script>` +
                            `</body>` +
                            `` +
                            `</html>` +
                            ``);
                        res.end();
                        db.close();
                    };
                });
            });
        }
        else if (
            require("url").parse(req.url, true).query.operation === "update"
        ) {

            if (
                (typeof require("url").parse(req.url, true).query.ISBN !== "undefined") &&
                (typeof require("url").parse(req.url, true).query.title !== "undefined") &&
                (typeof require("url").parse(req.url, true).query.author !== "undefined")
            ) {
                {
                    require("mongodb").MongoClient.connect("mongodb://localhost:27017", (err, db) => {
                        if (err) throw err;
                        db.db("tryout_db").collection("books_collection").updateOne(
                            {
                                ISBN: String(require("url").parse(req.url, true).query.ISBN)
                            },
                            {
                                $set: {
                                    ISBN: String(pseudo_random_ISBN_generator()),
                                    title: String(decodeURIComponent(require("url").parse(req.url, true).query.title)),
                                    author: String(decodeURIComponent(require("url").parse(req.url, true).query.author))
                                }
                            },
                            (err, rslt) => {
                                if (err) throw err;
                                db.close();
                            });
                    });
                };
                {
                    require("fs").readFile("CRUD.htm", (err, data) => {
                        if (err) throw err;
                        res.writeHead(200, { "Content-Type": "text/html" });
                        res.write(data);
                        return res.end();
                    });
                };
            };

            require("mongodb").MongoClient.connect("mongodb://localhost:27017", (err, db) => {
                if (err) throw err;
                db.db("tryout_db").collection("books_collection").find({}).toArray((err, rslt) => {
                    if (err) throw err;
                    if (rslt.length === 0) {
                        require("fs").readFile("redirect_DB_null.htm", (err, data) => {
                            if (err) throw err;
                            res.writeHead(200, { "Content-Type": "text/html" });
                            res.write(data);
                            return res.end();
                        });
                        db.close();
                    } else {
                        res.writeHead(200, { "Content-Type": "text/html" });
                        res.write(`` +
                            `<!DOCTYPE html>` +
                            `<html lang="en">` +
                            `` +
                            `<head>` +
                            `<meta charset="UTF-8" />` +
                            `<meta name="viewport" content="width=device-width, initial-scale=1.0" />` +
                            `<meta name="author" content="dodo : jozef.javorsky.strom44zem88@gmail.com" />` +
                            `<meta name="description" content="Node.js & MongoDB tryouts." />` +
                            `<title>eLibrary v0.04</title>` +
                            `<link rel="icon" type="image/x-icon" sizes="16x16" href="data:image/x-icon;` +
                            `base64,` +
                            `iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAAXNS` +
                            `R0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7D` +
                            `AcdvqGQAAABXSURBVDhPzYxhCkAhDIJ34278zlI9hwuhtf71IaRD` +
                            `s8nX/ueE18ZzJd9UiBocPoCAXHjXvDOMmneGMTIF5ML74lJ0kMy0` +
                            `8PIgEWuTcClewwd1+abCqJl1ymiErwObpFQAAAAASUVORK5CYII=" />` +
                            `<style>` +
                            `#html-body {` +
                            `background-color: rgb(122, 122, 122);` +
                            `user-select: none;` +
                            `}` +
                            `` +
                            `.hrElement {` +
                            `width: 11cm;` +
                            `margin-left: 2mm;` +
                            `margin-top: 4mm;` +
                            `margin-bottom: 4mm;` +
                            `background-color: rgb(0, 0, 0);` +
                            `height: 2mm;` +
                            `}` +
                            `` +
                            `#header-h2 {` +
                            `font-family: cursive;` +
                            `text-decoration: overline underline;` +
                            `margin-left: 2cm;` +
                            `display: inline-block;` +
                            `border: 1mm dotted rgba(0, 0, 0, 1);` +
                            `box-shadow: 0 0 8mm 4mm rgb(0, 0, 0);` +
                            `color: rgba(0, 0, 0, 1);` +
                            `}` +
                            `` +
                            `.secondlyInp::placeholder {` +
                            `color: rgb(0, 0, 0);` +
                            `opacity: 1;` +
                            `}` +
                            `` +
                            `.secondlyInp:focus {` +
                            `color: rgba(0, 0, 0, 1);` +
                            `outline: 1.7mm solid rgba(0, 0, 0, 1);` +
                            `}` +
                            `</style>` +
                            `</head>` +
                            `` +
                            `<body id="html-body">` +
                            `<hr class="hrElement" />` +
                            `<header>` +
                            `<h2 id="header-h2">|eLibrary v0.04|</h2>` +
                            `</header>` +
                            `<hr class="hrElement" />` +
                            `<main id="body-main"></main>` +
                            `<hr class="hrElement" />` +
                            `<footer id="body-footer"></footer>` +
                            `<script>` +
                            `"use strict";` +
                            `try {` +
                            `let info_prgrph = document.createElement('p');` +
                            `info_prgrph.innerHTML = "Please select,<br />which book You want to edit details of.";` +
                            `info_prgrph.style.marginLeft = "2cm";` +
                            `info_prgrph.style.fontFamily = "cursive";` +
                            `info_prgrph.style.fontWeight = "900";` +
                            `info_prgrph.style.fontSize = "4mm";` +
                            `info_prgrph.style.color = "rgba(0, 0, 0, 1)";` +
                            `document.querySelector("#body-main").appendChild(info_prgrph);` +
                            `} catch (err) {` +
                            `if (err) console.log(err);` +
                            `};` +
                            `</script>` +
                            `<script>` +
                            `"use strict";` +
                            `try {` +
                            `let select_box_ = document.createElement("select");` +
                            `select_box_.setAttribute("id", "slct-box");` +
                            `select_box_.style.marginLeft = "1cm";` +
                            `document.querySelector("#body-main").appendChild(select_box_);` +
                            `} catch (err) {` +
                            `if (err) console.log(err);` +
                            `};` +
                            `</script>` +
                            `<script>` +
                            `"use strict";` +
                            `try {` +
                            `document.querySelector("#slct-box").style.backgroundColor = "rgb(222, 222, 222)";` +
                            `document.querySelector("#slct-box").style.borderRadius = "2mm";` +
                            `let pseudo_plchldr = document.createElement("option");` +
                            `pseudo_plchldr.innerText = "ISBN : ";` +
                            `pseudo_plchldr.value = '';` +
                            `pseudo_plchldr.setAttribute("selected", "selected");` +
                            `pseudo_plchldr.setAttribute("hidden", "hidden");` +
                            `pseudo_plchldr.setAttribute("disabled", "disabled");` +
                            `pseudo_plchldr.setAttribute("value", '');` +
                            `document.querySelector("#slct-box").appendChild(pseudo_plchldr);` +
                            `} catch (err) {` +
                            `if (err) console.log(err);` +
                            `};` +
                            `</script>` +
                            `<script>` +
                            `"use strict";` +
                            `try {` +
                            `[...${JSON.stringify(rslt)}].map(_B_ => {` +
                            `let _ISBN_optn = document.createElement("option");` +
                            `_ISBN_optn.innerText = String(_B_["ISBN"]);` +
                            `_ISBN_optn.value = String(_B_["ISBN"]);` +
                            `document.querySelector("#slct-box").appendChild(_ISBN_optn);` +
                            `});` +
                            `} catch (err) {` +
                            `if (err) console.log(err);` +
                            `};` +
                            `</script>` +
                            `<script>` +
                            `"use strict";` +
                            `try {` +
                            `document.querySelector("#slct-box").addEventListener("input", (ev) => {` +
                            `document.querySelector("#slct-box").setAttribute("disabled", "disabled");` +
                            `let new_hrElement = document.createElement("hr");` +
                            `new_hrElement.setAttribute("class", "hrElement");` +
                            `document.body.appendChild(new_hrElement);` +
                            `let some_new_info_p = document.createElement('p');` +
                            `some_new_info_p.innerHTML = '"A new pseudo-random-ISBN, <br />will be auto-generated & implicitly set,<br />for the book after edit."';` +
                            `some_new_info_p.style.marginLeft = "2cm";` +
                            `some_new_info_p.style.fontFamily = "cursive";` +
                            `some_new_info_p.style.fontSize = "3.5mm";` +
                            `some_new_info_p.style.color = "rgba(0, 0, 0, 1)";` +
                            `some_new_info_p.style.fontWeight = "900";` +
                            `document.querySelector("#body-footer").appendChild(some_new_info_p);` +
                            `let new_hint_p = document.createElement('p');` +
                            `new_hint_p.innerText = "...hint : alphabet, spacing, string = max 24 chars";` +
                            `new_hint_p.style.marginLeft = "1cm";` +
                            `new_hint_p.style.fontFamily = "cursive";` +
                            `new_hint_p.style.fontWeight = "900";` +
                            `new_hint_p.style.color = "rgba(0, 0, 0, 1)";` +
                            `new_hint_p.style.fontSize = "4mm";` +
                            `document.querySelector("#body-footer").appendChild(new_hint_p);` +
                            `let new_title_inp = document.createElement("input");` +
                            `new_title_inp.setAttribute("id", "new-title-inp");` +
                            `new_title_inp.setAttribute("class", "secondlyInp");` +
                            `new_title_inp.setAttribute("placeholder", "TITLE");` +
                            `new_title_inp.setAttribute("maxlength", "24");` +
                            `new_title_inp.setAttribute("type", "text");` +
                            `document.querySelector("#body-footer").appendChild(new_title_inp);` +
                            `for (let i = 0; i <= 1; i++) document.querySelector("#body-footer").appendChild(document.createElement("br"));` +
                            `let new_author_inp = document.createElement("input");` +
                            `new_author_inp.setAttribute("id", "new-author-inp");` +
                            `new_author_inp.setAttribute("class", "secondlyInp");` +
                            `new_author_inp.setAttribute("placeholder", "AUTHOR");` +
                            `new_author_inp.setAttribute("maxlength", "24");` +
                            `new_author_inp.setAttribute("type", "text");` +
                            `document.querySelector("#body-footer").appendChild(new_author_inp);` +
                            `let node_secondlyInps = document.querySelectorAll(".secondlyInp");` +
                            `node_secondlyInps.forEach(sI => {` +
                            `sI.style.marginLeft = "1cm";` +
                            `sI.style.width = "8.8cm";` +
                            `sI.style.backgroundColor = "rgb(222, 222, 222)";` +
                            `sI.style.color = "rgba(0, 0, 0, 1)";` +
                            `});` +
                            `document.querySelector("#new-title-inp").addEventListener("input", (_ev_1) => {` +
                            `let nTI_arr = [..._ev_1.target.value].map(v_1 => Number(v_1.charCodeAt()));` +
                            `for (let indx_1 = 0; indx_1 <= nTI_arr.length - 1; indx_1++) {` +
                            `if (` +
                            `(nTI_arr[indx_1] === Number(32)) ||` +
                            `((nTI_arr[indx_1] > Number(64)) && (nTI_arr[indx_1] < Number(91))) ||` +
                            `((nTI_arr[indx_1] > Number(96)) && (nTI_arr[indx_1] < Number(123)))` +
                            `) {` +
                            `continue;` +
                            `} else {` +
                            `_ev_1.target.value = '';` +
                            `break;` +
                            `};` +
                            `};` +
                            `});` +
                            `document.querySelector("#new-author-inp").addEventListener("input", (_ev_2) => {` +
                            `let nAI_arr = [..._ev_2.target.value].map(v_2 => Number(v_2.charCodeAt()));` +
                            `for (let yndx_2 = 0; yndx_2 <= nAI_arr.length - 1; yndx_2++) {` +
                            `if (` +
                            `(nAI_arr[yndx_2] === Number(32)) ||` +
                            `((nAI_arr[yndx_2] > Number(64)) && (nAI_arr[yndx_2] < Number(91))) ||` +
                            `((nAI_arr[yndx_2] > Number(96)) && (nAI_arr[yndx_2] < Number(123)))` +
                            `) {` +
                            `continue;` +
                            `} else {` +
                            `_ev_2.target.value = '';` +
                            `break;` +
                            `};` +
                            `};` +
                            `});` +
                            `let edit_bttn = document.createElement("button");` +
                            `edit_bttn.innerText = "edit";` +
                            `edit_bttn.style.marginLeft = "3cm";` +
                            `edit_bttn.style.border = '0';` +
                            `edit_bttn.style.backgroundColor = "rgb(0, 200, 100)";` +
                            `edit_bttn.style.color = "rgba(0, 0, 0, 1)";` +
                            `edit_bttn.style.fontFamily = "cursive";` +
                            `edit_bttn.style.fontWeight = "900";` +
                            `edit_bttn.style.fontSize = "4mm";` +
                            `edit_bttn.style.borderRadius = "2mm";` +
                            `edit_bttn.style.padding = "2mm 4mm 2mm 4mm";` +
                            `edit_bttn.addEventListener("mouseenter", (e) => {` +
                            `e.target.style.cursor = "pointer";` +
                            `e.target.style.backgroundColor = "rgb(0, 0, 0)";` +
                            `e.target.style.color = "rgba(0, 200, 100, 1)";` +
                            `});` +
                            `edit_bttn.addEventListener("mouseleave", (e) => {` +
                            `e.target.style.backgroundColor = "rgb(0, 200, 100)";` +
                            `e.target.style.color = "rgba(0, 0, 0, 1)";` +
                            `});` +
                            `edit_bttn.addEventListener("click", () => {` +
                            `if (` +
                            `(document.querySelector("#slct-box").value !== '') &&` +
                            `(document.querySelector("#new-title-inp").value !== '') &&` +
                            `(document.querySelector("#new-author-inp").value !== '')` +
                            `) {` +
                            `window.location = "/?operation=update&ISBN=" + String(document.querySelector("#slct-box").value) + "&title=" + encodeURIComponent(String(document.querySelector("#new-title-inp").value)) + "&author=" + encodeURIComponent(String(document.querySelector("#new-author-inp").value));` +
                            `} else {` +
                            `alert(String.fromCodePoint(10060) + "\u00a0\u00a0" + "Valid title & author are a must.");` +
                            `};` +
                            `});` +
                            `document.querySelector("#html-body").appendChild(edit_bttn);` +
                            `});` +
                            `} catch (err) {` +
                            `if (err) console.log(err);` +
                            `};` +
                            `</script>` +
                            `</body>` +
                            `` +
                            `</html>` +
                            ``);
                        res.end();
                        db.close();
                    };
                });
            });
        }
        else if (
            require("url").parse(req.url, true).query.operation === "delete"
        ) {


            if (
                typeof require("url").parse(req.url, true).query.ISBN !== "undefined"
            ) {
                {
                    require("mongodb").MongoClient.connect("mongodb://localhost:27017", (err, db) => {
                        if (err) throw err;
                        db.db("tryout_db").collection("books_collection").deleteOne(
                            {
                                ISBN: String(decodeURIComponent(require("url").parse(req.url, true).query.ISBN))
                            },
                            (err, rslt) => {
                                if (err) throw err;
                                db.close();
                            });
                    });
                };
                {
                    require("fs").readFile("CRUD.htm", (err, data) => {
                        if (err) throw err;
                        res.writeHead(200, { "Content-Type": "text/html" });
                        res.write(data);
                        return res.end();
                    });
                };
            };


            require("mongodb").MongoClient.connect("mongodb://localhost:27017", (err, db) => {
                if (err) throw err;
                db.db("tryout_db").collection("books_collection").find({}).toArray((err, rslt) => {
                    if (err) throw err;
                    if (rslt.length === 0) {
                        require("fs").readFile("redirect_DB_null.htm", (err, data) => {
                            if (err) throw err;
                            res.writeHead(200, { "Content-Type": "text/html" });
                            res.write(data);
                            return res.end();
                        });
                        db.close();
                    } else {
                        res.writeHead(200, { "Content-Type": "text/html" });
                        res.write(`` +
                            `<!DOCTYPE html>` +
                            `<html lang="en">` +
                            `` +
                            `<head>` +
                            `<meta charset="UTF-8" />` +
                            `<meta name="viewport" content="width=device-width, initial-scale=1.0" />` +
                            `<meta name="author" content="dodo : jozef.javorsky.strom44zem88@gmail.com" />` +
                            `<meta name="description" content="Node.js & MongoDB tryouts." />` +
                            `<title>eLibrary v0.04</title>` +
                            `<link rel="icon" type="image/x-icon" sizes="16x16"` +
                            `href=` +
                            `"data:image/x-icon;` +
                            `base64,` +
                            `iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAAXNS` +
                            `R0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7D` +
                            `AcdvqGQAAABXSURBVDhPzYxhCkAhDIJ34278zlI9hwuhtf71IaRD` +
                            `s8nX/ueE18ZzJd9UiBocPoCAXHjXvDOMmneGMTIF5ML74lJ0kMy0` +
                            `8PIgEWuTcClewwd1+abCqJl1ymiErwObpFQAAAAASUVORK5CYII=" />` +
                            `<style>` +
                            `#html-body {` +
                            `background-color: rgb(122, 122, 122);` +
                            `user-select: none;` +
                            `}` +
                            `` +
                            `.hrElement {` +
                            `width: 11cm;` +
                            `margin-left: 2mm;` +
                            `margin-top: 4mm;` +
                            `margin-bottom: 4mm;` +
                            `background-color: rgb(0, 0, 0);` +
                            `height: 2mm;` +
                            `}` +
                            `` +
                            `#header-h2 {` +
                            `font-family: cursive;` +
                            `text-decoration: overline underline;` +
                            `margin-left: 2cm;` +
                            `display: inline-block;` +
                            `border: 1mm dotted rgba(0, 0, 0, 1);` +
                            `box-shadow: 0 0 8mm 4mm rgb(0, 0, 0);` +
                            `color: rgba(0, 0, 0, 1);` +
                            `}` +
                            `</style>` +
                            `</head>` +
                            `` +
                            `<body id="html-body">` +
                            `<hr class="hrElement" />` +
                            `<header>` +
                            `<h2 id="header-h2">|eLibrary v0.04|</h2>` +
                            `</header>` +
                            `<hr class="hrElement" />` +
                            `<main id="body-main"></main>` +
                            `<hr class="hrElement" />` +
                            `<script>` +
                            `"use strict";` +
                            `try {` +
                            `let new_info_p_ = document.createElement('p');` +
                            `new_info_p_.innerHTML = "Please,<br />select the book,<br />which You want to remove,<br />from the books collection of database.";` +
                            `new_info_p_.style.marginLeft = "1cm";` +
                            `new_info_p_.style.fontFamily = "cursive";` +
                            `new_info_p_.style.fontWeight = "900";` +
                            `new_info_p_.style.fontSize = "4mm";` +
                            `new_info_p_.style.color = "rgba(0, 0, 0, 1)";` +
                            `document.querySelector("#body-main").appendChild(new_info_p_);` +
                            `} catch (err) {` +
                            `if (err) console.log(err);` +
                            `};` +
                            `</script>` +
                            `<script>` +
                            `"use strict";` +
                            `try {` +
                            `let _select_boxie = document.createElement("select");` +
                            `_select_boxie.style.marginLeft = "2cm";` +
                            `_select_boxie.style.backgroundColor = "rgb(222, 222, 222)";` +
                            `_select_boxie.style.border = '0';` +
                            `_select_boxie.style.borderRadius = "1mm";` +
                            `_select_boxie.setAttribute("id", "slct-boxie");` +
                            `document.querySelector("#body-main").appendChild(_select_boxie);` +
                            `} catch (err) {` +
                            `if (err) console.log(err);` +
                            `};` +
                            `</script>` +
                            `<script>` +
                            `"use strict";` +
                            `try {` +
                            `let default_pseudo_placeholder = document.createElement("option");` +
                            `default_pseudo_placeholder.innerText = "ISBN : ";` +
                            `default_pseudo_placeholder.setAttribute("disabled", "disabled");` +
                            `default_pseudo_placeholder.setAttribute("selected", "selected");` +
                            `default_pseudo_placeholder.setAttribute("hidden", "hidden");` +
                            `document.querySelector("#slct-boxie").appendChild(default_pseudo_placeholder);` +
                            `} catch (err) {` +
                            `if (err) console.log(err);` +
                            `};` +
                            `</script>` +
                            `<script>` +
                            `"use strict";` +
                            `try {` +
                            `[...${JSON.stringify(rslt)}].map(_oneOf => {` +
                            `let nunew_opt = document.createElement("option");` +
                            `nunew_opt.setAttribute("value", String(_oneOf["ISBN"]));` +
                            `nunew_opt.innerText = String(_oneOf["ISBN"]);` +
                            `document.querySelector("#slct-boxie").appendChild(nunew_opt);` +
                            `});` +
                            `} catch (err) {` +
                            `if (err) console.log(err);` +
                            `};` +
                            `</script>` +
                            `<script>` +
                            `"use strict";` +
                            `try {` +
                            `document.querySelector("#slct-boxie").addEventListener("input", (_eve_) => {` +
                            `window.location = "/?operation=delete&ISBN=" + encodeURIComponent(String(_eve_.target.value));` +
                            `});` +
                            `} catch (err) {` +
                            `if (err) console.log(err);` +
                            `};` +
                            `</script>` +
                            `</body>` +
                            `` +
                            `</html>` +
                            ``);
                        res.end();
                        db.close();
                    };
                });
            });
        }
        else if (
            require("url").parse(req.url, true).query.redirect === "true"
        ) {
            require("fs").readFile("CRUD.htm", (err, data) => {
                if (err) throw err;
                res.writeHead(200, { "Content-Type": "text/html" });
                res.write(data);
                return res.end();
            });
        }
        else {
            require("fs").readFile("redirect.htm", (err, data) => {
                if (err) throw err;
                res.writeHead(200, { "Content-Type": "text/html" });
                res.write(data);
                return res.end();
            });
        };
    }).listen(5500);

} catch (err) {
    if (err) console.log(err);
};