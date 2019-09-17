const workout = 
{
    workout_id: 'integer',
    description: 'string',
    complete: false,
    exercises: [
        {
            exercise_id: 'string',
            name: 'string',
            description: 'string',
            equipment: [
                {
                    equipment_id: 'string',
                    name: 'string',
                    description: 'string'
                },
                {
                    equipment_id: 'string',
                    name: 'string',
                    description: 'string'
                }, 
            ],
            workout_description: 'string',
            reps: 'integer',
            distance: 'float',
            weight: 'float',
            duration: 'integer',
        },
        {
            exercise_id: 'string',
            name: 'string',
            description: 'string',
            equipment: [
                {
                    equipment_id: 'string',
                    name: 'string',
                    description: 'string'
                },
                {
                    equipment_id: 'string',
                    name: 'string',
                    description: 'string'
                },
            ],
            workout_description: 'string',
            reps: 'integer',
            distance: 'float',
            weight: 'float',
            duration: 'integer',
        },
    ]
}