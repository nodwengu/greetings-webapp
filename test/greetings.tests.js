
const assert = require('assert');
const CreateGreetings = require('../createGreetings');

const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/users_tests';

const pool = new Pool({
  connectionString
});

describe('The Greetings database web app', function () {

  beforeEach(async function () {
    pool.query("DELETE FROM users;");
  });

  it('should be able to add a user', async function(){
      const createGreetings = CreateGreetings(pool);

      await createGreetings.setUser({name: 'Thando'});
      let users = await createGreetings.getUsers();
      assert.equal(1, users.length);
  });

  it('should be able to return the sum of greetings counter for all users', async function(){
    const createGreetings = CreateGreetings(pool);

    await createGreetings.setUser({name: 'Thando'});
    await createGreetings.setUser({name: 'Nodwengu'});
   
    assert.deepEqual({ count: '2' }, await createGreetings.getGreetingsCounter());
  });

  it('should be able to return the greetings counter for specific user', async function(){
    const createGreetings = CreateGreetings(pool);
    
    await createGreetings.setUser({name: 'Thando'});
   
    assert.equal(1, await createGreetings.getUserCounter('Thando'));
  });

  it('should be able to update and return the greetings counter for specific user', async function(){
    const createGreetings = CreateGreetings(pool);
    
    await createGreetings.setUser({name: 'Thando'});
    await createGreetings.updateUserCounter('Thando');
   
    assert.equal(2, await createGreetings.getUserCounter('Thando'));
  });

  it('should be able to greet the user with a selected langauge', async function(){
    const createGreetings = CreateGreetings(pool);
    
    createGreetings.setGreeting('english', 'Thando');
    assert.equal("Hello, Thando", await createGreetings.getGreeting());

    createGreetings.setGreeting('afrikaans', 'Gorge');
    assert.equal("Goeie dag, Gorge", await createGreetings.getGreeting());

    createGreetings.setGreeting('xhosa', 'Thando');
    assert.equal("Mholo, Thando", await createGreetings.getGreeting());
  });


  it('should be able to update and return the greetings counter for specific user', async function(){
    const createGreetings = CreateGreetings(pool);
    
    await createGreetings.setUser({name: 'Thando'});
    await createGreetings.setUser({name: 'Gorge'});
    await createGreetings.setUser({name: 'Shaun'});
    await createGreetings.updateUserCounter('Shaun');
   
    assert.equal("Thando", await createGreetings.getGreetingFor('Thando'));
  });

  
  after(function(){
    pool.end();
  })
});