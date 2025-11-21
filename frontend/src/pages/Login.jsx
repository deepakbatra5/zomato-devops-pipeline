import React,{useState}from'react';import api from'../api';import {saveAuth}from'../auth';import {useNavigate,Link}from'react-router-dom';
export default function Login(){const n=useNavigate();const[email,setEmail]=useState('');const[p,setP]=useState('');const[err,setErr]=useState('');
const sub=async e=>{e.preventDefault();setErr('');if(!email||!p){setErr('All fields required');return;}try{const r=await api.post('/api/auth/login',{email,password:p});saveAuth(r.data);n('/');}catch(e){setErr(e.response?.data?.error||'Login failed')}};return(
<div className="form-container"><h2>Welcome Back 👋</h2>{err&&<div className="alert alert-error">{err}</div>}<form onSubmit={sub}>
<div className="form-group"><label>Email</label><input type="email" value={email}onChange={e=>setEmail(e.target.value)}/></div>
<div className="form-group"><label>Password</label><input type="password" value={p}onChange={e=>setP(e.target.value)}/></div>
<button type="submit" className="btn btn-primary">Login</button></form>
<p style={{marginTop:'1rem',textAlign:'center'}}>No account? <Link to="/signup" style={{color:'var(--primary)',fontWeight:600}}>Sign up here</Link></p></div>);}