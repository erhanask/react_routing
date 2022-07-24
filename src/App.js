import './App.css';
import {Routes, Route, Link, useParams, NavLink} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";


function App() {
    return (
        <div className="App">
            <h1>Welcome to React Router!</h1>

            <NavLink className={({ isActive }) =>
                isActive ? "activeClassName" : undefined
            } to="/">
                Home
            </NavLink>
            <NavLink className={({ isActive }) =>
                isActive ? "activeClassName" : undefined
            } to="/about">
                About
            </NavLink>
            <NavLink className={({ isActive }) =>
                isActive ? "activeClassName" : undefined
            } to="/company">
                Company
            </NavLink>
            <NavLink className={({ isActive }) =>
                isActive ? "activeClassName" : undefined
            } to="/users">
                Users
            </NavLink>
            <div style={{backgroundColor: "black", color: "white", marginTop: "35px"}}>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/company" element={<Company/>}/>
                    <Route path="/users" element={<Users/>}/>
                    <Route path="/user/:id" element={<User/>}/>
                    <Route path="*" element={<Error/>}/>
                </Routes>
            </div>

        </div>
    );
}

function Error() {
    return (
        <>
            No Route Found !
        </>
    );
}

function Home() {
    return (
        <>
            Home
        </>
    );
}

function About() {
    return (
        <>
            About
        </>
    );
}

function Company() {
    return (
        <>
            Company
        </>
    );
}

function Users() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios("https://jsonplaceholder.typicode.com/users")
            .then((res) => setUsers(res.data))
            .catch((e) => console.log(e));
    }, []);


    return (
        <>
            <ul>
                {
                    users.map((user) =>
                        <li key={user.id}>
                            <Link to={`/user/${user.id}`}>
                                {user.name}
                            </Link>
                        </li>
                    )
                }
            </ul>
        </>
    );
}

function User() {

    const [user, setUser] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        axios(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then((res) => setUser(res.data))
            .catch((e) => console.log(e));
    }, [id]);


    return (
        <>
            <code>
                {JSON.stringify(user)}
            </code>
            <br/>
            <br/>
            <br/>
            <Link to={`/user/${parseInt(id) + 1}`}>Next User</Link>
        </>
    );
}

export default App;
