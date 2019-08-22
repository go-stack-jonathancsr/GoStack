const express = require("express");

const server = express();
server.use(express.json());
const projects = [];

var reqs = 0;

function returnNumberRequests(req, res, next) {
  console.log("Numero de requisições : ", ++reqs);
  next();
}

function verifyProjectExist(req, res, next) {
  const { id } = req.params;
  if (findProjectByID(id))
    return res.json({ error: "Project exists" }).status(400);
  next();
}

function findProjectByID(id) {
  return projects.find(element => {
    return element.id == id;
  });
}

server.use(returnNumberRequests);

server.get("/projects/", (req, res) => {
  res.json(projects);
});

server.get("/projects/:id", verifyProjectExist, (req, res) => {
  const { id } = req.params;
  res.json(findProjectByID(id));
});

server.post("/projects/:id", verifyProjectExist, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = { id: id, title: title, tasks: [] };
  projects.push(project);
  return res.json(projects);
});

server.post("/projects/:id/tasks", verifyProjectExist, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = findProjectByID(id);
  project.tasks.put(title);

  return res.json(project);
});

server.delete("/projects/:id", verifyProjectExist, (req, res) => {
  const { id } = req.params;
  const project = findProjectByID(id);

  projects.slice(projects.indexOf(project), 1);
  return res.json(projects);
});

server.listen(3000);
