import React,{useState}from'react';import api from'../api';import {saveAuth}from'../auth';import {useNavigate,Link}from'react-router-dom';
export default function Signup(){const n=useNavigate();const[name,setName]=useState('');const[email,setEmail]=useState('');const[p,setP]=useState('');const[err,setErr]=useState('');
const sub=async e=>{e.preventDefault();setErr('');if(!name||!email||!p){setErr('All fields required');return;}if(p.length<6){setErr('Password must be at least 6 characters');return;}try{const r=await api.post('/api/auth/signup',{name,email,password:p});saveAuth(r.data);n('/');}catch(e){setErr(e.response?.data?.error||'Signup failed')}};return(
<div className="form-container"><h2>Create Account 🎉</h2>{err&&<div className="alert alert-error">{err}</div>}<form onSubmit={sub}>
<div className="form-group"><label>Full Name</label><input type="text" value={name}onChange={e=>setName(e.target.value)}/></div>
<div className="form-group"><label>Email</label><input type="email" value={email}onChange={e=>setEmail(e.target.value)}/></div>
<div className="form-group"><label>Password</label><input type="password" value={p}onChange={e=>setP(e.target.value)}/></div>
<button type="submit" className="btn btn-primary">Create Account</button></form>
<p style={{marginTop:'1rem',textAlign:'center'}}>Already have an account? <Link to="/login" style={{color:'var(--primary)',fontWeight:600}}>Login here</Link></p></div>);}