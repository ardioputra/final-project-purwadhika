import React from 'react';

interface IPrams {
  productId?: string;
}

const Product = ({ params }: { params: IPrams }) => {
  return <div>Product Page</div>;
};

export default Product;
