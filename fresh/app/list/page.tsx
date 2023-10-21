'use client';
import Image from 'next/image';
import { useState } from 'react';
interface Product {
  name: string;
  price: number;
}
export default function List() {
  let 상품 = [
    { name: '토마토', price: 40 },
    { name: '파스타', price: 50 },
    { name: '코코넛', price: 60 },
  ];
  let arr: number[] = new Array(상품.length);
  arr.fill(0);
  const [수량, set수량] = useState(arr);

  return (
    <div>
      <h4 className='title'>상품목록</h4>
      {상품.map((e, i) => {
        return (
          <div className='food' key={i}>
            <h4>
              <Image src={require(`@/public/food${i}.png`).default} alt={e.name} placeholder='blur' />
              {e.name} ${e.price}
              <span> {수량[i]} </span>
              <button
                className='btn btn-blue'
                onClick={() => {
                  let copy = [...수량];
                  copy[i]++;
                  set수량(copy);
                }}>
                +
              </button>
              <button
                className='btn btn-blue'
                onClick={() => {
                  let copy = [...수량];
                  copy[i]--;
                  set수량(copy);
                }}>
                -
              </button>
            </h4>
          </div>
        );
      })}
    </div>
  );
}
