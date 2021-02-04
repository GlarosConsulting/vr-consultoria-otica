import IStock from '../interfaces/stocks/IStock';

export default [
  {
    id: '0001',
    product_name: 'Prego',
    min_stock: 1,
    current_stock: 400,
    status: 'Estoque baixo',
  },
  {
    id: '0002',
    product_name: 'Parafuso',
    min_stock: 1,
    current_stock: 1550,
    status: 'Estoque moderado',
  },
  {
    id: '0003',
    product_name: 'Martelo',
    min_stock: 20,
    current_stock: 210,
    status: 'Estoque confortável',
  },
  {
    id: '0004',
    product_name: 'Perna de serra',
    min_stock: 50,
    current_stock: 310,
    status: 'Estoque confortável',
  },
  {
    id: '0005',
    product_name: 'Tubo',
    min_stock: 15,
    current_stock: 10,
    status: 'Estoque baixo',
  },
] as IStock[];
