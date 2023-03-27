import React from 'react';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Home from './pages/Home/Home';
import Auth from './pages/Auth/Auth';
import AccountSettings from './pages/AccountSettings/AccountSettings';
import ProfileSettings from './pages/AccountSettings/ProfileSettings';
import DeleteAccount from './pages/AccountSettings/DeleteAccount';
import SellerCenter from './pages/SellerCenter/SellerCenter';
import Slogin from './pages/SellerCenter/S_Login';
import Sregister from './pages/SellerCenter/S_Register';
import SellerManagement from './pages/SellerManagement/SellerManagement';
import Delete from './pages/SellerManagement/Delete';
import Dashboard from './pages/SellerManagement/Dashboard';
import GeneralInfo from './pages/SellerManagement/GeneralInfo';
import ForgetPassword from './pages/ForgetPassword';

const App = () => {
    return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/accountsettings" element={<AccountSettings />} >
                        <Route index element={<Navigate to={'profile'} />} />
                        <Route path="profile" element={<ProfileSettings />} />
                        <Route path="delete" element={<DeleteAccount />} />
                        <Route path="resetPwd" element={<ForgetPassword />} />
                    </Route>
                    <Route path="/sellerAuth" element={<SellerCenter />} >
                        <Route index element={<Navigate to={'login'} />}/>
                        <Route path="login" element={<Slogin />}/>
                        <Route path="register" element={<Sregister />} />
                    </Route>
                    <Route path="/sellerCenter" element={<SellerManagement />} >
                        <Route index element={<Navigate to={'dashboard'} />} />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="generalInfo" element={<GeneralInfo />} />
                        <Route path="delete" element={<Delete />} />
                    </Route>
                    <Route path="/forgetPwd" element={<ForgetPassword />} />
                </Routes>
            </BrowserRouter>
    );
}

export default App;