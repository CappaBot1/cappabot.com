console.log("Main.js is running!");

// Get the test container
const testContainer = document.getElementById("test-container");

// If the test container exist on this page, set the width and height
if (testContainer) {
    ratio = 16/9;
    width = testContainer.offsetWidth;
    height = width/ratio;
}