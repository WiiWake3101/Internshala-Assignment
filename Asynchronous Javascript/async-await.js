// Wait for the button to be clicked
document.getElementById('fetchDataBtn').addEventListener('click', async () => {
    const outputDiv = document.getElementById('output'); // Get the output div
    outputDiv.innerText = 'Loading...'; // Display loading message
    try {
        const posts = await fetchDataAsync(); // Fetch data using async/await
        displayData(posts); // Display data if successful
    } catch (error) {
        outputDiv.innerText = error; // Display error if failed
    }
});

/**
 * Async function to fetch data from an API
 * @returns {Promise<Array>} - A promise that resolves with an array of posts
 */
async function fetchDataAsync() {
    const url = 'https://dummyjson.com/posts'; // API endpoint
    const controller = new AbortController(); // Create an AbortController
    const signal = controller.signal; // Get the signal from the controller
    
    const timeout = setTimeout(() => controller.abort(), 5000); // Set timeout for 5 seconds
    
    try {
        const response = await fetch(url, { signal }); // Fetch data with signal
        clearTimeout(timeout); // Clear the timeout
        if (!response.ok) throw new Error('Error fetching data'); // Check response status
        const data = await response.json(); // Parse JSON response
        return data.posts; // Return the data
    } catch (error) {
        clearTimeout(timeout); // Clear the timeout
        throw error.name === 'AbortError' ? 'Operation timed out' : 'Error fetching data'; // Handle errors
    }
}

/**
 * Function to display fetched data in the output div
 * @param {Array} posts - Array of post objects
 */
function displayData(posts) {
    const outputDiv = document.getElementById('output'); // Get the output div
    outputDiv.innerHTML = '<h3>Posts:</h3>'; // Set header
    const ul = document.createElement('ul'); // Create a list
    posts.forEach(post => {
        const li = document.createElement('li'); // Create list item for each post
        li.textContent = post.title; // Set the text of the list item
        ul.appendChild(li); // Add the list item to the list
    });
    outputDiv.appendChild(ul); // Add the list to the output div
}