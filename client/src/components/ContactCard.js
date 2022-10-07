import "../App.css";


const ContactCard = (props) =>{

    const onEdit = () =>{
        //console.log("inside the edit", props)
        props.onEdit(props.contact);
    }
    
    const onDelete = () =>{
        //console.log("Inside contact");
        props.onDelete(props.contact);
    }

    const contactCard = (<div id="container">
    <div className="card">
    <div className="top">
      <h1 className="name">{props.contact.name}</h1>
  <img className="circle-img" src={props.contact.image} alt="avatar_img" />
</div>
            <div className="bottom">
<p className="info">{props.contact.notes}</p>
<p className="info">{props.contact.email}</p>
<p className="info">{props.contact.phone}</p>
  </div>
  <button className="edit" onClick={onEdit}>Edit</button>
  <button className="delete" onClick={onDelete}>Delete</button>
</div>
</div>)

    return (
        <div>
           { contactCard }
        </div>
    )
        
};

export default ContactCard;