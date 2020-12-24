// Retrieve all the bugs in the application
axios.get('/bugs')
  .then((response) => {
    const arrayOfBugData = response.data.bugData;
    console.log(response.data, 'res-data');
    const bugContainer = document.querySelector('.bugList');
    arrayOfBugData.forEach((bug) => {
      const bugDiv = document.createElement('div');
      const problemDiv = document.createElement('div');
      const errorTextDiv = document.createElement('div');
      const commitDiv = document.createElement('div');
      const breakLine = document.createElement('br');
      problemDiv.innerHTML = `Problem: ${bug.problem}`;
      errorTextDiv.innerHTML = `Error: ${bug.errorText}`;
      commitDiv.innerHTML = `Commit: ${bug.commit}`;
      bugDiv.appendChild(problemDiv);
      bugDiv.appendChild(errorTextDiv);
      bugDiv.appendChild(commitDiv);
      bugDiv.appendChild(breakLine);
      bugContainer.appendChild(bugDiv);
    });
    document.body.appendChild(bugContainer);
  })
  .catch((error) => {
    console.log(error);
  });
