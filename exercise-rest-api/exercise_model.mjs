import mongoose from 'mongoose';


mongoose.connect(
    'mongodb://0.0.0.0:27017/exercises',
    { useNewUrlParser: true }
);

const db = mongoose.connection;

db.once('open', () => {
    console.log('Successfully connected to Exercise Database via MongoDB using Mongoose!');
});

mongoose.set('autoIndex', true);

const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true },
    date: { type: String, required: true }
});

const Exercise = mongoose.model("Exercise", exerciseSchema);
/**
 * @param {String} name 
 * @param {Number} reps 
 * @param {String} weight
 * @param {String} unit
 * @param {String} date 
 * @returns 
 */
const createExercise = async (name, reps, weight, unit, date) => {
    const exercise = new Exercise({ name: name, reps: reps, weight: weight,
        unit: unit, date: date });
    return exercise.save();
}

/**
 * Retrive exercises based on the filter, projection and limit parameters
 * @param {Object} filter 
 * @param {String} projection 
 * @param {Number} limit 
 * @returns 
 */
const findExercises = async (filter, projection, limit) => {
    const query = Exercise.find(filter)
        .select(projection)
        .limit(limit);
    return query.exec();
}

/**
 * Retrive exercises based on the filter, projection and limit parameters
 * @param {String} _id
 * @returns 
 */
 const findExerciseBy_id = async (_id) => {
    const query = Exercise.findBy_id(_id);
    return query.exec();
}

/**
 * Replace the properties of the exercise with the _id value prov_ided
 * @param {String} _id 
 * @param {String} title 
 * @param {Number} year 
 * @param {String} language 
 * @returns A promise. Resolves to the number of documents modified
 */
const replaceExercise = async (_id, name, reps, weight, unit, date) => {
    const result = await Exercise.replaceOne({ _id: _id },
        { name: name, reps: reps, weight: weight,
            unit: unit, date: date  });
    return result.modifiedCount;
}

/**
 * Delete the exercise with prov_ided _id value
 * @param {String} _id 
 * @returns A promise. Resolves to the count of deleted documents
 */
const deleteBy_id = async (_id) => {
    const result = await Exercise.deleteOne({ _id: _id });
    // Return the count of deleted document. Since we called deleteOne, this will be either 0 or 1.
    return result.deletedCount;
}

export { createExercise, findExercises, replaceExercise, deleteBy_id, findExerciseBy_id };