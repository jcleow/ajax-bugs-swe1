// Function that changes the colour of other buttons back to green whenever a specific button is pressed
/**
 *
 * @param {integer} selectedFeatureButtonIndex References the current index of the feature button clicked on
 */
function deselectOtherFeatures(selectedFeatureButtonIndex) {
  const allFeatureButtons = document.querySelectorAll('.feature');
  // As long as it is not the currently clicked 'features' button, all other features button must be green
  allFeatureButtons.forEach((eachFeatureButton, featureButtonIndex) => {
    if (selectedFeatureButtonIndex !== featureButtonIndex) {
      eachFeatureButton.style.backgroundColor = 'green';
    }
  });
}
