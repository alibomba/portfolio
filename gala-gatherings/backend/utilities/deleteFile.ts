import fs from 'fs';

function deleteFile(path: string | undefined): void {
    if (path) {
        fs.unlink(path, err => {
            if (err) console.error(`File ${path} failed to be deleted`);
        });
    }
}

export default deleteFile;