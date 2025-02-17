React Infinite Scroll Component Tutorial
=====================================

**Overview**

In this tutorial, we will build a simple React application that uses the `react-infinite-scroll-component` library to implement infinite scrolling. We will fetch data from a API and display it in a grid layout, with the ability to load more data as the user scrolls to the bottom of the page.

**Step 1: Install the required libraries**

To start, we need to install the required libraries. Run the following command in your terminal:


**Step 2: Create a new React component**

Create a new React component called `App.js`. This component will render the infinite scroll component.
```markdown
**App.js**

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
  <!-- render products data here -->
</InfiniteScroll>

<div className="wrapper" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr' }}>
  {products.map((product) => (
    <div className="product">
      <img src={product.thumbnail} alt="" />
      <h2>{product.title}</h2>
    </div>
  ))}
</div>