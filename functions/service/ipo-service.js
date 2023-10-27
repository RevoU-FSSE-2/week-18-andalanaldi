const { body, validationResult } = require('express-validator');

const getAllIpoToDo = async (req, res) => {
  try {
      // const filter = {}
      // if (req.role=="broker") {
      //   filter = {isDeleted: false, brokerId: req.id} 
      // } else {
      //   filter = {isDeleted: false}
      // }
      // const ipoCollection = req.db.collection('ipo-todow18');
      // const ipo = await ipoCollection.find(filter).toArray();
      let ipo = {}
      if (req.role === 'client') {
        ipo = await req.db
          .collection('ipo-todow18')
          .find({clientid: req.id})
          .toArray();
      } else {
        ipo = await req.db.collection('ipo-todow18').find().toArray();
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
  await Promise.all([
    body('clientid')
      .notEmpty()
      .withMessage('Client ID cannot be blank')
      .isString()
      .withMessage('Client ID must be a string')
      .run(req),
    body('tickercode')
      .notEmpty()
      .withMessage('Ticker code cannot be blank')
      .isString()
      .withMessage('Ticker code must be a string')
      .run(req),
    body('purpose')
      .notEmpty()
      .withMessage('Purpose cannot be blank')
      .isString()
      .withMessage('Purpose must be a string')
      .run(req),
    body('outstanding')
      .notEmpty()
      .withMessage('Outstanding cannot be blank')
      .isFloat()
      .withMessage('Outstanding must be a floating-point number')
      .run(req),
    body('status')
      .notEmpty()
      .withMessage('Status cannot be blank')
      .isString()
      .withMessage('Status must be a string')
      .run(req),
    body('priority')
      .notEmpty()
      .withMessage('Priority cannot be blank')
      .isNumeric()
      .withMessage('Priority must be a number')
      .run(req),
    body('deadline')
      .notEmpty()
      .withMessage('Deadline cannot be blank')
      .isISO8601()
      .withMessage('Deadline must be a valid date in ISO8601 format')
      .custom((value) => {
        // Custom validation to check if the deadline is in the future
        const currentDate = new Date();
        const deadlineDate = new Date(value);
        if (deadlineDate <= currentDate) {
          throw new Error('Deadline must be in the future');
        }
        return true;
      })
      .run(req),
  ]);

  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).send({ error: result.array() });
    return
  }
  const { clientid, tickercode, purpose, outstanding, status, priority, deadline } = req.body;

  console.log( clientid, tickercode, purpose, outstanding, status, priority, deadline, '<=== ipo todo ===>');

  try {
      const ipoCollection = req.db.collection('ipo-todow18');
      const newIpo = await ipoCollection.insertOne({ clientid, tickercode, purpose, outstanding, status, priority, deadline });

      res.status(200).json({
          message: 'To Do List of IPO Order Preperations successfully created',
          data: newIpo,
      });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

const updateIpoToDo = async (req, res) => {
  await Promise.all([
    body('tickercode')
      .optional()
      .isString()
      .withMessage('Ticker code must be a string')
      .run(req),
    body('purpose')
      .optional()
      .isString()
      .withMessage('Purpose must be a string')
      .run(req),
    body('outstanding')
      .optional()
      .isFloat()
      .withMessage('Outstanding must be a floating-point number')
      .run(req),
    body('priority')
      .optional()
      .isNumeric()
      .withMessage('Priority must be a number')
      .run(req),
    body('deadline')
      .optional()
      .isISO8601()
      .withMessage('Deadline must be a valid date in ISO8601 format')
      .custom((value) => {
        // Custom validation to check if the deadline is in the future
        const currentDate = new Date();
        const deadlineDate = new Date(value);
        if (deadlineDate <= currentDate) {
          throw new Error('Deadline must be in the future');
        }
        return true;
      })
      .run(req),
  ]);

  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).send({ error: result.array() });
    return
  }

  const id = req.params.id 
  const { tickercode, purpose, outstanding, priority, deadline } = req.body;

  try {
      const ipoCollection = req.db.collection('ipo-todow18');
      const findIpoId = await ipoCollection.findOne({ _id: id })
      if (!findIpoId) {
        res.status(400).json({ error: "Not Found" });
        return
      }

      if (req.role==='client' && findIpoId.clientid != req.id) {
        res.status(403).json({ error: "Forbidden Access" });
        return
      }
        const updatedIpou = await ipoCollection.updateOne(
            { _id: ObjectId(id) }, // MongoDB's default ObjectId is used as assumed
            { $set: { tickercode, purpose, outstanding, priority, deadline } }
        );
  
        if (updatedIpou.matchedCount === 0) {
            // To Do List of IPO Order Preperations are not found
            res.status(404).json({ error: 'To Do List of IPO Order Preperations are not found' });
            return;
        }

      console.log( code, `<=== IPO todo ===>`)

      res.status(200).json({
          message: 'To Do List of IPO Order Preperations update successfully created',
          data: updatedIpou,
      });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

const deleteIpoToDo = async (req, res) => {
  const id = req.params.id 
  // const { code } = req.body;

  try {
      const ipoCollection = req.db.collection('ipo-todow18');
      const findIpoId = await ipoCollection.findOne({ _id: id })
      if (!findIpoId) {
        res.status(400).json({ error: "Not Found" });
        return
      }

      if (req.role==='client' && findIpoId.clientid != req.id) {
        res.status(403).json({ error: "Forbidden Access" });
        return
      }
        const deletedIpou = await ipoCollection.deleteOne(
            { _id: id }, // MongoDB's default ObjectId is used as assumed
            // { $pull: { code } }
        );
  
        if (deletedIpou.matchedCount === 0) {
            // To Do List of IPO Order Preperations are not found
            res.status(404).json({ error: 'To Do List of IPO Order Preperations are not found' });
            return;
        }

      console.log( id, `<=== IPO todo ===>`)

      res.status(200).json({
          message: 'To Do List of IPO Order Preperations deleted successfully',
          data: deletedIpou,
      });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

const approvalIpo = async (req, res) => {
    // Validate the 'status' field
    await body('status')
    .notEmpty()
    .withMessage('Status cannot be blank')
    .isIn(['approved', 'rejected']) // Add valid status values here
    .withMessage('Status must be "approved" or "rejected"')
    .run(req);

  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).send({ error: result.array() });
    return;
  }
  
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
  deleteIpoToDo,
  approvalIpo,
};
