const API = 'https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants';
const MODAL = document.getElementById('modal');

async function fetchRestaurants() {
  try {
    const res = await fetch(API);
    if (!res.ok) throw new Error('Failed to fetch restaurants');
    const restaurants = await res.json();
    renderList(restaurants);
  } catch (err) {
    document.getElementById('restaurant-list').textContent = err;
  }
}

function renderList(restaurants) {
  const target = document.getElementById('restaurant-list');
  target.innerHTML = '';
  restaurants.forEach(r => {
    const btn = document.createElement('button');
    btn.textContent = `${r.name} (${r.address}, ${r.city})`;
    btn.onclick = () => showModal(r);
    target.appendChild(btn);
  });
}

async function showModal(restaurant) {
  MODAL.innerHTML = 'Loading...';
  MODAL.classList.add('active');
  try {
    const menuRes = await fetch(
      `https://media2.edu.metropolia.fi/restaurant/api/v1/menus/${restaurant._id}`
    );
    if (!menuRes.ok) throw new Error('Menu fetch failed');
    const menu = await menuRes.json();
    MODAL.innerHTML = `
      <h2>${restaurant.name}</h2>
      <p>${restaurant.address}, ${restaurant.city}</p>
      <strong>Menu today:</strong>
      <ul>
        ${
          menu.courses && menu.courses.length
            ? menu.courses.map(c => `<li>${c.name}</li>`).join('')
            : '<li>No menu today</li>'
        }
      </ul>
      <button onclick="document.getElementById('modal').classList.remove('active')">Close</button>
    `;
  } catch (err) {
    MODAL.innerHTML =
      `<strong>Error loading menu:</strong> ${err}<br>
      <button onclick="document.getElementById('modal').classList.remove('active')">Close</button>`;
  }
}

fetchRestaurants();