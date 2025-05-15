# Proyecto de Integración de APIs

## Requisitos
- Node.js 16+
- npm 8+

## Instalar dependencias
- npm install

## Variables de Entorno
- PORT=3000
- JWT_SECRET=tu_super_secreto_aqui
- GITHUB_TOKEN=opcional_personal_access_token

## Ejecución
- Desarrollo: npm start
- Tests: npm test

## Endpoints
- GET /repos/adobe/react-spectrum
- GET /repos/adobe/react-spectrum/issues

Protegidos (requieren JWT)
- POST /nlp/analyze
    Body: { "text": "tu texto aquí" }
    Header: Authorization: Bearer [token]

Autenticación
- POST /auth/login
    Body: { "username": "testuser", "password": "password123" }