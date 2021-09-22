import { useState, useEffect } from 'react'
// import BuiltImage from '@components/BuiltImage'
import { Container, Heading, Flex, Box, Image, Button, Spacer, SimpleGrid, Text, Center, Input} from "@chakra-ui/react";
import { createBook} from '@/lib/db';

 import { useAuth } from '@/lib/auth';
import { Search} from 'react-feather'

// export function useQuery(passed) {
//   let [planet, setPlanet] = useState(passed)
 
//   let [apiKey, setApiKey] = useState("AIzaSyDw_ZLsfsP5b_XATBKJ3B3Cf_WiKZjZVgg")

//   useEffect(() => {
//     let current = true
//     // fetch(`https://images-api.nasa.gov/search?q=${passed}`)
//     fetch(`https://www.googleapis.com/books/v1/volumes?q=${passed}&key=` + apiKey +"&maxResults=5")
//       .then((res) => res.json())
//       .then((res) => {
//         if (current) {
//           setPlanet(res.items)
//         // setResult(res.items)
//         }
//       })
//       .catch((error) => {
//         console.log('error', error)
//       })
//     return () => {
//       current = false
//     }
//   }, [planet])

//   return planet
// }

export default function QueryBook() {
     const { user, loading } = useAuth();
  let [query, setQuery] = useState('')
   let [result, setResult] = useState('')
//   let data = useQuery(query)

//   let image = data.collection?.items[0] || null
//   if (image?.links) {
//     image = image.links[0]
//   }

//   let info = data.collection?.items[0]?.data[0]
  let [apiKey, setApiKey] = useState("AIzaSyDw_ZLsfsP5b_XATBKJ3B3Cf_WiKZjZVgg")

  const handleSubmit= (event) => {
      let current = true
      event.preventDefault()
          fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=` + apiKey +"&maxResults=5")
      .then((res) => res.json())
      .then((res) => {
        if (current) {
          setResult(res.items)
        // setResult(res.items)
        }
      })
      .catch((error) => {
        console.log('error', error)
      })
      console.log(result)
  }

  const handleClick = (book) => {

    const newBook= {
      libraryAuthorId: user.uid,
      libraryId: 'qoinRUezdrbNNItm4uoe',
    //   route: route || '/',
      route: '.',    
      name: book.book.volumeInfo.title,
      author: book.book.volumeInfo.authors[0] || 'no author',
      authorId: user.uid,
      publisher: book.book.volumeInfo.publisher || 'none',
      description: 'a description',
      overview: 'an overview',
      isbn: book.book.volumeInfo.industryIdentifiers[0].identifier || '',
      pages:  book.book.volumeInfo.pageCount || 'none',
      other: 'other',
      imageUrl: book.book.volumeInfo.imageLinks.thumbnail,
    
      createdAt: new Date().toISOString(),
      provider: user.provider,
      status: 'pending'
    };
 createBook(newBook)
  }

  return (
    <>
    <Flex pt="20px" pb="50px">
      <Box>
        <Text fontSize="3xl">Search for a book</Text>
       
      </Box>
      <Spacer />
      <div className="query-book">
        
        <form onSubmit={handleSubmit}>
            <div class="search-wrapper">
              <input
              placeholder="Search Google Books"
              className="book-search-input"
                type="text"
                variant="outline"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                }}
              />
              <button className="btn-search" variant="outline" type="submit"><Search size={16} /></button>
            </div>
        </form>
        </div>
    </Flex>
    <Flex pb="10px">
      {result.length ? result.map((book, index) => (
        <>
        <Box maxW="sm" borderWidth="1px" borderColor="#ccc" borderRadius="lg" overflow="hidden" p=".5rem" m=".4rem" key={index} flex="1">
        <Heading as="h4" size="md">{book.volumeInfo.title}</Heading>
        <Text  fontSize="md" color="#919191">{book.volumeInfo.authors ? book.volumeInfo.authors[0] : 'no author'}</Text>
         <Image src={book.volumeInfo.imageLinks.thumbnail} alt={book.title}/>
         <Text letterSpacing="1.1px" color="#aaa" pt="5px" pb="5px" fontSize="md">ISBN: {book.volumeInfo.industryIdentifiers ? book.volumeInfo.industryIdentifiers[0].identifier : 'no ISBN'} </Text>
         <Button onClick={() => handleClick({book})}>Save book</Button>
         </Box>
        </>
        )) : ''
        }
        </Flex>
        <hr />
  
    </>
  )
}
