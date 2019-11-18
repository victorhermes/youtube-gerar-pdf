const express = require("express");
const fs = require("fs");
var archiver = require("archiver");
const router = express.Router();

const names = [
  { filename: "Luiz" },
  { filename: "Marcos" },
  { filename: "Victor" },
  { filename: "Jorge" },
  { filename: "Lucas" },
  { filename: "Paulo" }
];

router.post("/", (req, res) => {
  var archive = archiver("zip", {
    zlib: { level: 9 }
  });

  archive.on("error", function(err) {
    throw err;
  });

  // archive.pipe(res.attachment("certificados.zip"));
  archive.pipe(
    fs.createWriteStream(`public/certificados/certificado_${Math.random()}.zip`)
  );

  names.map(n => {
    archive.file(`public/pdf/${n.filename}.pdf`, {
      name: `${n.filename}.pdf`
    });
  });

  archive.finalize();
});

module.exports = router;
