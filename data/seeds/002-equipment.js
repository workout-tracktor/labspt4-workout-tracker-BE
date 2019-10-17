exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("equipments").then(function() {
    // Inserts seed entries
    return knex("equipments").insert([
      {
        id: 1,
        name: "Elliptical",
        description: "Elliptical Machine",
        created: 131,
        updated: 132
      },
      {
        id: 2,
        name: "Stationary Bike",
        description: "Stationary Bike",
        created: 133,
        updated: 134
      },
      {
        id: 3,
        name: "Aerobic Steppers",
        description: "Aerobic Stepper",
        created: 135,
        updated: 136
      },
      {
        id: 4,
        name: "Cable Pulley",
        description: "Cable Pulley",
        created: 137,
        updated: 138
      },
      {
        id: 5,
        name: "Weight Machine",
        description: "Weight Machine",
        created: 139,
        updated: 140
      },
      {
        id: 6,
        name: "Free Weights",
        description: "Free Weights",
        created: 141,
        updated: 142
      },
      {
        id: 7,
        name: "Abdominal Cruncher",
        description: "Abdominal Cruncher",
        created: 143,
        updated: 144
      },
      {
        id: 8,
        name: "Rowing Machine",
        description: "Rowing Machine",
        created: 145,
        updated: 146
      },
      {
        id: 9,
        name: "Exercise Balls",
        description: "Exercise Balls",
        created: 147,
        updated: 148
      },
      {
        id: 10,
        name: "Treadmill",
        description: "Treadmill",
        created: 149,
        updated: 150
      }
    ]);
  });
};
