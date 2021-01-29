import React, { useState, useEffect } from 'react';
import Header from "./header/Header";

import axios from 'axios';
import '../App.css';


const heroAttributes = attr => {
  if(attr === "agi"){
    return "Agility"
  }else if(attr === "str"){
    return "Strength"
  }else{
    return "Intelegence"
  }
}

export default function Dashboard() {
  
  const [ heroObject, setHeroObject ] = useState([]);
  const [state, setState] = useState([]);
  const [search, setsearch] = useState(false);

  const searchHeroFn = data => {
    const searchedQuery = heroObject.filter(el => el.localized_name.toLowerCase().indexOf(data.toLowerCase()) !== -1 || el.primary_attr.toLowerCase().indexOf(data.toLowerCase()) !== -1 );
    setState(searchedQuery); 
    setsearch(true);
  }

  useEffect(() => {
    axios({
      method: 'GET',
      url: `https://api.opendota.com/api/heroStats`,
    }).then(res => {
      setHeroObject(res.data);
    }).catch(err => console.error(err));
  }, [])

  return (
    <>
      <Header searchHeroFn={searchHeroFn} />
      <div className="heroes-div"> 
        <table className="hero-list" >
          <thead>
            <tr>
              <th>#</th>
              <th>icon</th>
              <th>Hero Name</th>
              <th>Attribute</th>
            </tr>
          </thead>
          <tbody>
            {
            (!search) ?
              heroObject.map((hero) => (
                <tr className="heroRow" key={hero.id}>                
                  <td>{hero.id}</td>
                  <td><img src={"https://api.opendota.com" + hero.icon} alt={hero.localized_name} /></td>
                  <td>{hero.localized_name}</td>
                  <td>{heroAttributes(hero.primary_attr)}</td>
                </tr>
              ))
            :
              state.map((hero) => (
              <tr className="heroRow" key={hero.id}>                
                <td>{hero.id}</td>
                <td><img src={"https://api.opendota.com" + hero.icon} alt={hero.localized_name} /></td>
                <td>{hero.localized_name}</td>
                <td>{heroAttributes(hero.primary_attr)}</td>
              </tr>
            ))
          }
          </tbody>
        </table>
      </div>
    </>
  )
}
