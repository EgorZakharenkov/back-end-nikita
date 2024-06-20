import Test from "../models/Test.js";
import Device from "../models/Device.js";

export const create = async (req, res) => {
  try {
    const newTest = await Test.create(req.body);
    const currentDevice = await Device.findById(req.params.id);
    currentDevice.tests.push(newTest);
    await currentDevice.save();
    res.status(201).json(newTest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAll = async (req, res) => {
  try {
    const allTests = await Test.find();
    res.status(200).json(allTests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOne = async (req, res) => {
  const { id } = req.params;
  try {
    const test = await Test.findById(id);
    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }
    res.status(200).json(test);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const update = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTest = await Test.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedTest) {
      return res.status(404).json({ message: "Test not found" });
    }
    res.status(200).json(updatedTest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTest = await Test.findByIdAndDelete(id);
    if (!deletedTest) {
      return res.status(404).json({ message: "Test not found" });
    }
    res.status(200).json({ message: "Test deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
