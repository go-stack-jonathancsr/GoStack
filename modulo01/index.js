const express = require("express");

const server = express();

const projects = [];

function findProjectByID(id) {
  projects.find(element => {
    return element.id == id;
  });
}

server.get("/projects/", (req, res) => {
  res.json(projects);
});

server.get("/projects/:id", (req, res) => {
  const { id } = req.params;
  res.json(findProjectByID(id));
});

server.post("/projects/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projects.put({ id: id, title: title, tasks: [] });
  return res.json(projects);
});

server.post("/projects/:id/tasks", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = findProjectByID(id);
  project.tasks.put(title);

  return res.json(project);
});

server.delete("/projects/:id", (req, res) => {
  const { id } = req.params;
  const project = findProjectByID(id);

  projects.slice(projects.indexOf(project), 1);
  return res.json(projects);
});

server.listen(3000);
