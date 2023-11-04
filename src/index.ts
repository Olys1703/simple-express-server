import express from "express";
const app = express();
const port = 3003;

const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);

const db = {
  courses: [
    { id: 1, title: "js" },
    { id: 2, title: "ts" },
    { id: 3, title: "java" },
    { id: 4, title: "dart" },
    { id: 5, title: "rn" },
  ],
};

app.get("/", (req, res) => {
  res.json({ message: "kek" });
  // res.send({message: 'kek'});
  // res.send('kek');
});

app.get("/courses/:id", (req, res) => {
  const course = db.courses.find((c) => c.id === +req.params.id);
  if (!course) {
    res.sendStatus(404);
    return;
  }
  res.status(201).json(course);
});

app.get("/courses", (req, res) => {
  let courses = db.courses;
  if (req.query.title) {
    courses = db.courses.filter((c) => c.title === req.query.title);
  }
  res.json(courses);
});

app.post("/courses", (req, res) => {
  const id = (db.courses.concat().pop()?.id || 0) + 1;
  const course = { id, title: req.body.title };
  db.courses.push(course);
  res.json(course);
});

app.delete("/courses/:id", (req, res) => {
  db.courses = db.courses.filter((c) => c.id !== +req.params.id);
  res.sendStatus(204);
});

app.put("/courses/:id", (req, res) => {
  const title = req.body.title;
  if (!title) {
    res.sendStatus(404);
    return;
  }
  const course = db.courses.find((c) => c.id === +req.params.id);
  if (!course) {
    res.sendStatus(404);
    return;
  }
  course.title = title;
  res.status(200).json(course);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
