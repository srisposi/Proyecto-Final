async function ServiceRegistrar(firstName, lastName, email, password) {
  console.log("llamaando api", firstName, lastName, email, password);

  const baseURL = process.env.REACT_APP_API_URL;

  return fetch(`${baseURL}/api/usuario/register`, {
    body: JSON.stringify({
      firstName: lastName,
      lastName: firstName,
      email: email,
      password: password,
    }),
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": "PHPSESSID=be7656af4fff8e23d70e1afb110c0594",
    },
    method: "POST",
  })
    .then((response) => {
      if (response.status === 201) return response.json();
      throw new Error("Invalid Request");
    })
    .then((data) => data)
    .catch((error) => {
      console.error(error);
      return "Datos incorrectos";
    });
}

export default ServiceRegistrar;
