const { Pokemon, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Pokemon model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe("name", () => {
      it("should throw an error if name is null", (done) => {
        Pokemon.create({name: null})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should work when its a valid name", () => {
        Pokemon.create({ name: "Pikachu" })
          .then((pokemon) => {
            expect(pokemon.name).to.equal("Pikachu");
          })
          .catch((err) => {
            console.log(err);
          });
      });
    });
    describe("hp", () => {
      it('should throw an error if hp is null', (done) => {
        Pokemon.create({name: 'Pikachu', hp: null})
          .then(() => done(new Error("It requires a valid hp")))
          .catch(() => done());
      })
      it('should work when its a valid hp', () => {
        Pokemon.create({ name: 'Pikachu', hp: 100 })
          .then((pokemon) => {
            expect(pokemon.hp).to.equal(100);
          })
          .catch((err) => {
            console.log(err);
          });
      })
    })
  }); 
});
