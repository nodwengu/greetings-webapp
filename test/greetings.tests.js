const assert = require('assert');
const CreateGreetings = require('../createGreetings');

describe("Greetings Function", function () {
  it('should be able to set and return the list of users', function(){
      var greetInstance = CreateGreetings();

      greetInstance.setUser('thando');
      greetInstance.setUser('john');
      greetInstance.setUser('busi');
      greetInstance.setUser('andre');
     
      let results = [ 
        { name: 'thando', counter: 1 },
        { name: 'john', counter: 1 },
        { name: 'busi', counter: 1 },
        { name: 'andre', counter: 1 } 
      ]

      assert.deepEqual(greetInstance.getUsers(), results);
  });

  it('should be able to greet the user with a seleted language', function(){
    var greetInstance = CreateGreetings();

    greetInstance.setGreeting('english', 'thando')

    assert.equal(greetInstance.getGreeting(), 'Hello, Thando');
  });

  it('should be able to return the name for a specific user in the users list', function(){
    var greetInstance = CreateGreetings();

    greetInstance.setUser('thando');
    greetInstance.setUser('john');
    greetInstance.setUser('busi');
    greetInstance.setUser('andre');

    assert.equal(greetInstance.getGreetingFor('john'), 'john');
  });

  it('should return true if the input value is already in the users list', function(){
    var greetInstance = CreateGreetings();

    greetInstance.setUser('thando');
    greetInstance.setUser('john');
    greetInstance.setUser('busi');
    greetInstance.setUser('andre');

    assert.equal(greetInstance.isNameRepeated('busi'), true);
  });

  it('should return false if the input value is NOT in the users list', function(){
    var greetInstance = CreateGreetings();

    greetInstance.setUser('thando');
    greetInstance.setUser('john');
    greetInstance.setUser('busi');
    greetInstance.setUser('andre');

    assert.equal(greetInstance.isNameRepeated('Sbu'), false);
  });

  it('should be able to update and return the number of greets for a specific user', function(){
    var greetInstance = CreateGreetings();

    greetInstance.setUser('thando');

    greetInstance.updateUserCounter('thando')

    assert.equal(greetInstance.getUserCounter('thando'), 2);
  });

  // it('should return "2" when counter is incremented twice from zero', function () {
  //   var greetInstance = CreateGreetings();
  //   // let arr = [ 
  //   //     { name: 'thando', counter: 1 },
  //   //     { name: 'john', counter: 1 },
  //   //     { name: 'busi', counter: 1 },
  //   //     { name: 'andre', counter: 1 } 
  //   // ]


  //   greetInstance.setUser('thando');
  //   greetInstance.setUser('john');
  //   greetInstance.setUser('busi');
  //   greetInstance.setUser('andre');
  //   greetInstance.setUser('thando');

  //   greetInstance.updateUserCounter('thando')


  //   console.log(greetInstance.isNameRepeated('bus'));
  //   console.log(greetInstance.getUsers())
  //   // greetInstance.setName('john');
  //   // greetInstance.setName('busi');
  //   // greetInstance.setName('andre');

  //   // console.log(greetInstance.getNames())
  //   // console.log(greetInstance.getGreetingFor('thando'))
  //   //greetInstance.setCounter(0);
  //   // greetInstance.increaseCounter();
  //   // greetInstance.increaseCounter();
  //   assert.equal(2, 2);

  // });

  // it('should return "Thanduxolo" and the object "{name: "Thanduxolo"}" when the string "Thanduxolo is privided as input"', function(){
  //     var greetInstance = createGreetings();

  //     greetInstance.setName("Thanduxolo");


  //     // assert.equal(greetInstance.getName(), "Thanduxolo");
  //     // assert.deepEqual(greetInstance.getNameObj(), {name: 'Thanduxolo'} );
  // });

  // it('should return "Hello, Gorge" when english button is selected', function(){
  //     var greetInstance = createGreetings();

  //     greetInstance.setName("Gorge");
  //     assert.equal(greetInstance.englishGreeting(), 'Hello, Gorge');
  // });


  // it('should return "Hallo, Timothy" when afrikaans button is selected', function(){
  //     var greetInstance = createGreetings();

  //     greetInstance.setName("Timothy");
  //     assert.equal(greetInstance.afrikaansGreeting(), 'Hallo, Timothy');
  // });

  // it('should return "Molo, James" when isiXhosa button is selected', function(){
  //     var greetInstance = createGreetings();

  //     greetInstance.setName("James");
  //     assert.equal(greetInstance.xhosaGreeting(), 'Molo, James');
  // });

  // it('should return true when a number or an empty string is provided as input and false if a valid string provided', function(){
  //     var greetInstance = createGreetings();

  //     assert.equal(greetInstance.displayError("zanele"), false);
  //     assert.equal(greetInstance.displayError(1234), true);
  //     assert.equal(greetInstance.displayError(""), true);
  // }); 

  // it('should return false when input name does not already exist on the list', function(){
  //     var greetInstance = createGreetings();

  //     greetInstance.setName("Johno");
  //     var names = [{name: 'kiro'}, {name: 'tedo'},{name: 'zan'}];

  //     assert.equal(greetInstance.checkName(names), false);
  // }); 

  // it('should return true when input name already exist on the list', function(){
  //     var greetInstance = createGreetings();

  //     greetInstance.setName("zan");
  //     var names = [{name: 'kiro'}, {name: 'tedo'},{name: 'zan'}];

  //     assert.equal(greetInstance.checkName(names), true);
  // }); 
});