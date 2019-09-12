module.exports =  function CreateGreetings() {
   let greetingsCounter = 0;
   let name = "";
   let usersGreeted = {};
   let greeting = "";
   let users = [];
   
   function setUser(theName) {
      name = theName

      users.push({
         name,
         counter: 1
      });
   }

   function getUser() {
      return name;
   }

   function getUsers() {
      return users;
   }

   function increaseCounter() {
      greetingsCounter++;
   }

   function updateUserCounter(theName) {
      if(isNameRepeated(theName)) {
         users.forEach(user => {
            if(user.name === theName) {
               user.counter++;
            }
         });
      }
   }

   function getUserCounter(theName) {
      let filteredName = users.filter( option => {
         return option.name === theName;
      })

      return filteredName[0].counter;
   }

   function getGreetingsCounter() {
      return greetingsCounter;
   }

   function setGreeting(lang, theName) {
      if(lang === "english") {
        greeting = `Hello, ${theName.charAt(0).toUpperCase() + theName.slice(1)}`;
      } else if(lang === "afrikaans") {
         greeting = `Goeie dag, ${theName.charAt(0).toUpperCase() + theName.slice(1)}`;
      } else if(lang === "xhosa") {
         greeting = `Mholo, ${theName.charAt(0).toUpperCase() + theName.slice(1)}`;
      }
   }
   function getGreeting() {
      return greeting;
   }

   function getGreetingFor(theName) {
      let filteredName = users.filter( option => {
         return option.name === theName;
      })

      return filteredName[0].name;
   }

   function isNameRepeated(nameInput) {
      let isRepeated  = false;
      
      for(let i = 0; i < users.length; i++) {
         let currentName = users[i];
         let name = currentName.name;

         if (usersGreeted[name] === undefined){
            usersGreeted[name] = 0;
         } else {
            usersGreeted[name]++;
         }

         for(let key in usersGreeted) {
            if(usersGreeted.hasOwnProperty(nameInput)) {
               isRepeated  = true;
            } 
         }   
      } 
      return isRepeated;
   }

   return {
      setUser,
      getUser,
      getUsers,
      increaseCounter,
      getGreetingsCounter,
      getUserCounter,
      setGreeting,
      getGreeting,
      isNameRepeated,
      getGreetingFor,
      updateUserCounter
   }
}
