const Request = require('../Models/requestSchema');
const multer = require("multer");
const path = require('path');

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../../client/assets/uploads'),
  filename: function (req, file, cb) {
    cb(null, 'file-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(pdf)$/)) {
      return cb(new Error('Please upload a valid PDF file'));
    }
    cb(null, true);
  }
}).single('file');

const newrequest = async (req, res) => {
  try {
    upload(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ success: false, error: err.message });
      }

      const userID = req.user._id;
      const formData = req.body;
      const file = req.file ? req.file.filename : null;

      const newRequest = new Request({
        title: formData.title,
        description: formData.description,
        university_id: formData.university_id,
        fund: formData.fund,
        user: userID,
        student_proof: file,
      });

      const request = await newRequest.save();
      res.json(request);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to create a new request' });
  }
};

const myRequests = (req, res) => {
  const userID = req.user._id; 
  Request.find({ is_deleted: false,user:userID})
      .then((data) => {
          res.json(data);
      })
      .catch((error) => {
          errorHandler(error, req, res);
      });
};

const allRequests = (req, res) => {

  Request.find({ is_deleted: false ,status:"accepted"})
      .then((data) => {
        res.render("donor", {
          requests: data,
          user: req.user,
          username: req.user.username,
        });
      })
      .catch((error) => {
          errorHandler(error, req, res);
      });
};

const pendingRequests = (req, res) => {
  const userID = req.user._id; 
  Request.find({ is_deleted: false,user:userID,status:"pending"})
      .then((data) => {
          res.json(data);
      })
      .catch((error) => {
          errorHandler(error, req, res);
      });
};
const acceptedRequests = (req, res) => {
  const userID = req.user._id; 
  Request.find({ is_deleted: false,user:userID,status:"accepted"})
      .then((data) => {
          res.json(data);
      })
      .catch((error) => {
          errorHandler(error, req, res);
      });
};

const rejectedRequests = (req, res) => {
  const userID = req.user._id; 
  Request.find({ is_deleted: false,user:userID,status:"rejected"})
      .then((data) => {
          res.json(data);
      })
      .catch((error) => {
          errorHandler(error, req, res);
      });
};



const updateRequest = async (req, res) => {
  try {
      const requestId = req.params.id;
      const updatedRequestData = req.body;
     const userID = req.user._id; 
     const request = await Request.findByIdAndUpdate(
      requestId,
      { ...updatedRequestData, user: userID, status: 'pending', is_deleted: false },
      { new: true } 
    );
      
      
      if (!request) {
          return res.status(404).json({ error: 'Request not found' });
      }
      const updatedRequest = await request.save();


      res.json(updatedRequest);
  } catch (error) {
      console.error('Error updating request:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateaccepted = async (req, res) => {
  try {
    const requestId = req.params.id;
    const updatedRequestData = req.body;
    
    const userID = req.user._id; 
    updatedRequestData.status = 'accepted';

    const request = await Request.findByIdAndUpdate(requestId, updatedRequestData, {
        user: userID
    });

    const updatedRequest = await request.save();

    res.json(updatedRequest);
} catch (error) {
    res.status(500).json({ error: 'Failed to delete Request' });
}
};

const updatereject = async (req, res) => {
  try {
    const requestId = req.params.id;
    const updatedRequestData = req.body;
    
    const userID = req.user._id; 
    updatedRequestData.status = 'rejected';

    const request = await Request.findByIdAndUpdate(requestId, updatedRequestData, {
        user: userID
    });

    const updatedRequest = await request.save();

    res.json(updatedRequest);
} catch (error) {
    res.status(500).json({ error: 'Failed to delete Request' });
}
};


const deleteRequest= async (req, res) => {
  try {
      const requestId = req.params.id;
      const updatedRequestData = req.body;
      
      const userID = req.user._id; 
      updatedRequestData.is_deleted = true;

      const request = await Request.findByIdAndUpdate(requestId, updatedRequestData, {
          user: userID
      });

      const updatedRequest = await request.save();

      res.json(updatedRequest);
  } catch (error) {
      res.status(500).json({ error: 'Failed to delete Request' });
  }
};





module.exports = {
  newrequest,
  myRequests,
  pendingRequests,
  acceptedRequests,
  rejectedRequests,
  updateRequest,
  deleteRequest,
  updatereject,
  updateaccepted,
  allRequests
};