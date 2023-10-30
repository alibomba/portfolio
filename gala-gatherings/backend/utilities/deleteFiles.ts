import fs from 'fs';

function deleteFiles(paths: string[]): void {
    if (paths.length > 0) {
        paths.forEach((path) => {
            fs.unlink(path, err => {
                if (err) console.error('File failed to be deleted');
            })
        })
    }
}

export default deleteFiles;