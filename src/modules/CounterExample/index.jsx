'use client';
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '@/store/features/counter/slice'
// import { useGetPostsQuery } from '@/services/posts'

export default function CounterExample() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()
  // const { data: posts } = useGetPostsQuery({});
  // console.log('posts', posts)

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  )
}
