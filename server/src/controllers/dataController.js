exports.getData = (req, res) => {
    res.json({
      message: 'Hello from the backend!',
      timestamp: new Date().toISOString()
    });
  };