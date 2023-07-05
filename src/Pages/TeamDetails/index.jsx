import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Axios } from "axios";

function TeamDetails(){
    const [loading, setLoading] = useState(true);
    const [team, setTeam] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const fetchTeam = async () => {
          try {
            const response = await axios.get(`http://localhost:3001/teams/${id}`);
            setTeam(response.data);
            console.log(response.data)
            setLoading(false);
          } catch (error) {
            console.error('Error fetching Pokémon list:', error);
          }
        };
        
        fetchTeam();
      }, []);

    return (
        <>
        {Loading ? <Loading/> : 
        <>
        <h2>{team.name}</h2>
        <h2>{team.local}</h2>
        </>}
        </>
    )
    
}
export default TeamDetails;