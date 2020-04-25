import { useState, useEffect } from "react"
import firebase from "gatsby-plugin-firebase"

//returns the top 25 similar results to the search term
export default (searchTerm) => {
    const [results, setResults] = useState([])

    useEffect(() => {
        //breaks the search term into fragments
        const fragments = fragmentSearch(searchTerm)

        const db = firebase.firestore()
        
        //gets all of the questions
        db.collection('questions').get().then(res=>{
            let data = []
            //simplifies the data
            res.docs.forEach(doc=>{
                data.push({
                    'title':doc.data().title,
                    'body':doc.data().body,
                    'id':doc.id
                })
            })
            //sets the similarity of each document to search term
            data = data.map(doc => setSimilarity(doc,fragments))
            //sorts the data so the most similar is first
            data = quickSortBySimilarity(data,0,data.length-1)
            //limits results to 25 and updates the result
            setResults(data.splice(0,25))
        })
    }, [])

    //breaks the search term into small 3 char strings
    const fragmentSearch = (search) =>{
        let fragments = []
        for(let i = 0; i<search.length-3;i++){
            fragments.push(search.substring(i,i+3))
        }
        return fragments
    }   

    //sees how many times any of the fragments occurs in the data of the doc
    const setSimilarity = (doc,fragments) =>{
        let Similarity = 0
        fragments.forEach(fragment=>{
            Similarity+=(doc.title.toUpperCase().match(fragment.toUpperCase()) || []).length;
            Similarity+=(doc.body.toUpperCase().match(fragment.toUpperCase()) || []).length;
        })
        doc.Similarity = Similarity
        return doc
    }

    //quicksorts the doc by similarities O(n^2) which is the speed of this whole algorithm
    const quickSortBySimilarity = (data,from,to) =>{
            if (from >= to){
                return data
            }
            let pivot = from;
            let i = from;
            let j = to;
            while (i <= j){	
                if (data[i].Similarity >= data[pivot].Similarity){
                    i++;}
                else if (data[j].Similarity <= data[pivot].Similarity) {
                    j--;
                }
                else
                {
                    swap (data, i, j);
                    i++;
                    j--;
                }
            }
            if (pivot < j)   
            {
                swap (data, j, pivot);
                pivot = j;
            }
            else if (pivot > i)
            {
                swap (data, i, pivot);
                pivot = i;
            }

            data = quickSortBySimilarity(data, from, pivot - 1)
            data = quickSortBySimilarity(data, pivot + 1, to);
            return data
        }
        //swap method for the quicksort
        const swap = (list,a,b) =>{
            let temp = list[a]
            list[a] = list[b]
            list[b] = temp
            return list
        }
    
    //returns the hook
    return results
}
