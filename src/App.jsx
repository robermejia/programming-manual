
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ManualLayout from './layouts/ManualLayout';
import './App.css';

// Import Data
import { categories as jsCategories } from './data/js-topics';
import { categories as reactCategories } from './data/react-topics';
import { categories as javaCategories } from './data/java-topics';
import { categories as springCategories } from './data/springboot-topics';
import { categories as angularCategories } from './data/angular-topics';
import { categories as postgresCategories } from './data/postgres-topics';
import { categories as mysqlCategories } from './data/mysql-topics';
import { categories as pseintCategories } from './data/pseint-topics';
import { categories as tsCategories } from './data/ts-topics';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        <Route 
          path="/js" 
          element={
            <ManualLayout 
              title="JS" 
              language="javascript"
              logoColor="#f7df1e"
              themeClass="js-theme"
              categories={jsCategories} 
            />
          } 
        />

        <Route 
          path="/ts" 
          element={
            <ManualLayout 
              title="TypeScript" 
              language="typescript"
              logoColor="#007ACC"
              themeClass="ts-theme"
              categories={tsCategories} 
            />
          } 
        />
        
        <Route 
          path="/react" 
          element={
            <ManualLayout 
              title="React" 
              language="javascript"
              logoColor="#61dafb"
              themeClass="react-theme"
              categories={reactCategories} 
            />
          } 
        />
        
        <Route 
          path="/java" 
          element={
            <ManualLayout 
              title="Java" 
              language="java"
              logoColor="#f89820"
              themeClass="java-theme"
              categories={javaCategories} 
            />
          } 
        />
        <Route 
          path="/springboot" 
          element={
            <ManualLayout 
              title="Spring Boot" 
              language="java"
              logoColor="#6db33f"
              themeClass="spring-theme"
              categories={springCategories} 
            />
          } 
        />
        
        <Route 
          path="/angular" 
          element={
            <ManualLayout 
              title="Angular" 
              language="javascript"
              logoColor="#DD0031"
              themeClass="angular-theme"
              categories={angularCategories} 
            />
          } 
        />

        <Route 
          path="/postgres" 
          element={
            <ManualLayout 
              title="PostgreSQL" 
              language="sql"
              logoColor="#336791"
              themeClass="postgres-theme"
              categories={postgresCategories} 
            />
          } 
        />

        <Route 
          path="/mysql" 
          element={
            <ManualLayout 
              title="MySQL" 
              language="sql"
              logoColor="#4479A1"
              themeClass="mysql-theme"
              categories={mysqlCategories} 
            />
          } 
        />

        <Route 
          path="/pseint" 
          element={
            <ManualLayout 
              title="PSeInt" 
              language="plaintext"
              logoColor="#3b82f6"
              themeClass="pseint-theme"
              categories={pseintCategories} 
            />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
