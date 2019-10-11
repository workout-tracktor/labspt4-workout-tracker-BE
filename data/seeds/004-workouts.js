exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("workouts")

    .then(function() {
      // Inserts seed entries
      return knex("workouts").insert([
        {
          id: 1,
          name: "Toilet Lift",
          exercise_ids: [1,2,3],
          exercise_description: [""],
          description: "",
          created: 110,
          updated: 112
        },
        {
          id: 2,
          name: "Couch Pivot",
          exercise_ids: [1,2,3],
          exercise_description: [""],
          description: "",
          created: 113,
          updated: 114
        },
        {
          id: 3,
          name: "Burrito Roll",
          exercise_ids: [1,2,3],
          exercise_description: [""],
          description: "",
          created: 115,
          updated: 116
        },
        {
          id: 4,
          name: "Chinese Buffet",
          exercise_ids: [1,2,3],
          exercise_description: [""],
          description: "",
          created: 117,
          updated: 118
        },
        {
          id: 5,
          name: "Hot Dog Contest",
          exercise_ids: [1,2,3],
          exercise_description: [""],
          description: "",
          created: 119,
          updated: 120
        }
      ]);
    });
};
