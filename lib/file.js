import fs from 'fs/promises'; // async -> async/await
import path from 'path';
import { fileURLToPath } from 'url';

const file = {};

file.fullPath = (dir, fileName = '') => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  return path.join(__dirname, '../.data', dir, fileName);
};

file.fullPublicPath = (filePath = '') => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  return path.join(__dirname, '../public', filePath);
};

/**
 * Asynchronous unction that creates a file in the set directory and fills it with initial content
 * @param {string} dir name of the folder which will hold the created file (in `.data` folder)
 * @param {string} fileName name of the file that will be created (must include extension)
 * @param {*} content content of the newly created file (JS object)
 * @returns {Promise<[boolean, string|object]>} status that shows if file creation was successful; Results
 */

file.create = async (dir, fileName, content) => {
  let fileDescriptor = null;
  try {
    const filePath = file.fullPath(dir, fileName);
    fileDescriptor = await fs.open(filePath, 'wx'); // 'wx' - write/fails if path exists
    await fs.writeFile(fileDescriptor, JSON.stringify(content));
    return [false, 'OK'];
  } catch (error) {
    return [true, error];
  } finally {
    if (fileDescriptor) {
      await fileDescriptor.close();
    }
  }
};

/**
 * Asynchronous function that reads the file and returns it's **text content**
 * @param {string} dir name of the folder that holds the file we want to read
 * @param {string} fileName name of the file that will be read (must include extension)
 * @returns {Promise<[boolean, string|object]>} status that shows if reading was successful; Results: file content or error object
 */

file.read = async (dir, fileName) => {
  const filePath = file.fullPath(dir, fileName);
  try {
    const fileContent = await fs.readFile(filePath, 'utf8');
    return [false, fileContent];
  } catch (error) {
    return [true, error];
  }
};

/**
 * Asynchronous function that reads the file from "public" and returns it's **text content**
 * @param {string} dir name of the folder that holds the file we want to read
 * @param {string} filePath name of the file that will be read (must include extension)
 * @returns {Promise<[boolean, string|object]>} status that shows if reading was successful; Results: file content or error object
 */

file.readPublic = async (filePath) => {
  const fullFilePath = file.fullPublicPath(filePath);
  try {
    const fileContent = await fs.readFile(fullFilePath, 'utf-8');
    return [false, fileContent];
  } catch (error) {
    return [true, error];
  }
};

/**
 * Asynchronous function that reads **binary** file from "public"
 * @param {string} dir name of the folder that holds the file we want to read
 * @param {string} filePath name of the file that will be read (must include extension)
 * @returns {Promise<[boolean, string|object]>} status that shows if reading was successful; Results: file content or error object
 */

file.readBinaryPublic = async (filePath) => {
  const fullFilePath = file.fullPublicPath(filePath);
  try {
    const fileContent = await fs.readFile(fullFilePath);
    return [false, fileContent];
  } catch (error) {
    return [true, error];
  }
};

/**
 * Asynchronous unction that updates a file in the set directory and fills it with new content
 * @param {string} dir name of the folder which will hold the updated file (in `.data` folder)
 * @param {string} fileName name of the file that will be updated (must include extension)
 * @param {*} content content of the updated file (JS object)
 * @returns {Promise<[boolean, string|object]>} status that shows if file creation was successful; Results
 */
file.update = async (dir, fileName, content) => {
  let fileDescriptor = null;
  try {
    const filePath = file.fullPath(dir, fileName);
    fileDescriptor = await fs.open(filePath, 'r+'); // 'wr+' - Open file for reading and writing. An exception occurs if the file does not exist.
    await fileDescriptor.truncate();
    await fs.writeFile(fileDescriptor, JSON.stringify(content));
    return [false, 'OK'];
  } catch (error) {
    return [true, error];
  } finally {
    if (fileDescriptor) {
      await fileDescriptor.close();
    }
  }
};

/**
 * Asynchronous function that deletes the file
 * @param {string} dir name of the folder that holds the file we want to delete
 * @param {string} fileName name of the file that will be deleted (must include extension)
 * @returns {Promise<[boolean, string|object]>} status that shows if deleting was successful; Results: file content or error object
 */
file.delete = async (dir, fileName) => {
  const filePath = file.fullPath(dir, fileName);
  try {
    await fs.unlink(filePath);
    return [false, 'OK'];
  } catch (error) {
    return [true, error];
  }
};

file.list = async (dir) => {
  const folderPath = file.fullPath(dir);
  try {
    const files = await fs.readdir(folderPath);
    return [false, files];
  } catch (error) {
    return [true, error];
  }
};

export { file };
