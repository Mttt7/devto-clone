import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../lib/context"; 
import { auth } from "../lib/firebase";

export default function Navbar() {
    const {user, username} = useContext(UserContext)

    const signOut =  () => {
      auth.signOut();
     
    }
    return (
        <nav className="navbar">
          <ul>
            <li>
              <Link href="/">
                <button className="btn-logo">dev.to clone</button>
              </Link>
            </li>
    
            {/* user is signed-in and has username */}
            {username && (
          <>
            <li className="push-left">
              <button onClick={signOut}>Sign Out</button>
            </li>
            <li>
              <Link href="/admin">
                <button className="btn-blue">Write Posts</button>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`}>
                <img className="profile-photo" src={user?.photoURL || '/hacker.png'} />
              </Link>
            </li>
          </>
        )}
    
            {/* user is not signed OR has not created username */}
            {!username && (
              <li>
                <Link href="/enter">
                  <button className="btn-blue">Log in</button>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      );
}