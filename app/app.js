/*

 ### Basic Reqs
- [ ] Where to store data? (localstorage)
- [ ] How to modify data? (update action, delete action)

*/
// pet functions

const Dog = function(name, breed){
  this.name = name;
  this.age = 5;
  this.hunger = 10;
  this.happiness = 100; 
  this.energy = 100;
  this.traits = []; 
};

Dog.prototype.getOlder = function(){
  this.age++;
};

Dog.prototype.feed = function(){
  if (this.hunger - 5 > 0) {
    this.hunger -= 5;
  } else {
    this.hunger = 0;
  }
};

Dog.prototype.play = function(){
  // increase happiness by number of units of time 
  if (this.happiness + 20 < 100){
    this.happiness += 20;
  } else {
    this.happiness = 100
    this.getOlder()
  }
  //until zero energy
  if (this.energy - 30 > 0){
    this.energy -= 30;
  } else {
    this.energy = 0;
  }
  this.getOlder();
};

Dog.prototype.nap = function(){
  if (this.energy + 40 < 100){
    this.energy += 40;
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
      this.traits = parentOne.traits
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
  key['pup'] = 'pup'
  key['age'] = 1
  var value = JSON.stringify(key)
  key = key.name
  Puppy.prototype = Object.create(Dog.prototype); 
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
    var $dogHolder = $('.dog-holder')
    var $dogDescription = $( `<div class="dog-description"></div>`)
    var $dogInfo = $(`<div class="dog-info"></div>`)
    var $name = $(`<div> Name: ${key}</div>`)
    var $personality = $(`<div>Personality: ${obj['traits']}</div>`)
    var $age = $(`<div>Age: ${obj['age']}</div>`)
    var $hunger = $(`<div>Hunger: ${obj['hunger']}</div>`)
    var $happiness = $(`<div>Happiness: ${obj['happiness']}</div>`)
    var $energy = $(`<div> Energy: ${obj['energy']}</div>`)
    var $buttonHolder = $(`<div class="button-holder"></div>`)
    var $feed = $(`<button class="feed">Feed</button>`)
    $feed.attr('data-dog', key)
    var $play = $(`<button class="play">Play</button>`)
    $play.attr('data-dog', key)
    var $nap = $(`<button class="nap">Nap</button></div>`)
    $nap.attr('data-dog', key)
    if(!obj.hasOwnProperty('pup')){
      var $image = $(`<div><image src="adorable-animal-beagle-1345191.jpg" id=${key} class="image"/></div>`)
   
    } else {
      var $image = $(`<div><image src="adorable-animal-animal-photography-1663421.jpg" id=${key} class="image"/></div>`)
     
    }
    $dogInfo.append($name)
    $dogInfo.append($personality)
    $dogInfo.append($age)
    $dogInfo.append($hunger)
    $dogInfo.append($happiness)
    $dogInfo.append($energy)
    $buttonHolder.append($feed)
    $buttonHolder.append($play)
    $buttonHolder.append($nap)
    $dogDescription.append($image)
    $dogDescription.append($dogInfo)
    $dogDescription.append($buttonHolder)
    $dogHolder.append($dogDescription)
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

  $('.dog-holder').on('click', '.image', function(){
    if(dogOneKey === undefined && dogTwoKey === undefined){
      if(confirm(`Are you sure you want ${$(this).attr("id")} as a parent of your puppy?`)) {
       dogOneKey = $(this).attr("id");
       dogOneObj = JSON.parse(window.localStorage.getItem(dogOneKey))
      }
    } else if (dogOneKey !== undefined && dogTwoKey === undefined){
      if(confirm(`Are you sure you want ${$(this).attr("id")} as a parent of your puppy?`)) {
       dogTwoKey = $(this).attr("id");
       dogTwoObj = JSON.parse(window.localStorage.getItem(dogTwoKey))
       console.log(dogOneObj)
       console.log(dogTwoObj);
    } 
  }
  })

  $('.create-puppy').click(function() {
    createPup(getPupInput(), dogOneObj, dogTwoObj);
    showDatabaseContents();
    resetInputs();
    dogOneKey = undefined;
    dogOneObj = undefined;
    dogTwoKey = undefined;
    dogTwoObj = undefined;
    });
})