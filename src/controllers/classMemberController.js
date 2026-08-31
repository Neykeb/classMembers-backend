const ClassMember = require("../models/classMemberModel");

const getMembers = async (req, res, next) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      // $or sucht nachTreffern in firstName ODER lastName
      // $regex ermöglicht Teil-Suche, $options: 'i' ignoriert Groß-/Kleinschreibung
      query = {
        $or: [
          { firstName: { $regex: search, $options: "i" } },
          { lastName: { $regex: search, $options: "i" } },
        ],
      };
    }

    const members = await ClassMember.find(query);
    res.status(200).json(members);
  } catch (error) {
    next(error);
  }
};

// 2. GET: Dashboard-Statistiken abrufen
// Aufruf: GET /api/class-members/dashboard
const getDashboardStats = async (req, res, next) => {
  try {
    // countDocuments zählt die Treffer in MongoDB ohne alle Daten laden zu müssen
    const totalMembers = await ClassMember.countDocuments();
    const activeMembers = await ClassMember.countDocuments({
      status: "active",
    });
    const inactiveMembers = await ClassMember.countDocuments({
      status: "inactive",
    });
    const pendingMembers = await ClassMember.countDocuments({
      status: "pending",
    });

    res.status(200).json({
      total: totalMembers,
      active: activeMembers,
      inactive: inactiveMembers,
      pending: pendingMembers,
    });
  } catch (error) {
    next(error);
  }
};

// 3. GET: Einzelnes Mitglied anhand seiner MongoDB-ID abrufen
const getMemberById = async (req, res, next) => {
  try {
    const member = await ClassMember.findById(req.params.id);
    if (!member) {
      res.status(404);
      throw new Error("Mitglied nicht gefunden");
    }
    res.status(200).json(member);
  } catch (error) {
    next(error);
  }
};

// 4. POST: Neues Mitglied erstellen
const createMember = async (req, res, next) => {
  try {
    const newMember = await ClassMember.create(req.body);
    res.status(201).json(newMember);
  } catch (error) {
    next(error);
  }
};

// 5. PUT: Mitglied aktualisieren
const updateMember = async (req, res, next) => {
  try {
    // runValidators: true sorgt dafür, dass die Schema-Regeln (z.B. enum) auch beim Update geprüft werden
    const updatedMember = await ClassMember.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );

    if (!updatedMember) {
      res.status(404);
      throw new Error("Mitglied nicht gefunden");
    }

    res.status(200).json(updatedMember);
  } catch (error) {
    next(error);
  }
};

// 6. DELETE: Mitglied löschen
const deleteMember = async (req, res, next) => {
  try {
    const member = await ClassMember.findByIdAndDelete(req.params.id);
    if (!member) {
      res.status(404);
      throw new Error("Mitglied nicht gefunden");
    }
    res.status(200).json({ message: "Mitglied erfolgreich gelöscht" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMembers,
  getDashboardStats,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
};
