class Achievement {
  constructor(name) {
    this.name = name;
    this.completed = false;
    this.count = 0;
    switch (this.name) {
    //Cat achievements
    case "Certified Cat Owner":
      this.image = `<img src="img/achievement/certified_cat_owner.jpg" id="certified-cat-owner" class="achievement-img">`
      this.description = "Own 25 cats."
      break;

    case "Pure Bred":
      this.image = `<img src="img/achievement/pure_bred.jpg" title="You have 0 legendary Cats." id="pure-bred" class="achievement-img">`
      this.description = "Own 2 legendary cats."
      break;

    case "Salesman":
      this.image = `<img src="img/achievement/salesman.jpg" title="You have sold 0 cats." id="salesman" class="achievement-img">`
      this.description = "Sell 50 cats."
      break;

    case "Collector":
      this.image = `<img src="img/achievement/collector.jpg" title="You have 0 rare cats." id="collector" class="achievement-img">`
      this.description = "Own 4 rare cats."
      break;

    case "Grim Reaper":
      this.image = `<img src="img/achievement/grim_reaper.jpg" title="You own 0 dead cats." id="grim-reaper" class="achievement-img">`
      this.description = "Own 50 dead cats."
      break;

    //Life Achievements
    case "Hard Worker":
      this.image = `<img src="img/achievement/hardworking_citizen.jpg" title="You've worked 0 days." id="hardworking-citizen" class="achievement-img">`
      this.description = "Work a manual labour job for 200 days."
      break;
    
    case "Career Politician":
      this.image =  `<img src="img/achievement/career_politician.jpg" title="You've never been a politician." id="career-politician" class="achievement-img">`
      this.description = "Become Mayor and PM."
      this.mayor = false;
      this.pm = false;
      break;

    case "Expert":
      this.image = `<img src="img/achievement/expert.jpg" title="You have no work experience." id="expert" class="achievement-img">`
      this.description = "Get work experience in all categories."
      break;

    case "Felina":
      this.image = `<img src="img/achievement/felina.jpg" title="You are not the one who knocks." id="felina" class="achievement-img">`
      this.description = "Become a Meth Kingpin"
      this.methKingpin = false;
      break;

    case "Scrooge McCat":
      this.image = `<img src="img/achievement/scrooge_mccat.jpg" title="You are basically broke." id="scrooge-mccat" class="achievement-img">`
      this.description = "Stockpile 7500$"
      break;
    }
    document.getElementById("achievement-container").innerHTML += `
    <section class="achievement-box">
      ${this.image}
      <span><strong>${this.name}</strong></span>
      <p>${this.description}</p>
    </section>
    `

  }

  isComplete() {
    switch (this.name) {
      //Cat achievements
    case "Certified Cat Owner":
      if (catCount(cats) >= 25) {
        this.setImgComplete("certified-cat-owner");
        return true;
      } else {
        this.setImgIncomplete("certified-cat-owner");
        return false;
      }
      break;

    case "Pure Bred":
      this.count = 0;
      for (var i = 0; i < cats.length; i++) {
        if (cats[i].category == "legendary" && cats[i].alive) {
          this.count++;
        }
      }
      this.getImg("pure-bred").title = `You have ${this.count} legendary cats.`;
      if (this.count >= 2) {
        this.setImgComplete("pure-bred");
        return true;
      } else {
        this.setImgIncomplete("pure-bred");
        return false;
      }
      break;

    case "Salesman":
      this.getImg("salesman").title = `You have sold ${this.count} cats.`;
      if (this.count >= 50) { //Count is increased by selling cats
        this.setImgComplete("salesman");
        return true;
      } else {
        this.setImgIncomplete("salesman");
        return false;
      }
      break;

    case "Collector":
      this.count = 0;
      for (var i = 0; i < cats.length; i++) {
        if (cats[i].category == "rare" && cats[i].alive) {
          this.count++;
        }
      }
      this.getImg("collector").title = `You have ${this.count} rare cats.`;
      if (this.count >= 4) {
        this.setImgComplete("collector");
        return true;
      } else {
        this.setImgIncomplete("collector");
        return false;
      }
      break;

    case "Grim Reaper":
      this.count = document.querySelectorAll('#cat-list .dead-cat-box').length;
      this.getImg("grim-reaper").title = `You own ${this.count} dead cats.`;
      if (this.count >= 50) {
        this.setImgComplete("grim-reaper");
        return true;
      } else {
        this.setImgIncomplete("grim-reaper");
        return false;
      }
      break;

      //Life achievements
    case "Hard Worker":
      if (this.count >= 200) { //Count is increased by working as a Manual Labour
        this.setImgComplete("hardworking-citizen");
        return true;
      } else {
        this.setImgIncomplete("hardworking-citizen");
        this.getImg("hardworking-citizen").title = `You've worked ${this.count} days.`
        return false;
      }
      break;

    case "Career Politician":
      this.getImg("career-politician").title = `You've never been a politician.`
      if (pl.job == policyJobs[0] || this.pm) {
        this.pm = true;
        this.getImg("career-politician").title = `You've been Prime Minister.`
      }
      if (pl.job == policyJobs[1] || this.mayor) {
        this.mayor = true;
        this.getImg("career-politician").title = `You've been Mayor.`
      }

      if (this.mayor && this.pm) {
        this.setImgComplete("career-politician");
        this.getImg("career-politician").title = `You are a career politician!`
        return true;
      } else {
        this.setImgIncomplete("career-politician");
        return false;
      }
      break;

    case "Expert":
      if (pl.oddExp != 1) {
        this.getImg("expert").title = `You have no work experience.`
      } else if (pl.labExp != 1) {
        this.getImg("expert").title = `You have no manual labour experience.`
      } else if (pl.crmExp != 1) {
        this.getImg("expert").title = `You have no criminal experience.`
      } else if (pl.topExp != 1) {
        this.getImg("expert").title = `You have no top level experience.`
      } else {
        this.getImg("expert").title = `You are a genius.`
        this.setImgComplete("expert");
        return true;
      }
      this.setImgIncomplete("expert");
      return false;
      break;

    case "Felina":
      if (pl.job == orgCrmJobs[0]) {
        this.methKingpin = true;
      }
      if (this.methKingpin) {
        this.getImg("felina").title = `You are the one who knocks.`
        this.setImgComplete("felina");
        return true;
      }
      this.setImgIncomplete("felina");
      return false;
      break;

    case "Scrooge McCat":
      if (pl.money >= 7500) {
        this.getImg("scrooge-mccat").title = `You are fabulously wealthy.`
        this.setImgComplete("scrooge-mccat");
        return true;
      } else {
        this.getImg("scrooge-mccat").title = `You are basically broke.`
        this.setImgIncomplete("scrooge-mccat");
        return false;
      }
      break;
    }
  }

  getImg(id) {
    return document.getElementById(id);
  }
  setImgComplete(id) {
    document.getElementById(id).classList.remove('achievement-img-incomplete')
  }
  setImgIncomplete(id) {
    document.getElementById(id).classList.add('achievement-img-incomplete')
  }
}





class Cat {
  constructor(name, image, category) {
    this.name = name;
    this.hunger = 3;
    this.health = 3;
    this.alive = true;
    this.image = image;
    this.category = category;
  }
  //Ages cat up, takes amoung of food as arguement and returns tag for whether there has been a change or not
  //Returns 0 if nothing changed
  //Returns 1 if something changed
  age(food) {

    //food
    if (food > 0) {
      var change = false;
      pl.food--;
      if (this.hunger < 3 ){
        this.hunger++;
        change = true;
      }
    } else if (Math.floor(Math.random() * 5) < 1) {
      this.hunger--;
      if (this.hunger <= 0) {
        this.alive = false;
      }
      change = true;
    }

    //health
    if (Math.floor(Math.random() * 150) < pl.house.health) {
      this.health--;
      change = true;
      if (this.health <= 0) {
        this.alive = false;
      }
    } else if ((this.health < 3) && (Math.floor(Math.random() * 100) < 4)) {
      this.health++;
      change = true;
    }

    if (change) {
      return 1;
    }
    return 0;
  }

  //sells cat, adds 15$ to money.
  sell(catNum) {
    pl.money += 15;
    this.alive = false;
    document.getElementById("cat-" + catNum).remove();
    if (catAchievement.name == "Salesman") {
      catAchievement.count++;
    }
    console.log(catAchievement.count)
  }

  //Takes cat to vet, removes 20$ and fills cat's health
  treat(catNum) {
    if (pl.money >= 12) {
      pl.money -= 12;
      this.health = 3;
      document.getElementById("cat-" + catNum + "-health").innerHTML = `
      Health: ${healthLevels[cats[catNum].health]}
      `;
      if (this.hunger > 1) {
        document.getElementById("cat-"+catNum).classList.remove('cat-box-peril');
      }
    } else {
      notification("The veternarian's office turned you away - Bring more money next time!");
    }
  }

}

class Job {
  constructor(name, salary, difficulty, category) {
    this.name = name;
    this.salary = salary;
    this.difficulty = difficulty;
    this.category = category;
  }

  //returns amount made
  work() {
    return this.salary;
  }

  //skips work
  //returns false if not fired
  //returns true if fired
  fired() {
    this.difficulty--;
    if (this.difficulty <= 0) {
      return true ;
    }
    return false;
  }
}

class Clock {
  constructor(day) {
    this.day = day;
    this.days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ]
  }

  nextDay() {
    this.day++;
  }

  dayOfWeek() {
    return this.days[this.day%7];
  }
  intOfWeek() {
    return this.day%7;
  }

}

class Player {
  constructor() {
    this.money = 50;
    this.food = 0;
    this.job = jobs[0];
    this.mental = 0;
    this.images = [
      `<img src="img/face/happy.png" alt="Happy Face" title="A smile a day keeps the doctor away!" class="face-img">`,
      `<img src="img/face/upset.png" alt="Upset Face" title="You can't expect every day to be great." class="face-img">`,
      `<img src="img/face/depressed.png" alt="Depressed Face" title="I just want more..." class="face-img">`,
      `<img src="img/face/despondent.png" alt="Withered Face" title="I feel so alone" class="face-img">`,
      `<img src="img/face/dead.png" alt="Dead Guy" title="..." class="face-img">`,
      `<img src="img/face/actualized.png" alt="VERY Happy Face" title="Nothing can get me down anymore!" class="face-img">`,
    ];
    this.reqCats = 1;
    this.imprisoned = false;
    this.timeToServe = 0;

    this.house = houses.get(0); //Start in ex mum's house
    this.oddExp = 0; //No skill
    this.oddExpProgress = 0;
    this.labExp = 0; //manual labour
    this.labExpProgress = 0;
    this.crmExp = 0; //Street crime
    this.crmExpProgress = 0;
    this.topExp = 0; //Top levels (organized crime and skilled labour)
    this.topExpProgress = 0;
  }
  image() {
    return this.images[this.mental];
  }
  moodText() {
    if (this.mental == 0) {
      return "You are feeling fine";
    } else if (this.mental == 4) {
      return "You died; no cats...";
    } else if (this.mental == 5) {
      return "You are feeling amazing";
    } else {
      return "You need more cats";
    }
  }

  arrest(jobCategory) {
    if (jobCategory == "strCrm") {
      this.timeToServe = 6;
    } else {
      this.timeToServe = 11;
    }
    this.imprisoned = true;
  }

  spendTime() {
    this.timeToServe--;
    if (this.timeToServe <= 0) {
      this.imprisoned = false;
    }
  }
}

class House {
  constructor(name, picture, health, cost) {
    this.name = name;
    this.picture = picture;
    this.health = health;
    this.cost = cost;

    this.rentDue = 0;
    this.overdue = false;
    this.daysLeft = 16;
  }

  //performs daily house tasks, mostly related to rent
  dailyUpdate() {
    if (this.daysLeft == 2) {
      notification("You need to pay ALL your rent TODAY - or you will be kicked out!");
    }
    if (this.daysLeft <= 1) {
      houses.remove(this);
      changeHouse(0);
    } else if (this.overdue) {
      this.daysLeft--;
    } else if (this.daysLeft != 16) {
      this.daysLeft = 16;
    }

    if (clock.day % 7 == 5) {
      this.rentDue += this.cost;
      if (this.cost > 0) {
        this.overdue = true;
      }
    }
  }

  //Pays rent
  payRent() {
    var amountPaid = Math.min(this.rentDue, pl.money);
    this.rentDue -= amountPaid;
    pl.money -= amountPaid;
    if (this.rentDue == 0) {
      this.overdue = false;
      this.daysLeft = 14;
      document.getElementById("house-actions").innerHTML = "";
    }
  }
}

class HouseList {
  constructor() {
    this.houses = [
      new House("Mum's House", `<img src="img/house/mums-house.jpg" alt="House in autumn" title="You've lived your whole life here." class="house-img">`, 5, 400),
      new House("Under a Bridge", `<img src="img/house/under-a-bridge.jpg" alt="Camp underneath bridge" title="This place is filthy." class="house-img">`, 15, 0),
      new House("Crack House", `<img src="img/house/crack-house.jpg" alt="Crack house" title="At least it's a roof." class="house-img">`, 10, 10),
      new House("Filthy Apartment", `<img src="img/house/dirty-apartment.jpg" alt="Apartment building" title="This place could use some soundproofing." class="house-img">`, 8, 15),
      new House("Mobile Home", `<img src="img/house/mobile-home.jpg" alt="Mobile home" title="Let's get drunk and eat chicken fingers!" class="house-img">`, 7, 20),
      new House("Log Cabin", `<img src="img/house/log-cabin.jpg" alt="Log Cabin" title="Warm and cozy" class="house-img">`, 6, 30),
      new House("Suburban Rental", `<img src="img/house/suburban-rental.jpg" alt="Suburban neighbourhood" title="Barbeque?" class="house-img">`, 5, 50),
      new House("Penthouse Condo", `<img src="img/house/penthouse-condo.jpg" alt="Luxury Condo" title="You've really made it, haven't you?" class="house-img">`, 4, 100)
      ]
    
  }

  get(i) {
    return this.houses[i];
  }

  getIndexOf(house) {
    return this.houses.indexOf(house);
  }

  getLength() {
    return this.houses.length;
  }

  remove(house) {
    this.houses.splice(this.houses.indexOf(house), 1);
  }
}
class BreedList {
  constructor() {
    this.commonCats = [
      `<img src="img/cat/cat_1.jpg" alt="Burmese Cat" title="Burmese" class="cat-img">`,
      `<img src="img/cat/cat_2.jpg" alt="Calico Cat" title="Calico" class="cat-img">`,
      `<img src="img/cat/cat_3.jpg" alt="Orange Tabby Cat" title="Orange Tabby" class="cat-img">`,
      `<img src="img/cat/cat_4.jpg" alt="British Shorthair Cat" title="British Shorthair" class="cat-img">`,
      `<img src="img/cat/cat_5.jpg" alt="Bombay Cat" title="Bombay" class="cat-img">`,
      `<img src="img/cat/cat_6.jpg" alt="Siamese Cat" title="Siamese" class="cat-img">`,
      `<img src="img/cat/cat_7.jpg" alt="British Longhair Cat" title="British Longhair" class="cat-img">`,
      `<img src="img/cat/cat_8.jpg" alt="Munchkin Cat" title="Munchkin" class="cat-img">`,
      `<img src="img/cat/cat_9.jpg" alt="Persian Cat" title="Persian" class="cat-img">`,
      `<img src="img/cat/cat_10.jpg" alt="Maine Coon Cat" title="Maine Coon" class="cat-img">`
    ]  
    this.rareCats = [
      `<img src="img/cat/rare_cat_1.jpg" alt="Cool Cat" title="Cool Cat" class="cat-img">`,
      `<img src="img/cat/rare_cat_2.jpg" alt="Scary Cat" title="Count Catula" class="cat-img">`,
      `<img src="img/cat/rare_cat_3.jpg" alt="Erik Catie" title="Erik Catie" class="cat-img">`,
      `<img src="img/cat/rare_cat_4.jpg" alt="Lion" title="Lion" class="cat-img">`,
      `<img src="img/cat/rare_cat_5.jpg" alt="Space Cat" title="Chris Catfield" class="cat-img">`,
      `<img src="img/cat/rare_cat_6.jpg" alt="Blue Cat" title="Music has the Right to Kittens" class="cat-img">`,
      //Blatant Copyright infringement follows - What are they gonna do, sue me??? I'd love to see them try ahahaah
      `<img src="img/cat/rare_cat_7.jpg" alt="Garfield" title="Lasagna Cat" class="cat-img">`,
      `<img src="img/cat/rare_cat_8.jpg" alt="Grumpy Cat" title="Grumpy" class="cat-img">`,
      `<img src="img/cat/rare_cat_9.jpg" alt="Tom from Tom and Jerry" title="Mouse Hunter" class="cat-img">`,
      `<img src="img/cat/rare_cat_10.jpg" alt="Maneki-Neko" title="Maneki-Neko" class="cat-img">`,
      ]
    this.legendaryCats = [
      `<img src="img/cat/legendary_cat_1.jpg" alt="Penguin" title="Antarctic Cat" class="cat-img">`,
      `<img src="img/cat/legendary_cat_2.jpg" alt="Glitched Cat" title="Corrupted Cat" class="cat-img">`,
      `<img src="img/cat/legendary_cat_3.jpg" alt="Glitched Cat" title="Corrupted Cat" class="cat-img">`,
      `<img src="img/cat/legendary_cat_4.jpg" alt="Snake" title="Scaly Cat" class="cat-img">`,
      `<img src="img/cat/legendary_cat_5.jpg" alt="Psychedelic Cat" title="Psychedelic Cat" class="cat-img">`,
      `<img src="img/cat/legendary_cat_6.jpg" alt="Sea Snail" title="Underwater Cat" class="cat-img">`,
      ]
    this.rareCatDate = Math.floor(Math.random() * 150)
    this.legendaryCatDate = Math.floor(Math.random() * 300)
    this.refreshIndex();
  }

  getCat(day, firstTime) {
    if (day%150 == this.rareCatDate) {
      if (firstTime) {notification("Rare cat in stock - Only for TODAY!");}
      return this.rareCats[this.rareCatIndex];
    } else if (day%300 == this.legendaryCatDate) {
      if (firstTime) {notification("Legendary cat in stock - Only for TODAY!");}
      return this.legendaryCats[this.legendaryCatIndex];
    }
    return this.commonCats[this.commonCatIndex];
  }

  getTodayCatCategory(day) {
    if (day%150 == this.rareCatDate) {
      return "rare";
    } else if (day%300 == this.legendaryCatDate) {
      return "legendary";
    } else {
      return "common";
    }
  }

  refreshIndex() {
    this.commonCatIndex = Math.floor(Math.random() * this.commonCats.length);
    this.rareCatIndex = Math.floor(Math.random() * this.rareCats.length);
    this.legendaryCatIndex = Math.floor(Math.random() * this.legendaryCats.length);
  }
}

const jobs = [
  new Job("Unemployed", 0, -1),
]

const oddJobs = [
  new Job("Toilet Cleaner", 5, 2, "odd"),
  new Job("Meat Grinder", 6, 3, "odd"),
  new Job("TV Extra", 4, 2, "odd"),
  new Job("Dog Walker", 5, 4, "odd"),
  new Job("Pan Handler", 5, 10, "odd"),
  new Job("Telemarketer", 6, 2, "odd"),
  new Job("Busker", 5, 5, "odd"),
  new Job("Email Scammer", 6, 3, "odd")
  ]

const manLabJobs = [
  new Job("Cashier", 10, 3, "manLab"),
  new Job("Receptionist", 13, 3, "manLab"),
  new Job("Commercial Actor", 9, 3, "manLab"),
  new Job("Janitor", 12, 4, "manLab"),
  new Job("Factory Worker", 13, 3, "manLab"),
  new Job("Miner", 15, 2, "manLab"),
  new Job("Substitute Teacher", 10, 5, "manLab"),
  new Job("Security Guard", 11, 3, "manLab")
  ]
const sklLabJobs = [
  new Job("Software Developer", 22, 8, "sklLab"),
  new Job("Banker", 23, 5, "sklLab"),
  new Job("Lawyer", 21, 3, "sklLab"),
  new Job("Consultant", 22, 4, "sklLab"),
  new Job("Librarian", 20, 8, "sklLab"),
  new Job("Salesperson", 20, 6, "sklLab")
  ]

const strCrmJobs = [
  new Job("Street Dealer", 13, 3, "strCrm"),
  new Job("Prostitute", 15, 5, "strCrm"),
  new Job("Hired Goon", 12, 4, "strCrm"),
  new Job("Shroom Grower", 13, 3, "strCrm"),
  new Job("Drug Mule", 14, 3, "strCrm")
  ]
const orgCrmJobs = [
  new Job("Meth Kingpin", 32, 3, "orgCrm"),
  new Job("Mob Boss", 25, 5, "orgCrm"),
  new Job("Professional Hitman", 28, 3, "orgCrm"),
  new Job("Pimp", 21, 4, "orgCrm"),
  ]

const policyJobs = [
  new Job("Prime Minister", 100, 2, "policy"),
  new Job("Mayor", 50, 2, "policy"),
  ]

const catAchievements = [
  "Certified Cat Owner",
  "Pure Bred",
  "Salesman",
  "Collector",
  "Grim Reaper",
  ]

const lifeAchievements = [
  "Hard Worker",
  "Career Politician",
  "Expert",
  "Felina",
  "Scrooge McCat"
  ]

var houses = new HouseList();
var pl = new Player();
var clock = new Clock(1);
var breeds = new BreedList();

const hungerLevels = ["Dead", "Starving", "Hungry", "Full"]
const healthLevels = ["Dead", "Deathly ill", "Sick", "Healthy"]
var cats = [];
var day = 1;
var newCatButton = document.querySelector("#new-cat");
var buyFoodButton = document.querySelector("#buy-food");
var nextDayButton = document.querySelector("#next-day");
var newJobButton = document.querySelector("#new-job");
var seenDead = false;

var catAchievement = new Achievement(catAchievements[Math.floor(Math.random() * catAchievements.length)]);
catAchievement.isComplete();
var lifeAchievement = new Achievement(lifeAchievements[Math.floor(Math.random() * lifeAchievements.length)])
lifeAchievement.isComplete();
printPlayer();
printJob();
printHouse();
changeHouse(0);

//Adding new cat
newCatButton.addEventListener("click", function() {
  openCatShop();
  //Checking money is high enough
  if (pl.money >= 25) {
    let randomCatImg = breeds.getCat(clock.day, false);
    let randomCatName = getRandomCatName();
    document.getElementById("cat-shop").innerHTML = `
      ${randomCatImg}
      <h4>Name your cat:</h4>
      <input id="cat-name-input" type="text" placeholder="${randomCatName}" autofocus></input>
      <button id="cat-buy-confirm">Confirm</button>
      <button id="cat-buy-cancel">Cancel</button>
    `;
    var confirm = document.querySelector("#cat-buy-confirm");
    var deny = document.querySelector("#cat-buy-cancel");
    //Physically adding new cat
    confirm.addEventListener("click", function() {
      catName = randomCatName;
      if (document.querySelector('#cat-name-input').value) {
        catName = document.querySelector('#cat-name-input').value;
      }
      cats.push(new Cat(catName, randomCatImg, breeds.getTodayCatCategory(clock.day)));
      document.getElementById("cat-list").innerHTML += `
      <div id="cat-${cats.length-1}" class="cat-box">
        ${cats[cats.length-1].image}
        <h4 id="cat-${cats.length-1}-name">${cats[cats.length-1].name}</h4>
        <p id="cat-${cats.length-1}-hunger">Hunger: ${hungerLevels[cats[cats.length-1].hunger]}</p>
        <p id="cat-${cats.length-1}-health">Health: ${healthLevels[cats[cats.length-1].health]}</p>
        <div class="cat-button-container">
          <button class="cat-button" onclick="cats[${cats.length-1}].sell(${cats.length-1}); noButtons(); printPlayer();">Sell +15$</button>
          <button id="cat-${cats.length-1}-treat" class="cat-button" onclick="cats[${cats.length-1}].treat(${cats.length-1}); noButtons(); printPlayer();">Cure -12$</button>
        </div>
      </div>
      `;
      pl.money -= 25;
      closeCatShop();
      printPlayer();
      noButtons();
     })

    deny.addEventListener("click", function() {
      closeCatShop();
    })
  } else {
    document.getElementById("cat-shop").innerHTML = `
      <img src="img/object/burning_money.jpg" alt="Burning Money" title="Your Bank Account" class="cat-img">
      <h4>You haven't got enough money!</h4>
      <button id="poor-confirm">Ok</button>
    `;
    var ok = document.querySelector("#poor-confirm");
    ok.addEventListener("click", function() {
      closeCatShop();
    })
  }
})

//Buying more food
buyFoodButton.addEventListener("click", function() {
  openCatShop();
  defaultMoney = Math.min(pl.money, 7*pl.reqCats)
  document.getElementById("cat-shop").innerHTML = `
      <img src="img/object/food_can.jpg" alt="A can of food" title="Sardines" class="cat-img">
      <h4>Buy food:</h4>
      <input id="food-buy-amount" type="number" min="0" max="${pl.money}" placeholder="${defaultMoney}" oninput="validity.valid||(value='');" ></input>
      <button id="food-buy-confirm">Confirm</button>
      <button id="food-buy-cancel">Cancel</button>
    `;
    var confirm = document.querySelector("#food-buy-confirm");
    var deny = document.querySelector("#food-buy-cancel");

    //confirm button
    confirm.addEventListener("click", function() {
      var amount = defaultMoney;
      if (document.querySelector('#food-buy-amount').value) {
        amount = document.querySelector('#food-buy-amount').value;
      }
      
      //player has enough money
      if (pl.money >= amount) {
        pl.money -= amount;
        pl.food -= -amount;
      } else { //not enough money
        notification("Not enough Money!");
      }

      closeCatShop();
      printPlayer();
      noButtons();
    });

    //deny button
    deny.addEventListener("click", function() {
      closeCatShop();
    });
});

//Finding a job
newJobButton.addEventListener("click", function() {
  if (pl.job.difficulty == -1) {
    document.getElementById("job-search").style.display = "inline";
    document.getElementById("job-list").innerHTML = `
      <h2>Job Listings:</h2>
      <button onclick="getNewJob('oddJob');" style="width: 94%">Odd jobs</button>
      <button onclick="getNewJob('manLab');" style="width: 45%">Manual Labour</button>
      <button onclick="getNewJob('strCrm');" style="width: 45%">Street Crime</button>
      <button onclick="getNewJob('sklLab');" style="width: 45%">Skilled Labour</button>
      <button onclick="getNewJob('orgCrm');" style="width: 45%">Organized Crime</button>
      <button onclick="getNewJob('policy');" style="width: 94%">Politics</button>
      <button onclick="document.getElementById('job-search').style.display = 'none';" style="width: 94%">Cancel</button>
    `
  } else {
    pl.job = jobs[0];
    document.getElementById("new-job").innerHTML = "Find a job"
    document.getElementById("job-info").innerHTML = `
    <p style="text-shadow: 0px 0px 2px red;">You quit your job!</p>
    `
    noButtons();
  }
  
});

function getNewJob(category) {
  var botched = false;
  switch (category) {
  case "oddJob":
    pl.job = oddJobs[Math.floor(Math.random() * oddJobs.length)];
    break;
  case "manLab":
    pl.job = manLabJobs[Math.floor(Math.random() * manLabJobs.length)]
    if(pl.oddExp < 1) {botched = true;}
    break;
  case "sklLab":
    pl.job = sklLabJobs[Math.floor(Math.random() * sklLabJobs.length)]
    if(pl.labExp < 1) {botched = true;}
    break;
  case "strCrm":
    pl.job = strCrmJobs[Math.floor(Math.random() * strCrmJobs.length)]
    if(pl.oddExp < 1) {botched = true;}
    break;
  case "orgCrm":
    pl.job = orgCrmJobs[Math.floor(Math.random() * orgCrmJobs.length)]
    if(pl.crmExp < 1) {botched = true;}
    break;
  case "policy":
    pl.job = policyJobs[Math.floor(Math.random() * policyJobs.length)]
    if(pl.topExp < 1) {botched = true;}
    break;
  case null:
    pl.job = jobs[0];
  }

  if (botched) {
    document.getElementById("job-info").innerHTML = `
    <p style="text-shadow: 0px 0px 2px red;">Not enough experience to be a ${pl.job.name}</p>
    `
    pl.job = jobs[0];
  } else if (pl.job.difficulty <= 1 || Math.floor(Math.random() * 2 < 1)) {
    document.getElementById("job-info").innerHTML = `
    <p style="text-shadow: 0px 0px 2px red;">You bombed your ${pl.job.name} interview!</p>
    `
    pl.job = jobs[0];
  } else {
    document.getElementById("job-info").innerHTML = `
    <p style="text-shadow: 0px 0px 2px green;">You are now a ${pl.job.name}! (${pl.job.salary}$ per day)</p>
    `
    document.getElementById("new-job").innerHTML = "Quit job"
    document.getElementById('experience').innerHTML += `<li>Former ${pl.job.name}</li>`;
  }
  document.getElementById('job-search').style.display = 'none';
  noButtons();
}


nextDayButton.addEventListener("click", function()  {
  document.getElementById("next-day").disabled = true; 
  workJob();
  nextDay();
  printJob();
  printPlayer();
  printHouse();
  yesButtons();
  switchNextDayButton("No");
  //Sets prison things
  if (pl.imprisoned) {
    noButtons();
  }
  document.getElementById("next-day").disabled = false; 
  //kills game if player died
  if (pl.mental == 4) {
    if (seenDead == false) {
      notification("You died from cat withdrawal!");
      seenDead = true;
    }
    killGame();
  }

})

function nextDay() {
  clock.nextDay();
  var catHungerTag = 0;
  for (var i = 0; i < cats.length; i++) {
    if (cats[i].alive) {
      //Aging cat
      if (cats[i].age(pl.food) == 1) {
        document.getElementById("cat-"+i+"-hunger").innerHTML = `
        Hunger: ${hungerLevels[cats[i].hunger]}
        `
        document.getElementById("cat-"+i+"-health").innerHTML = `
        Health: ${healthLevels[cats[i].health]}
        `
        //adding peril
        if (cats[i].health == 1 || cats[i].hunger == 1) {
          document.getElementById("cat-"+i).classList.add('cat-box-peril');
        } else {
          document.getElementById("cat-"+i).classList.remove('cat-box-peril');
        }
      }

      //Adding dead cat
      if (cats[i].hunger == 0 || cats[i].health == 0) {
        document.getElementById("cat-"+i).classList.remove('cat-box-peril');
        document.getElementById("cat-"+i).classList.add('dead-cat-box');
        document.getElementById("cat-"+i+"-treat").remove();
      }
    }
  }

  //Editing Player face card thing
  if (clock.day % 50 == 0) {
    pl.reqCats++;
  }
  if (pl.mental < 4) {
    if (catCount(cats) < pl.reqCats) {
      pl.mental++;
    } else {
      pl.mental = 0;
    }
  }
  //Spending time in prison
  if (pl.imprisoned) {
    pl.spendTime();
  }
  //Editing house
  pl.house.dailyUpdate();

  //Changing cats in stock
  breeds.refreshIndex();
  //closing cat shop
  closeCatShop();
  //Setting notification
  breeds.getCat(clock.day, true);
  

  //Doing daily screen updates
  document.getElementById("player-info").innerHTML = `
  <h2>${clock.dayOfWeek()}, Day ${clock.day}</h2>
  `

  document.getElementById("your-stats").innerHTML = `
  ${pl.image()}
  <strong>${pl.moodText()}, you have ${catCount(cats)}/${pl.reqCats} needed cats</strong>
  <div id="progress-box"></div>
  `

  //Cat Need meter
  document.getElementById("progress-box").innerHTML = `
  Time until cat need increase:
  <div id="progress-bar" style="width: ${clock.day%50*2}%;"></div>
  `


  //Setting achievements
  let catAchieved = catAchievement.isComplete();
  let lifeAchieved = lifeAchievement.isComplete();
  if (catAchieved && lifeAchieved && pl.mental != 5) {
    pl.mental = 5;
    notification("You have self actualized! You win the game!");
  }
  
}

//Finding how many living cats there are
function catCount(cats) {
  var count = 0;
  for (var i = 0; i < cats.length; i++) {
    if (cats[i].alive) {
      count++
    }
  }
  return count;
}

function perilCatCount(cats) {
  return document.querySelectorAll('#cat-list .cat-box-peril').length;
}

function getRandomCatName() {
  consonants = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z"];
  vowels = ["a", "e", "i" ,"o", "u"];
  var name = "";
  for (var i = 0; i < Math.floor(Math.random() * 5)+2; i++) {
    if (i%3 == 1) {
      name += vowels[Math.floor(Math.random() * vowels.length)];
    } else {
      name += consonants[Math.floor(Math.random() * consonants.length)];
    }

    if (i==0) {
      name = name.toUpperCase();
    }
  }
  console.log(name);
  return name;
}
//Working
function workJob() {
  if (document.getElementById("next-day").innerHTML == "Work 'til Dawn") {
    pl.money += pl.job.work();
    switch (pl.job.category) {
    case "odd":
      if (pl.oddExp == 0) {
        pl.oddExpProgress++;
        if (pl.oddExpProgress == 50) {
          document.getElementById("experience").innerHTML += "<li>Versatile</li>";
          pl.oddExp++;
        }
      }
      break;
    case "manLab":
      if (pl.labExp == 0) {
        pl.labExpProgress++;
        if (pl.labExpProgress == 100) {
          document.getElementById("experience").innerHTML += "<li>Good Work Experience</li>";
          pl.labExp++;
        }
      }
      //Achievement
      if (lifeAchievement.name == "Hard Worker") {
        lifeAchievement.count++;
      }
      break;
    case "strCrm":
      if (pl.crmExp == 0) {
        pl.crmExpProgress++
        if (pl.crmExpProgress == 100) {
          document.getElementById("experience").innerHTML += "<li>Experienced Criminal</li>";
          pl.crmExp++;
        }
      }
      break;
    case "sklLab":
    case "orgCrm":
      if (pl.topExp == 0) {
        pl.topExpProgress++
        if (pl.topExpProgress == 100) {
          document.getElementById("experience").innerHTML += "<li>Potential in Politics</li>";
          pl.topExp++;
        }
      }
    }
  } else if ((pl.job != jobs[0]) && (clock.intOfWeek() < 5)) {
    if (pl.job.fired()) {
      if (pl.job.category == "strCrm" || pl.job.category == "orgCrm") {
        pl.arrest(pl.job.category);
        notification(`You were busted! The cops found out about you being a ${pl.job.name} and sentenced you to ${pl.timeToServe} days in the clink!`);
      } else {
        notification("You were fired!");
      }
      pl.job = jobs[0];
      document.getElementById("new-job").innerHTML = "Find a job";
    }

  }
  
}
function closeCatShop() {
  document.getElementById("cat-shop").style.padding = "0px";
  document.getElementById("cat-shop").style.border = "0px outset burlywood";
  document.getElementById("cat-shop").innerHTML = "";
}
function openCatShop() {
  document.getElementById("cat-shop").style.padding = "6px";
  document.getElementById("cat-shop").style.border = "5px outset burlywood";
}
function printJob() {
  if (pl.job != jobs[0]) {
    document.getElementById("job-info").innerHTML = `
    <span>${pl.job.name} -- ${pl.job.salary}$ daily -- ${pl.job.difficulty - 1} days off</span>
    <div id="job-exp-bar-container" title="Your job experience - Fill this bar to get better jobs!">
      <div id="job-exp-bar"></div>
    </div>
    `
    var barProgress = document.getElementById("job-exp-bar");
    switch (pl.job.category) {
    case "odd":
      barProgress.style.width = `${pl.oddExpProgress*2}%`;
      break;
    case "manLab":
      barProgress.style.width = `${pl.labExpProgress}%`;
      break;
    case "strCrm":
      barProgress.style.width = `${pl.crmExpProgress}%`;
      break;
    case "sklLab":
    case "orgCrm":
      barProgress.style.width = `${pl.topExpProgress}%`;
    }
  } else {
    document.getElementById("job-info").innerHTML = `
    <p>${pl.job.name} -- ${pl.job.salary}$ daily -- Infinite days off</p>
    `
  }
  
}

function printPlayer() {
  
  document.getElementById("money-counter").innerHTML = `
  Money: ${pl.money}$
  `
  document.getElementById("food-counter").innerHTML = `
  Food: ${pl.food}
  `
  if (pl.food < catCount(cats)) {
    document.getElementById("food-counter").classList.add("alert");
  } else {
    document.getElementById("food-counter").classList.remove("alert");
  }
  document.getElementById("cat-counter").innerHTML = `
  Cats: ${catCount(cats)}
  `
  document.getElementById("peril-counter").innerHTML = `
  Cats in peril: ${perilCatCount()}
  `
  if (perilCatCount() > 0) {
    document.getElementById("peril-counter").classList.add("alert");
  } else {
    document.getElementById("peril-counter").classList.remove("alert");
  }

  if (catCount(cats) < pl.reqCats) {
    document.getElementById("cat-counter").classList.add("alert");
  } else {
    document.getElementById("cat-counter").classList.remove("alert");
  }
}

//Printing and affecting house things
function changeHouse(i) {
  pl.house = houses.get(i);
  document.getElementById("house-visuals").innerHTML = `
    ${pl.house.picture}
    <h4>Your home: ${pl.house.name}</h4>
    <p>Weekly rent: ${pl.house.cost}$</p>
    `
  document.getElementById("house-actions").innerHTML = "";
  printHouse();
}
function printHouse() {
  document.getElementById("house-upgrade").innerHTML = "";
  upgradeHouseIndex = houses.getIndexOf(pl.house)+1;
  downgradeHouseIndex = houses.getIndexOf(pl.house)-1;
  if (pl.house.overdue) {
    document.getElementById("house-actions").innerHTML = `
    <p>Rent owed: ${pl.house.rentDue}$</p>
    <p>You have ${pl.house.daysLeft} days to pay!</p>
    <button class="next-day-work" onclick="pl.house.payRent(); printHouse(); noButtons(); printPlayer();">Pay your rent</button>
    `
  } else if (houses.getIndexOf(pl.house) < houses.getLength()-1) {
    document.getElementById("house-upgrade").innerHTML = `
      <button onclick="changeHouse(${upgradeHouseIndex}); noButtons(); printPlayer();">
        Upgrade to ${houses.get(upgradeHouseIndex).name} (${houses.get(upgradeHouseIndex).cost}$ a week)
      </button>
    `
  } 
  if (houses.getIndexOf(pl.house) > 0) {
    document.getElementById("house-upgrade").innerHTML += `
      <button onclick="changeHouse(${downgradeHouseIndex}); noButtons(); printPlayer();">
        Downgrade to ${houses.get(downgradeHouseIndex).name} (${houses.get(downgradeHouseIndex).cost}$ a week)
      </button>
    `
  }
}
function noButtons() {
  const buttons = document.getElementsByTagName("button");
  for (const button of buttons) {
    button.disabled = true;
  }
  document.getElementById("next-day").disabled = false; 
  switchNextDayButton("setToPlay");
  if (document.getElementById("close-notification")) {
    document.getElementById("close-notification").disabled = false;
  }
}

function yesButtons() {
  const buttons = document.getElementsByTagName("button");
  for (const button of buttons) {
    button.disabled = false;
  }
}

//Set "workOrPlay" to "setToPlay" to change button to play
function switchNextDayButton(workOrPlay) {
  //Printing the next day button
  if ((clock.intOfWeek() < 5 && pl.job.difficulty != -1) && (workOrPlay != "setToPlay")) {
    document.getElementById("next-day").classList.remove("next-day-play");
    document.getElementById("next-day").classList.add("next-day-work");
    document.getElementById("next-day").innerHTML = "Work 'til Dawn";
  } else {
    document.getElementById("next-day").classList.add("next-day-play");
    document.getElementById("next-day").classList.remove("next-day-work");
    document.getElementById("next-day").innerHTML = "Next Day";
  }
}
function notification(message) {
  document.getElementById("overlay").style.display = "inline";
  document.getElementById("overlay").innerHTML = `<h1>${message}</h1>`;
  document.getElementById("overlay").innerHTML += `<button id="close-notification" onclick="document.getElementById('overlay').style.display = 'none';">Click to continue</button>`;
  document.getElementById("close-notification").disabled = false;
}
function killGame() {
  noButtons();
  switchNextDayButton("setToPlay");
}