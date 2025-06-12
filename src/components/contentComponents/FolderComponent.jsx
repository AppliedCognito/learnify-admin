
const FolderComponent = ({ paperName, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="wh-auto w-auto transform transition duration-300 hover:scale-105"
    >
      <div className='h-20 w-20 '>
            <div className="h-4 w-16 bg-[#EBEBEB] rounded-t-md"></div>
            <div className="h-16 w-full bg-[#F5F5F5] rounded-b-md mt-[-1px]"></div> 
        </div>
      <p className='h-auto w-20 text-md text-[#272727] font-normal text-center'>{paperName}</p>
    </div>
  );
};


export default FolderComponent
