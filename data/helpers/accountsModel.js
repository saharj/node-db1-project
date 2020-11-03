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

module.exports = { get, insert };
