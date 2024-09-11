chrome.runtime.onInstalled.addListener(() => {
    console.log("Phishing Link Detector extension installed");
  });
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "checkPhishing") {
      fetch("http://127.0.0.1:5000/predict", {  
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ url: message.url })
      })
      .then(response => response.json())
      .then(data => {
        sendResponse({ result: data.phishing_prob });
      })
      .catch(error => {
        console.error("Error in prediction:", error);
        sendResponse({ error: "Failed to predict." });
      });
      return true;  // Keeps the messaging channel open for async response
    }
  });
  