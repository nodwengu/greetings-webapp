const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

//Configure the middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index');
})

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
    console.log(`Server started at: http://localhost:${PORT}`);
})