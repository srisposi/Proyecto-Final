# Frontend

El proyecto de Front se desarrollo con React y con mui que es un framework de css para darle el estilo y diseño a la página. Además de los componentes básicos construídos para crear el Ecommerce, se crearon los siguientes componentes importantes para el entendimiento del Proyecto de Frontend:

## Components

En la ruta raíz de componetes se encuentran los componentes básicos para la construcción del ecommerce, los cuáles son:

### Componentes Básicos

1. Navbar: Dónde se contruye el menú del proyecto
2. Products: Dónde se construye la lógica en dónde se mostrarán los productos
3. Product: Dónde se construye la lógica que crea las card para cada producto.
4. SignIn: Dónde se consumen los servicios para realizar el SignIn en la aplicación, con su respectivo SignOut
5. SignUp: Dónde se consumen los servicios para realizar el SignUp en la aplicación.

### Chat

En esta parte se encuentra la lógica del chat del lado del cliente. Se encuentra el diseño de las pantallas y el estilado realizado con css.

### CheckOutForm

Tomando de base un templete, se desarrolló la logíca para realizar una pasarela de pago, luego de finalizada la compra del carrito correspondiente. Se accedé a esta parte haciendo click en el Checkout al finalizar la compra

## Pages

En esta parte del archivo encontramos dos carpetas con la siguiente lógica:

### ClientChat

Acá encontramos la lógica de los chat del lado del cliente utilizando la librería de socket.io-client.

### Dashboard

En esta parte encontramos la lógica del chat lado del cliente, en referencia al manjo de las diferentes salas y el detalle del typing cuando un usuario está escribiendo.

## Services

En los servicios del Front se pueden encontrar los fetch que se realizan a la API para traer la información necesaria para realizar el Registro, el Login y el SignOut de la aplicación.
En nuestro caso se resumen estas funciones a dos servicios: 1. ServiceRegister.js 2. ServiceSigIn.js

## .env

Definimos las variables de entorno del Front. Para nuestra aplicación se definieron las siguientes variables:
REACT_APP_API_URL=https://ecommerce-aura-proyecto-final.herokuapp.com
REACT_APP_BACKEND_URL="http://localhost:3001"
Una variable que se utiliza para apuntar al proyecto montado en producción para conectar con la API y una variable que apunta al proyecto en para comunicarse el chat

## Librerías

### dependencias

    * mui
    * axios
    * firebase
    * moongose
    * react
    * react-router-dom
    * socket.io-client

## ¿Qué tengo que tener instalado para correr el proyecto?

```
- `node js versión 14 o superior`
- `npm versión 7 o superior`
```

## Cómo correr el Proyecto desde 0

### Forma 1:

Posicionado en la carpeta raíz se ejecutará el siguiente comando:

- `cd frontend`
  dentro de la carpeta frontend se deberá instalar la carpeta de node modolues de node mediante el siguiente comando:
  `- `npm ci
  Una vez instalado el node_modules, se deberá correr el siguiente comando para correr el proyecto:
  `npm run start`

### Forma 2:

La otra forma de correr el proyecto es mediante la siguiente manera:
run-back:
npm run --prefix ./backend dev
Revisar

## Infraestructura

Se realizó la infraestructura en Vercel. Colocando las variables de entorno en el servidor en la nube.

## Repositorio del Proyecto

https://github.com/srisposi/Proyecto-Final
https://github.com/srisposi/Proyecto-Final-Front

## Demo de la Aplicación

https://proyecto-final-front-psi.vercel.app/
