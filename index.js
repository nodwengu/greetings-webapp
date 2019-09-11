const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const flash = require('express-flash');
const session = require('express-session');

const CreateGreetings = require('./createGreetings');
const createGreetings = CreateGreetings();


const app = express();

// initialise session middleware - flash-express depends on it
app.use(session({
   secret : "<add a secret string here>",
   resave: false,
   saveUninitialized: true
 }));

 // initialise the flash middleware
 app.use(flash());

//Configure the middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(express.static('public'))

app.get('/', (req, res) => {
   res.render('index', {
      name: createGreetings.getName(),
      greeting: createGreetings.getGreeting(),
      greetingCounter: createGreetings.getCounter(),
      inputError:  req.flash('msg1')
   });
})

app.post('/greet', (req, res) => {
   let name = req.body.name;
   let lang = req.body.languageRadio;

   if(name == "" || (lang === undefined && lang !== 'english' && lang !== 'afrikaans'&& lang !== 'xhosa')) {
      req.flash('msg1', 'Error: Input is required!')
   } else {
      if( createGreetings.isNameRepeated(name) === false ) {
         createGreetings.setName(name);
         createGreetings.setGreeting(lang, name);
      } 
   }
 
   res.redirect('/')
})


app.get('/greeted', (req, res) => {
   res.render('greeted', {
      names: createGreetings.getNames()
   })

})

app.get('/counter/<USER_NAME>', (req, res) => {

})

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
   console.log(`Server started at: http://localhost:${PORT}`);
})

