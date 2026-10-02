import { defineOpenAPIConnection } from 'eve/connections';

const petstore = defineOpenAPIConnection({
    description: 'A connection to the petstore API',
    spec: 'https://petstore.swagger.io/v2/swagger.json',
});

export default petstore;