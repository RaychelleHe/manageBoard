// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User1',
    email: 'user1@nextmail.com',
    password: '123456',
    image_url: '/images/delba-de-oliveira.png'
  },
  {
    id: '126eed9c-c90c-4ef6-a4a8-fcf7408d3c66',
    name: 'User2',
    email: 'user2@nextmail.com',
    password: '123456',
    image_url: '/images/delba-de-oliveira.png'
  },
  {
    id: '410544b2-4002-4271-9855-fec4b6a6442a',
    name: 'User3',
    email: 'user3@nextmail.com',
    password: '123456',
    image_url: '/images/delba-de-oliveira.png'
  },
  {
    id: '410544b2-4003-4271-9855-fec4b6a6442a',
    name: 'User4',
    email: 'user4@nextmail.com',
    password: '123456',
    image_url: '/images/delba-de-oliveira.png'
  },
  {
    id: '410544b2-4004-4271-9855-fec4b6a6442a',
    name: 'User5',
    email: 'user5@nextmail.com',
    password: '123456',
    image_url: '/images/delba-de-oliveira.png'
  },
  {
    id: '410544b2-4005-4271-9855-fec4b6a6442a',
    name: 'User6',
    email: 'user6@nextmail.com',
    password: '123456',
    image_url: '/images/delba-de-oliveira.png'
  },
  {
    id: '410544b2-4006-4271-9855-fec4b6a6442a',
    name: 'User7',
    email: 'user7@nextmail.com',
    password: '123456',
    image_url: '/images/delba-de-oliveira.png'
  },
  {
    id: '410544b2-4007-4271-9855-fec4b6a6442a',
    name: 'User8',
    email: 'user8@nextmail.com',
    password: '123456',
    image_url: '/images/delba-de-oliveira.png'
  },
];

const managers = [
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Zounanhe',
    email: 'znh@cityu.com',
    image_url: '/images/delba-de-oliveira.png',
    password: '123456',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Duansuyang',
    email: 'dsy@cityu.com',
    image_url: '/images/lee-robinson.png',
    password: '123456',
  },
  {
    id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
    name: 'Xuehongyu',
    email: 'xhy@cityu.com',
    image_url: '/images/hector-simpson.png',
    password: '123456',
  },
  {
    id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
    name: 'Zoujiaxi',
    email: 'zjx@cityu.com',
    image_url: '/images/steven-tey.png',
    password: '123456',
  },
  {
    id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
    name: 'Lixiaoyun',
    email: 'lxy@cityu.com',
    image_url: '/images/steph-dietz.png',
    password: '123456',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Yangyongze',
    email: 'yyz@cityu.com',
    image_url: '/images/michael-novotny.png',
    password: '123456',
  },
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Fangmingyuan',
    email: 'evil@rabbit.com',
    image_url: '/images/evil-rabbit.png',
    password: '123456',
  },
  // {
  //   id: '126eed9c-c90c-4ef6-a4a8-fcf7408d3c66',
  //   name: 'Emil Kowalski',
  //   email: 'emil@kowalski.com',
  //   image_url: '/images/emil-kowalski.png',
  // },
  // {
  //   id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
  //   name: 'Amy Burns',
  //   email: 'amy@burns.com',
  //   image_url: '/images/amy-burns.png',
  // },
  // {
  //   id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
  //   name: 'Balazs Orban',
  //   email: 'balazs@orban.com',
  //   image_url: '/images/balazs-orban.png',
  // },
];

const toys = [
  {
    name: 'cat climbing frame',
    price: 30,
    date: '2022-12-06',
    image_url: '/images/catCrawler.jng',
    stock:30
  },
  {
    name: 'dog bone',
    price: 40,
    date: '2022-12-06',
    image_url: '/images/bone.jng',
    stock:30
  },
  {
    name: 'toy ball',
    price: 20,
    date: '2022-12-06',
    image_url: '/images/ball.jpg',
    stock:30
  },
  {
    name: 'little yellow duck',
    price: 12,
    date: '2022-12-06',
    image_url: '/images/duck.jpg',
    stock:30
  },
  {
    name: 'scatching board',
    price: 20,
    date: '2022-12-06',
    image_url: '/images/board.jpg',
    stock:30
  }
];

const food = [
  {
    name:"dogFood",
    price:70,
    date:'2022-12-06',
    image_url:'/images/dogFood.jpg',
    stock:30
  }
];

const invoices = [
  {
    customer_id: '410544b2-4001-4271-9855-fec4b6a6442a',
    amount: 15795,
    status: 'pending',
    date: '2022-12-06'
  },
  {
    customer_id: '410544b2-4001-4271-9855-fec4b6a6442a',
    amount: 20348,
    status: 'pending',
    date: '2022-11-14'
  },
  {
    customer_id: '410544b2-4001-4271-9855-fec4b6a6442a',
    amount: 3040,
    status: 'paid',
    date: '2022-10-29'
  },
  {
    customer_id: '410544b2-4001-4271-9855-fec4b6a6442a',
    amount: 44800,
    status: 'paid',
    date: '2023-09-10'
  },
  {
    customer_id: '410544b2-4001-4271-9855-fec4b6a6442a',
    amount: 34577,
    status: 'pending',
    date: '2023-08-05'
  },
  {
    customer_id: '410544b2-4001-4271-9855-fec4b6a6442a',
    amount: 54246,
    status: 'pending',
    date: '2023-07-16'
  },
  {
    customer_id: '410544b2-4001-4271-9855-fec4b6a6442a',
    amount: 666,
    status: 'pending',
    date: '2023-06-27'
  },
  {
    customer_id: '410544b2-4001-4271-9855-fec4b6a6442a',
    amount: 32545,
    status: 'paid',
    date: '2023-06-09'
  },
  {
    customer_id: '410544b2-4001-4271-9855-fec4b6a6442a',
    amount: 1250,
    status: 'paid',
    date: '2023-06-17'
  },
  {
    customer_id: '410544b2-4001-4271-9855-fec4b6a6442a',
    amount: 8546,
    status: 'paid',
    date: '2023-06-07'
  },
  {
    customer_id: '410544b2-4001-4271-9855-fec4b6a6442a',
    amount: 500,
    status: 'paid',
    date: '2023-08-19'
  },
  {
    customer_id: '410544b2-4001-4271-9855-fec4b6a6442a',
    amount: 8945,
    status: 'paid',
    date: '2023-06-03'
  },
  {
    customer_id: '410544b2-4002-4271-9855-fec4b6a6442a',
    amount: 8945,
    status: 'paid',
    date: '2023-06-18'
  },
  {
    customer_id: '410544b2-4001-4271-9855-fec4b6a6442a',
    amount: 8945,
    status: 'paid',
    date: '2023-10-04'
  },
  {
    customer_id: '410544b2-4002-4271-9855-fec4b6a6442a',
    amount: 1000,
    status: 'paid',
    date: '2022-06-05'
  }
];

const shoppingList = [
  {
    invoices_id :2,
    goods_id:1,
    type:"food",
  },
];

const revenue = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Aug', revenue: 3700 },
  { month: 'Sep', revenue: 2500 },
  { month: 'Oct', revenue: 2800 },
  { month: 'Nov', revenue: 3000 },
  { month: 'Dec', revenue: 4800 },
];

module.exports = {
  users,
  managers,
  toys,
  food,
  invoices,
  shoppingList,
  revenue,
};
