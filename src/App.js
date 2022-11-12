import React from "react";
import { useRouteMatch } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { Switch } from "react-router-dom";

import { NavLink, Route, useParams } from "react-router-dom";

function App() {
  return (
    <div className="p-8">
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/users/:userId?" component={Users} />
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
  const params = useParams();
  const { userId } = params;
  const { path } = useRouteMatch();

  return (
    <>
      <h1 className="text-3xl font-bold pb-6">Users Layout</h1>
      <Switch>
        <Route path={path + "/profile"} component={UserPage} />
        <Route path={path + "/edit"} component={EditUserPage} />
        <Route exact path="/users" component={UsersList} />
        <Redirect from="*" to={path + userId + "/profile"} />
      </Switch>
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
      <h1 className="text-3xl font-bold pb-6">Users List Page</h1>
      <ul className="pb-6">
        {users.map((user) => (
          <li key={user.id}>
            <NavLink to={`users/${user.id}/profile`}>{user.title}</NavLink>
          </li>
        ))}
      </ul>
      <NavLink to="/">Home Page</NavLink>
    </>
  );
};

const UserPage = (users) => {
  const { userId } = useParams();

  return (
    <>
      <h1 className="text-3xl font-bold pb-6">User Page</h1>
      <div>
        <NavLink to={`/users/${userId}/edit`}>User Edit Page </NavLink>
      </div>
      <div>
        <NavLink to="/users">Users List</NavLink>
      </div>
      <div>UserId: {userId}</div>
    </>
  );
};

const EditUserPage = () => {
  const { userId } = useParams();
  return (
    <>
      <h1 className="text-3xl font-bold pb-6">Edit User Page</h1>
      <div>
        <NavLink to={`/users/${userId}/profile`}>User Page</NavLink>
      </div>
      <div>
        <NavLink to={`/users/${Number(userId) + 1}/profile`}>
          Next User Page
        </NavLink>
      </div>
      <div>
        <NavLink to={"/users"}>Users List</NavLink>
      </div>
    </>
  );
};

export default App;
