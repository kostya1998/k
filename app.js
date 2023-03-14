import express from "express";
import path from "path";
import __dirname from "./__dirname.js";
import { v4 } from "uuid";

const PORT = process.env.PORT || 3030;

let app = express();

let CONTACTS = [{ id: v4(), name: "kostya", value: "admin", marked: false }];

app.use(express.json());

//GET
app.get("/api/contacts", (req, res) => {
  res.status(200).json(CONTACTS);
});
//POST
app.post("/api/contacts", (req, res) => {
  const contact = { ...req.body, id: v4(), marked: false };
  CONTACTS.push(contact);
  res.status(201).json(contact);
});
//DELETE
app.delete("/api/contacts/:id", (req, res) => {
  CONTACTS = CONTACTS.filter((c) => c.id !== req.params.id);
  res.status(200).json({ message: "контакт удален" });
});
//PUT
app.put("/api/contacts/:id", (req, res) => {
  const idx = CONTACTS.findIndex((c) => c.id === req.params.id);
  CONTACTS[idx] = req.body;
  res.json(CONTACTS[idx]);
  console.log(CONTACTS);
});

app.use(express.static(path.resolve(__dirname, "client")));

app.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "index.html"));
});
app.listen(PORT, () =>
  console.log(`server has been started on port ${PORT}...`)
);
