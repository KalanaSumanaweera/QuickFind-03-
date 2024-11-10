// search.js
document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  const searchButton = document.getElementById('search-icon');

  // Function to fetch search results
  async function performSearch(query, isFullSearch = false) {
    try {
      const response = await fetch(`http://localhost:3000/api/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('Error fetching search results');
      const results = await response.json();
      
      if (isFullSearch) {
        // Redirect to search results page with query parameter
        window.location.href = `./searchResult.html?query=${encodeURIComponent(query)}`;
      } else {
        displayDropdownResults(results);
      }
    } catch (error) {
      console.error('Error:', error);
      searchResults.innerHTML = `<p class="text-text-secondary p-4">No results found.</p>`;
    }
  }

  // Function to display the dropdown search results
  function displayDropdownResults(results) {
    if (results.length === 0) {
      searchResults.innerHTML = `<p class="text-text-secondary p-4">No results found.</p>`;
      searchResults.classList.add('hidden');
    } else {
      searchResults.innerHTML = results.map(result => `
        <div class="w-full p-4 hover:bg-background transition duration-300 cursor-pointer rounded-lg border-b border-gray-200 last:border-0" data-id="${result.id}">
          <h4 class="font-bold text-primary text-center">${result.title}</h4>
          <p class="text-text-secondary text-center">${result.location}</p>
        </div>
      `).join('');
      searchResults.classList.remove('hidden');

      // Add click event listeners to each result
      document.querySelectorAll('[data-id]').forEach(resultElement => {
        resultElement.addEventListener('click', function () {
          const serviceId = this.getAttribute('data-id');
          window.location.href = `./searchResult.html?q=${encodeURIComponent(serviceId)}`;
        });
      });
    }
  }

  // Event listener for search input (dropdown results)
  searchInput.addEventListener('input', function () {
    const query = searchInput.value.trim();
    if (query) {
      performSearch(query, false);
    } else {
      searchResults.classList.add('hidden');
    }
  });

  // Event listener for search button (full page results)
  searchButton.addEventListener('click', function() {
    const query = searchInput.value.trim();
    if (query) {
      performSearch(query, true);
    }
  });

  // Event listener for Enter key in search input
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      const query = searchInput.value.trim();
      if (query) {
        performSearch(query, true);
      }
    }
  });
});

// searchResult.js
document.addEventListener('DOMContentLoaded', async function () {
  const resultCards = document.getElementById('searchResults');
  const urlParams = new URLSearchParams(window.location.search);
  const serviceId = urlParams.get('q');
  const query = urlParams.get('query');

  if (serviceId) {
    // Display single service result
    try {
      const response = await fetch(`http://localhost:3000/api/services/${serviceId}`);
      if (!response.ok) throw new Error('Error fetching service details');
      const service = await response.json();
      displaySingleResult(service, resultCards);
    } catch (error) {
      console.error('Error:', error);
      resultCards.innerHTML = `<p class="text-text-secondary p-4">No results found.</p>`;
    }
  } else if (query) {
    // Display all search results
    try {
      const response = await fetch(`http://localhost:3000/api/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('Error fetching search results');
      const results = await response.json();
      displayAllResults(results, resultCards);
    } catch (error) {
      console.error('Error:', error);
      resultCards.innerHTML = `<p class="text-text-secondary p-4">No results found.</p>`;
    }
  } else {
    resultCards.innerHTML = `<p class="text-text-secondary p-4">No results found.</p>`;
  }
});

function displaySingleResult(service, container) {
  container.innerHTML = `
    <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex flex-col lg:flex-row">
      <img src="../../../backend/${service.images}" alt="${service.title}" class="w-full h-48 lg:w-48 lg:h-48 object-cover rounded-t-lg lg:rounded-lg mb-4 lg:mb-0 lg:mr-6">
      <div class="flex flex-col justify-between flex-1">
        <div>
          <h4 class="font-bold text-primary mb-2">${service.title}</h4>
          <div class="text-yellow-400 mb-2">
            ${'★'.repeat(Math.floor(service.rating))}${'☆'.repeat(5 - Math.floor(service.rating))}
            <span class="text-text-secondary">(${service.reviews} reviews)</span>
          </div>
          <p class="text-text-secondary mb-2">
            <i class="fas fa-map-marker-alt mr-2"></i>${service.location}
          </p>
          <p class="text-sm text-text-secondary mb-4">${service.description}</p>
          <p class="text-text-secondary mb-2">Category: ${service.Category ? service.Category.name : 'N/A'}</p>
          <p class="text-primary font-semibold mb-4">Price: ${service.price} LKR</p>
        </div>
        <div class="flex lg:flex-row justify-between items-center mt-4 lg:mt-0">
          <a href="./viewProfile.html?serviceId=${encodeURIComponent(service.id)}" class="text-primary hover:text-primary-light transition duration-300 mb-2 lg:mb-0 lg:mr-4">View Profile</a>
          <button class="bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary-dark transition duration-300" onclick="addFavourite('${service.id}')">Add to Favourite</button>
        </div>
      </div>
    </div>
  `;
}

function displayAllResults(results, container) {
  if (results.length === 0) {
    container.innerHTML = `<p class="text-text-secondary p-4">No results found.</p>`;
    return;
  }

  container.innerHTML = results.map(service => `
    <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex flex-col lg:flex-row mb-6">
      <img src="../../../backend/${service.images}" alt="${service.title}" class="w-full h-48 lg:w-48 lg:h-48 object-cover rounded-t-lg lg:rounded-lg mb-4 lg:mb-0 lg:mr-6">
      <div class="flex flex-col justify-between flex-1">
        <div>
          <h4 class="font-bold text-primary mb-2">${service.title}</h4>
          <div class="text-yellow-400 mb-2">
            ${'★'.repeat(Math.floor(service.rating))}${'☆'.repeat(5 - Math.floor(service.rating))}
            <span class="text-text-secondary">(${service.reviews} reviews)</span>
          </div>
          <p class="text-text-secondary mb-2">
            <i class="fas fa-map-marker-alt mr-2"></i>${service.location}
          </p>
          <p class="text-sm text-text-secondary mb-4">${service.description}</p>
          <p class="text-text-secondary mb-2">Category: ${service.Category ? service.Category.name : 'N/A'}</p>
          <p class="text-primary font-semibold mb-4">Price: ${service.price} LKR</p>
        </div>
        <div class="flex lg:flex-row justify-between items-center mt-4 lg:mt-0">
          <a href="./viewProfile.html?serviceId=${encodeURIComponent(service.id)}" class="text-primary hover:text-primary-light transition duration-300 mb-2 lg:mb-0 lg:mr-4">View Profile</a>
          <button class="bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary-dark transition duration-300" onclick="addFavourite('${service.id}')">Add to Favourite</button>
        </div>
      </div>
    </div>
  `).join('');
}