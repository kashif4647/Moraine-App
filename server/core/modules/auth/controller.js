/* eslint-disable no-underscore-dangle */
/* eslint-disable object-curly-newline */
import UserService from './service';

export default {
  registration: async (req, res) => {
    try {
      const { body } = req;
      const response = await UserService.createUser(body);
      return res.json(response);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const response = await UserService.userLogin(email, password);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
  createApplication: async (req, res) => {
    try {
      const payload = req.body;
      const response = await UserService.createApplication(payload);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
  updateApplicationStatus: async (req, res) => {
    try {
      const payload = req.body;
      const { id } = req.params;
      const response = await UserService.updateApplicationStatus(id, payload);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
  fetchApplication: async (req, res) => {
    try {
      const response = await UserService.fetchApplication();
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
  fetchApplicationByID: async (req, res) => {
    try {
      const { id } = req.params;
      const response = await UserService.fetchApplicationByID(id);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
  sendEmailToStudent: async (req, res) => {
    try {
      const { email } = req.params;
      const payload = req.body;
      const response = await UserService.sendEmailToStudent(email, payload);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
  selectProgram: async (req, res) => {
    try {
      const payload = req.body;
      const response = await UserService.selectProgram(payload);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
  updateProgramStatus: async (req, res) => {
    try {
      const payload = req.body;
      const { id } = req.params;
      const response = await UserService.updateProgramStatus(id, payload);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
};
