import React, {useState} from "react";

function ProfileCard(props) {

    const [form, setForm] = useState({
        avatar: null
    })

    const setAvatar = async (event) => {
		event.preventDefault();
		const formData = new FormData();
		formData.append('picture', form.avatar);	
        props.set(formData)
        setForm({
            avatar: null
        })
	}
    const changeHandlerImage = (event) => {
        setForm({avatar: event.target.files[0], status: true})
     }

	return (
		<div className="profile-card">
            <div className="avatar">
                {props.avatar ? (
                    <img className="img-fluid" src={`${props.avatar}`} />
                ) : <img className="img-fluid" src={require('./../images/def-avatar.png')} />}
                {props.myProfile ? (
                    <form className="d-flex justify-content-center flex-column" onSubmit={setAvatar} encType="multipart/form-data">
                        <label htmlFor="file-upload" className="custom-file-upload">
                            <i className="fa fa-cloud-upload"></i> Choose avatar
                        </label>
                        <input id="file-upload" type="file" name="avatar" onChange={changeHandlerImage}/>
                        {form.avatar ? <input type="submit" value="SET" className="btn btn-success"/> : null}
                    </form>
                ) : null}
            </div>
            <div className="user-data">
                <h4>{props.firstName}</h4>
                <h4>{props.lastName}</h4>
                <span>{props.email}</span>
                <span>Reviews: {props.comments.length}</span>
                <span>Avarage rating: {props.comments.length > 0 ? (
                    props.comments.reduce((acc, el) => (acc + el.rate), 0) / props.comments.length
                ) : "No reviews"}</span>
            </div>

		</div>
	);
}

export default ProfileCard;
