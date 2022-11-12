import React from "react";
import { Redirect } from "react-router-dom";
import { Switch } from "react-router-dom";

import { Link, NavLink, Route, useParams } from "react-router-dom";

function App() {
  return (
    <div className="p-8">
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/users" component={Users} />
        <Route path="/userslist" component={UsersList} />
        <Redirect from="/users" to="/userslist" />
        <Route path="/userslist/:userId/profile" component={UserPage} />
        <Route path="/userslist/:userId/edit" component={EditUserPage} />
        <Route path="/userslist/:userId" component={UserPage} />
        <Redirect from="*" to="/userslist/:userId/profile" />
        <Redirect from="*" to="/" />
      </Switch>
    </div>
  );
}

const HomePage = () => {
  return (
    <>
      <h1 className="text-3xl font-bold pb-6">App Layout</h1>
      <NavLink to="users">Users list</NavLink>
    </>
  );
};

const Users = () => {
  return (
    <>
      <h1>Users Layout</h1>
      <UsersList />
    </>
  );
};

const UsersList = () => {
  const users = [
    {
      id: 0,
      title: "User 0",
    },
    {
      id: 1,
      title: "User 1",
    },
    {
      id: 2,
      title: "User 2",
    },
    {
      id: 3,
      title: "User 3",
    },
    {
      id: 4,
      title: "User 4",
    },
  ];
  return (
    <>
      <h1 className="text-3xl font-bold py-6">Users Layout</h1>
      <ul className="list-none pb-6">
        {users.map((user) => {
          return (
            <li key={user.id}>
              <Link to={`/users/${user.id}/profile`}>{user.title}</Link>
            </li>
          );
        })}
      </ul>

      <div>
        <Link to="/">Home page</Link>
      </div>
    </>
  );
};

const UserPage = (users) => {
  const { userId } = useParams();
  console.log(users);
  console.log(userId);

  const getUser = (userId) => users.find(({ id }) => String(id) === userId);
  const user = getUser(userId);
  console.log(user);
  return (
    <>
      <h1 className="text-3xl font-bold py-6">User Page</h1>
      <h1>{user}</h1>

      <div>
        <NavLink to="edit">User edit page</NavLink>
      </div>
      <div>
        <NavLink to="users">Users list</NavLink>
      </div>
    </>
  );
};

const EditUserPage = () => {
  const handleClick = () => {
    console.log("click");
  };
  return (
    <>
      <h1 className="text-3xl font-bold py-6">Edit User Page</h1>
      <div>
        <NavLink to=":userId">User Page</NavLink>
      </div>
      <div>
        <NavLink onClick={handleClick}>Another User Page</NavLink>
      </div>
      <div>
        <NavLink to="userlist">Users List</NavLink>
      </div>
    </>
  );
};

export default App;
