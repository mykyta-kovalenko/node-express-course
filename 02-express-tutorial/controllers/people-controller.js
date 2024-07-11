import data from '../data.js';

const getPeople = (req, res) => {
  res.status(200).json(data.people);
};

const addPerson = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: 'Please provide a name.' });
  }

  data.people.push({ id: data.people.length + 1, name });
  res.status(201).json({ success: true, data: data.people });
};

const updatePerson = (req, res) => {
  const { id } = req.params;

  let foundPerson = data.people.find((p) => p.id === Number(id));

  if (!foundPerson) {
    return res
      .status(404)
      .json({ success: false, message: 'Person not found.' });
  }

  console.log('Current People Data:', data.people);

  foundPerson.name = 'John Doe (updated)';
  res.status(200).json({ success: true, data: data.people });

  console.log('Updated People Data:', data.people);
};

const deletePerson = (req, res) => {
  const { id } = req.params;

  let foundPerson = data.people.find((p) => p.id === Number(id));

  if (!foundPerson) {
    return res
      .status(404)
      .json({ success: false, message: 'Person not found.' });
  }

  data.people = data.people.filter((p) => p.id !== Number(id));
  res.status(200).json({ success: true, data: data.people });
};

export { addPerson, deletePerson, getPeople, updatePerson };
