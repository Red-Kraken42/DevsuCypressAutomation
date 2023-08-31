# DevsuCypressAutomation

## Instrucciones para Descargar y Ejecutar un Proyecto de cypress

Estas son las instrucciones para descargar y ejecutar el proyecto DEVSUCYPRESSAUTOMATION de cypress en tu máquina local.

# Requisitos Previos

Asegúrate de tener lo siguiente instalado en tu sistema:

- Node.js: (https://nodejs.org/).
- Git: (https://git-scm.com/).

# Paso 1: Clonar el Repositorio

Abre tu terminal y ejecuta el siguiente comando para clonar el repositorio de GitHub:

    git clone https://github.com/Red-Kraken42/DevsuCypressAutomation.git

# Paso 2: Navegar al Directorio del Proyecto

Ingresa al directorio del proyecto utilizando el siguiente comando:

    cd tu-proyecto

# Paso 3: Instalar las Dependencias

Ejecuta el siguiente comando para instalar las dependencias del proyecto:

npm install

Este comando instalará todas las bibliotecas y módulos necesarios para ejecutar el proyecto.

# Paso 4: Ejecutar las Pruebas

Ahora puedes ejecutar las pruebas del proyecto de cypress utilizando el siguiente comando:

    npx cypress run
o puedes ejecutar algun script del package.json:
    Para abrir la interfaz de usuario de Cypress en un navegador Chrome: 
        npm run cy:open
    Para ejecutar solamente las pruebas api:
        npm run cy:api
    Para ejecutar solamente la prueba E2E:
        npm run cy:e2e
    
Esto iniciará las pruebas automatizadas según lo configurado en cypress.config.js

### Paso 5: Ver los Resultados

Después de ejecutar las pruebas, podrás ver los resultados en la carpeta: cypress\results abriendo el archivo: mochawesome.html  
o ejecutando el comando: 
    start cypress/results/mochawesome.html