// server/routes/authRoutes.js
router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/logout', logoutUser);
router.get('/me', protect, getMe);
router.post('/verify-otp', verifyOtp);
router.post('/resend-otp', resendOtp);

// server/routes/projectRoutes.js
router.get('/', getProjects);
router.get('/:id', getProject);
router.post('/', protect, createProject);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);
router.get('/my-projects', protect, getMyProjects);

// server/routes/contactRoutes.js
router.post('/', submitContact);
router.get('/admin/contacts', protect, admin, getContacts);
router.get('/admin/contacts/:id', protect, admin, getContact);
router.patch('/admin/contacts/:id', protect, admin, updateContact);