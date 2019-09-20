
module.exports = function CreateGreetings(pool) {
  let usersGreeted = {};
  let greeting = "";

  async function setUser(user) {
    let data = [user.name, counter = 1]
    let query = `INSERT INTO users(name, counter) VALUES($1, $2)`

    return  pool.query(query, data)
  }

  async function getUsers(){
    const query = 'SELECT * FROM users';
    let results = await pool.query(query);
    return results.rows;
  }

  async function updateUserCounter(theName) {
    let users = await getUsers();
    var id, name = theName, counter; 

    if (isNameRepeated(theName)) {
      for(let user of users) {
        if(user.name === theName) {
          id = user.id;
          name = user.name;
          counter = (user.counter + 1); 
        }
      }
    }
    let updateQuery = `UPDATE users 
        SET name = $2, counter = $3 
        WHERE id = $1`;

    return pool.query(updateQuery, [id, name, counter]);
  }

  async function getUserCounter(theName) {
    let users = await getUsers();

    let filteredName = users.filter(option => {
      return option.name === theName;
    })

    return filteredName[0].counter;
  }

  async function getGreetingsCounter() {
    const query = 'SELECT SUM(counter) FROM users';
    let results = await pool.query(query);
    return results.rows[0];
  }

  function setGreeting(lang, theName) {
    if (lang === "english") {
      greeting = `Hello, ${theName.charAt(0).toUpperCase() + theName.slice(1)}`;
    } else if (lang === "afrikaans") {
      greeting = `Goeie dag, ${theName.charAt(0).toUpperCase() + theName.slice(1)}`;
    } else if (lang === "xhosa") {
      greeting = `Mholo, ${theName.charAt(0).toUpperCase() + theName.slice(1)}`;
    }
  }
  
  function getGreeting() {
    return greeting;
  }

  async function getGreetingFor(theName) {
    let users = await getUsers();

    let filteredName = users.filter(option => {
      return option.name === theName;
    })

    return filteredName[0].name;
  }

  async function isNameRepeated(nameInput) {
    let isRepeated = false;
    let users = await getUsers();
    
    for (let i = 0; i < users.length; i++) {
      let currentName = users[i];
      let name = currentName.name;

      if (usersGreeted[name] === undefined) {
        usersGreeted[name] = 0;
      } else {
        usersGreeted[name]++;
      }

      for (let key in usersGreeted) {
        if (usersGreeted.hasOwnProperty(nameInput)) {
          isRepeated = true;
        }
      }
    }
    
    return isRepeated;
  }

  async function deleteById(id) {
    return pool.query('DELETE FROM users WHERE id = $1', [id]);
  }

  async function deleteUser() {
    let results = pool.query('DELETE FROM users');

    return results;
  }
 
  return {
    setUser,
    getUsers,
    getGreetingsCounter,
    getUserCounter,
    setGreeting,
    getGreeting,
    isNameRepeated,
    getGreetingFor,
    updateUserCounter,
    deleteById,
    deleteUser

  }
  
}
