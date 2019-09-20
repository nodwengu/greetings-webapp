
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const flash = require('express-flash');
const session = require('express-session');

const { Pool, Client } = require('pg')

// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local){
  useSSL = true;
}
// which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/greetings_db';

const pool = new Pool({
   connectionString,
   ssl : useSSL
});

const CreateGreetings = require('./createGreetings');
const createGreetings = CreateGreetings(pool);

const app = express();

// initialise session middleware - flash-express depends on it
app.use(session({
   secret: "<add a secret string here>",
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

app.get('/', async (req, res, next) => {
   try {
      res.render('index', {
         user: await createGreetings.getUsers(),
         greeting: createGreetings.getGreeting(),
         greetingsCounter: await createGreetings.getGreetingsCounter(),
         inputError: req.flash('msg1')
      });

   } catch(error) {
      next(error);
   }
})

app.post('/greet', async (req, res, next) => {
   try {
      let name = req.body.name;
      let lang = req.body.languageRadio;

      if (name == "" || (lang === undefined && lang !== 'english' && lang !== 'afrikaans' && lang !== 'xhosa')) {
         req.flash('msg1', 'Error: Input is required!')
      } else {
         if (await createGreetings.isNameRepeated(name) === false) {
            await createGreetings.setUser({
               name: name
            });
            createGreetings.setGreeting(lang, name);
         } else{
            createGreetings.setGreeting(lang, name);
            await createGreetings.updateUserCounter(name);
         }
      }

      res.redirect('/')
      
   } catch (error) {
      next(error)
   }
})

app.get('/greeted', async (req, res, next) => {
   try {
      res.render('greeted', {
         names: await createGreetings.getUsers(),
         infoMsg: req.flash('info'),
         show: 'show',
         hide: 'hide'
      })

   } catch(error) {
      next(error)
   }
})

app.get('/counter/:user_name', async (req, res, next) => {
   try {
      const user_name = req.params.user_name

      res.render('counter', {
         user_name: await createGreetings.getGreetingFor(user_name),
         counter: await createGreetings.getUserCounter(user_name)
      });

   } catch(error) {
      next(error)
   }
})

app.get('/greeted/delete/:id', async (req, res, next) => {
   try {
      let id = req.params.id;
		await createGreetings.deleteById(id);
      req.flash('info', 'User deleted!')
      
      res.redirect('/greeted');

   } catch(error) {
      next(error)
   }
});

app.get('/delete', async (req, res, next) => {
   try {
		await createGreetings.deleteUser();
   
      res.redirect('/');

   } catch(error) {
      next(error)
   }

});

// app.get('/greeted/edit/:id', async (req, res, next) => {
//    try {
//       console.log(req.params);
//       req.flash('info', 'Product updated!')

//       res.redirect('/greeted');

//    } catch(error) {
//       next(error)
//    }
// });

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
   console.log(`Server started at: http://localhost:${PORT}`);
})

