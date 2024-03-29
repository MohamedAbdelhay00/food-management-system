import { useEffect, useState } from 'react'

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AuthLayout from './Modules/Shared/Components/AuthLayout/AuthLayout';
import Login from './Modules/Authentication/Components/Login/Login';
import ForgotPassword from './Modules/Authentication/Components/ForgotPassword/ForgotPassword';
import MasterLayout from './Modules/Shared/Components/MasterLayout/MasterLayout';
import Home from './Modules/Home/Components/Home/Home';
import RecipesList from './Modules/Recipes/Components/RecipesList/RecipesList';
import UsersList from './Modules/Users/Components/UsersList/UsersList';
import CategoriesList from './Modules/Categories/Components/CategoriesList/CategoriesList';
import NotFound from './Modules/Shared/Components/NotFound/NotFound'
import { jwtDecode } from 'jwt-decode';
import ProtectedRoute from './Modules/Shared/Components/ProtectedRoute/ProtectedRoute';
import ResetPassword from './Modules/Authentication/Components/ResetPassword/ResetPassword';

import './App.css'
import AddNew from './Modules/Recipes/Components/RecipesList/RecipesData';
import RecipesData from './Modules/Recipes/Components/RecipesList/RecipesData';
import Update from './Modules/Recipes/Components/RecipesList/Update';
import Register from './Modules/Authentication/Components/Register/Register';
import VerifyAcc from './Modules/Authentication/Components/Register/VerifyAcc';
import Favorites from './Modules/Favorites/Favorites';
function App() {

  const [adminData, setAdminData] = useState(null);

  let saveAdminData = () => {
    let encodedToken = localStorage.getItem("adminToken"); 
    let decodedToken = jwtDecode(encodedToken);
    localStorage.setItem("loginData", JSON.stringify(decodedToken));
    setAdminData(decodedToken)
  }

  useEffect(() => {
    if(localStorage.getItem("adminToken")){
      saveAdminData();
    }
  }, [])

  const routes = createBrowserRouter([
    {
      path: '/', 
      element: <AuthLayout />, 
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login saveAdminData={saveAdminData}/> }, 
        { path: 'login', element: <Login saveAdminData={saveAdminData}/> }, 
        { path: 'register', element: <Register /> }, 
        { path: 'verify-account', element: <VerifyAcc /> }, 
        { path: 'forgot-password', element: <ForgotPassword /> }, 
        { path: 'reset-password', element: <ResetPassword /> }
      ], 
    },
    {
      path: 'dashboard', 
      element: <ProtectedRoute adminData={adminData}><MasterLayout adminData={adminData}/></ProtectedRoute>, 
      errorElement: <NotFound />, 
      children: [
        { index: true, element: <Home adminData={adminData}/> }, 
        { path: 'home', element: <Home adminData={adminData}/> }, 
        { path: 'recipes', element:  <RecipesList />}, 
        { path: 'users', element:  <UsersList />}, 
        { path: 'categories', element:  <CategoriesList />}, 
        { path: 'recipes-data', element:  <RecipesData />}, 
        { path: 'update/:id', element: <Update />}, 
        { path: 'favorites', element: <Favorites />},
      ], 
    }
  ])
  return(
    <RouterProvider router={routes} />
  )
}

export default App;
