import prisma from '../config/prisma.js';

/**
 * Get all tasks
 * GET /api/tasks
 */
export const getTasks = async (req, res, next) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

/**
 * Get single task by ID
 * GET /api/tasks/:id
 */
export const getTaskById = async (req, res, next) => {
  try {
    const task = await prisma.task.findUnique({
      where: {
        id: req.params.id,
      },
    });
    
    if (!task) {
      res.status(404);
      throw new Error(`Task with ID ${req.params.id} not found`);
    }
    
    res.json(task);
  } catch (error) {
    next(error);
  }
};

/**
 * Create new task
 * POST /api/tasks
 */
export const createTask = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    
    if (!title) {
      res.status(400);
      throw new Error('Title is required');
    }
    
    const newTask = await prisma.task.create({
      data: {
        title,
        description: description || '',
        status: status || 'pending',
      },
    });
    
    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

/**
 * Update task
 * PUT /api/tasks/:id
 */
export const updateTask = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    
    // First verify if task exists to return proper 404
    const taskExists = await prisma.task.findUnique({
      where: { id: req.params.id }
    });

    if (!taskExists) {
      res.status(404);
      throw new Error(`Task with ID ${req.params.id} not found`);
    }

    const updatedTask = await prisma.task.update({
      where: {
        id: req.params.id,
      },
      data: {
        title: title !== undefined ? title : undefined,
        description: description !== undefined ? description : undefined,
        status: status !== undefined ? status : undefined,
      },
    });
    
    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete task
 * DELETE /api/tasks/:id
 */
export const deleteTask = async (req, res, next) => {
  try {
    // First verify if task exists to return proper 404
    const taskExists = await prisma.task.findUnique({
      where: { id: req.params.id }
    });

    if (!taskExists) {
      res.status(404);
      throw new Error(`Task with ID ${req.params.id} not found`);
    }

    const deletedTask = await prisma.task.delete({
      where: {
        id: req.params.id,
      },
    });
    
    res.json({ message: 'Task deleted successfully', task: deletedTask });
  } catch (error) {
    next(error);
  }
};
