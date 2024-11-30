const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON body
app.use(express.json());

let medicines = [
  {
    id: 1,
    name: 'Paracetamol',
    price: 50,
    manufactureDate: '2023-01-01',
    expiryDate: '2025-01-01'
  },
  {
    id: 2,
    name: 'Ibuprofen',
    price: 40,
    manufactureDate: '2023-03-01',
    expiryDate: '2025-03-01'
  },
  {
    id: 3,
    name: 'Amoxicillin',
    price: 120,
    manufactureDate: '2022-07-01',
    expiryDate: '2024-07-01'
  },
  {
    id: 4,
    name: 'Aspirin',
    price: 60,
    manufactureDate: '2023-05-15',
    expiryDate: '2026-05-15'
  }
];

// POST: Add a new medicine
app.post('/medicines', (req, res) => {
  const { name, price, manufactureDate, expiryDate } = req.body;

  if (!name || !price || !manufactureDate || !expiryDate) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const newMedicine = {
    id: medicines.length + 1,
    name,
    price,
    manufactureDate,
    expiryDate

  };

  medicines.push(newMedicine);
  res.status(201).json({
    message: 'Medicine added successfully',
    medicine: newMedicine
  });
});

// GET: Get all medicines
app.get('/medicines', (req, res) => {
  res.status(200).json(medicines);
});

// GET: Get a specific medicine by ID
app.get('/medicines/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const medicine = medicines.find(m => m.id === id);

  if (!medicine) {
    return res.status(404).json({ message: 'Medicine not found.' });
  }

  res.status(200).json(medicine);
});

// PUT: Update a medicine (full update)
app.put('/medicines/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, price, manufactureDate, expiryDate } = req.body;

  const medicineIndex = medicines.findIndex(m => m.id === id);
  if (medicineIndex === -1) {
    return res.status(404).json({ message: 'Medicine not found.' });
  }

  medicines[medicineIndex] = {
    id,
    name,
    price,
    manufactureDate,
    expiryDate
  };

  res.status(200).json({
    message: 'Medicine updated successfully',
    medicine: medicines[medicineIndex]
  });
});

// PATCH: Partially update a medicine
app.patch('/medicines/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, price, manufactureDate, expiryDate } = req.body;

  const medicineIndex = medicines.findIndex(m => m.id === id);
  if (medicineIndex === -1) {
    return res.status(404).json({ message: 'Medicine not found.' });
  }

  // Only update the fields provided in the request
  if (name) medicines[medicineIndex].name = name;
  if (price) medicines[medicineIndex].price = price;
  if (manufactureDate) medicines[medicineIndex].manufactureDate = manufactureDate;
  if (expiryDate) medicines[medicineIndex].expiryDate = expiryDate;

  res.status(200).json({
    message: 'Medicine partially updated successfully',
    medicine: medicines[medicineIndex]
  });
});

// DELETE: Delete a medicine by ID
app.delete('/medicines/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const medicineIndex = medicines.findIndex(m => m.id === id);
  if (medicineIndex === -1) {
    return res.status(404).json({ message: 'Medicine not found.' });
  }

  medicines.splice(medicineIndex, 1);
  res.status(200).json({
    message: 'Medicine deleted successfully'
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(medicines.length);
});

