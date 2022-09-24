interface AlertProps {
    isVisible: boolean,
    fileName: string
}

const Alert = ({ isVisible, fileName }: AlertProps) => {
    const alertClasses = {
        hide: {
            top: -100
        },
        show: {
            top: 20
        }
    }
    return(
        <div 
            style={isVisible ? alertClasses.show : alertClasses.hide}
            className="bg-blue-100 rounded-lg py-5 px-6 mb-4 text-base text-blue-700 mb-3 fixed top-5 right-5 transition-all duration-1000" role="alert">
            Your file {fileName} succesfully uploaded!
        </div>
    )
}

export default Alert