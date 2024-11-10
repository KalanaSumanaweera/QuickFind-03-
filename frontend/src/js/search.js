// search.js
// search.js
document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  const searchIcon = document.getElementById('search-icon'); // Add a reference to the search icon

  // Function to fetch search results
  async function performSearch(query) {
    try {
      const response = await fetch(`http://localhost:3000/api/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('Error fetching search results');
      const results = await response.json();
      displaySearchResults(results);
    } catch (error) {
      console.error('Error:', error);
      searchResults.innerHTML = `<p class="text-text-secondary p-4">No results found.</p>`;
    }
  }

  // Function to display the search results
  function displaySearchResults(results) {
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

  // Event listener for search input
  searchInput.addEventListener('input', function () {
    const query = searchInput.value.trim();
    if (query) {
      performSearch(query);
    } else {
      searchResults.classList.add('hidden');
    }
  });

  // Event listener for search icon click
  searchIcon.addEventListener('click', function () {
    const query = searchInput.value.trim();
    if (query) {
      window.location.href = `./searchResult.html?query=${encodeURIComponent(query)}`;
    }
  });
});



// results.js
// results.js
document.addEventListener('DOMContentLoaded', async function () {
  const resultCards = document.getElementById('searchResults');
  const urlParams = new URLSearchParams(window.location.search);
  const serviceId = urlParams.get('q');
  const query = urlParams.get('query');

  if (serviceId) {
    // Fetch and display a specific service
    try {
      const response = await fetch(`http://localhost:3000/api/services/${serviceId}`);
      if (!response.ok) throw new Error('Error fetching service details');
      const service = await response.json();
      displayServiceDetails(service);
    } catch (error) {
      console.error('Error:', error);
      resultCards.innerHTML = `<p class="text-text-secondary p-4">No results found.</p>`;
    }
  } else if (query) {
    // Fetch and display all services related to the search query
    try {
      const response = await fetch(`http://localhost:3000/api/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('Error fetching search results');
      const services = await response.json();
      displayAllResults(services);
    } catch (error) {
      console.error('Error:', error);
      resultCards.innerHTML = `<p class="text-text-secondary p-4">No results found.</p>`;
    }
  } else {
    resultCards.innerHTML = `<p class="text-text-secondary p-4">No results found.</p>`;
  }
});

function displayServiceDetails(service) {
  resultCards.innerHTML = `
    <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex flex-col lg:flex-row">
      <!-- Details here as in your original code -->
    </div>
  `;
}

function displayAllResults(services) {
  resultCards.innerHTML = services.map(service => `
    <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
      <h4 class="font-bold text-primary mb-2">${service.title}</h4>
      <p class="text-text-secondary mb-2">${service.location}</p>
      <p class="text-primary font-semibold">${service.price} LKR</p>
    </div>
  `).join('');
}



async function addFavourite(serviceId) {
  const userId = '0bbf44ea-f93e-4c8f-8b2c-d9c6a37a303d'; // Dynamically retrieve userId

  if (!userId) {
    alert('Please log in to add a favorite');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/api/favourite/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, serviceId })
    });

    if (!response.ok) {
      const responseData = await response.json();
      console.error('Error response:', responseData);
      throw new Error(responseData.message || 'Failed to add favourite');
    }

    const newFavourite = await response.json();
    console.log('Added favourite:', newFavourite);
    alert("Successfully Added to Favourites!");


  } catch (error) {
    console.error('Failed to add favourite:', error);
    alert("Failed to add favourite")
  }
}
