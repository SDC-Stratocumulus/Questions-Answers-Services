const db = require('../database-mysql/db/index');
const config = require('../config/config');

describe('select from database', () => {
  let connection;

  beforeAll(async () => {
    connection = await new db(config);
    //console.log(connection);
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should insert a doc into collection', async () => {
    expect(
      await connection.query('SELECT * FROM SDC.products WHERE id = 1')
    ).toEqual('Testing');
  });
});
