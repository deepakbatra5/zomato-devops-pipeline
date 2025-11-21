import React,{useEffect,useState}from'react';import {Link}from'react-router-dom';import api from'../api';
export default function Home(){const[list,setList]=useState([]);const[search,setSearch]=useState('');useEffect(()=>{api.get('/api/restaurants').then(r=>setList(r.data));},[]);
const filtered=list.filter(r=>r.name.toLowerCase().includes(search.toLowerCase())||r.cuisine.toLowerCase().includes(search.toLowerCase()));
const emojis={Indian:'🍛',Italian:'🍝','Fast Food':'🍔',Japanese:'🍣',Mexican:'🌮',Thai:'🥘',Chinese:'🥢'};
return(<div className="container"><h1 className="page-title">🍕 Food Delivery</h1><div className="form-group" style={{maxWidth:'500px',margin:'0 auto 2rem'}}>
<input type="text" placeholder="Search by restaurant or cuisine..." value={search} onChange={(e)=>setSearch(e.target.value)} style={{padding:'0.75rem',fontSize:'1rem',border:'2px solid var(--border)',borderRadius:'8px'}}/>
</div><div className="restaurants-grid">
{filtered.length>0?filtered.map(r=>(<div key={r.id} className="restaurant-card">
<div className="restaurant-card-image">{emojis[r.cuisine]||'🍽️'}</div>
<div className="restaurant-card-body"><h3 className="restaurant-name">{r.name}</h3><p className="restaurant-cuisine">{r.cuisine}</p>
<div className="restaurant-meta"><span className="rating">⭐ {r.rating}</span><span className="location">{r.location}</span></div>
<Link to={`/r/${r.id}`} className="btn btn-primary">View Menu →</Link></div></div>)):<div className="empty-state">No restaurants found. Try a different search!</div>}</div></div>);}