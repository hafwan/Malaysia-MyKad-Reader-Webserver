const express = require("express");
const { extractMyKad } = require("./utils/mykad");
const { extractMyKid } = require("./utils/mykid");
var cors = require('cors')
var app = express()
const port = 9090;

app.use(cors())
app.use(express.json());

app.post("/api/smartcard/mykad", async (req, res) => {
  
  // console information
  console.clear();
  console.info(`
    MyKadReader Webserver\n
    
    This program need to run to read MyKad from
    attached card reader and bound to:
    POST localhost:9090/api/smartcard/mykad
    -------------------------------------------\n
  `);

  try {
    let data = await extractMyKad();

    console.info({
      status: 'MyKad berjaya dibaca.',
      nama: data?.name
    });

    res.status(200).json(data)

  } catch (error) {

    console.error({
      status: 'Kad gagal dibaca.',
      detail: error.message 
    });

    res.status(404).json({ 
      "status": 404,
      "title":"Tidak berjaya.",
      "detail": error.message,  
    });
  }
});

app.post("/api/smartcard/mykid", async (req, res) => {
  
  // console information
  console.clear();
  console.info(`
    MyKidReader Webserver\n
    
    This program need to run to read MyKid from
    attached card reader and bound to:
    POST localhost:9090/api/smartcard/mykid
    -------------------------------------------\n
  `);

  try {
    let data = await extractMyKid();

    console.info({
      status: 'MyKid berjaya dibaca.',
      nama: data?.name
    });

    res.status(200).json(data)

  } catch (error) {

    console.error({
      status: 'Kad gagal dibaca.',
      detail: error.message 
    });

    res.status(404).json({ 
      "status": 404,
      "title":"Tidak berjaya.",
      "detail": error.message,  
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`MyKadReader is running on port ${port}`);
});

