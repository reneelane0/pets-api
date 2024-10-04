const express = require('express');
const app = express();
const port = 3000;

// Array of pet names
const names = [
    "Buddy", "Max", "Charlie", "Bella", "Lucy", "Daisy",
    "Bailey", "Molly", "Rocky", "Sadie", "Coco", "Zoe",
    "Lola", "Teddy", "Leo", "Oliver", "Simba", "Gizmo",
    "Chester", "Cleo", "Nala", "Penny", "Shadow", "Rusty"
];

// Function to generate random pet data
const getRandomPet = (id) => {
    const dogBreeds = [
        { breed: "Golden Retriever", adultImages: ["golden_retriever_adult_1.jpg", "golden_retriever_adult_2.jpg"], puppyImages: ["golden_retriever_puppy_1.jpg", "golden_retriever_puppy_2.jpg"] },
        { breed: "Labrador", adultImages: ["labrador_adult_1.jpg", "labrador_adult_2.jpg"], puppyImages: ["labrador_puppy_1.jpg", "labrador_puppy_2.jpg"] },
        { breed: "Bulldog", adultImages: ["bulldog_adult_1.jpg", "bulldog_adult_2.jpg"], puppyImages: ["bulldog_puppy_1.jpg", "bulldog_puppy_2.jpg"] },
        { breed: "Beagle", adultImages: ["beagle_adult_1.jpg", "beagle_adult_2.jpg"], puppyImages: ["beagle_puppy_1.jpg", "beagle_puppy_2.jpg"] },
        { breed: "Boxer", adultImages: ["boxer_adult_1.jpg", "boxer_adult_2.jpg"], puppyImages: ["boxer_puppy_1.jpg", "boxer_puppy_2.jpg"] },
        { breed: "Husky", adultImages: ["husky_adult_1.jpg", "husky_adult_2.jpg"], puppyImages: ["husky_puppy_1.jpg", "husky_puppy_2.jpg"] },
        { breed: "Pitbull", adultImages: ["pitbull_adult_1.jpg", "pitbull_adult_2.jpg"], puppyImages: ["pitbull_puppy_1.jpg", "pitbull_puppy_2.jpg"] },
        { breed: "Mixed", adultImages: ["mixed_dog_adult_1.jpg", "mixed_dog_adult_2.jpg"], puppyImages: ["mixed_dog_puppy_1.jpg", "mixed_dog_puppy_2.jpg"] }
    ];
    
    const catBreeds = [
        { breed: "Tabby", adultImages: ["tabby_adult_1.jpg", "tabby_adult_2.jpg"], kittenImages: ["tabby_kitten_1.jpg", "tabby_kitten_2.jpg"] },
        { breed: "Calico", adultImages: ["calico_adult_1.jpg", "calico_adult_2.jpg"], kittenImages: ["calico_kitten_1.jpg", "calico_kitten_2.jpg"] },
        { breed: "Ginger", adultImages: ["ginger_adult_1.jpg", "ginger_adult_2.jpg"], kittenImages: ["ginger_kitten_1.jpg", "ginger_kitten_2.jpg"] },
        { breed: "Siamese", adultImages: ["siamese_adult_1.jpg", "siamese_adult_2.jpg"], kittenImages: ["siamese_kitten_1.jpg", "siamese_kitten_2.jpg"] },
        { breed: "Persian", adultImages: ["persian_adult_1.jpg", "persian_adult_2.jpg"], kittenImages: ["persian_kitten_1.jpg", "persian_kitten_2.jpg"] },
        { breed: "Mixed", adultImages: ["mixed_cat_adult_1.jpg", "mixed_cat_adult_2.jpg"], kittenImages: ["mixed_cat_kitten_1.jpg", "mixed_cat_kitten_2.jpg"] }
    ];

    const cities = ["Halifax", "Fredericton", "Charlottetown", "St. John", "Moncton"];
    
    const descriptors = ["energetic", "shy", "outgoing", "friendly", "mellow", "active", "sweet", "loving", "anxious"];
    const dogActivities = ["squeaky toys", "playing fetch", "going on walks", "cuddling"];
    const catActivities = ["cuddling", "playing", "using scratching posts", "sunbathing", "exploring"];

    const species = Math.random() > 0.5 ? "dog" : "cat";  // Randomly select species

    const ageInMonths = Math.floor(Math.random() * 204) + 2;  // Age between 2 months and 17 years
    const age = ageInMonths < 12 ? `${ageInMonths} months` : `${Math.floor(ageInMonths / 12)} years`;
    const ageGroup = ageInMonths <= 12 ? 'puppy/kitten' : 'adult';

    // Randomly select breed based on species
    let selectedBreed, imageUrl;
    if (species === "dog") {
        selectedBreed = dogBreeds[Math.floor(Math.random() * dogBreeds.length)];
        imageUrl = ageGroup === 'puppy/kitten'
            ? `http://example.com/images/${selectedBreed.puppyImages[Math.floor(Math.random() * selectedBreed.puppyImages.length)]}`
            : `http://example.com/images/${selectedBreed.adultImages[Math.floor(Math.random() * selectedBreed.adultImages.length)]}`;
    } else {
        selectedBreed = catBreeds[Math.floor(Math.random() * catBreeds.length)];
        imageUrl = ageGroup === 'puppy/kitten'
            ? `http://example.com/images/${selectedBreed.kittenImages[Math.floor(Math.random() * selectedBreed.kittenImages.length)]}`
            : `http://example.com/images/${selectedBreed.adultImages[Math.floor(Math.random() * selectedBreed.adultImages.length)]}`;
    }

    // Randomly select descriptor and activity based on species
    const descriptor = descriptors[Math.floor(Math.random() * descriptors.length)];
    const activity = species === "dog" 
        ? dogActivities[Math.floor(Math.random() * dogActivities.length)]
        : catActivities[Math.floor(Math.random() * catActivities.length)];

    const description = `${names[Math.floor(Math.random() * names.length)]} is a lovely ${species} who is ${descriptor} and loves ${activity}.`;

    return {
        id,
        name: names[Math.floor(Math.random() * names.length)],
        species,
        sex: Math.random() > 0.5 ? "male" : "female",
        breed: selectedBreed.breed,
        age,
        ageGroup,  // Either 'puppy/kitten' or 'adult'
        image_url: imageUrl,  // Selected image based on age group
        neuteredStatus: Math.random() > 0.5,
        location: cities[Math.floor(Math.random() * cities.length)],
        adoptionFee: species === "dog" ? (ageInMonths < 12 ? 150 : 100) : (ageInMonths < 12 ? 125 : 75),
        description,
        vaccinationStatus: Math.random() > 0.5 ? "yes" : "no"
    };    
};

// Populate an array with 100 random pets
const pets = Array.from({ length: 100 }, (_, index) => getRandomPet(index + 1));

// Set up endpoint to get all pets
app.get('/pets/all', (req, res) => {
    res.json(pets);
});

// Start server
app.listen(port, () => {
    console.log(`Pet API listening at http://localhost:${port}`);
});
