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
          created: 111,
          updated: 112
        },
        {
          id: 2,
          unit_id: "2",
          name: "kgs",
          created: 113,
          updated: 114
        },
        {
          id: 3,
          unit_id: "3",
          name: "metres",
          created: 115,
          updated: 116
        },
        {
          id: 4,
          unit_id: "4",
          name: "feet",
          created: 117,
          updated: 118
        },
        {
          id: 5,
          unit_id: "5",
          name: "miles",
          created: 119,
          updated: 120
        },
        {
          id: 6,
          unit_id: "6",
          name: "kilometres",
          created: 121,
          updated: 122
        }
      ]);
    });
};
