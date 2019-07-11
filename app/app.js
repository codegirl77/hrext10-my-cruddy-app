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

var getOlder = function(obj){
  obj['age']++;
};

var feed = function(obj){
  if (obj['hunger'] - 5 > 0) {
    obj['hunger'] -= 5;
  } else {
    obj['hunger'] = 0;
  }
  if (obj['happiness'] - 5 > 0) {
    obj['happiness'] -= 5;
  } else {
    obj['happiness'] = 0;
  }

};

var play = function(obj){
  // increase happiness by number of units of time 
  if (obj['happiness'] + 40 < 100){
    obj['happiness'] += 40;
  } else {
    obj['happiness'] = 100
  }
  //until zero energy
  if (obj['energy'] - 30 > 0){
    obj['energy'] -= 30;
  } else {
    obj['energy'] = 0;
  }

  if (obj['hunger'] + 2 <= 10){
    obj['hunger'] += 2;
  } else {
    obj['hunger'] = 10;
  }
  
};

var nap = function(obj){
  if (obj['energy'] + 40 < 100){
    obj['energy'] += 40

  } else {
    obj['energy'] = 100;
  }
  if (obj['happiness'] - 5 > 0) {
    obj['happiness'] -= 5;
  } else {
    obj['happiness'] = 0;
  }

};

var addTrait = function(obj, traitType){
  this.traits.push(traitType);
};

var Puppy = function(name, parentOne, parentTwo){ 
      Dog.call(this, name); 
      this.traits = parentOne.traits
      this.breed= parentTwo.breed
  }

Puppy.prototype = Object.create(Dog.prototype); 
Puppy.prototype.constructor = Puppy;



//localStorage functions
var createItem = function(key, value, dogImage, breed) {
   key = new Dog(key)  
   key['traits'] = [value]
   key['dogImage'] = dogImage
   key['breed'] = breed
   value = JSON.stringify(key)
   key = key.name

  return window.localStorage.setItem(key, value);
}

var createPup = function(key, dogOneObj, dogTwoObj) {
  var name = key
  key = new Puppy(name,dogOneObj,dogTwoObj)
  key['age'] = 1
  key['dogImage'] = dogTwoObj.dogImage
  key['pup'] = 'pup'
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
    var $feed = $(`<button class="feed button">Feed</button>`)
    $feed.attr('data-dog', key)
    var $play = $(`<button class="play button">Play</button>`)
    $play.attr('data-dog', key)
    var $nap = $(`<button class="nap button">Nap</button></div>`)
    $nap.attr('data-dog', key)
    if(!obj.hasOwnProperty('pup')){
      var $image = $(`<div><image src="${obj['dogImage']}" id=${key} class="image"/></div>`)
   
    } else if (obj.hasOwnProperty('pup') && obj['age'] >= 5) {
      delete obj['pup']
       var $image = $(`<div><image src="${obj['dogImage']}" id=${key} class="image"/></div>`)
       var value = JSON.stringify(obj)
       window.localStorage.setItem(key, value)
       alert(`CONGRATS! ${key} grew up to be an adult!`);
    } else {
        if(obj['breed'] ==="husky"){
            var src = 'cody-board-tnNVJd_nrw8-unsplash.jpg'
        } else if (obj['breed'] === "lab"){
             var src  = 'berkay-gumustekin-ngqyo2AYYnE-unsplash.jpg'
        } else if (obj['breed'] === "aussie"){
             var src  = "adorable-animal-bernedoodle-1458925.jpg"
        } else if (obj['breed'] === "corgi"){
            var src = 'ipet-photo-LHeDYF6az38-unsplash.jpg'
        }
      var $image = $(`<div><image src=${src} id=${key} class="image"/></div>`)
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
var resetPupInputs = function() {
  $('.pup').val('');
}

$(document).ready(function() {
  showDatabaseContents();
  var dogImage;
  var breed;
  $('.dog-image').on('click', function(){
    if(dogImage === undefined && breed === undefined){
    if(confirm(`Are you sure you want ${$(this).attr("id")} as the breed of your dog?`)){
    dogImage = $(this).attr("src")
    breed = $(this).attr("id")
  }
  }
  })

  $('.create').click(function() {
    if (getKeyInput() !== '' && getValueInput() !== ''&& dogImage !== undefined && breed !== undefined) {
      if (keyExists(getKeyInput())) {
        if(confirm('key already exists in database, do you want to update instead?')) {
          updateItem(getKeyInput(), getValueInput());
          showDatabaseContents();
        }
      } else {
        createItem(getKeyInput(), getValueInput(), dogImage, breed);
        showDatabaseContents();
        resetInputs();
        dogImage = undefined;
        breed = undefined;
      }
    } else  {
      alert('Key and value must not be blank. You must also choose a dog breed from the images above!');
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
    } 
  }
  })

  $('.create-puppy').click(function() {
    if(getPupInput() !==''){
      createPup(getPupInput(), dogOneObj, dogTwoObj);
      showDatabaseContents();
      resetPupInputs();
      dogOneKey = undefined;
      dogOneObj = undefined;
      dogTwoKey = undefined;
      dogTwoObj = undefined;
    } else {
      alert('Puppy\'s name should not be blank!');
    }
  });

  $(document).on('click','.feed', function(){
    var dogKey = $(this).attr("data-dog")
    var dogObj = JSON.parse(window.localStorage.getItem(dogKey))
    feed(dogObj)
    getOlder(dogObj)
    var dogValue = JSON.stringify(dogObj)
    updateItem(dogKey, dogValue);
    showDatabaseContents();
  })

  $(document).on('click','.play', function(){
    var dogKey = $(this).attr("data-dog")
    var dogObj = JSON.parse(window.localStorage.getItem(dogKey))
    play(dogObj)
    getOlder(dogObj)
    var dogValue = JSON.stringify(dogObj)
    updateItem(dogKey, dogValue)
    showDatabaseContents()
  })

  $(document).on('click','.nap', function(){
    var dogKey = $(this).attr("data-dog")
    var dogObj = JSON.parse(window.localStorage.getItem(dogKey))
    nap(dogObj)
    getOlder(dogObj)
    var dogValue = JSON.stringify(dogObj)
    updateItem(dogKey, dogValue);
    showDatabaseContents();
  })

})