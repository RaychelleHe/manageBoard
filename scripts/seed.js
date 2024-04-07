const { db } = require('@vercel/postgres');
const {
  invoices,
  revenue,
  users,
  managers,
  food,
  toys,
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        image_url VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, password,image_url)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword},${user.image_url})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedToys(client){
  try{
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS toys (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          price INT NOT NULL,
          date DATE NOT NULL,
          stock INT NOT NULL,
          image_url VARCHAR(255) NOT NULL
        );
      `;
      console.log(`Created "toys" table`);
    // Insert data into the "users" table
    const insertedToys = await Promise.all(
      toys.map(async (toy) => {
        return client.sql`
        INSERT INTO toys (name, price, date,stock,image_url)
        VALUES (${toy.name}, ${toy.price}, ${toy.date},${toy.stock},${toy.image_url})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );
  
    console.log(`Seeded ${insertedToys.length} users`);
    
    return {
      createTable,
      toys: insertedToys,
    };
  }catch(error){
    console.error('Error seeding toys:', error);
    throw error;
  }
}

async function seedFood(client){
try{
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS food (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price INT NOT NULL,
        date DATE NOT NULL,
        stock INT NOT NULL,
        image_url VARCHAR(255) NOT NULL
      );
    `;
    console.log(`Created "food" table`);
  // Insert data into the "food" table
  const insertedFood = await Promise.all(
    food.map(async (food) => {
      return client.sql`
      INSERT INTO food (name, price, date,stock,image_url)
      VALUES (${food.name}, ${food.price}, ${food.date},${food.stock},${food.image_url})
      ON CONFLICT (id) DO NOTHING;
    `;
    }),
  );

  console.log(`Seeded ${insertedFood.length} users`);

  return {
    createTable,
    food: insertedFood,
  };
}catch(error){
  console.error('Error seeding food:', error);
  throw error;
}
}

async function seedInvoices(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "invoices" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS invoices (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    customer_id UUID NOT NULL,
    amount INT NOT NULL,
    status VARCHAR(255) NOT NULL,
    date DATE NOT NULL
  );
`;

    console.log(`Created "invoices" table`);

    // Insert data into the "invoices" table
    const insertedInvoices = await Promise.all(
      invoices.map(
        (invoice) => client.sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedInvoices.length} invoices`);

    return {
      createTable,
      invoices: insertedInvoices,
    };
  } catch (error) {
    console.error('Error seeding invoices:', error);
    throw error;
  }
}

async function seedManagers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "managers" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS managers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        image_url VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "managers" table`);

    // Insert data into the "managers" table
    const insertedManagers = await Promise.all(
      managers.map(
        (manager) => client.sql`
        INSERT INTO managers (id, name, email, image_url)
        VALUES (${manager.id}, ${manager.name}, ${manager.email}, ${manager.image_url})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedManagers.length} managers`);

    return {
      createTable,
      managers: insertedManagers,
    };
  } catch (error) {
    console.error('Error seeding managers:', error);
    throw error;
  }
}

async function seedRevenue(client) {
  try {
    // Create the "revenue" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS revenue (
        month VARCHAR(4) NOT NULL UNIQUE,
        revenue INT NOT NULL
      );
    `;

    console.log(`Created "revenue" table`);

    // Insert data into the "revenue" table
    const insertedRevenue = await Promise.all(
      revenue.map(
        (rev) => client.sql`
        INSERT INTO revenue (month, revenue)
        VALUES (${rev.month}, ${rev.revenue})
        ON CONFLICT (month) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedRevenue.length} revenue`);

    return {
      createTable,
      revenue: insertedRevenue,
    };
  } catch (error) {
    console.error('Error seeding revenue:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedManagers(client);
  await seedFood(client);
  await seedToys(client);
  await seedInvoices(client);
  await seedRevenue(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
