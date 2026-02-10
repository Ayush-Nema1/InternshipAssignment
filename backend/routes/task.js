router.get("/:userId", async (req, res) => {
  if (!req.params.userId || req.params.userId === "undefined") {
    return res.status(400).json({ message: "Invalid userid" });
  }

  const todos = await Task.find({ userId: req.params.userId });
  res.json(todos);
});

router.post("/", async (req, res) => {
  const { title, userId } = req.body;

  if (!title || !userId) {
    return res.status(400).json({ message: "title and userid required" });
  }

  const todo = await Task.create({ title, userId });
  res.json(todo);
});

router.delete("/:id", async (req, res) => {
  const deleted = await Task.findByIdAndDelete(req.params.id);

  if (!deleted) {
    return res.status(404).json({ message: "todo not found" });
  }

  res.json({ message: "deleted permanently" });
});
