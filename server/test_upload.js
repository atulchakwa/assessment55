const fs = require('fs');
const path = require('path');
const { Blob } = require('buffer');

const dummyPath = path.join(__dirname, 'test.txt');
fs.writeFileSync(dummyPath, 'fake image content');

const testUpload = async () => {
    const fileContent = fs.readFileSync(dummyPath);
    const blob = new Blob([fileContent], { type: 'text/plain' });

    const formData = new FormData();
    formData.append('name', 'Test Project');
    formData.append('description', 'Test Description');
    formData.append('image', blob, 'test.txt');

    try {
        const res = await fetch('http://localhost:5000/api/projects', {
            method: 'POST',
            body: formData
        });

        const data = await res.json();
        if (res.ok) {
            console.log('Upload Success:', data);
        } else {
            console.error('Upload Failed:', data);
        }
    } catch (err) {
        console.error('Network Error:', err.message);
    } finally {
        fs.unlinkSync(dummyPath);
    }
};

testUpload();
