document.addEventListener("DOMContentLoaded", function() {

    function fetchDogImages() {
        const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
        fetch(imgUrl)
            .then(resp => resp.json())
            .then(data => renderDogImages(data.message))
            .catch(error => console.error('Error fetching images:', error));
    }

    function renderDogImages(images) {
        const container = document.getElementById('dog-image-container');
        container.innerHTML = ''; 
        images.forEach(imageUrl => {
            const img = document.createElement('img');
            img.src = imageUrl;
            container.appendChild(img);
        });
    }

    fetchDogImages();

    
    function fetchDogBreeds() {
        const breedUrl = "https://dog.ceo/api/breeds/list/all";
        fetch(breedUrl)
            .then(resp => resp.json())
            .then(data => renderDogBreeds(Object.keys(data.message)))
            .catch(error => console.error('Error fetching breeds:', error));
    }

    function renderDogBreeds(breeds) {
        const ul = document.getElementById('dog-breeds');
        breeds.forEach(breed => {
            const li = document.createElement('li');
            li.textContent = breed;
            ul.appendChild(li);
        });
    }

    fetchDogBreeds();

    
    document.getElementById('dog-breeds').addEventListener('click', function(event) {
        if (event.target.tagName === 'LI') {
            event.target.style.color = 'blue'; 
        }
    });

    
    document.getElementById('breed-dropdown').addEventListener('change', function(event) {
        const selectedLetter = event.target.value.toLowerCase();
        filterDogImages(selectedLetter);
    });

    function filterDogImages(letter) {
        const imgUrl = `https://dog.ceo/api/breeds/list/all`;
        fetch(imgUrl)
            .then(resp => resp.json())
            .then(data => {
                const breeds = Object.keys(data.message);
                const filteredBreeds = breeds.filter(breed => breed.startsWith(letter));
                
                const imgPromises = filteredBreeds.map(breed => {
                    return fetch(`https://dog.ceo/api/breed/${breed}/images/random/1`)
                        .then(resp => resp.json())
                        .then(data => data.message[0]);
                });
                Promise.all(imgPromises)
                    .then(images => renderDogImages(images))
                    .catch(error => console.error('Error fetching images:', error));
            })
            .catch(error => console.error('Error fetching breeds:', error));
    }
});
