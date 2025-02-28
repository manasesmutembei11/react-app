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
import CountyList from './components/countyList';
import CountyForm from './components/countyForm';
import DisciplineList from './components/disciplineList';
import DisciplineForm from './components/disciplineForm';
import RoomList from './components/roomList';
import RoomForm from './components/roomForm';
import StudentForm from './components/studentForm';
import StudentList from './components/studentList';
import TeacherForm from './components/teacherForm';
import TeacherList from './components/teacherList';
import ExamForm from './components/examForm';
import ExamList from './components/examList';

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
        <Route path="/departments/:departmentId/add-teacher" element={<TeacherForm />} />
        <Route path="/departments/:departmentId/teacher-list" element={<TeacherList />} />
        <Route path="/subjects" element={<SubjectList />} />
        <Route path="/add-subject" element={<SubjectForm />} />
        <Route path="/counties" element={<CountyList />} />
        <Route path="/add-county" element={<CountyForm />} />
        <Route path="/rooms" element={<RoomList />} />
        <Route path="/add-room" element={<RoomForm />} />
        <Route path="/rooms/:roomId/add-student" element={<StudentForm />} />
        <Route path="/rooms/:roomId/students" element={<StudentList />} />
        <Route path="/disciplines" element={<DisciplineList />} />
        <Route path="/add-discipline" element={<DisciplineForm />} />
        <Route path="/add-exam" element={<ExamForm />} />
        <Route path="/exams" element={<ExamList />} />
        <Route path="/" element={<DepartmentList />} />
        <Route path="*" element={<h1>Not Found</h1>} />

      </Routes>



    </div>
  );
};

export default App;