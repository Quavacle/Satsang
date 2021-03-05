import Axios from 'axios'

const apiKey = process.env.REACT_APP_API_KEY

const tokenHeader = () => {
  const token = localStorage.getItem('token')
  return { authorization: token }
}

const mapResults = async (search) => {
  const results = await search.map((key) => key.volumeInfo);
  return results
}

async function search(query, startPosition = 0) {
  return Axios
    .get(
      'https://www.googleapis.com/books/v1/volumes?q=' +
      query +
      '&startIndex=' + startPosition +
      '&key=' +
      apiKey
    )
    .then(async (res) => {
      console.log(res.data)
      const books = await mapResults(res.data.items)
      return books
    })
    .catch((error) => console.log(JSON.stringify(error)));
}

export { tokenHeader, search }
