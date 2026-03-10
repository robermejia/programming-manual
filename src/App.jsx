import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ManualLayout from './layouts/ManualLayout';
import LoginPage from './pages/LoginPage';
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css';

// Import Data
import { categories as jsCategories } from './data/js-topics.js';
import { categories as reactCategories } from './data/react-topics.js';
import { categories as javaCategories } from './data/java-topics.js';
import { categories as springCategories } from './data/springboot-topics.js';
import { categories as angularCategories } from './data/angular-topics.js';
import { categories as postgresCategories } from './data/postgres-topics.js';
import { categories as mysqlCategories } from './data/mysql-topics.js';
import { categories as pseintCategories } from './data/pseint-topics.js';
import { categories as tsCategories } from './data/ts-topics.js';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="loading-screen">Cargando aplicación...</div>;
  
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<LandingPage />} />
          
          <Route 
            path="/js/:topicId?" 
            element={
              <PrivateRoute>
                <ManualLayout 
                  title="JS" 
                  language="javascript"
                  logoColor="#f7df1e"
                  themeClass="js-theme"
                  categories={jsCategories} 
                  manualId="js"
                />
              </PrivateRoute>
            } 
          />

          <Route 
            path="/ts/:topicId?" 
            element={
              <PrivateRoute>
                <ManualLayout 
                  title="TypeScript" 
                  language="typescript"
                  logoColor="#3178C6"
                  themeClass="ts-theme"
                  categories={tsCategories} 
                  manualId="ts"
                />
              </PrivateRoute>
            } 
          />
          
          <Route 
            path="/react/:topicId?" 
            element={
              <PrivateRoute>
                <ManualLayout 
                  title="React" 
                  language="javascript"
                  logoColor="#61dafb"
                  themeClass="react-theme"
                  categories={reactCategories} 
                  manualId="react"
                />
              </PrivateRoute>
            } 
          />
          
          <Route 
            path="/java/:topicId?" 
            element={
              <PrivateRoute>
                <ManualLayout 
                  title="Java" 
                  language="java"
                  logoColor="#EA2D2E"
                  themeClass="java-theme"
                  categories={javaCategories} 
                  manualId="java"
                />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/springboot/:topicId?" 
            element={
              <PrivateRoute>
                <ManualLayout 
                  title="Spring Boot" 
                  language="java"
                  logoColor="#6DB33F"
                  themeClass="spring-theme"
                  categories={springCategories} 
                  manualId="springboot"
                />
              </PrivateRoute>
            } 
          />
          
          <Route 
            path="/angular/:topicId?" 
            element={
              <PrivateRoute>
                <ManualLayout 
                  title="Angular" 
                  language="javascript"
                  logoColor="#e40035"
                  themeClass="angular-theme"
                  categories={angularCategories} 
                  manualId="angular"
                />
              </PrivateRoute>
            } 
          />

          <Route 
            path="/postgres/:topicId?" 
            element={
              <PrivateRoute>
                <ManualLayout 
                  title="PostgreSQL" 
                  language="sql"
                  logoColor="#336791"
                  themeClass="postgres-theme"
                  categories={postgresCategories} 
                  manualId="postgres"
                />
              </PrivateRoute>
            } 
          />

          <Route 
            path="/mysql/:topicId?" 
            element={
              <PrivateRoute>
                <ManualLayout 
                  title="MySQL" 
                  language="sql"
                  logoColor="#4479A1"
                  themeClass="mysql-theme"
                  categories={mysqlCategories} 
                  manualId="mysql"
                />
              </PrivateRoute>
            } 
          />

          <Route 
            path="/pseint/:topicId?" 
            element={
              <PrivateRoute>
                <ManualLayout 
                  title="PSeInt" 
                  language="plaintext"
                  logoColor="#3b82f6"
                  themeClass="pseint-theme"
                  categories={pseintCategories} 
                  manualId="pseint"
                />
              </PrivateRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
