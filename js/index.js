// Function to load each category of pets from API
const loadCategories = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories"
  );
  const data = await response.json();
  displayCategories(data.categories);
};

// Function to display the categories as buttons 
const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("category");

  categories.forEach((item) => {
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("flex");
    buttonContainer.classList.add("justify-center");
    buttonContainer.classList.add("items-center");
    buttonContainer.innerHTML = `   
        <button
          id="btn-${item.category}" onclick="loadPetCategory('${item.category}')" class="category-btns flex justify-center items-center gap-2 font-bold rounded-lg border-2 px-10 py-2"
        >
          <img src="${item.category_icon}" alt="Icon of the category" />
          <p">${item.category}</p>
        </button>
    `;
    categoryContainer.append(buttonContainer);
  });
};

// Function to load all the pets based on the selected category
const loadPetCategory = async (category) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${category}`
  );
  const data = await response.json();

  const cardsConainter = document.getElementById("cards-container");
  cardsConainter.classList.remove("grid");

  const allCategoryButtons = document.getElementsByClassName("category-btns");

  for (let btn of allCategoryButtons) {
    btn.classList.remove("bg-teal-100");
    btn.classList.remove("rounded-full");
    btn.classList.remove("border-teal-500");
    btn.classList.add("rounded-lg");
  }

  const activeBtn = document.getElementById(`btn-${category}`);

  activeBtn.classList.remove("rounded-lg");
  activeBtn.classList.add("bg-teal-100");
  activeBtn.classList.add("rounded-full");
  activeBtn.classList.add("border-teal-500");

  cardsConainter.innerHTML = `
    <div class="flex flex-col gap-5 justify-center items-center p-5 bg-slate-300 rounded-xl">
      <span class="loading loading-bars loading-lg"></span>
    </div>`;

  setTimeout(() => {
    displayAllPets(data.data);
  }, 2000);
};

// Function to load all the pets from API
const loadAllPets = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/peddy/pets"
  );
  const data = await response.json();
  displayAllPets(data.pets);
};

// Function to take an array, create cards and display them
const displayAllPets = (pets) => {
  const cardsConainter = document.getElementById("cards-container");
  cardsConainter.innerHTML = "";

  if (pets.length == 0) {
    cardsConainter.classList.remove("grid");
    cardsConainter.innerHTML = `
    <div class="flex flex-col gap-5 justify-center items-center p-5 bg-slate-300 rounded-xl">
      <img src="./images/error.webp" /> 
      <h1 class="text-center text-xl font-bold"> No Information Available</h1> 
      <p>We do not carry any birds as pet options.</p>
    </div>`;
  } else {
    cardsConainter.classList.add("grid");
  }

  pets.forEach((pet) => {
    const card = document.createElement("div");

    card.innerHTML = ` 
    <div class="flex flex-col justify-center space-y-2 p-2 border-2 rounded-lg">
            <div>
              <img class="rounded-xl h-full w-full object-cover" src="${
                pet.image
              }" alt="Image of pet" />
            </div>
            <div class="">
              <h1 class="text-xl font-bold">${pet.pet_name}</h1>
              <p><i class="fa-solid fa-qrcode"></i> Breed: ${
                pet.breed ? pet.breed : "Not Available"
              }</p>
              <p><i class="fa-regular fa-calendar"></i> Birth: ${
                pet.date_of_birth ? pet.date_of_birth : "Not Available"
              }</p>
              <p><i class="fa-solid fa-mercury"></i> Gender: ${
                pet.gender ? pet.gender : "Not Available"
              }</p>
              <p><i class="fa-solid fa-dollar-sign"></i> Price: ${
                pet.price ? pet.price : "Not Available"
              }</p>
              <hr />
            </div>
            <div class="flex gap-2 justify-evenly">
              <button onclick="petLiked('${
                pet.image
              }')" class="btn bg-white border-1 text-teal-800 lg:px-6">
                <i class="fa-regular fa-thumbs-up"></i>
              </button>
              <button id="adopt-btn-${pet.petId}" onclick="displayAdoptModal(${
      pet.petId
    })" class="btn bg-white border-1 text-teal-800 lg:px-6">Adopt</button>
              <button onclick="petDetails(${
                pet.petId
              })" class="btn bg-white border-1 text-teal-800 lg:px-6">
                Details
              </button>
            </div>
          </div>

    `;

    cardsConainter.append(card);
  });
};

// Function to add liked pet's photo to the list on the right side
const petLiked = (petImage) => {
  const lickedContainer = document.getElementById("liked-container");
  const likedImg = document.createElement("img");
  likedImg.src = `${petImage}`;
  likedImg.classList.add("rounded-xl");
  lickedContainer.appendChild(likedImg);
};

// Function to get details of each pet based on id
const petDetails = async (id) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${id}`
  );

  const data = await response.json();
  const pet = data.petData;

  displayModal(pet);
};

// Fucntion to fill modal with pet details and display the modal
const displayModal = (pet) => {
  const modalBox = document.getElementById("modal-content");

  modalBox.innerHTML = `
   <div>
        <img class="rounded-xl h-full w-full object-cover" src="${
          pet.image
        }" alt="Image of pet" />
    </div>
    <div class="space-y-1">
        <h1 class="text-xl font-bold">${pet.pet_name}</h1>
          <div class="md:grid grid-cols-2">
            <p><i class="fa-solid fa-qrcode"></i> Breed: ${
              pet.breed ? pet.breed : "Not Available"
            }</p>
            <p><i class="fa-regular fa-calendar"></i> Hello Birth: ${
              pet.date_of_birth ? pet.date_of_birth : "Not Available"
            }</p>
            <p><i class="fa-solid fa-mercury"></i> Gender: ${
              pet.gender ? pet.gender : "Not Available"
            }</p>
            <p><i class="fa-solid fa-dollar-sign"></i> Price: ${
              pet.price ? pet.price : "Not Available"
            }</p>
            <p><i class="fa-solid fa-mercury"></i> Vaccinated Status: ${
              pet.vaccinated_status ? pet.vaccinated_status : "Not Available"
            }</p>
          </div>
        <hr />
    </div>
    <div class="space-y-4">
          <h2 class="font-bold">Details Information</h2>
          <p>${pet.pet_details}</p>
          <form method="dialog">
            <button class="btn w-full bg-teal-300">Cancel</button>
          </form>
        
    </div>
  `;

  document.getElementById("petModal").showModal();
};

// Function to sort all pets in descending order of price
const sortByPrice = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/peddy/pets"
  );
  const data = await response.json();
  petsArray = data.pets;

  const compareByPrice = (a, b) => b.price - a.price;
  const sortedPets = petsArray.sort(compareByPrice);
  displayAllPets(sortedPets);
};

// Function to display countdown modal upon Adopt button click
const displayAdoptModal = (id) => {
  const displayCount = document.getElementById("count-down");
  let num = 3;
  const clockID = setInterval(() => {
    num--;
    displayCount.innerText = num + 1;
    document.getElementById("adoptionModal").showModal();

    if (num < 0) {
      document.getElementById("adoptionModal").close();
      document.getElementById(`adopt-btn-${id}`).innerText = "Adopted";

      clearInterval(clockID);
    }
  }, 1000);
};

loadCategories();
loadAllPets();
