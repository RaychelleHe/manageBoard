import { sql } from '@vercel/postgres';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  User,
  Revenue,
} from './definitions';
import { formatCurrency } from './utils';
import axios from 'axios';

export async function fetchRevenue() {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  try {
    const {data} = await axios.get( `http://localhost:9876/revenue/readAllRevenue.php`);
  } catch (error) {
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  try {
    // const data = await sql<LatestInvoiceRaw>`
      // SELECT invoices.amount, users.name, users.image_url, users.email, invoices.id
      // FROM invoices
      // JOIN users ON invoices.customer_id = users.id
      // ORDER BY invoices.date DESC
      // LIMIT 5`;

    // const latestInvoices = data.rows.map((invoice) => ({
    //   ...invoice,
    //   amount: formatCurrency(invoice.amount),
    // }));
    const {data} = await axios.get(`http://localhost:9876/invoices/fetchLatestInvoices.php`);
    console.log(data)
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = await axios.get(`http://localhost:9876/invoices/countInvoice.php`);
    const customerCountPromise = await axios.get(`http://localhost:9876/users/countUsers.php`);
    const invoiceStatusPromise = await axios.get(`http://localhost:9876/invoices/countStatus.php`);

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    // console.log(invoiceCountPromise);
    // console.log(customerCountPromise);
    const numberOfInvoices = Number(data[0].data.count ?? '0');
    const numberOfCustomers = Number(data[1].data.count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2].data.paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2].data.pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;

export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    // const invoices = await sql<InvoicesTable>`
    //   SELECT
    //     invoices.id,
    //     invoices.amount,
    //     invoices.date,
    //     invoices.status,
    //     users.name,
    //     users.email,
    //     users.image_url
    //   FROM invoices
    //   JOIN users ON invoices.customer_id = users.id
    //   WHERE
    //     users.name ILIKE ${`%${query}%`} OR
    //     users.email ILIKE ${`%${query}%`} OR
    //     invoices.amount::text ILIKE ${`%${query}%`} OR
    //     invoices.date::text ILIKE ${`%${query}%`} OR
    //     invoices.status ILIKE ${`%${query}%`}
    //   ORDER BY invoices.date DESC
    //   LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    // `;
    
    if (query == null) {
      query = 'user';
    }
    const invoices = await axios.get(`http://localhost:9876/invoices/fetchFilteredInvoices.php?query=${query}&offset=${offset}&ITEMS_PER_PAGE=${ITEMS_PER_PAGE}`);
    return invoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
  //   const count = await sql`SELECT COUNT(*) as 'count'
  //   FROM invoices
  //   JOIN users ON invoices.customer_id = users.id
  //   WHERE
  //     users.name ILIKE ${`%${query}%`} OR
  //     users.email ILIKE ${`%${query}%`} OR
  //     invoices.amount::text ILIKE ${`%${query}%`} OR
  //     invoices.date::text ILIKE ${`%${query}%`} OR
  //     invoices.status ILIKE ${`%${query}%`}
  // `;
    if (query == null ) {
      query = 'user'
    }
    console.log('test')
    const cnt = await axios.get(`http://localhost:9876/invoices/fetchInvoicesPages.php?query=${query}`);
    console.log(cnt.data)
    

    const totalPages = Math.ceil(Number(cnt.data.count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  try {
    // const data = await sql<CustomerField>`
    //   SELECT
    //     id,
    //     name
    //   FROM users
    //   ORDER BY name ASC
    // `;
    const data = await axios.get(`http://localhost:9876/users/fetchCustomers.php`)
    const customers = data.data;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    // const data = await sql<CustomersTableType>`
		// SELECT
    // users.id,
    // users.name,
    // users.email,
    // users.image_url,
		//   COUNT(invoices.id) AS total_invoices,
		//   SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		//   SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		// FROM customers
		// LEFT JOIN invoices ON users.id = invoices.customer_id
		// WHERE
    // users.name ILIKE ${`%${query}%`} OR
    // users.email ILIKE ${`%${query}%`}
		// GROUP BY users.id, users.name, users.email, users.image_url
		// ORDER BY users.name ASC
	  // `;
    const {data} = await axios.get(`http://localhost:9876/users/fetchLatestInvoices.php?query=${query}`);
    const customers = data.data.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function getUser(email: string) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
