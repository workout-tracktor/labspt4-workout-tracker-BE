exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")

    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          user_id: "1",
          username: "teamworkouttracker",
          password: "Sunz0utGunz0ut",
          email: "teamworkouttracker@gmail.com",
          body_goal: "",
          first_name: "",
          last_name: "",
          weight_units: 1,
          distance_units: 3,
          avatar: "",
          created: 111,
          updated: 123
        }
      ]);
    });
};
