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
  try {
    var archive = archiver("zip", {
      zlib: { level: 9 }
    });

    // archive.pipe(res.attachment("certificados.zip"));
    archive.pipe(
      fs.createWriteStream(
        `public/certificados/certificado_${Math.random()}.zip`
      )
    );

    names.map(n => {
      archive.file(`public/pdf/${n.filename}.pdf`, {
        name: `${n.filename}.pdf`
      });
    });

    archive.finalize();
  } catch (err) {
    console.error("ERROR: " + err.message);
  } finally {
    res.redirect("/");
  }
});

module.exports = router;
