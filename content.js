// Function to check the URL automatically on page load
function checkPhishingURL() {
    const currentURL = window.location.href;
  
    // Send the URL to the background script
    chrome.runtime.sendMessage({ action: "checkPhishing", url: currentURL }, (response) => {
      if (response.error) {
        console.error("Error checking URL:", response.error);
        return;
      }
  
      const phishing_prob = response.result;
      if (phishing_prob == 'bad') {
        alert("Warning: This site may be a phishing attempt!");
      }else {
        console.log("This website seems safe.");
      }
    });
  }
  
  // Run the phishing check when the page loads
  checkPhishingURL();
  