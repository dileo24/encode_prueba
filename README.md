# Prueba técnica Encode

Prueba técnica para ENCODE SA realizada con Node.js, Express, GraphQL, Apollo Server y MongoDB.

## Requisitos Previos

Tener instalado:

- [Node.js] (versión 20 o superior)
- [Docker]
- [Docker Compose]

## Instalación

1.  **Clonar el repositorio**:

    git clone https://github.com/dileo24/encode_prueba.git

2.  **Abrir proyecto e instalar dependencias**:

    npm install

3.  **Crear archivo .env**:

    MONGO_URI=mongodb://mongo/encode
    PORT=3000
    JWT_SECRET=textoindescifrablehola1234

4.  **Ejecutar Docker**:
    En la terminar:

        docker-compose build
        docker-compose up

5.  **Ejecutar Docker**:
    Cuando el proyecto esté corriendo, acceder a la interfaz de GraohQL con
    http://localhost:5000/graphql
