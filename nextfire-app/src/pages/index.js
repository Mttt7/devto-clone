import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import Loader from '../../components/Loader'

import { useState } from 'react'

import PostFeed from '../../components/PostFeed'
import { firestore, postToJSON, fromMillis } from '../../lib/firebase'

//Max posts to query per page
const LIMIT = 5


export async function getServerSideProps(context){
  const postsQuery = firestore
    .collectionGroup('posts') //grab all posts documents no matter where they are in the tree
    .where('published', '==', true)
    .orderBy('createdAt', 'desc')
    .limit(LIMIT)

  const posts = (await postsQuery.get()).docs.map(postToJSON)

  return{
    props: { posts } //will be passed to the page component as props
  }
}



export default function Home(props) {
  const [posts, setPosts] = useState(props.posts)
  const [loading, setLoading] = useState(false)
  const [postsEnd, setPostsEnd] = useState(false)

  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];

    const cursor = typeof last.createdAt === 'number' ? fromMillis(last.createdAt) : last.createdAt;

    const query = firestore
      .collectionGroup('posts')
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
      .startAfter(cursor)
      .limit(LIMIT);

    const newPosts = (await query.get()).docs.map((doc) => doc.data());

    setPosts(posts.concat(newPosts));
    setLoading(false);

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };

  return (
    <div >
      <PostFeed posts={posts} />
      <div className='centered'>
      {!loading && !postsEnd && <button onClick={getMorePosts}>Load more</button>}

      </div>
      
      <Loader  show={loading}/>

      {postsEnd && 'You have reached the end!'}
    </div>
  )
}
