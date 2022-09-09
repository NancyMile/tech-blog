const loginFormHandler = async (event) => {
  event.preventDefault();
  // Get values
  const name = document.querySelector('#name-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
  //check usename and pass has been passed
  if (name && password) {
    //Post request
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ name, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      // redirect
      document.location.replace('/post');
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector('.login')
  .addEventListener('submit', loginFormHandler);