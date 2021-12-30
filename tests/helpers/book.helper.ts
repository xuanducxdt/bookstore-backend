import util from 'util';
import fs from 'fs';
import path from 'path';
import db from '../../src/models/index';
import { mockBookData } from '../mocks/book.data';

const copyFilePromise = util.promisify(fs.copyFile);
const deleteFilePromise = util.promisify(fs.unlink);

export function copyFiles(srcDir: string, destDir: string, files: string[]): Promise<void[]> {
  return Promise.all(files.reduce((arrayPromise: Promise<void>[], f) => {
    const destFilePath = path.join(destDir, f);
    if (!fs.existsSync(destFilePath)) {
      arrayPromise.push(copyFilePromise(path.join(srcDir, f), destFilePath));
    }
    return arrayPromise;
  }, []));
}

export function deleteFiles(srcDir: string, files: string[]): Promise<void[]> {
  return Promise.all(files.reduce((arrayPromise: Promise<void>[], f) => {
    const srcFilePath = path.join(srcDir, f);
    if (fs.existsSync(srcFilePath)) {
      arrayPromise.push(deleteFilePromise(srcFilePath));
    }
    return arrayPromise;
  }, []));
}

export async function initTestData(): Promise<void> {
  console.log('<==== Init Test Data ====>');
  const mapTestData = mockBookData.books.map((book) => ({
    insertOne: {
      document: {
        _id: book.id,
        title: book.title,
        image: book.image,
        category: book.category,
        quantity: book.quantity,
        price: book.price,
        description: book.description,
      },
    },
  }));
  await db.Book.bulkWrite([...mapTestData]);
  const srcDir = path.join(__dirname, '../images');
  const destDir = path.join(__dirname, '../../src/public/images/book');
  await copyFiles(srcDir, destDir, mockBookData.bookImages);
}

export async function removeTestData(): Promise<void> {
  console.log('<==== Remove Test Data ====>');
  const books: { image: string }[] = await db.Book.find({}, { image: 1, _id: 0 });
  const imageNames: string[] = books.map((book) => {
    const imageName = book.image.slice(13);
    return imageName;
  });
  await db.Book.deleteMany({});
  const srcDir = path.join(__dirname, '../../src/public/images/book');
  await deleteFiles(srcDir, [...mockBookData.bookImages, ...imageNames]);
}
