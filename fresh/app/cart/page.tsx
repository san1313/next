export default function Cart() {
  const data = ['토마토', '파스타'];

  return (
    <div>
      <h4 className='title'>Cart</h4>
      <CartItem data={data[0]} />
      <CartItem />
      <CartItem />
      <CartItem />
    </div>
  );
}

function CartItem({ data }: { data?: string }) {
  return (
    <div className='cart-item'>
      <p>{data}</p>
      <p>$40</p>
      <p>1개</p>
    </div>
  );
}
