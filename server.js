const express = require("express")
const app = express()
const PORT = 3000;
app.use(express.urlencoded({
    extended: true
}));

const path = require("path")
const hbs = require('express-handlebars');

let values = []
let stars = [];

app.set('views', path.join(__dirname, 'views'));         // ustalamy katalog views
app.engine('hbs', hbs({
    defaultLayout: 'main.hbs',
    extname: '.hbs',
    partialsDir: "views/partials",

    helpers: {
        getPrice: function (price) {
            let list = price.toString().split(".")
            if (list[1] != undefined) {
                if (list[1].length < 2) {
                    list[1] += "0";
                }
            } else {
                list[1] = "00";
            }
            return list.join(".");
        },
        getStars: function (num) {
            let string = "";
            for (let i = 0; i < num; i++) {
                string += `<img src="http://4ia1.spec.pl.hostingasp.pl/test_uploadu/star.png" alt="cunningham">`;
            }
            return string
        }
    }

}));   // domyślny layout, potem można go zmienić
app.set('view engine', 'hbs');


const context = require("./data/data.json")

app.get("/", function (req, res) {
    res.render('index.hbs', context);   // nie podajemy ścieżki tylko nazwę pliku
})


app.use(express.static('static'))

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})
