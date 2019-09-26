exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("workouts")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("workouts").insert([
        {
          id: 1,
          workout_id: "1",
          name: "Toilet Lift",
          exercise_ids: [],
          exercise_description: [""],
          description: "",
          created_at: 110,
          updated_at: 112
        },
        {
          id: 2,
          workout_id: "2",
          name: "Couch Pivot",
          exercise_ids: [],
          exercise_description: [""],
          description: "",
          created_at: 113,
          updated_at: 114
        },
        {
          id: 3,
          workout_id: "3",
          name: "Burrito Roll",
          exercise_ids: [],
          exercise_description: [""],
          description: "",
          created_at: 115,
          updated_at: 116
        },
        {
          id: 4,
          workout_id: "4",
          name: "Chinese Buffet",
          exercise_ids: [],
          exercise_description: [""],
          description: "",
          created_at: 117,
          updated_at: 118
        },
        {
          id: 5,
          workout_id: "5",
          name: "Hot Dog Contest",
          exercise_ids: [],
          exercise_description: [""],
          description: "",
          created_at: 119,
          updated_at: 120
        }
      ]);
    });
};
