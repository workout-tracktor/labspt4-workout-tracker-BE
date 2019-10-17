exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("exercises")
 
    .then(function() {
      // Inserts seed entries
      return knex("exercises").insert([
        {
          id: 1,
          name: "Ex 1",
          sets: [1,2,3],
          user_id: '1',
          equipment_id: 1,
          description: "An Exercise",
          workout_type: "Type 1",
          created: 111,
          updated: 112
        },
        {
          id: 2,
          name: "Ex 2",
          sets: [1,2,3],
          user_id: '1',
          equipment_id: 2,
          description: "An Exercise",
          completed: true,
          workout_type: "Type 1",
          created: 113,
          updated: 114
        },
        {
          id: 3,
          name: "Ex 3",
          sets: [1,2,3],
          user_id: '1',
          equipment_id: 3,
          description: "An Exercise",
          completed: true,
          workout_type: "Type 1",
          created: 115,
          updated: 116
        },
        {
          id: 4,
          name: "Ex 4",
          sets: [1,2,3],
          user_id: '1',
          equipment_id: 4,
          description: "An Exercise",
          completed: true,
          workout_type: "Type 1",
          created: 117,
          updated: 118
        },
        {
          id: 5,
          name: "Ex 5",
          sets: [1,2,3],
          user_id: '1',
          equipment_id: 5,
          description: "An Exercise",
          completed: true,
          workout_type: "Type 1",
          created: 119,
          updated: 120
        },
        {
          id: 6,
          name: "Ex 6",
          sets: [1,2,3],
          user_id: '1',
          equipment_id: 6,
          description: "An Exercise",
          completed: true,
          workout_type: "Type 1",
          created: 121,
          updated: 122
        },
        {
          id: 7,
          name: "Ex 7",
          sets: [1,2,3],
          user_id: '1',
          equipment_id: 7,
          description: "An Exercise",
          completed: true,
          workout_type: "Type 1",
          created: 123,
          updated: 124
        },
        {
          id: 8,
          name: "Ex 8",
          sets: [1,2,3],
          user_id: '1',
          equipment_id: 8,
          description: "An Exercise",
          completed: true,
          workout_type: "Type 1",
          created: 125,
          updated: 126
        },
        {
          id: 9,
          name: "Ex 9",
          sets: [1,2,3],
          user_id: '1',
          equipment_id: 9,
          description: "An Exercise",
          completed: true,
          workout_type: "Type 1",
          created: 127,
          updated: 128
        },
        {
          id: 10,
          name: "Ex 10",
          sets: [1,2,3],
          user_id: '1',
          equipment_id: 10,
          description: "An Exercise",
          completed: true,
          workout_type: "Type 1",
          created: 129,
          updated: 130
        }
      ]);
    });
};
