# FilmVault

A lightweight React (Vite) app to browse movies, explore genres, and curate a personal watchlist. Built for fast development with Vite and styled using Tailwind CSS.

## Features
- Browse movie listings with a clean UI (`Banner`, `Movies`, `Movie`).
- Genre filtering via `utility/genre.js`.
- Add/remove items in a persistent watchlist (`WatchList`).
- Pagination for large lists (`Pagination`).
- Responsive navigation (`Navbar`).

## Tech Stack
- React + Vite
- Tailwind CSS
- Axios (data fetching)
- React Router

## Getting Started
Ensure you have a recent Node.js LTS and npm installed.

```bash
# install dependencies
npm install

# start dev server (Vite)
npm run dev

# production build
npm run build

# preview local production build
npm run preview

# lint the project
npm run lint
```

## Project Structure
```
FilmVault/
	eslint.config.js
	index.html
	package.json
	README.md
	vite.config.js
	src/
		App.css
		App.jsx
		index.css
		main.jsx
		Assets/
		Components/
			Banner.jsx
			Movie.jsx
			Movies.jsx
			Navbar.jsx
			Pagination.jsx
			WatchList.jsx
		utility/
			genre.js
```

## Configuration
- If an external API is used, add keys/endpoints in a safe location and avoid committing secrets.
- Tailwind CSS is included; customize styles in `src/App.css`, `src/index.css`, or via Tailwind layers.

## Development Notes
- Use `axios` for HTTP calls; handle errors and loading states in components.
- Keep components focused and stateless where possible; lift state to parents when sharing data.
- Persist the watchlist (e.g., `localStorage`) for a better UX.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
No license specified. Add a LICENSE file if you plan to share or open-source this project.

