const express = require("express");

const accountsDB = require("./accountsModel");

const Router = express.Router();

Router.get("/", (req, res) => {
  accountsDB
    .get()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error the data",
      });
    });
});

Router.get("/:id", validateId, (req, res) => {
  res.status(200).json(req.proj);
});

Router.post("/", (req, res) => {
  accountsDB
    .insert(req.body)
    .then((resp) => {
      res.status(201).json(resp);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error adding the action" });
    });
});

Router.put("/:id", validateId, (req, res) => {
  const { id } = req.params;
  accountsDB.update(id, req.body).then((data) => {
    res.status(200).json(data);
  });
});

Router.delete("/:id", validateId, (req, res) => {
  const { id } = req.params;

  accountsDB
    .remove(id)
    .then((data) => {
      res.status(200).json({ message: "Account is removed successfully." });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error removing the account" });
    });
});

function validateId(req, res, next) {
  const { id } = req.params;

  accountsDB
    .get(id)
    .then((data) => {
      if (data) {
        req.proj = data;
        next();
      } else {
        res.status(400).send("invalid account id");
        next();
      }
    })
    .catch((err) => {
      res.status(500).send("Something didn't work.");
      next();
    });
}

module.exports = Router;
