const { query } = require("express");
const db = require("../dbConfig");

function get(id) {
  let query = db("accounts");

  if (id) {
    return query
      .where("id", id)
      .first()
      .then((account) => {
        if (account) {
          return account;
        } else {
          return null;
        }
      });
  } else {
    return query.then((accounts) => {
      return accounts.map((account) => {
        return account;
      });
    });
  }
}

function insert(account) {
  return db("accounts")
    .insert(account, "id")
    .then(([id]) => get(id));
}

function update(id, data) {
  return db("accounts")
    .where("id", id)
    .update(data)
    .then((changes) => (changes > 0 ? get(id) : null));
}

function remove(id) {
  return db("accounts").where("id", id).del();
}

module.exports = { get, insert, update, remove };
