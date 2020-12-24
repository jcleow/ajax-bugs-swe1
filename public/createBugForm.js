// Make a request for all the items
// Create a button that renders the 'Create a Bug' form
const createBugBtn = document.createElement('button');
createBugBtn.innerHTML = 'Create a Bug';
const createFormContainer = document.querySelector('.createFormContainer');
createFormContainer.appendChild(createBugBtn);

createBugBtn.addEventListener('click', () => {
  // Create a bug form can display or not when 'Create a Bug' button is pressed
  if (document.querySelector('.createBugDiv')) {
    const existingCreateBugForm = document.querySelector('.createBugDiv');
    createFormContainer.removeChild(existingCreateBugForm);
    return;
  }
  // Container for the bug creation input fields
  const createBugForm = document.createElement('div');
  createBugForm.classList.add('createBugDiv');

  const problemLabel = document.createElement('label');
  problemLabel.innerHTML = 'Describe your Problem';
  const problemInput = document.createElement('input');

  const commitLabel = document.createElement('label');
  commitLabel.innerHTML = 'Describe your Commit';
  const commitInput = document.createElement('input');

  const errorTextLabel = document.createElement('label');
  errorTextLabel.innerHTML = 'Describe your Error';
  const errorTextInput = document.createElement('input');

  const submitBtn = document.createElement('button');
  submitBtn.innerHTML = 'Submit';

  const breakLine1 = document.createElement('br');
  const breakLine2 = document.createElement('br');
  const breakLine3 = document.createElement('br');

  createBugForm.appendChild(problemLabel);
  createBugForm.appendChild(problemInput);
  createBugForm.appendChild(breakLine1);

  createBugForm.appendChild(commitLabel);
  createBugForm.appendChild(commitInput);
  createBugForm.appendChild(breakLine2);

  createBugForm.appendChild(errorTextLabel);
  createBugForm.appendChild(errorTextInput);
  createBugForm.appendChild(breakLine3);

  // Append everything inside the createBugDiv form
  createBugForm.appendChild(submitBtn);
  createFormContainer.appendChild(createBugForm);

  // Store the selectedFeatures in this array
  let selectedFeature;
  // Create a div container to store all the features
  const featuresContainer = document.createElement('div');

  // Get all the features
  axios.get('/features')
    .then((response) => {
      console.log(response);
      response.data.forEach((feature, index) => {
        const featureButton = document.createElement('button');
        featureButton.classList.add('feature');
        // Styling and ordering of the feature button
        featureButton.classList.add('col-4');
        featureButton.classList.add('m-2');
        featureButton.innerHTML = feature.name;
        // for capturing the value when selected
        featureButton.value = feature.name;
        // default colour of the button is green
        featureButton.style.backgroundColor = 'green';

        // To be exported

        featureButton.addEventListener('click', () => {
          if (featureButton.style.backgroundColor === 'green') {
            featureButton.style.backgroundColor = 'red';
            // Defined in helper function js
            deselectOtherFeatures(index);
            // push the selected Features into the array
            selectedFeature = featureButton.value;
          } else {
            // Should the user unclick it, remove it from the array and change the colour back to green
            featureButton.style.backgroundColor = 'green';
            selectedFeature = undefined;
          }
        });

        featuresContainer.appendChild(featureButton);
        createFormContainer.appendChild(featuresContainer);
      });
    })
    .catch((error) => {
      console.log(error);
    });

  submitBtn.addEventListener('click', () => {
    const arrayOfInputs = [problemInput, commitInput, errorTextInput, selectedFeature];
    const arrayOfLabels = ['Problem', 'Commit', 'Error'];
    console.log(arrayOfInputs, 'arrayOfInputs');
    // Form Validation
    let isFormValid;
    arrayOfInputs.forEach((input, index) => {
      if (input === selectedFeature && !selectedFeature) {
        isFormValid = outputMissingFieldsMessage(createBugForm, 'Please select a feature');
      }

      if (input !== selectedFeature && input.value === '') {
        isFormValid = outputMissingFieldsMessage(createBugForm, `Please fill in the input at ${arrayOfLabels[index]}`);
      }
    });
    if (isFormValid === false) {
      return;
    }

    const data = {
      problem: arrayOfInputs[0].value,
      commit: arrayOfInputs[1].value,
      errorText: arrayOfInputs[2].value,
      selectedFeature,
    };

    // Make a request to create an bug
    axios.post('/createBug', data)
      .then((response) => {
        // handle success
        console.log(response);
        createFormContainer.removeChild(createBugForm);
        createFormContainer.removeChild(featuresContainer);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  });
});
