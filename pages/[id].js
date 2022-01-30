import {
    collection,
    doc,
    onSnapshot,
    orderBy,
    query,
  } from "@firebase/firestore";
  import { getProviders, getSession, useSession } from "next-auth/react";
  import { useRouter } from "next/router";
  import { useEffect, useState } from "react";
  import { useRecoilState } from "recoil";
  import { modalState } from "../atoms/modalAtom";
  import Modal from "../components/Modal";
  import Sidebar from "../components/Sidebar";
//   import Widgets from "../components/Widgets";
  import Post from "../components/Post";
  import { db } from "../firebase";
  import { ArrowLeftIcon } from "@heroicons/react/solid";
//   import Comment from "../components/Comment";
  import Head from "next/head";
import Login from "../components/Login";
import Comment from "../components/Comment";



const PostPage = ({trendingResults, followResults, providers}) => {

    // Session to display info from the user on the frontend...
    const {data: session } = useSession();

    // Modal State
    const [isOpen, setIsOpen] = useRecoilState(modalState);


    // States
    const [post, setPost] = useState();
    const [comments, setComments] = useState([]);

    // Router
    const router = useRouter();

    // Destructuring Id to retrieve data coming from it to display the post Page.
    const { id } = router.query;





    // Login Page if their is no context
    if(!session) return <Login providers={providers}/>


    useEffect(
        () =>
          onSnapshot(doc(db, "posts", id), (snapshot) => {
            setPost(snapshot.data());
          }),
        [db]
      );



      useEffect(
        () =>
          onSnapshot(
            query(
              collection(db, "posts", id, "comments"),
              orderBy("timestamp", "desc")
            ),
            (snapshot) => setComments(snapshot.docs)
          ),
        [db, id]
      );

    return (
        <div>
          <Head>
            <title>{post?.username} on Twitter: "{post?.text}"</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
    
          <main className='bg-black min-h-screen flex max-w-[2000px] mx-auto '>
            
            <Sidebar />
            
            <div className="flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]">
              <div className="flex items-center px-1.5 py-2 border-b border-gray-700 text-[#d9d9d9] font-semibold text-xl gap-x-4 sticky top-0 z-50 bg-black">
                <div onClick={() => router.push('/')}  className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0">
                  <ArrowLeftIcon className="h-5 text-white"/>
                </div>
                Tweet
              </div>

              <Post id={id} post={post} postPage/>
              {comments.length > 0 && (
                <div className="pb-72">
                  {comments.map((comment) => (
                    <Comment
                      key={comment.id}
                      id={comment.id}
                      comment={comment.data()}
                    />
                  ))}
                </div>
              )}
            </div>


    
            
    
            {/* WIdgets */}
    
            { isOpen && <Modal />}
          </main>
        </div>
      )
};

export default PostPage;


export async function getServerSideProps(context) {
    const trendingResults = await fetch("https://jsonkeeper.com/b/NKEV").then(
      (res) => res.json()
    );
  
    const followResults = await fetch("https://jsonkeeper.com/b/WWMJ").then(
      (res) => res.json()
    );
  
    const providers = await getProviders();
    const session = await getSession(context);
  
  
    return {
      props : {
        trendingResults,
        followResults,
        providers,
        session,
      }
    }
  }
