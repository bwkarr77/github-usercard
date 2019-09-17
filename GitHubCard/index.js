/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

const cards = document.querySelector(".cards");
const itsMe = "bwkarr77";

axios
  .get(`https://api.github.com/users/${itsMe}`)
  .then(results => {
    console.log("response", results.data);
    const card = createComponent(results.data);
    cards.append(card);
  })
  .catch(err => {
    console.log(err);
  });

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [];

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

function createComponent(gitUser) {
  const card = document.createElement("div");
  const img = document.createElement("img");
  const cardInfo = document.createElement("div");
  const name = document.createElement("h3");
  const username = document.createElement("p");
  const location = document.createElement("p");
  const profile = document.createElement("p");
  const followers = document.createElement("p");
  const following = document.createElement("p");
  const bio = document.createElement("p");
  const topSection = document.createElement("div");
  const bottomSection = document.createElement("div");
  const contribution = document.createElement("img");

  card.append(topSection, bottomSection);
  topSection.append(img, cardInfo);
  cardInfo.append(name, username, location, profile, followers, following, bio);
  bottomSection.append(contribution);
  // profileContent.append(profile, link);
  //appendChild is a DOM, and won't allow a list of inputs like i've done
  //append is a js function, and allows multiple inputs in one line.
  //all cases where you use appendChild you can use append, but not all append cases can use appendChild.

  card.classList.add("card");
  cardInfo.classList.add("card-info");
  name.classList.add("name");
  username.classList.add("username");
  topSection.classList.add("topSection");
  bottomSection.classList.add("bottomSection");
  contribution.classList.add("gitCont");

  img.src = gitUser.avatar_url;
  name.textContent = gitUser.name;
  username.textContent = gitUser.login;
  location.textContent = `Location: ${gitUser.location}`;
  profile.innerHTML = `Profile: <a href="${gitUser.html_url}">${gitUser.html_url}</a>`;
  followers.textContent = `Followers: ${gitUser.followers}`;
  following.textContent = `Following: ${gitUser.following}`;
  bio.textContent = `Bio: ${gitUser.bio}`;

  //extra shite------
  card.style.flexDirection = "column";
  topSection.style.display = "flex";
  topSection.style.padding = "10px 5px";
  bottomSection.style.padding = "10px 5px";
  contribution.src = `http://ghchart.rshah.org/${gitUser.login}`;
  contribution.style.width = "100%";
  // contribution.style.display = "none";

  //button
  more = document.createElement("p");
  card.append(more);
  more.textContent = "more";
  more.addEventListener("click", e => {
    card.classList.toggle("card-open");
    contribution.classList.toggle("gitCont-open");
  });

  return card;
}

/* List of LS Instructors Github username's: */
const lsInstructors = [
  "tetondan",
  "dustinmyers",
  "justsml",
  "luishrd",
  "bigknell"
];

lsInstructors.forEach(instructor => {
  axios
    .get(`https://api.github.com/users/${instructor}`)
    .then(result => {
      const card = createComponent(result.data);
      cards.append(card);
    })
    // .then(result =>{
    //   const friendList =
    // })
    .catch(err => {
      console.log(err);
    });
});

//STRETCH GOALS//
//Create card for each person in friends list//
//----Used an instructor's list because they had more----//
axios
  .get(`https://api.github.com/users/${lsInstructors[1]}/followers`) //pulls in list of followers from array
  .then(result1 => {
    console.log("friendlist", result1.data);
    result1.data.forEach(i => {
      //forEach 'follower', do the following:
      axios
        .get(`https://api.github.com/users/${i.login}`)
        //pulls in each user 'login'
        .then(result2 => {
          // console.log(i.login);
          const card = createComponent(result2.data); //creates a new card for each user 'login'
          cards.append(card);
        });
    });
  })
  .catch(err => {
    console.log(err);
  });

//Github Contributions
// function gitContributions(input) {
//   const gitCal = document.createElement("div");
//   const script1 = document.createElement("script");
//   const link1 = document.createElement("a");
//   const calendar = document.createElement("div");
//   const script2 = document.createElement("script");

//   gitCal.append(script1, link1, calendar, script2);

//   gitCal.classList.add("gitContainer");
//   calendar.classList.add("calendar");

//   scrip1.src =
//     "https://cdn.rawgit.com/IonicaBizau/github-calendar/gh-pages/dist/github-calendar.min.js";
//   link1.href =
//     "https://cdn.rawgit.com/IonicaBizau/github-calendar/gh-pages/dist/github-calendar.css";
//   username.textContent = gitUser.login;
//   location.textContent = `Location: ${gitUser.location}`;
//   profile.innerHTML = `Profile: <a href="${gitUser.html_url}">${gitUser.html_url}</a>`;
//   followers.textContent = `Followers: ${gitUser.followers}`;
//   following.textContent = `Following: ${gitUser.following}`;
//   bio.textContent = `Bio: ${gitUser.bio}`;

//   return gitCal;
// }
