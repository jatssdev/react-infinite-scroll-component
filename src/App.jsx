import { useEffect, useState } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

function App() {
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);

  const fetchProducts = async () => {
    const response = await axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${offset}`);
    const newProducts = response.data.products;
    setProducts([...products, ...newProducts]);
    setOffset(offset + limit);
    if (newProducts.length < limit) {
      setHasMore(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <InfiniteScroll
      dataLength={products.length}
      next={fetchProducts}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <div className="wrapper" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr' }}>
        {products.map((product) => (
          <div className="product">
            <img src={product.thumbnail} alt="" />
            <h2>{product.title}</h2>
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
}

export default App;