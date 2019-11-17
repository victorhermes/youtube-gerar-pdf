const express = require("express");
const fs = require("fs");
const router = express.Router();
const PDFDocument = require("pdfkit");

// array de nomes para gerar o pdf
const names = [
  { filename: "Luiz" },
  { filename: "Marcos" },
  { filename: "Victor" },
  { filename: "Jorge" },
  { filename: "Lucas" },
  { filename: "Paulo" }
];

router.post("/", (req, res) => {
  /*
  const doc = new PDFDocument();
  let filename = "Victor Hermes";
  let content = "Certificado de pdfkit";

  // Opção inline abre o pdf em outra guia
  // Opção attachment faz o download do pdf
  res.setHeader(
    "Content-disposition",
    'inline; filename="' + filename + ".pdf" + '"'
  );
  res.setHeader("Content-type", "application/pdf");

  doc.text(content, 50, 50);
  doc.pipe(res);
  doc.end();
  */

  // gerar pdf em massa e salvar na pasta public
  try {
    //pega o array names e para cada filename, gera um pdf
    names.map(name => {
      const doc = new PDFDocument({
        layout: "landscape"
      });

      const pdfStream = fs.createWriteStream(`public/pdf/${name.filename}.pdf`);

      doc.fontSize(40).text(name.filename, { align: "center" }, 315);
      doc.image("public/images/cert.png", 10, 35, { width: 770 });
      doc.pipe(pdfStream);
      doc.end();
    });
  } catch (err) {
    console.error("ERROR: " + err.message);
  } finally {
    res.redirect("/");
  }
});

module.exports = router;
