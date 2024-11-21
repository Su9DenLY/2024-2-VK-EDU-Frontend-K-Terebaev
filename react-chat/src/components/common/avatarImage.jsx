export default function AvatarImage({userItem, otherAvatar, className = "user-avatar"}) {

    const getUrl = () => {
        if (otherAvatar) {
            return otherAvatar;
        } else {
            return userItem?.avatar
        }
    }

    const getPlaceholder = () => {
        if (userItem?.title) {
            return userItem?.title[0]
        } else if (userItem?.first_name && userItem?.last_name) {
            return userItem?.first_name[0] + userItem?.last_name[0]
        }
    }

    return (
        <div className={className}>
            {getUrl() ? <img src={getUrl()} alt={getPlaceholder()}/> : getPlaceholder()}
        </div>
    )
}
