
const getAllIpoToDo = async (req, res) => {
  try {
      const filter = {}
      if (req.role=="broker") {
        filter = {isDeleted: false, brokerId: req.id} 
      } else {
        filter = {isDeleted: false}
      }
      const ipoCollection = req.db.collection('ipo-todow18');
      const ipo = await ipoCollection.find(filter).toArray();
      let ipou = {}
      if (req.role === 'client') {
        ipou = await req.db
          .collection('ipo-todow18')
          .find({username: req.id})
          .toArray();
      } else {
        ipou = await req.db.collection('ipo-todow18').find().toArray();
      }
      res.status(200).json({
          message: 'To Do List of IPO Order Preperations successfully retrieved',
          data: ipo,
      });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

const createIpoToDo = async (req, res) => {
  const { username, 
          code, 
          sector, 
          owner, 
          purpose, 
          valuation,
          performance, 
          outstanding, 
          ipovalue, 
          underwriter,
          status, 
          priority, 
          deadline, } = req.body;

  console.log(
    username, 
    code, 
    sector, 
    owner, 
    purpose, 
    valuation,
    performance, 
    outstanding, 
    ipovalue, 
    underwriter,
    status,
    priority, 
    deadline, '<=== ipo todo ===>');

  try {
      const ipoCollection = req.db.collection('ipo-todow18');
      const newIpo = await ipoCollection.insertOne({ 
        username, 
        code, 
        sector, 
        owner, 
        purpose, 
        valuation,
        performance, 
        outstanding, 
        totalipo, 
        underwriter,
        status,          
        priority, 
        deadline, });

      res.status(200).json({
          message: 'To Do List of IPO Order Preperations successfully created',
          data: newIpo,
      });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

const updateIpoToDo = async (req, res) => {
  const id = req.params.id 
  const { username, code } = req.body;

  try {
      const ipoCollection = req.db.collection('ipo-todow18');
      const updateIpo = await ipoCollection.findOne({ _id: id })
      if (!updateIpo) {
        res.status(400).json({ error: "Not Found" });
        return
      }

      if (req.role==='client' && updateIpo.username != req.id) {
        res.status(403).json({ error: "Forbidden Access" });
        return
      }

      console.log(username, code, `<=== IPO todo ===>`)

      res.status(200).json({
          message: 'To Do List of IPO Order Preperations update successfully created',
          data: updateIpo,
      });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

const approvalIpo = async (req, res) => {
  const { id, status } = req.body;

  console.log(id, status, '<=== ipo todo ===>');

  try {
      const ipoCollection = req.db.collection('ipo-todow18');
      const updatedIpo = await ipoCollection.updateOne(
          { _id: ObjectId(id) }, // MongoDB's default ObjectId is used as assumed
          { $set: { status } }
      );

      if (updatedIpo.matchedCount === 0) {
          // To Do List of IPO Order Preperations are not found
          res.status(404).json({ error: 'To Do List of IPO Order Preperations are not found' });
          return;
      }

      res.status(200).json({
          message: 'To Do List of IPO Order Preperations status successfully approved',
          data: updatedIpo,
      });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllIpoToDo,
  createIpoToDo,
  updateIpoToDo,
  approvalIpo,
};
