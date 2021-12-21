import React from 'react';
import { Link } from 'react-router-dom';
import ExerciseList from '../components/ExerciseList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function HomePage( {setExerciseToEdit} ) {
    const [exercises, setExercises] = useState([]);
    const history = useHistory();

    const onDelete = async _id => {
        const response = await fetch(`/exercises/${_id}`, {method: 'DELETE'});
        if(response.status === 204){
            const newExercises = exercises.filter(e => e._id !== _id);
            setExercises(newExercises);
        } else{
            console.error(`Failed to delete exercise with id = ${_id}, status code = ${response.status}`);
        }
    };
    const onEdit = exercise => {
        setExerciseToEdit(exercise);
        history.push("/edit-exercise");
    }
    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const data = await response.json();
        setExercises(data);
    }

    useEffect(() => {
        loadExercises();
    }, []);

    
    return (
        <>
            <h1>EXERCISE TRACKER</h1>
            <p>This table is designed for you to track your exercises in it. </p>
            <ExerciseList exercises={exercises} onDelete={onDelete} onEdit={onEdit}></ExerciseList>  
            <Link to="/add-exercise">Add an exercise</Link>
        </>
    );
}

export default HomePage;