import React,{useEffect,useState}from'react';import {useParams}from'react-router-dom';import api from'../api';import {currentUser}from'../auth';
export default function Restaurant({cart,setCart}){const{id}=useParams();const[r,setR]=useState(null);
useEffect(()=>{api.get(`/api/restaurants/${id}`).then(x=>setR(x.data));},[id]);
const add=i=>{const existing=cart.find(c=>c.id===i.id);if(existing){setCart(cart.map(c=>c.id===i.id?{...c,quantity:c.quantity+1}:c));}else{setCart([...cart,{...i,quantity:1}]);}};
const remove=id=>setCart(cart.filter(c=>c.id!==id));
const updateQty=(id,qty)=>{if(qty<=0){remove(id);}else{setCart(cart.map(c=>c.id===id?{...c,quantity:qty}:c));}};
const order=async()=>{if(!currentUser())return alert('Login first');if(!cart.length)return alert('Cart empty');try{
const items=cart.map(c=>({menuItemId:c.id,quantity:c.quantity}));const res=await api.post('/api/orders',{items});alert('✅ Order placed! Order ID: '+res.data.id);setCart([]);}catch(e){alert('❌ Order failed')}};
const total=cart.reduce((s,c)=>s+(c.price*c.quantity),0);
if(!r)return<div className="container"><div className="loading">Loading restaurant...</div></div>;
return(<div className="container"><div className="restaurant-detail">
<div className="restaurant-info"><div className="restaurant-header"><h2>{r.name}</h2><p className="restaurant-cuisine">{r.cuisine}</p><p className="location">📍 {r.location}</p>
<div className="rating">⭐ {r.rating}/5.0</div><h3>Menu</h3></div>
<div className="menu-grid">{r.MenuItems.map(m=>(<div key={m.id} className="menu-item-card"><div className="menu-item-name">{m.name}</div><div className="menu-item-price">₹{m.price}</div>
<button className="btn btn-primary" onClick={()=>add(m)}>Add to Cart</button></div>))}</div></div>
<div className="cart-container"><h3>🛒 Your Cart</h3>{cart.length>0?(<><div>{cart.map((c,i)=>(<div key={i}><div style={{display:'flex',justifyContent:'space-between',marginBottom:'1rem',paddingBottom:'1rem',borderBottom:'1px solid var(--border)'}}>
<div><div style={{fontWeight:600}}>{c.name}</div><div style={{fontSize:'0.9rem',color:'var(--text-light)'}}>₹{c.price} each</div></div>
<div style={{display:'flex',gap:'0.5rem',alignItems:'center'}}><button className="btn" style={{padding:'0.25rem 0.5rem',background:'var(--border)',color:'var(--text-dark)',width:'auto',fontSize:'0.9rem'}} onClick={()=>updateQty(c.id,c.quantity-1)}>−</button>
<span style={{minWidth:'2rem',textAlign:'center',fontWeight:600}}>{c.quantity}</span><button className="btn" style={{padding:'0.25rem 0.5rem',background:'var(--border)',color:'var(--text-dark)',width:'auto',fontSize:'0.9rem'}} onClick={()=>updateQty(c.id,c.quantity+1)}>+</button>
<button className="btn btn-danger" style={{padding:'0.25rem 0.75rem',width:'auto',fontSize:'0.9rem'}} onClick={()=>remove(c.id)}>Remove</button></div></div></div>))}</div>
<div className="cart-total"><span>Subtotal:</span><span>₹{total}</span></div><button className="btn btn-success" style={{marginTop:'1.5rem'}} onClick={order}>Place Order</button></>):(<div className="empty-state">Your cart is empty. Add items to get started!</div>)}</div></div></div>);}