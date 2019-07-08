/*

 ### Basic Reqs
- [ ] Where to store data? (localstorage)
- [ ] How to modify data? (update action, delete action)

*/
// pet functions

const Dog = function(name, breed){
  this.name = name;
  this.age = 1;
  this.hunger = 10;
  this.happiness = 100; 
  this.energy = 100;
  this.traits = []; 
};

Dog.prototype.getOlder = function(){
  this.age++;
};

Dog.prototype.feed = function(food){
  if (this.hunger - food > 0) {
    this.hunger -= food;
  } else {
    this.hunger = 0;
  }
};

Dog.prototype.play = function(time){
  // increase happiness by number of units of time 
  if (this.happiness + time < 100){
    this.happiness += time;
  } else {
    this.happiness = 100
    this.getOlder()
  }
  //until zero energy
  if (this.energy - time > 0){
    this.energy -= time;
  } else {
    this.energy = 0;
  }
  this.getOlder();
};

Dog.prototype.nap = function(time){
  if (this.energy + time < 100){
    this.energy += time;
  } else {
    this.energy = 100;
    this.getOlder();
  }

};

Dog.prototype.addTrait = function(traitType){
  this.traits.push(traitType);
};

var Puppy = function(name, parentOne, parentTwo){ 
      Dog.call(this, name); 
      this.traits = parentOne.traits[0]
  }

Puppy.prototype = Object.create(Dog.prototype); 
Puppy.prototype.constructor = Puppy;



//localStorage functions
var createItem = function(key, value) {
   key = new Dog(key)  
   key['traits'] = [value]
   value = JSON.stringify(key)
   key = key.name

  return window.localStorage.setItem(key, value);
}

var createPup = function(key, dogOneObj, dogTwoObj) {
  var name = key
  key = new Puppy(name,dogOneObj,dogTwoObj)
  console.log(key)
  var value = JSON.stringify(key)
  key = key.name
  return window.localStorage.setItem(key, value)
}

var updateItem = function(key, value) {
  return window.localStorage.setItem(key, value);
}

var deleteItem = function(key) {
  return window.localStorage.removeItem(key);
}

var clearDatabase = function() {
  return window.localStorage.clear();
}

var showDatabaseContents = function() {
  $('.dog-holder').html('');

  for (var i = 0; i < window.localStorage.length; i++) {
    var key = window.localStorage.key(i);
    obj = JSON.parse(window.localStorage.getItem(key))
    $('.dog-holder').append(`<div class="dog-description"><div><image src="adorable-animal-beagle-1345191.jpg" id=${key} class="image"/></div><div> Name: ${key}</div><div>Personality: ${obj['traits']}</div></div>`)
  }
}

var keyExists = function(key) {
  return window.localStorage.getItem(key) !== null
}

var getKeyInput = function() {
  return $('.key').val();
}

var getPupInput = function() {
  return $('.pup').val();
}

var getValueInput = function() {
  return $('.value').val();
}

var resetInputs = function() {
  $('.key').val('');
  $('.value').val('');
}

$(document).ready(function() {
  showDatabaseContents();

  $('.create').click(function() {
    if (getKeyInput() !== '' && getValueInput() !== '') {
      if (keyExists(getKeyInput())) {
        if(confirm('key already exists in database, do you want to update instead?')) {
          updateItem(getKeyInput(), getValueInput());
          showDatabaseContents();
        }
      } else {
        createItem(getKeyInput(), getValueInput());
        showDatabaseContents();
        resetInputs();
      }
    } else  {
      alert('key and value must not be blank');
    }
  });

  $('.update').click(function() {
    if (getKeyInput() !== '' && getValueInput() !== '') {
      if (keyExists(getKeyInput())) {
        updateItem(getKeyInput(), getValueInput());
        showDatabaseContents();
        resetInputs();
      } else {
        alert('key does not exist in database');
      }
    } else {
      alert('key and value must not be blank');
    }
  });

  $('.delete').click(function() {
     if (getKeyInput() !== '') {
      if (keyExists(getKeyInput())) {
        deleteItem(getKeyInput());
        showDatabaseContents();
        resetInputs();
      } else {
        alert('key does not exist in database');
      }
    } else {
      alert('key must not be blank');
    }
  });

  $('.reset').click(function() {
    resetInputs();
  })

  $('.clear').click(function() {
    if (confirm('WARNING: Are you sure you want to clear the database? \n                THIS ACTION CANNOT BE UNDONE')) {
      clearDatabase();
      showDatabaseContents();
    }
  })

  var dogOneKey;
  var dogOneObj;
  var dogTwoKey;
  var dogTwoObj;
  var reference; 

  $('.dog-holder').on('click', '.image', function(){
    if(dogOneKey === undefined && dogTwoKey === undefined){
     dogOneKey = $(this).attr("id");
     dogOneObj = JSON.parse(window.localStorage.getItem(dogOneKey))
    } else if (dogOneKey !== undefined && dogTwoKey === undefined){
     dogTwoKey = $(this).attr("id");
     dogTwoObj = JSON.parse(window.localStorage.getItem(dogTwoKey))
     console.log(dogOneObj)
     console.log(dogTwoObj);
    } 
  })

  $('.create-puppy').click(function() {
    console.log('hello')
          
    var pup =  createPup(getPupInput(), dogOneObj, dogTwoObj);
    console.log(pup)
    showDatabaseContents();
    resetInputs();

    });
})