const reg = document.forms.regForm;

reg.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = Object.fromEntries(new FormData(reg));
  const response = await fetch('/user/registration', {
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
