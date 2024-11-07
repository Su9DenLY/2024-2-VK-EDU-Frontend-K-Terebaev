export default function ProfileField({logo, title, text}) {
    return (
        <div className="profile-field">
            {logo}
            <div>
                <span className="profile-field-title">{title}</span>
                <div className="profile-field-text">{text}</div>
            </div>
        </div>
    )
}
