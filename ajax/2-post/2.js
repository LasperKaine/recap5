async function createUser() {
  try {
    const response = await fetch('https://reqres.in/api/users', {
      method: 'POST',
      headers: {
        'x-api-key': 'reqres-free-v1',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Jane Doe',
        job: 'Web Developer'
      })
    });
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error('Error creating user:', err);
  }
}

createUser();