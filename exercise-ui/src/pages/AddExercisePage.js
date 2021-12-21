import React, { useState } from 'react';
import { useHistory } from "react-router-dom";


let todayDate = new Date(); 
let today = todayDate.getFullYear()+'-'+(todayDate.getMonth()+1)+'-'+todayDate.getDate(); 

export const AddExercisePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('lbs');
    const [date, setDate] = useState(today);

    const history = useHistory();

    const addExercise = async () => {
        const newExercise = { name, reps, weight, unit, date };
        const response = await fetch('/exercises', {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type' : 'application/json',
            },
        });
        if(response.status === 201){
            alert("Successfully added the exercise!")
        }   else{
            alert(`Failed to add exercise, status code = ${response.status}`)
        }
        history.push("/");
    };

    return (
        <div>
            <h1>Add Exercise</h1>
            <input
                type="text"
                placeholder="Enter exercise here"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                type="number"
                value={reps}
                placeholder="Enter reps here"
                onChange={e => setReps(e.target.value)} />
            <input
                type="number"
                value={weight}
                placeholder="Enter weight here"
                onChange={e => setWeight(e.target.value)} />
             <select value={unit}
                onChange={e => setUnit(e.target.value)}>
                <option value="lbs">lbs</option>
                 <option value="kgs">kg</option>
            </select>
            <input
                type="string"
                value={today}
                onChange={e => setDate(e.target.value)} />
            <button
                onClick={addExercise}
            >Add</button>
        </div>
    );
}

export default AddExercisePage;