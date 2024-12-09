console.log("Main.js is running!");

const testContainer = document.getElementById("test-container");

if (testContainer) {
    ratio = 16/9;
    width = testContainer.offsetWidth;
    height = width/ratio;
}