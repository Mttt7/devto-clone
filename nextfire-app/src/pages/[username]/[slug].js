import PostContent from "../../../components/PostContent"
import { firestore, getUserWithUsername, postToJSON } from "../../../lib/firebase"
import { useDocumentData } from "react-firebase-hooks/firestore";
import AuthCheck from "../../../components/AuthCheck";
import HeartButton from "../../../components/HeartButton";
import Link from "next/link";
// import  styles from '../../styles'

export async function getStaticProps({ params }){ //fetch data on the build time
  const {username, slug} = params
  const userDoc = await getUserWithUsername(username)

  let post
  let path

  if (userDoc){
    const postRef = userDoc.ref.collection('posts').doc(slug)
    post = postToJSON(await postRef.get())

    path = postRef.path
  }

  return{
    props: { post,path},
    revalidate: 5000,
  }
}

export async function getStaticPaths(){

  const snapshot = await firestore.collectionGroup('posts').get()

  const paths = snapshot.docs.map((doc) => {
    const { slug, username} = doc.data()
    return{
      params: {username, slug}
    }
  })

  


  return{
    //must be in this format:
    // paths: [
    // { params: {username, slug}} 
    // ]
    paths,
    fallback: 'blocking'
  }
}



export default function Post(props) {
  const postRef = firestore.doc(props.path)
  const [realtimePost] = useDocumentData(postRef)

  const post = realtimePost || props.post

  return (
    // styles.container
    <main>

      <section>
        <PostContent post={post}/>
      </section>

      <aside className="card">
        <p>
          <strong>{post.heartCount || 0} ❤️</strong>
        </p>

        <AuthCheck
          fallback={
            <Link href="/enter">
              <button>Sign Up</button>
            </Link>
          }
        >
          <HeartButton postRef={postRef}/>
        </AuthCheck>

      </aside>

    </main>
  )
}