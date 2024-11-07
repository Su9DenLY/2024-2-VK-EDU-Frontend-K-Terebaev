import "@/components/common/dropDown/dropDown.scss"

export function DropDownWrapper({children}) {
    return <div className='dropdown'>
        {children}
    </div>
}

export function DropDownItem({logo, text, onClick}) {
    return (
        <div className='dropdown-item' onClick={onClick}>
            <div>{logo}</div>
            <span>{text}</span>
        </div>
    )
}
