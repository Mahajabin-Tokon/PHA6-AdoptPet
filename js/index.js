loadCategories = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories"
  );
  const data = await response.json();
  displayCategories(data.categories);
};

const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("category");

  categories.forEach((item) => {
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `   <div
          class="flex justify-center items-center gap-2 font-bold rounded-lg border-2 py-2"
        >
          <img src="${item.category_icon}" alt="Icon of the category" />
          <button id="btn-${item.category_id}">${item.category}</button>
        </div>
    `;
    categoryContainer.append(buttonContainer);
  });
};

loadAllPets = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/peddy/pets"
  );
  const data = await response.json();
  displayAllPets(data.pets);
};

const displayAllPets = (pets) => {
  const cardsConainter = document.getElementById("cards-container");

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
              <p>Breed: ${pet.breed ? pet.breed : "Not Available"}</p>
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
            <div class="flex gap-2 justify-center">
              <button class="btn bg-white border-1 text-teal-800">
                <i class="fa-regular fa-thumbs-up"></i>
              </button>
              <button class="btn bg-white border-1 text-teal-800">Adopt</button>
              <button onclick="petDetails(${
                pet.petId
              })" class="btn bg-white border-1 text-teal-800">
                Details
              </button>
            </div>
          </div>

    `;

    cardsConainter.append(card);
  });
};

petDetails = async (id) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${id}`
  );

  const data = await response.json();
  const pet = data.petData
  console.log(pet.image)

  const modalBox = document.getElementById("modal-content");

  modalBox.innerHTML = `
   <div>
        <img class="rounded-xl h-full w-full object-cover" src="${
        pet.image
        }" alt="Image of pet" />
    </div>
    <div class="space-y-1">
        <h1 class="text-xl font-bold">${pet.pet_name}</h1>
        <p>Breed: ${pet.breed ? pet.breed : "Not Available"}</p>
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

loadCategories();
loadAllPets();
