exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("units")

    .then(function() {
      // Inserts seed entries
      return knex("units").insert([
        {
          id: 1,
          unit_id: "1",
          name: "lbs",
          created_at: 111,
          updated_at: 112
        },
        {
          id: 2,
          unit_id: "2",
          name: "kgs",
          created_at: 113,
          updated_at: 114
        },
        {
          id: 3,
          unit_id: "3",
          name: "metres",
          created_at: 115,
          updated_at: 116
        },
        {
          id: 4,
          unit_id: "4",
          name: "feet",
          created_at: 117,
          updated_at: 118
        },
        {
          id: 5,
          unit_id: "5",
          name: "miles",
          created_at: 119,
          updated_at: 120
        },
        {
          id: 6,
          unit_id: "6",
          name: "kilometres",
          created_at: 121,
          updated_at: 122
        }
      ]);
    });
};
