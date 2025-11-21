import React from 'react';import {Link,useNavigate}from'react-router-dom';import {currentUser,logout}from'../auth';
export default function Header(){const n=useNavigate();const u=currentUser();return(
<header><nav><h1>🍕 FoodHub</h1><div style={{display:'flex',gap:'2rem',alignItems:'center'}}>
<Link to="/">Home</Link>
{u?(<><span style={{color:'var(--primary)',fontWeight:600}}>👤 {u.name}</span><button className="btn btn-danger" style={{padding:'0.5rem 1rem',fontSize:'0.9rem'}} onClick={()=>{logout();n('/')}}>Logout</button></>):(<>
<Link to="/login" className="btn btn-primary" style={{padding:'0.5rem 1.5rem',fontSize:'0.9rem'}}>Login</Link><Link to="/signup" className="btn btn-secondary" style={{padding:'0.5rem 1.5rem',fontSize:'0.9rem'}}>Sign Up</Link></> )}</div></nav></header>);};