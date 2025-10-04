import multer from 'multer';
import axios from 'axios';
import FormData from 'form-data';
import { fileTypeFromBuffer } from 'file-type';

const upload = multer({ storage: multer.memoryStorage() });

// Fungsi upload ke yupra.my.id (dari kode bot Anda)
async function uploadToYupra(buffer, filename) {
    const form = new FormData();
    form.append('files', buffer, { filename });

    const response = await axios.post('https://cdn.yupra.my.id/upload', form, {
        headers: {
            ...form.getHeaders(),
            'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36'
        },
        timeout: 120000 // Timeout 2 menit
    });

    return response.data;
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    upload.single('image')(req, res, async function (err) {
        if (err) {
            return res.status(500).json({ error: 'Gagal memproses file.' });
        }

        try {
            const file = req.file;
            const prompt = req.body.prompt;

            if (!file || !prompt) {
                return res.status(400).json({ error: 'File dan prompt diperlukan.' });
            }

            // --- STEP 1: Upload ke yupra.my.id ---
            console.log('[SERVER] Mengunggah ke yupra.my.id...');
            const uploadResult = await uploadToYupra(file.buffer, file.originalname);

            if (!uploadResult.success || !uploadResult.files || uploadResult.files.length === 0) {
                throw new Error('Gagal mengunggah ke yupra.my.id.');
            }

            const uploadedFile = uploadResult.files[0];
            const uploadedImageUrl = `https://cdn.yupra.my.id${uploadedFile.url}`;
            console.log(`[SERVER] ✅ Upload berhasil: ${uploadedImageUrl}`);

            // --- STEP 2: Panggil API AI ---
            console.log('[SERVER] Memanggil API AI...');
            const aiApiUrl = `https://api.platform.web.id/nano-banana?imageUrl=${encodeURIComponent(uploadedImageUrl)}&prompt=${encodeURIComponent(prompt)}`;
            
            const aiResponse = await axios.get(aiApiUrl);

            if (!aiResponse.data.success) {
                throw new Error('API AI mengembalikan error.');
            }

            const resultImageUrl = aiResponse.data.result.results[0].url;
            if (!resultImageUrl) {
                throw new Error('API AI tidak mengembalikan URL hasil.');
            }
            
            console.log(`[SERVER] ✅ Berhasil mendapatkan gambar hasil: ${resultImageUrl}`);

            // --- STEP 3: Kirim gambar hasil ---
            const imageResponse = await axios.get(resultImageUrl, { responseType: 'stream' });
            res.setHeader('Content-Type', imageResponse.headers['content-type']);
            imageResponse.data.pipe(res);

        } catch (error) {
            console.error('[SERVER] ERROR:', error.message);
            res.status(500).json({ error: 'Gagal memproses gambar.', details: error.message });
        }
    });
}

export const config = {
    api: {
        bodyParser: false,
    },
};
