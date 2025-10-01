// Validation middleware for request data
const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    
    if (error) {
      const errorMessage = error.details.map(detail => detail.message).join(', ');
      return res.status(400).json({
        success: false,
        message: `Validation error: ${errorMessage}`
      });
    }
    
    next();
  };
};

// Validate player data
const validatePlayer = (req, res, next) => {
  const { name, skills, basePrice } = req.body;
  
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Player name is required and must be a non-empty string'
    });
  }
  
  if (!skills || !Array.isArray(skills) || skills.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Skills must be a non-empty array'
    });
  }
  
  if (!basePrice || typeof basePrice !== 'number' || basePrice <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Base price must be a positive number'
    });
  }
  
  // Validate skills array
  const validSkills = ['Batting', 'Bowling'];
  const invalidSkills = skills.filter(skill => !validSkills.includes(skill));
  
  if (invalidSkills.length > 0) {
    return res.status(400).json({
      success: false,
      message: `Invalid skills: ${invalidSkills.join(', ')}. Valid skills are: ${validSkills.join(', ')}`
    });
  }
  
  next();
};

// Validate team data
const validateTeam = (req, res, next) => {
  const { name, budget } = req.body;
  
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Team name is required and must be a non-empty string'
    });
  }
  
  if (!budget || typeof budget !== 'number' || budget <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Budget must be a positive number'
    });
  }
  
  next();
};

// Validate bid data
const validateBid = (req, res, next) => {
  const { teamId, bidAmount } = req.body;
  
  if (!teamId || typeof teamId !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Team ID is required and must be a string'
    });
  }
  
  if (!bidAmount || typeof bidAmount !== 'number' || bidAmount <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Bid amount must be a positive number'
    });
  }
  
  next();
};

// Validate ID parameter
const validateId = (req, res, next) => {
  const { id } = req.params;
  
  if (!id || isNaN(parseInt(id))) {
    return res.status(400).json({
      success: false,
      message: 'Valid ID is required'
    });
  }
  
  next();
};

module.exports = {
  validateRequest,
  validatePlayer,
  validateTeam,
  validateBid,
  validateId
};
