const KEY = '8466aee16e1b76bec9120ae39357d373';

const API_LINK = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${KEY}&page=1`;
const IMG_PATH = 'https://image.tmdb.org/t/p/w500';
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?&api_key=${KEY}&query=`;

const main = document.getElementById('section');
const search = document.getElementById('query');
const form = document.getElementById('form');

returnMovies(API_LINK);

function returnMovies(url) {
    fetch(url)
        .then(res => res.json())
        .then(function(data) {
            console.log(data.results);
            data.results.forEach(element => {
                const div_card = document.createElement('div');
                div_card.setAttribute('class', 'card');

                const div_col = document.createElement('div');
                div_col.setAttribute('class', 'column');

                const div_row = document.createElement('div');
                div_row.setAttribute('class', 'row');

                const image = document.createElement('img');
                image.setAttribute('class', 'thumbnail');

                const title = document.createElement('h3');
                title.setAttribute('class', 'title');

                const center = document.createElement('center');

                title.innerHTML = 
                `${element.title} <br> <a href="#" style="color: rgb(196, 71, 25); text-decoration: underline; text-decoration-style: dotted;"> Reviews </a>`;

                image.src = IMG_PATH + element.poster_path;
                center.appendChild(image);
                div_card.appendChild(center);
                div_card.appendChild(title);
                div_col.appendChild(div_card);
                div_row.appendChild(div_col);

                main.appendChild(div_row);

                div_card.addEventListener('click', function(){
                    display(element.id, element.title, element.poster_path);
                });
            });
        });
}

function display(movieid, title, poster_path) {
    const div_card = document.querySelector('.card');
    div_card.style.display = 'block';
    main.style.display = 'none';

    document.querySelector(".title").innerText = title;
    document.querySelector(".thumbnail").src = IMG_PATH + poster_path;

    fetchReview(movieid, title);
}

function fetchReview(movieid, title) {
    fetch(`https://movies-app-vugq.onrender.com/api/${movieid}`)
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                addReview(movieid, title);
            } else if (data.reviews && Array.isArray(data.reviews)) {
                displayreview(data, movieid);
            } else {
                console.log('No reviews found');
            }
        })
        .catch(error => {
            console.error('Error fetching ratings:', error);
        });
}

function displayreview(data, movieid) {
    const reviewSection = document.getElementById("reviewsSection");

    if (Array.isArray(data.reviews)) {
        data.reviews.forEach(review => {
            const reviewCard = document.createElement('div');
            reviewCard.classList.add('reviewCard');

            const movieName = document.createElement('h4');
            movieName.innerText = `Movie: ${review.title}`;
            movieName.style.fontSize = "20px";  
            movieName.style.fontWeight = "bold";  
            movieName.style.color = "#333";  
            movieName.style.marginBottom = "10px";  
            movieName.style.textAlign = "center";  

            const reviewText = document.createElement('p');
            reviewText.innerText = `Review: ${review.review}`;
            reviewText.style.fontSize = "16px";  
            reviewText.style.color = "#555";  
            reviewText.style.lineHeight = "1.6";  
            reviewText.style.marginBottom = "15px"; 
            reviewText.style.padding = "10px";  
            reviewText.style.backgroundColor = "#f9f9f9";  
            reviewText.style.borderRadius = "5px";  
            reviewText.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.1)";

            reviewCard.appendChild(movieName);
            reviewCard.appendChild(reviewText);

            reviewSection.appendChild(reviewCard);
        });
    } else {
        console.error("Expected 'reviews' to be an array but got:", data.reviews);
    }
}


function addReview(movieid, title) {
    const text = prompt('Enter the rating from 1-5:');
    
    if (text && !isNaN(text) && text >= 1 && text <= 5) {
        const data = {
            title: title,
            movieid: movieid,
            review: text
        };

        fetch(`https://movies-app-vugq.onrender.com/api/${movieid}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Rating added:', data);
            alert('Rating added successfully');
            fetchReview(movieid, title);
        })
        .catch(err => {
            console.error('Error adding rating:', err);
        });
    } else {
        alert('Please enter a valid rating between 1 and 5.');
    }
}

function editReview(review,movieid) {
    const text = prompt('Edit your rating and should be in 1-5', review.review);

    if (text && !isNaN(text) && text >= 1 && text <= 5 && text != review.review) {
        fetch(`https://movies-app-vugq.onrender.com/api/${movieid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ review: text }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Rating updated:', data);
            alert('Rating updated successfully!');
            fetchReview(movieid);
        })
        .catch(error => {
            console.error('Error updating rating:', error);
        });
    }
}

function deleteReview(review,movieid) {
    const del = confirm('Are you sure you want to delete this rating?');
    
    if (del) {
        fetch(`https://movies-app-vugq.onrender.com/api/${movieid}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log('Rating deleted:', data);
            alert('Rating deleted successfully!');
            fetchReview(movieid);
        })
        .catch(error => {
            console.error('Error deleting rating:', error);
            alert('There was an error deleting the rating. Please try again.');
        });
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    main.innerHTML = '';
    const searchItem = search.value;

    if (searchItem) {
        returnMovies(SEARCH_API + searchItem);
    }
});
