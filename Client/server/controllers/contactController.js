import Contact from '../models/Contact.js';

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
export const submitContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    
    // Basic validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: 'Please provide all required fields'
      });
    }
    
    // Create contact
    const contact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
      source: 'website'
    });
    
    // Here you can add email notification logic
    
    res.status(201).json({
      success: true,
      message: 'Thank you for contacting us! We will get back to you soon.',
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email
      }
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit contact form',
      message: error.message
    });
  }
};

// @desc    Get all contacts (for admin)
// @route   GET /api/contact
// @access  Private
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .select('-__v');
    
    res.json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: error.message
    });
  }
};