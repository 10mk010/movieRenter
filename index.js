document.addEventListener("DOMContentLoaded", loadMovies);

function addMovie() {
    let title = document.getElementById("title").value;
    let price = document.getElementById("price").value;
    let category = document.getElementById("category").value;
    let rating = parseFloat(document.getElementById("rating").value);
    let image = document.getElementById("image").value;

    if (!title || !price || !category || isNaN(rating) || !image) {
        alert("Užpildykite visus laukus!");
        return;
    }

    let movies = JSON.parse(localStorage.getItem("movies")) || [];
    movies.push({ title, price, category, rating, image, ratings: [rating] });
    localStorage.setItem("movies", JSON.stringify(movies));

    loadMovies();
}

function loadMovies(filter = "all", sortBy = null) {
    let movies = JSON.parse(localStorage.getItem("movies")) || [];
    
    if (filter !== "all") {
        movies = movies.filter(movie => movie.category === filter);
    }

    if (sortBy) {
        movies.sort((a, b) => a[sortBy] > b[sortBy] ? 1 : -1);
    }

    let movieContainer = document.getElementById("movie-list");
    movieContainer.innerHTML = ""; 

    movies.forEach((movie, index) => {
        let avgRating = (movie.ratings.reduce((a, b) => a + b, 0) / movie.ratings.length).toFixed(2);

        let movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");

        let img = document.createElement("img");
        img.src = movie.image;
        img.alt = movie.title;

        let title = document.createElement("h3");
        title.textContent = movie.title;

        let price = document.createElement("p");
        price.textContent = `Kaina: ${movie.price}€`;

        let category = document.createElement("p");
        category.textContent = `Kategorija: ${movie.category}`;

        let ratingBadge = document.createElement("p");
        ratingBadge.classList.add("rating-badge");
        ratingBadge.textContent = `Įvertinimas: ${avgRating}`;

        let rateInput = document.createElement("input");
        rateInput.type = "number";
        rateInput.min = "1";
        rateInput.max = "10";
        rateInput.step = "0.01";
        rateInput.placeholder = "Įvertinti";
        rateInput.id = `rate-${index}`;

        let rateButton = document.createElement("button");
        rateButton.textContent = "Įvertinti";
        rateButton.addEventListener("click", () => rateMovie(index));

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Ištrinti";
        deleteButton.style.background = "#dc3545";
        deleteButton.addEventListener("click", () => deleteMovie(index));

        movieCard.appendChild(img);
        movieCard.appendChild(title);
        movieCard.appendChild(price);
        movieCard.appendChild(category);
        movieCard.appendChild(ratingBadge);
        movieCard.appendChild(rateInput);
        movieCard.appendChild(rateButton);
        movieCard.appendChild(deleteButton);

        movieContainer.appendChild(movieCard);
    });
}

function deleteMovie(index) {
    let movies = JSON.parse(localStorage.getItem("movies")) || [];
    movies.splice(index, 1);
    localStorage.setItem("movies", JSON.stringify(movies));
    loadMovies();
}

function rateMovie(index) {
    let movies = JSON.parse(localStorage.getItem("movies")) || [];
    let ratingInput = document.getElementById(`rate-${index}`).value;
    let rating = parseFloat(ratingInput);

    if (isNaN(rating)) {
        alert("Įvertinimas turi būti tarp 1 ir 10!");
        return;
    }

    movies[index].ratings.push(rating);
    localStorage.setItem("movies", JSON.stringify(movies));
    loadMovies();
}

function filterMovies() {
    let filter = document.getElementById("filter").value;
    loadMovies(filter);
}

function sortMovies(type) {
    let filter = document.getElementById("filter").value;
    loadMovies(filter, type);
}

document.addEventListener("DOMContentLoaded", function () {
    loadMovies(); // Load movies from localStorage when page loads
});

// PRIMINIMAS: change background-color and border of ivetinimas cell depending on rating value if rating = 1 more red if rating = 10 more green

