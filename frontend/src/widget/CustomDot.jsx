

export default function CustomDot({content, top, right}){

    return <div className={`absolute z-10  top-0 right-0  p-0.5 rounded-full h-3.5 w-3.5 flex justify-center items-center text-[8px] bg-red-500 text-light-100`}>
        {content}
    </div>
}