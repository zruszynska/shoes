const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()
const port = 3000

let shoes = [{
        productNumber: '123123',
        brand: 'Adidas',
        size: 40,
        color: 'Czarny',
        shoeType: 'Tenisówki'
    },
    {
        productNumber: '333333',
        brand: 'Nike',
        size: 42,
        color: 'Brązowy',
        shoeType: 'Sandały'
    },
    {
        productNumber: '424211322',
        brand: 'Mustang',
        size: 43,
        color: 'Czarny',
        shoeType: 'Glany'
    },
];

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', express.static('./client'));

app.post('/shoe', (req, res) => {
    const shoe = req.body;

    console.log(shoe);
    shoes.push(shoe);

    res.redirect('/shoe-list.html');
});

app.get('/shoe', (req, res) => {
    res.json(shoes);
});

app.get('/shoe/:productNumber', (req, res) => {
    const productNumber = req.params.productNumber;

    for (let shoe of shoes) {
        if (shoe.productNumber === productNumber) {
            res.json(shoe);
            return;
        }
    }

    res.status(404).send('Shoe not found');
});

app.delete('/shoe/:productNumber', (req, res) => {
    const productNumber = req.params.productNumber;

    shoes = shoes.filter(i => {
        if (i.productNumber !== productNumber) {
            return true;
        }

        return false;
    });

    res.send('Shoe is deleted');
});

app.post('/shoe/:productNumber', (req, res) => {
    const productNumber = req.params.productNumber;
    const newShoe = req.body;

    for (let i = 0; i < shoes.length; i++) {
        let shoe = shoes[i]

        if (shoe.productNumber === productNumber) {
            shoes[i] = newShoe;
        }
    }

    res.redirect('/shoe-list.html');
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));