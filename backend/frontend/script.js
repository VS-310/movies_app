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
    main.style.display = 'none';
    const movieDetails = document.getElementById('movieDetails');
    movieDetails.style.display = 'block';

    document.getElementById("movieTitle").innerHTML = `${title}`;
    document.getElementById("moviePoster").src = IMG_PATH + poster_path;

    fetchReview(movieid, title);
}

function fetchReview(movieid, title) {
    fetch(`https://movies-app-vugq.onrender.com/api/${movieid}`)
        .then(response => response.json())
        .then(data => {
            console.log(data.response);

            if(data.response && data.response.length > 0) {
                data.response.title = title;
                displayReview(data, title, movieid);
            } 
            else {
                addReview(movieid, title);
            }
        })
        .catch(error => {
            console.error('Error fetching ratings:', error);
        });
}

function displayReview(data, title, movieid) {
    const reviewSection = document.getElementById("reviewsSection");
    reviewSection.innerHTML = '';
    
    if (Array.isArray(data.response)) {
        data.response.forEach(review => {
            const reviewCard = document.createElement('div');
            reviewCard.classList.add('reviewCard');

            const movieName = document.createElement('h4'); 

            const reviewText = document.createElement('p');
            reviewText.setAttribute('id', 'disp');
            reviewText.innerText = `Rating: ${review.rating}`;
            reviewText.style.fontSize = "20px"; 
            reviewText.style.textAlign = "center"; 
            reviewText.style.color = "#555";  
            reviewText.style.lineHeight = "1.6";  
            reviewText.style.marginTop = "5px"; 
            reviewText.style.marginBottom = "5px"; 
            reviewText.style.padding = "10px";  
            reviewText.style.backgroundColor = "#f9f9f9";  
            reviewText.style.borderRadius = "5px";  
            reviewText.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.1)";

            const editButton = document.createElement('button');
            editButton.innerText = "Edit";
            editButton.style.padding = "12px 24px";  
            editButton.style.backgroundColor = "green"; 
            editButton.style.color = "white";
            editButton.style.border = "none";
            editButton.style.borderRadius = "8px";  
            editButton.style.cursor = "pointer";
            editButton.style.fontSize = "16px";  
            editButton.style.marginTop = "10px";  
            editButton.style.marginRight = "10px";  
            editButton.onmouseover = function() {
                editButton.style.backgroundColor = "#45a049";  
            };
            editButton.onmouseout = function() {
                editButton.style.backgroundColor = "green";  
            };
            editButton.onclick = () => editReview(review, title, movieid);

            const deleteButton = document.createElement('button');
            deleteButton.innerText = "Delete";
            deleteButton.style.padding = "12px 24px";
            deleteButton.style.backgroundColor = "red";  
            deleteButton.style.color = "white";
            deleteButton.style.border = "none";
            deleteButton.style.borderRadius = "8px";  
            deleteButton.style.cursor = "pointer";
            deleteButton.style.fontSize = "16px";  
            deleteButton.style.marginTop = "10px";  
            deleteButton.style.marginRight = "10px"; 
            deleteButton.onmouseover = function() {
                deleteButton.style.backgroundColor = "rgb(213, 66, 43)";  
            };
            deleteButton.onmouseout = function() {
                deleteButton.style.backgroundColor = "red"; 
            };

            deleteButton.onclick = () => deleteReview(review, title, movieid);
            
            const backButton = document.createElement('button');
            backButton.innerText = 'Back to Movies';
            backButton.style.padding = "12px 24px";
            backButton.style.backgroundColor = "#C44719";
            backButton.style.color = "white";
            backButton.style.border = "none";
            backButton.style.borderRadius = "8px";  
            backButton.style.cursor = "pointer";
            backButton.style.fontSize = "16px";  
            backButton.style.marginTop = "10px";  
            backButton.style.marginRight = "10px"; 

            backButton.onclick = () => {
                main.style.display = 'block';
                movieDetails.style.display = 'none';
            };

            reviewCard.appendChild(movieName);
            reviewCard.appendChild(reviewText);
            reviewCard.appendChild(editButton);
            reviewCard.appendChild(deleteButton);
            reviewCard.appendChild(backButton);

            reviewSection.appendChild(reviewCard);
        });
    } else {
        console.error("Expected 'reviews' to be an array but got:", data.response);
    }
}

function addReview(movieid, title) {
    const text = prompt('Enter the rating from 1-5:');
    if (text && !isNaN(text) && text >= 1 && text <= 5) {
        const data = {
            review: text,
        };

        fetch(`https://movies-app-vugq.onrender.com/api/${movieid}/${title}`, {
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
            fetchReview(movieid,title);
        })
        .catch(err => {
            console.error('Error adding rating:', err);
        });
    } else {
        alert('Please enter a valid rating between 1 and 5.');
    }
}

function editReview(review, title, movieid) {
    const text = prompt('Edit your rating and should be in 1-5', review.rating);
    console.log('User input:', text);

    if (text && !isNaN(text) && text >= 1 && text <= 5 && text != review.rating) {
        const data = {
            rating: text,
        };
        console.log('Sending data:', data);

        fetch(`https://movies-app-vugq.onrender.com/api/${movieid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(updatedData => {
                console.log('Updated Rating:', updatedData);
                alert('Rating updated successfully!');
                fetchReview(movieid,title);
            })
            .catch(error => {
                console.error('Error updating rating:', error);
            });
    } else {
        console.log('Invalid or no change in rating');
    }
}


function deleteReview(review, title, movieid) {
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
                const nothing = document.getElementById('disp').innerText = `Rating to be given`;
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
