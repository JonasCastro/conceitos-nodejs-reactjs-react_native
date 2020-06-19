import React, { useState, useEffect } from 'react';

import Header from './components/Header'
import imgBackgraund from './assets/backgraund.jpg'

import api from './services/api'
import './App.css'

function App() {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        api.get('/projects').then(response => {
            setProjects(response.data);
        })
    }, []);

    async function handleAddProject() {


        const response = await api.post('/projects', {
            title: `New Project${Date.now()}`,
            owner: 'Jonas Castro'
        });

        const project = response.data;
        setProjects([...projects, project]);
    }
    return (
        <>
            <Header title="Projects" />
            <img width="300" src={imgBackgraund} />
            <ul>
                {projects.map(project => <li key={project.id}>{project.title}</li>)}
            </ul>
            <button type="button" onClick={handleAddProject}>Adicionar  projeto</button>
        </>
    );
}
export default App;