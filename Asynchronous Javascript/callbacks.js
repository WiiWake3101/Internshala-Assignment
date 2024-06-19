// Wait for the button to be clicked
document.getElementById('fetchDataBtn').addEventListener('click', () => {
    // Call the function that uses a callback to delay for 5 seconds
    updateDivAfterDelay(5000, () => {
        // After 5 seconds, update the div's text
        document.getElementById('output').innerText = 'Callback executed after 5 seconds';
        // Fetch data from the API and display it
        fetchData(displayData);
    });
});

/**
 * Function to update a div after a delay using a callback
 * @param {number} delay - The delay in milliseconds
 * @param {function} callback - The callback function to execute after the delay
 */
function updateDivAfterDelay(delay, callback) {
    // Use setTimeout to create a delay
    setTimeout(callback, delay);
}