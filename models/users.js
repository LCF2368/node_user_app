// Create a model from the schema
// this model provides an interface to the database for creating, querying, updating, and deleting records
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Last name of the user, required field
  lastName: { 
    type: String, 
    required: true 
  },
  
  // First name of the user, required field
  firstName: { 
    type: String, 
    required: true 
  },
  
  // Date of birth of the user, required field
  dateOfBirth: { 
    type: Date, 
    required: true 
  },
  
  // Primary address of the user, required field
  address1: { 
    type: String, 
    required: true 
  },
  
  // Secondary address of the user, optional field
  address2: { 
    type: String 
  },
  
  // City of residence, required field
  city: { 
    type: String, 
    required: true 
  },
  
  // Postal code, required field
  postalCode: { 
    type: String, 
    required: true 
  },
  
  // Country of residence, required field
  country: { 
    type: String, 
    required: true 
  },
  
  // Phone number of the user, required field
  phoneNumber: { 
    type: String, 
    required: true 
  },
  
  // Email address of the user, required field
  email: { 
    type: String, 
    required: true,
    unique: true // Ensures that each email is unique in the database
  },
  
  // Additional notes about the user, optional field
  notes: { 
    type: String 
  }
});

// Export the model so it can be used later in building the app
module.exports = mongoose.model('User', userSchema);