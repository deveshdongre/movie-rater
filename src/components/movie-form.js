import React, { useEffect, useState } from 'react';
import {API} from '../api-service';
import {useCookies} from 'react-cookie';


function MovieFrom(props){
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [token] = useCookies(['mr-token']);

    useEffect( () => {
        setTitle(props.movie.title);
        setDescription(props.movie.description);
    },[props.movie])


    const updateClicked = () =>{
        API.updateMovie(props.movie.id,{title,description},token['mr-toke   n'])
        .then( resp => props.updateMovie(resp))
        .catch( resp => console.log(resp))
    }

    const createClicked = () =>{
        API.createMovie({title,description},token['mr-token'])
        .then( resp => props.movieCreated(resp))
        .catch( resp => console.log(resp))
    }

    return ( 
         
            <React.Fragment>
                { props.movie ? (   
                    <div>
                        <label htmlFor="title">Title</label><br/>
                        <input id="title" type="text" placeholder="title" value={title}
                        onChange={evt => setTitle(evt.target.value)}/><br/>
                        <label htmlFor="description">Description</label><br/>
                        <textarea id="description" type="description" placeholder="description" value={description}
                        onChange={evt => setDescription(evt.target.value)}></textarea><br/>
                        { props.movie.id ? 
                            <button onClick={updateClicked}>update</button> :
                            <button onClick={createClicked}>Create</button>
                        }
                            
                    </div>
                ): null }
            </React.Fragment>     
    )
}

export default MovieFrom; 