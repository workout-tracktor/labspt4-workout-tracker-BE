exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("exercises")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("exercises").insert([
        {
          id: 1,
          exercise_id: "1",
          name: "Ex 1",
          equipment_id: 1,
          description: "An Exercise",
          created_at: 111,
          updated_at: 112
        },
        {
          id: 2,
          exercise_id: "2",
          name: "Ex 2",
          equipment_id: 2,
          description: "An Exercise",
          created_at: 113,
          updated_at: 114
        },
        {
          id: 3,
          exercise_id: "3",
          name: "Ex 3",
          equipment_id: 3,
          description: "An Exercise",
          created_at: 115,
          updated_at: 116
        },
        {
          id: 4,
          exercise_id: "4",
          name: "Ex 4",
          equipment_id: 4,
          description: "An Exercise",
          created_at: 117,
          updated_at: 118
        },
        {
          id: 5,
          exercise_id: "5",
          name: "Ex 5",
          equipment_id: 5,
          description: "An Exercise",
          created_at: 119,
          updated_at: 120
        },
        {
          id: 6,
          exercise_id: "6",
          name: "Ex 6",
          equipment_id: 6,
          description: "An Exercise",
          created_at: 121,
          updated_at: 122
        },
        {
          id: 7,
          exercise_id: "7",
          name: "Ex 7",
          equipment_id: 7,
          description: "An Exercise",
          created_at: 123,
          updated_at: 124
        },
        {
          id: 8,
          exercise_id: "8",
          name: "Ex 8",
          equipment_id: 8,
          description: "An Exercise",
          created_at: 125,
          updated_at: 126
        },
        {
          id: 9,
          exercise_id: "9",
          name: "Ex 9",
          equipment_id: 9,
          description: "An Exercise",
          created_at: 127,
          updated_at: 128
        },
        {
          id: 10,
          exercise_id: "10",
          name: "Ex 10",
          equipment_id: 10,
          description: "An Exercise",
          created_at: 129,
          updated_at: 130
        }
      ]);
    });
};
