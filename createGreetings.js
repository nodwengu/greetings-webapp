module.exports =  function CreateGreetings() {
   let greetingCounter = 0;
   let name = "";
   let namesGreeted = {};
   let greeting = "";
   let names = []
   
   function setName(theName) {
      if(theName == "") {
         return
      }
      name = theName

      names.push({
         name
      });
   }
   function getName() {
      return name
   }

   function getNames() {
      return names;
   }

   function increaseCounter() {
      greetingCounter++;
   }



   function getCounter() {
      return greetingCounter;
   }

   function setGreeting(lang, theName) {
      if(theName == '' || (lang === undefined && lang !== 'english' && lang !== 'afrikaans'&& lang !== 'xhosa')) {
         return
      }

      if(lang === "english") {
        greeting = `Hello, ${theName.charAt(0).toUpperCase() + theName.slice(1)}`;
        increaseCounter();
      } else if(lang === "afrikaans") {
         greeting = `Goeie dag, ${theName.charAt(0).toUpperCase() + theName.slice(1)}`;
         increaseCounter();
      } else if(lang === "xhosa") {
         greeting = `Mholo, ${theName.charAt(0).toUpperCase() + theName.slice(1)}`;
         increaseCounter();
      }
   }
   function getGreeting() {
      return greeting;
   }

   function isNameRepeated(nameInput) {
      let isRepeated  = false;
      
      for(let i = 0; i < names.length; i++) {
         let currentName = names[i];
         let name = currentName.name;

         if (namesGreeted[name] === undefined){
            namesGreeted[name] = 0;
         } else {
            namesGreeted[name]++;
         }

         for(let key in namesGreeted) {
            if(namesGreeted.hasOwnProperty(nameInput)) {
               isRepeated  = true;
            } 
         }   
      } 
      return isRepeated;
   }


   return {
      setName,
      getName,
      getNames,

      increaseCounter,
      getCounter,

      setGreeting,
      getGreeting,
     
      isNameRepeated
   }
}

