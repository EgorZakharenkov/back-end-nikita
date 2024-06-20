import Info from "../models/Info.js";
import Device from "../models/Device.js";
export const create = async (req, res) => {
  try {
    const newInfo = await Info.create(req.body);
    const currentDevice = await Device.findById(req.params.id);
    currentDevice.infos.push(newInfo);
    await currentDevice.save();
    res.status(201).json(newInfo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getOne = async (req, res) => {
  const { id } = req.params;
  try {
    const info = await Info.findById(id);
    if (!info) {
      return res.status(404).json({ message: "Info not found" });
    }
    res.status(200).json(info);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const update = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedInfo = await Info.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedInfo) {
      return res.status(404).json({ message: "Info not found" });
    }
    res.status(200).json(updatedInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedInfo = await Info.findByIdAndDelete(id);
    if (!deletedInfo) {
      return res.status(404).json({ message: "Info not found" });
    }
    res.status(200).json({ message: "Info deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
