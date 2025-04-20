import React, { useState, useEffect } from 'react';
import './Submit.css';

function Submit() {
  const [newImgName, setNewImgName] = useState('');
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newIng, setNewIng] = useState('');
  const [newInst, setNewInst] = useState('');

  const [editingId, setEditingId] = useState(null);
  const [editImg, setEditImg] = useState('');
  const [editName, setEditName] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editIng, setEditIng] = useState('');
  const [editInst, setEditInst] = useState('');

  const [addMsg, setAddMsg] = useState('');
  const [editMsg, setEditMsg] = useState('');
  const [delMsg, setDelMsg] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const [recipes, setRecipes] = useState([]);

  const apiUrl = process.env.REACT_APP_API_URL || 'https://meatballserver.onrender.com';

  useEffect(() => {
    fetch(`${apiUrl}/recipes`)
      .then(r=>r.json())
      .then(setRecipes)
      .catch(console.error);
  }, []);

  const validate = (img, name, desc, ing, inst) => {
    if(img.trim().length<3) return 'Image name must be ≥3 chars';
    if(name.trim().length<3) return 'Name must be ≥3 chars';
    if(desc.trim().length<5) return 'Desc must be ≥5 chars';
    if(ing.trim()==='') return 'Ingredients req';
    if(inst.trim()==='') return 'Instructions req';
    return null;
  };

  const handleAdd = e => {
    e.preventDefault(); setErrMsg(''); setAddMsg('');
    const err = validate(newImgName,newName,newDesc,newIng,newInst);
    if(err){ setErrMsg(err); return; }
    const payload = {
      img_name:newImgName.trim(), name:newName.trim(), description:newDesc.trim(),
      ingredients:newIng.split('\n').map(s=>s.trim()).filter(Boolean),
      instructions:newInst.split('\n').map(s=>s.trim()).filter(Boolean)
    };
    fetch(`${apiUrl}/recipes`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload) })
      .then(r=>r.ok? r.json(): r.json().then(j=>Promise.reject(j)))
      .then(data => {
        setRecipes(prev=>[...prev,data.recipe]);
        setAddMsg('Recipe added');
        setNewImgName(''); setNewName(''); setNewDesc(''); setNewIng(''); setNewInst('');
      })
      .catch(err=>setErrMsg(err.error||err.message));
  };

  const startEdit = r => {
    setEditingId(r._id);
    setEditImg(r.img_name);
    setEditName(r.name);
    setEditDesc(r.description);
    setEditIng(r.ingredients.join('\n'));
    setEditInst(r.instructions.join('\n'));
    setErrMsg(''); setEditMsg(''); setDelMsg('');
  };

  const handleEdit = e => {
    e.preventDefault(); setErrMsg(''); setEditMsg('');
    const err = validate(editImg,editName,editDesc,editIng,editInst);
    if(err){ setErrMsg(err); return; }
    const payload={ img_name:editImg.trim(), name:editName.trim(), description:editDesc.trim(),
      ingredients:editIng.split('\n').map(s=>s.trim()).filter(Boolean),
      instructions:editInst.split('\n').map(s=>s.trim()).filter(Boolean)
    };
    fetch(`${apiUrl}/recipes/${editingId}`,{ method:'PUT', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload) })
      .then(r=>r.ok? r.json(): r.json().then(j=>Promise.reject(j)))
      .then(data=>{
        setRecipes(prev=>prev.map(x=>x._id===editingId?data.recipe:x));
        setEditMsg('Recipe updated');
        setEditingId(null);
      })
      .catch(err=>setErrMsg(err.error||err.message));
  };

  const handleDelete = id => {
    setErrMsg(''); setDelMsg('');
    fetch(`${apiUrl}/recipes/${id}`,{ method:'DELETE' })
      .then(r=>r.ok? r.json(): r.json().then(j=>Promise.reject(j)))
      .then(data => {
        setRecipes(prev=>prev.filter(x=>x._id!==id));
        setDelMsg('Recipe deleted');
      })
      .catch(err=>setErrMsg(err.error||err.message));
  };

  return (
    <div className="submit-container">
      <h2>Manage Recipes</h2>
      {addMsg && <p className="success">{addMsg}</p>}
      {editMsg && <p className="success">{editMsg}</p>}
      {delMsg && <p className="success">{delMsg}</p>}
      {errMsg && <p className="error">{errMsg}</p>}

      <form className="submit-form" onSubmit={handleAdd}>
        <h3>Add New Recipe</h3>
        <label>Image Name:</label>
        <input value={newImgName} onChange={e=>setNewImgName(e.target.value)} required />
        <label>Recipe Name:</label>
        <input value={newName} onChange={e=>setNewName(e.target.value)} required />
        <label>Description:</label>
        <textarea value={newDesc} onChange={e=>setNewDesc(e.target.value)} required />
        <label>Ingredients (one per line):</label>
        <textarea value={newIng} onChange={e=>setNewIng(e.target.value)} required />
        <label>Instructions (one per line):</label>
        <textarea value={newInst} onChange={e=>setNewInst(e.target.value)} required />
        <button type="submit">Add Recipe</button>
      </form>

      {editingId && (
        <form className="submit-form" onSubmit={handleEdit}>
          <h3>Edit Recipe #{editingId}</h3>
          <label>Image Name:</label>
          <input value={editImg} onChange={e=>setEditImg(e.target.value)} required />
          <label>Recipe Name:</label>
          <input value={editName} onChange={e=>setEditName(e.target.value)} required />
          <label>Description:</label>
          <textarea value={editDesc} onChange={e=>setEditDesc(e.target.value)} required />
          <label>Ingredients (one per line):</label>
          <textarea value={editIng} onChange={e=>setEditIng(e.target.value)} required />
          <label>Instructions (one per line):</label>
          <textarea value={editInst} onChange={e=>setEditInst(e.target.value)} required />
          <button type="submit">Save Changes</button>
          <button type="button" onClick={()=>setEditingId(null)}>Cancel</button>
        </form>
      )}

      <div className="recipes-list">
        <h3>Current Recipes</h3>
        {recipes.map(r => (
          <div key={r._id} className="recipe-item">
            <h4>{r.name}</h4>
            <button onClick={()=>startEdit(r)}>Edit</button>
            <button onClick={()=>handleDelete(r._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Submit;
