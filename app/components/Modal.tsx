type Modal = {
    isOpen:Boolean,
    children:React.ReactNode
}

export function Modal({isOpen , children}:Modal){
    
    if(!isOpen) {
        return null
    }else{
    return<div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center">
        {children}
    </div>
    }

}