const loginContainer = document.querySelector('.loginContainer');
// Create all the elements inside loginContainer div for login form
axios.get('/user')
  .then((res) => {
    if (res.data.loggedInUserId) {
      createUserIdAndLogOutBtnDisplay(loginContainer, res);
    } else {
      const loginFormDiv = document.createElement('div');

      const emailLabel = document.createElement('label');
      const emailInput = document.createElement('input');
      emailLabel.innerHTML = 'Email';
      emailInput.placeholder = 'Enter your email';

      const breakLine1 = document.createElement('br');

      const passwordLabel = document.createElement('label');
      const passwordInput = document.createElement('input');
      passwordLabel.innerHTML = 'Password';
      passwordInput.placeholder = 'Enter your password';

      const breakLine2 = document.createElement('br');

      const loginBtn = document.createElement('button');
      loginBtn.innerHTML = 'Login';

      loginFormDiv.appendChild(emailLabel);
      loginFormDiv.appendChild(emailInput);

      loginFormDiv.appendChild(breakLine1);

      loginFormDiv.appendChild(passwordLabel);
      loginFormDiv.appendChild(passwordInput);

      loginFormDiv.appendChild(breakLine2);

      loginFormDiv.appendChild(loginBtn);

      loginContainer.appendChild(loginFormDiv);

      const validateLogin = () => {
        const email = emailInput.value;
        const password = passwordInput.value;

        axios.post('/user/login', { email, password })
          .then((response) => {
            if (response.data.authenticated === true) {
              loginContainer.removeChild(loginFormDiv);

              // Add the display of user id and a logout button
              createUserIdAndLogOutBtnDisplay(loginContainer, response);
            } else {
              const errorMessage = document.createElement('label');
              errorMessage.innerHTML = 'Your email and/or password is incorrect';
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };

      loginBtn.addEventListener('click', validateLogin);
    }
  })

  .catch((error) => { console.log(error); });
