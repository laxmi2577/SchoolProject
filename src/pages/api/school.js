// pages/api/schools.js
import nextConnect from 'next-connect';
import middleware from '../../middleware/middleware';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const upload = multer({ dest: path.join(process.cwd(), 'public/school-images') });

const apiRoute = nextConnect({
 onError(error, req, res) {
   res.status(501).json({ error: `Sorry something went wrong! ${error.message}` });
 },
 onNoMatch(req, res) {
   res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
 },
});

apiRoute.use(middleware).use(upload.single('image'));

apiRoute.get(async (req, res) => {
 const { rows } = await req.db.query('SELECT * FROM schools');
 res.json(rows);
});

apiRoute.post(async (req, res) => {
 const imageUrl = req.protocol + '://' + req.get('host') + '/school-images/' + req.file.filename;
 const newSchool = { ...req.body, image: imageUrl };
 const { rowCount } = await req.db.query('INSERT INTO schools (name, address, city, contact_number, image, email) VALUES ($1, $2, $3, $4, $5, $6)',
    Object.values(newSchool)
 );
 res.json({ rowCount });
});

export default apiRoute;