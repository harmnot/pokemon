const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pokexSchema = new Schema(
  {
    nickname: {
      type: String,
      required: [true, "required nickname"],
      validate: {
        validator: function(v) {
          const rgx = /[!@#$%^&*()_+{}\[\]:;'"\/\\?><.,1234567890]/;
          if (rgx.test(v)) {
            return false;
          }
        },
        message:
          "please fill the nickname to not include any symbols and numbers"
      }
    },
    owner: { type: Schema.Types.ObjectId, ref: "Person" },
    pokemon: { type: Schema.Types.ObjectId, ref: "Pokemon" }
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

pokexSchema.pre("save", function(next) {
  let dateNow = new Date();
  this.update_at = dateNow;
  if (!this.created_at) {
    this.created_at = dateNow;
  }
  next();
});

const Pokex = mongoose.model("Pokex", pokexSchema);

module.exports = Pokex;
