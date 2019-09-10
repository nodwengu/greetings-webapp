const createGreetings = function() {
   let greetingsCounter = 0;
   let name = "";
   let obj = {};
   let namesGreeted = {};
   
   function setCounter(val) {
      greetingsCounter = val;
   }

   function increaseCounter() {
      greetingsCounter++;
   }

   function getCounter() {
      return greetingsCounter;
   }

   function setName(theName) {
      name = theName;
   }

   function getName() {
      return name;
   }

   function englishGreeting() {
      return "Hello, " + name;
   }

   function afrikaansGreeting() {
      return "Hallo, " + name;
   }

   function xhosaGreeting() {
      return "Molo, " + name;
   }  

   function displayError(name) {
      return name == "" || !isNaN(name); 
   }

   function setNameObj() {
      obj = {
         name: name
      }
   }

   function getNameObj() {
      return obj;
   }

   function checkName(theNames) {
      var isRepeated  = false;

      for(let i = 0; i < theNames.length; i++) {
         var elem = theNames[i];
         var name = elem.name;
         if (namesGreeted[name] === undefined){
             //add an entry for the user that was greeted in the Object Map
             namesGreeted[name] = 0;
         } else {
             namesGreeted[name]++;
         }
      }
      var newName = getName();
      for(var key in namesGreeted) {
        if(namesGreeted.hasOwnProperty(newName)) {
            //alert(newName + " already exists");
            isRepeated  = true;
            break;
        } 
      }   
      return isRepeated ;
   } 

   return {
      getCounter,
      setCounter,
      increaseCounter,
      setName,
      englishGreeting,
      afrikaansGreeting,
      xhosaGreeting,
      getName,
      displayError,
      setNameObj,
      getNameObj,
      checkName
   }
}

var greetInstance = createGreetings();

// greetInstance.setCounter(0);
// greetInstance.increaseCounter();
// greetInstance.increaseCounter();
// alert(greetInstance.getCounter());


// greetInstance.setName("Thando");
// greetInstance.setNameObj();
// console.log(greetInstance.getNameObj());

// greetInstance.setName("Thanduxolo Nodwengu");
// alert( greetInstance.getName() );


// greetInstance.setName("Thanduxolo Nodwengu");
// alert( greetInstance.englishGreeting() );

// greetInstance.setName("Thanduxolo Nodwengu");
// alert( greetInstance.afrikaansGreeting() );

// greetInstance.setName("Thanduxolo Nodwengu");
// alert( greetInstance.xhosaGreeting() );

// alert( greetInstance.displayError("wewe") ); //false
//  alert( greetInstance.displayError("") );     //true
//  alert( greetInstance.displayError(5445) );   //true

 //greetInstance.setName("Buli"); //false
 //greetInstance.setName("zan"); //true
//  var names = [{name: 'kiro'}, {name: 'tedo'},{name: 'zan'}];
//  alert( greetInstance.checkName(names) );
 



