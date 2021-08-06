import { colors } from "@atlaskit/theme";

const received = {
  id: "1",
  name: "RECEIVED ORDERS",
  colors: {
    soft: colors.Y50,
    hard: colors.Y200
  }
};

const selected = {
  id: "2",
  name: "ORDER IN PROGRESS",
  colors: {
    soft: colors.G50,
    hard: colors.G200
  }
};

const ready = {
  name: "ORDER IS READY FOR DELIVERY",
  colors: {
    soft: colors.B50,
    hard: colors.B200
  }
};

const picked = {
  id: "4",
  name: "ORDER PICKED UP",
  colors: {
    soft: colors.P50,
    hard: colors.P200
  }
};

export const authors = [received, selected, ready, picked];

export const quotes = [
  {
    id: '1',
    num: '26',
    order: 'Paratha side Dish (2 Nos), Plain Dosa, Podi Ghee Dosa (1 Nos), Butter Roti (5 Nos)',
    data: 'May 31, 2019 3.39 PM',
    orderno: '45',
    author: received
  },
  {
      id: '2',
      num: '25',
      order: 'Paratha side Dish (2 Nos), Plain Dosa, Podi Ghee Dosa (1 Nos), Butter Roti (5 Nos)',
      data: 'May 29, 2019 10.37 AM',
      orderno: '201',
      author: received
  },
  {
      id: '3',
      num: '24',
      order: 'Paratha side Dish (2 Nos), Plain Dosa, Podi Ghee Dosa (1 Nos), Butter Roti (5 Nos)',
      data: 'May 31, 2019 3.36 PM',
      orderno: '1',
      author: selected
  },
  {
      num: '23',
      id: '4',
      order: 'Paratha side Dish (2 Nos), Plain Dosa, Podi Ghee Dosa (1 Nos), Butter Roti (5 Nos)',
      data: 'May 31, 2019 3.35 PM',
      orderno: '600',
      author: selected
  },
  {
      id: '5',
      num: '27',
      order: 'Paratha side Dish (2 Nos), Plain Dosa, Podi Ghee Dosa (1 Nos), Butter Roti (5 Nos)',
      data: 'May 31, 2019 3.30 PM',
      orderno: '202',
      author: ready
  },
  {
    id: '6',
    num: '27',
    order: 'Paratha side Dish (2 Nos), Plain Dosa, Podi Ghee Dosa (1 Nos), Butter Roti (5 Nos)',
    data: 'May 31, 2019 3.40 PM',
    orderno: '456',
    author: ready
},
{
  id: '7',
  num: '28',
  order: 'Paratha side Dish (2 Nos), Plain Dosa, Podi Ghee Dosa (1 Nos), Butter Roti (5 Nos)',
  data: 'May 31, 2019 3.40 PM',
  orderno: '601',
  author: picked
},
{
  id: '8',
  num: '29',
  order: 'Paratha side Dish (2 Nos), Plain Dosa, Podi Ghee Dosa (1 Nos), Butter Roti (5 Nos)',
  data: 'May 31, 2019 3.40 PM',
  orderno: '450',
  author: picked
}
];

const getByAuthor = (author, items) =>
  items.filter(quote => quote.author === author);

export const authorQuoteMap = authors.reduce(
  (previous, author) => ({
    ...previous,
    [author.name]: getByAuthor(author, quotes)
  }),
  {}
);
