const express = require("express");
const fs = require("fs");
var archiver = require("archiver");
const router = express.Router();

const names = [
  { filename: "Luiz" },
  { filename: "Marcos" },
  { filename: "Victor" },
  { filename: "Jorge" },
  { filename: "Jorge" },
  { filename: "Paulo" }
];

router.post("/", (req, res) => {
  /*var output = fs.createWriteStream(
    `public/zipFiles/certificate_${Math.random()}.zip`
  );*/

  var archive = archiver("zip", {
    zlib: { level: 9 }
  });

  archive.on("error", function(err) {
    throw err;
  });

  // archive.pipe(output) baixa para uma pasta dentro do app
  archive.pipe(res.attachment("certificate.zip"));

  names.map(n => {
    archive.file(`public/pdf/${n.filename}.pdf`, {
      name: `${n.filename}.pdf`
    });
  });

  archive.finalize();
});

module.exports = router;
