import ProductItem from "./ProductItem";

function ProductList(props) {
  return (
    <ul className="space-y-2">
      {props.products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </ul>
  );
}

export default ProductList;