<h1 align="center">
  Product Service
</h1>

API para gerenciar produtos com funcionalidades de criação, busca por ID e busca por texto.

## Tecnologias

- Next.js
- TypeScript
- PostgreSQL
- Drizzle ORM
- Jest

## Execução Local

### Pré-requisitos

- Node.js
- Docker e Docker Compose

### 1. Clone o projeto e instale as dependências

```
git clone https://github.com/thiagop90/product-service-challenge.git
cd product-service-challenge
npm install
```

### 2. Configure o banco de dados

Execute o PostgreSQL via Docker:

```
docker-compose up drizzle-db -d
```

### 3. Configure variáveis de ambiente

Crie o arquivo `.env`:

```
POSTGRES_DB="products-api"
POSTGRES_USER="postgres"
POSTGRES_PASSWORD="docker"
DATABASE_URL="postgresql://postgres:docker@localhost:5432/products-api"
```

### 4. Execute migrações e seed

```bash
npm run db:migrate
npm run seed
```

>  O comando seed criará uma categoria padrão com ID `01JWMH3FW1H3NDEK49AQWB8AVB`. Use este ID para criar produtos.

### 5. Inicie o servidor

```bash
npm run dev
```

**Serviço disponível em:** `http://localhost:3000`

### Testes

Para executar os testes unitários:
```
npm test
```

## Execute em Produção

### 1. Clone o projeto

```
git clone https://github.com/thiagop90/product-service-challenge.git
cd product-service-challenge
```

### 2. Configure variáveis de ambiente

Crie o arquivo `.env` para produção:

```
POSTGRES_DB="products-api"
POSTGRES_USER="postgres"
POSTGRES_PASSWORD="docker"
```

### 3. Execute com Docker Compose

```
docker-compose up --build -d
```

## API Endpoints  

Para fazer as requisições HTTP abaixo, foi utilizada a ferramenta [httpie](https://httpie.io):

- POST /api/products
```
http POST :3000/api/products categoryId="01JWMH3FW1H3NDEK49AQWB8AVB" name="Product Test" description="Product Desc" producerName="Producer Name" producerEmail="producer@email.com" cover="https://exemplo.com/img/cover.jpg" thumbnail="https://exemplo.com/img/thumb.jpg" price="999"

HTTP/1.1 201 Created
Content-Type: application/json

{
  "categoryId": "01JWMH3FW1H3NDEK49AQWB8AVB",
  "id": "01JWM5TGPFPC9WDHH36W5ZCWM6",
  "name": "Product Test",
  "description": "Product Desc",
  "producerName": "Producer Name",
  "producerEmail": "producer@email.com",
  "cover": "https://exemplo.com/img/cover.jpg",
  "thumbnail": "https://exemplo.com/img/thumb.jpg",
  "price": "999",
  "updatedAt": "2025-05-31T22:01:30.064Z"
  "createdAt": "2025-05-31T22:01:30.064Z",
}
```

- GET /api/product/{id}
```
http GET :3000/api/products/01JWM5TGPFPC9WDHH36W5ZCWM6
HTTP/1.1 200 OK
Content-Type: application/json

{
  "categoryId": "01JWMH3FW1H3NDEK49AQWB8AVB",
  "id": "01JWM5TGPFPC9WDHH36W5ZCWM6",
  "name": "Product Test",
  "description": "Product Desc",
  "producerName": "Producer Name",
  "producerEmail": "producer@email.com",
  "cover": "https://exemplo.com/img/cover.jpg",
  "thumbnail": "https://exemplo.com/img/thumb.jpg",
  "price": "999",
  "updatedAt": "2025-05-31T22:01:30.064Z"
  "createdAt": "2025-05-31T22:01:30.064Z",
}
```

- GET /api/product?search=?
```
http GET :3000/api/products?search="Product Test"
HTTP/1.1 200 OK
Content-Type: application/json
transfer-encoding: chunked

{
  "count": 1,
  "products": [
    {
      "categoryId": "01JWMH3FW1H3NDEK49AQWB8AVB",
      "id": "01JWM5TGPFPC9WDHH36W5ZCWM6",
      "name": "Product Test",
      "description": "Product Desc",
      "producerName": "Producer Name",
      "producerEmail": "producer@email.com",
      "cover": "https://exemplo.com/img/cover.jpg",
      "thumbnail": "https://exemplo.com/img/thumb.jpg",
      "price": "999",
      "updatedAt": "2025-05-31T22:01:30.064Z"
      "createdAt": "2025-05-31T22:01:30.064Z",
    }
  ]
}
```


