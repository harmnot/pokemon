const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const peopleSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, "email already exists"],
      required: [true, "required email"],
      validate: {
        validator: function(v) {
          let input = v.toLowerCase();
          let rgx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return rgx.test(v);
        },
        message: "please use valid email"
      },
      lowercase: true
    },
    pokex: [{ type: Schema.Types.ObjectId, ref: "Pokex" }]
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

peopleSchema.pre("save", function(next) {
  let dateNow = new Date();
  this.update_at = dateNow;
  if (!this.created_at) {
    this.created_at = dateNow;
  }
  next();
});

const Person = mongoose.model("Person", peopleSchema);

module.exports = Person;
