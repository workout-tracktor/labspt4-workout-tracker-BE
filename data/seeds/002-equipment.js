exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("equipments")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("equipments").insert([
        {
          id: 1,
          equipment_id: "1",
          name: "Elliptical",
          description: "Elliptical Machine",
          created_at: 131,
          updated_at: 132
        },
        {
          id: 2,
          equipment_id: "2",
          name: "Stationary Bike",
          description: "Stationary Bike",
          created_at: 133,
          updated_at: 134
        },
        {
          id: 3,
          equipment_id: "3",
          name: "Aerobic Steppers",
          description: "Aerobic Stepper",
          created_at: 135,
          updated_at: 136
        },
        {
          id: 4,
          equipment_id: "4",
          name: "Cable Pulley",
          description: "Cable Pulley",
          created_at: 137,
          updated_at: 138
        },
        {
          id: 5,
          equipment_id: "5",
          name: "Weight Machine",
          description: "Weight Machine",
          created_at: 139,
          updated_at: 140
        },
        {
          id: 6,
          equipment_id: "6",
          name: "Free Weights",
          description: "Free Weights",
          created_at: 141,
          updated_at: 142
        },
        {
          id: 7,
          equipment_id: "7",
          name: "Abdominal Cruncher",
          description: "Abdominal Cruncher",
          created_at: 143,
          updated_at: 144
        },
        {
          id: 8,
          equipment_id: "8",
          name: "Rowing Machine",
          description: "Rowing Machine",
          created_at: 145,
          updated_at: 146
        },
        {
          id: 9,
          equipment_id: "9",
          name: "Exercise Balls",
          description: "Exercise Balls",
          created_at: 147,
          updated_at: 148
        },
        {
          id: 10,
          equipment_id: "10",
          name: "Treadmill",
          description: "Treadmill",
          created_at: 149,
          updated_at: 150
        }
      ]);
    });
};
