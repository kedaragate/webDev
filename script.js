const usersDiv = document.querySelector(".cards");
const card = document.querySelector(".card");
const message=document.querySelector("#message");
const userName=document.querySelector(".card-name");
let userData;

fetch("https://dummyapi.io/data/v1/user", {
  method: "GET",

  headers: {
    "app-id": "62c3859db3b09459b4b1f8a0",
  },
})
  .then((response) => response.json())
  .then((data) => {
    userData = data.data;
    hideMessage(message);
    displayCards(data.data);
  });
let hideMessage=function (){
message.style.display="none";
}

let displayCards = function (users) {
  users.forEach((user) => {
    const userCard = createUserCard(user);
    usersDiv.appendChild(userCard);
   /* usersDiv.style.display = "flex";*/
  });
};
let createUserCard = function (user) {
  let userDiv = document.createElement("div");
  userDiv.className = "card";
  userDiv.id = user.id;
  let userImage = document.createElement("img");
  userImage.className = "card-img";
  userImage.setAttribute("src", user.picture);
  userDiv.appendChild(userImage);
  let userName = document.createElement("h4");
  userName.className = "card-name";
  userName.textContent = `${user.title} ${user.firstName} ${user.lastName}`;
  userDiv.appendChild(userName);
  let userButton = document.createElement("button");
  userButton.className = "card-btn";
  userButton.textContent = "See More Details";
  userDiv.appendChild(userButton);
  return userDiv;
};

/*<div class="card">
  <img
    src="https://randomuser.me/api/portraits/women/58.jpg"
    alt=""
    class="card-img"
  />
  <h4 class="card-name">ms Sara Anderson</h4>
  <button class="card-btn">See More Details</button>
</div>;
*/

// Search facility

const searchText = document.querySelector("#searchText");
const searchButton = document.querySelector(".searchBtn");

searchText.addEventListener("keyup", function () {
  const searchValue = this.value.toLowerCase();

  const searchUser = userData.filter((user) => {
    return user.firstName.toLowerCase().startsWith(searchValue);

  })
removeExistingUsers();
  displayCards(searchUser);

});

const removeExistingUsers = function () {
  usersDiv.innerHTML = "";
};

//Switching modes
const modeButton=document.querySelector("#lightModeBtn");

const switchMode=function (){
if(modeButton.textContent=="Light Mode"){

modeButton.textContent="Dark Mode";
document.body.style.backgroundColor="white";
usersDiv.style.backgroundColor="white";
card.style.backgroundColor="white";
message.style.color="black";

}

else if(modeButton.textContent=="Dark Mode"){
modeButton.textContent="Light Mode";
document.body.style.backgroundColor="black";
usersDiv.style.backgroundColor="black";
card.style.backgroundColor="black";
message.style.color="white";
card.style.color="black";
}


}





modeButton.addEventListener("click", switchMode);

