import React from 'react';
import Navbar from './components/Navbar';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import DepartmentForm from './components/departmentForm';
import DepartmentList from './components/departmentList';
import { Routes, Route } from 'react-router-dom';
import AssetForm from './components/assetForm';
import AssetList from './components/assetList';
import Offcanvas from './components/offCanvas';
import SubjectList from './components/subjectList';
import SubjectForm from './components/subjectForm';

const App = () => {
  return (
    <div>

      <Navbar />
      <Routes>
        <Route path="/offcanvas" element={<Offcanvas />} />
        <Route path="/add-user" element={<UserForm />} />
        <Route path="/add-department" element={<DepartmentForm />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/departments" element={<DepartmentList />} />
        <Route path="/departments/:departmentId/add-asset" element={<AssetForm />} />
        <Route path="/departments/:departmentId/asset-list" element={<AssetList />} />
        <Route path="/subjects" element={<SubjectList />} />
        <Route path="/add-subject" element={<SubjectForm />} />
        <Route path="/" element={<DepartmentList />} />
        <Route path="*" element={<h1>Not Found</h1>} />

      </Routes>



    </div>
  );
};

export default App;