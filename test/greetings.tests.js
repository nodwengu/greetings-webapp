describe("Greetings Function", function() {
    it('should return "2" when counter is incremented twice from zero', function(){
        var greetInstance = createGreetings();

        greetInstance.setCounter(0);
        greetInstance.increaseCounter();
        greetInstance.increaseCounter();
        assert.equal(greetInstance.getCounter(), 2);
      
    });

    it('should return "Thanduxolo" and the object "{name: "Thanduxolo"}" when the string "Thanduxolo is privided as input"', function(){
        var greetInstance = createGreetings();

        greetInstance.setName("Thanduxolo");
        greetInstance.setNameObj();

        assert.equal(greetInstance.getName(), "Thanduxolo");
        assert.deepEqual(greetInstance.getNameObj(), {name: 'Thanduxolo'} );
    });

    it('should return "Hello, Gorge" when english button is selected', function(){
        var greetInstance = createGreetings();

        greetInstance.setName("Gorge");
        assert.equal(greetInstance.englishGreeting(), 'Hello, Gorge');
    });


    it('should return "Hallo, Timothy" when afrikaans button is selected', function(){
        var greetInstance = createGreetings();

        greetInstance.setName("Timothy");
        assert.equal(greetInstance.afrikaansGreeting(), 'Hallo, Timothy');
    });

    it('should return "Molo, James" when isiXhosa button is selected', function(){
        var greetInstance = createGreetings();

        greetInstance.setName("James");
        assert.equal(greetInstance.xhosaGreeting(), 'Molo, James');
    });

    it('should return true when a number or an empty string is provided as input and false if a valid string provided', function(){
        var greetInstance = createGreetings();

        assert.equal(greetInstance.displayError("zanele"), false);
        assert.equal(greetInstance.displayError(1234), true);
        assert.equal(greetInstance.displayError(""), true);
    }); 

    it('should return false when input name does not already exist on the list', function(){
        var greetInstance = createGreetings();

        greetInstance.setName("Johno");
        var names = [{name: 'kiro'}, {name: 'tedo'},{name: 'zan'}];

        assert.equal(greetInstance.checkName(names), false);
    }); 

    it('should return true when input name already exist on the list', function(){
        var greetInstance = createGreetings();

        greetInstance.setName("zan");
        var names = [{name: 'kiro'}, {name: 'tedo'},{name: 'zan'}];

        assert.equal(greetInstance.checkName(names), true);
    }); 
});