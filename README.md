# Movies App

A dynamic movie exploration platform where users can **search for movies**, **add, edit, and delete ratings**, and experience a visually appealing UI with movie cards.

## Features
- 🔍 **Search Movies**: Find movies quickly using the search bar.
- ⭐ **Rate Movies**: Add, edit, and delete ratings for your favorite films.
- 🎬 **Visually Appealing UI**: Enjoy a grid of movie cards with a clean and modern design.
- 🔄 **Real-Time Updates**: Seamlessly update ratings and movie details.

## Tech Stack
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (for storing movie and rating data)
- **API**: TMDB API (for fetching movie details)

## Installation

### 1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/movies_app.git
   ```

### 2. Navigate to the project folder:
   ```sh
   cd movies_app
   ```

### Frontend Setup

1. Install frontend dependencies:
   ```sh
   cd frontend
   npm install
   ```

2. Create a `.env` file in the frontend directory to store the TMDB API key:
   ```txt
   REACT_APP_TMDB_API_KEY=your_api_key_here
   ```

3. Start the frontend development server:
   ```sh
   npm start
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```sh
   cd backend
   ```

2. Install backend dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the backend directory to store MongoDB URI:
   ```txt
   MONGODB_URI=your_mongodb_connection_string_here
   ```

4. Start the backend development server:
   ```sh
   npm start
   ```

## Usage
- Use the search bar to find movies.
- Click on a movie card to rate the movie.
- Edit or delete ratings anytime.

## API Endpoints
- `GET /movies`: Fetch all movies and their ratings.
- `POST /ratings`: Add a new rating for a movie.
- `PUT /ratings/:id`: Edit an existing rating.
- `DELETE /ratings/:id`: Delete a rating.

## Contributing
Contributions are welcome! Feel free to fork the repository and submit a pull request.
```
