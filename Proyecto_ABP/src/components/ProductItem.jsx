function ProductItem(props) {
  return (
    <li className="border p-2 rounded shadow">
      {props.product.title} - ${props.product.price}
    </li>
  );
}

export default ProductItem;
