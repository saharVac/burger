// DEPENDENCIES
const express = require("express")
const Burger = require("../models/burger.js")

// ROUTER
var router = express.Router();

router.get("/", function(req, res) {
    Burger.all(function(data) {
      var hbsObject = {
        burgers: data
      };
      console.log(hbsObject);
      res.render("index", hbsObject);
    });
});
  
router.post("/api/burgers", function(req, res) {
    Burger.create(["burger_name"], [req.body.name], function(result) {
        console.log(req.body.name)
        res.json({ id: result.insertId });
    });
});
  
router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
  
    console.log("condition", condition);
  
    Burger.update(
        {
            devoured: req.body.devoured
        },
        condition,
        function(result) {
            if (result.changedRows === 0) {
                // If no rows were changed, then the ID must not exist, so 404
                return res.status(404).end();
            }
            res.status(200).end();
        }
    );
});

module.exports = router;