import Device from "../models/Device.js";

export const create = async (req, res) => {
  try {
    const newDevice = await Device.create(req.body);
    res.status(201).json(newDevice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAll = async (req, res) => {
  try {
    const devices = await Device.find();
    res.status(200).json(devices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOne = async (req, res) => {
  const { id } = req.params;
  try {
    const device = await Device.findById(id)
      .populate("infos")
      .populate("tests");
    if (!device) {
      return res.status(404).json({ message: "Device not found" });
    }
    res.status(200).json(device);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const update = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedDevice = await Device.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedDevice) {
      return res.status(404).json({ message: "Device not found" });
    }
    res.status(200).json(updatedDevice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const removedDevice = await Device.findByIdAndDelete(id);
    if (!removedDevice) {
      return res.status(404).json({ message: "Device not found" });
    }
    res.status(200).json({ message: "Device removed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
