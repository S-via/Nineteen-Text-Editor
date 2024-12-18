import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // conenction to open database 
  const jateDb = await openDB('jate', 1);

  // create transaction using jateDb
  const transAction = jateDb.transaction('jate', 'readwrite');

  // create an object to sotre transAction
  const storeObj = transAction.objectStore('jate');

  // request to put and pass content 
  const request = storeObj.put({
    // id needed?
    id: 1,
    //valu?
    value:content
  });

  // get confirmation of result with request value

  const result = await request;
  if (!result) {
    console.error('putDb not implemented');

  } else {
    console.log('result value', result);
    return result;
  }

}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {

  // connection created to open database
  const jateDb = await openDB('jate', 1);

  // create a transaction using jateDb
  const transAction = jateDb.transaction('jate', 'readonly');

  // create an object to store transAction
  const storeObj = transAction.objectStore('jate');

  // request All data we need from storeObj
  const request = storeObj.getAll();

  // confirm request 

  const result = await request;
  if (!result.length === 0) {
    console.error('getDb not implemented');
  }
  else {
    console.log('result', result);
    return result;

  }


}

initdb();
