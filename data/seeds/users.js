exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("user").insert([
        {
          id: 1,
          user_id: "1",
          username: "teamworkouttracker",
          password: "Sunz0utGunz0ut",
          email: "teamworkouttracker@gmail.com",
          body_goal: "",
          first_name: "",
          last_name: "",
          weight_units: "",
          distance_units: "",
          avatar: "",
          created_at: 111,
          updated_at: 123
        }
      ]);
    });
};
