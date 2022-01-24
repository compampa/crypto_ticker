const log = document.forms.loginForm;

log.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = Object.fromEntries(new FormData(log));
  const response = await fetch('/user/login', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(formData),
  });
  if (response.status === 200) {
    window.location.assign('/');
  } else alert('something went wrong');
});
