// Wait for the button to be clicked
document.getElementById('fetchDataBtn').addEventListener('click', () => {
    const outputDiv = document.getElementById('output'); // Get the output div
    outputDiv.innerText = 'Loading...'; // Display loading message
    // Fetch data using a Promise
    fetchDataWithPromise()
        .then(posts => displayData(posts)) // Display data if resolved
        .catch(error => outputDiv.innerText = error); // Display error if rejected
});

/**
 * Function to fetch data from an API using a Promise
 * @returns {Promise<Array>} - A promise that resolves with an array of posts
 */
function fetchDataWithPromise() {
    return new Promise((resolve, reject) => {
        const url = 'https://dummyjson.com/posts'; // API endpoint
        const timeout = setTimeout(() => reject('Operation timed out'), 5000); // Set timeout for 5 seconds
        
        fetch(url)
            .then(response => response.json()) // Parse JSON response
            .then(data => {
                clearTimeout(timeout); // Clear the timeout
                resolve(data.posts); // Resolve the promise with data
            })
            .catch(error => {
                clearTimeout(timeout); // Clear the timeout
                reject('Error fetching data'); // Reject the promise with error message
            });
    });
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
