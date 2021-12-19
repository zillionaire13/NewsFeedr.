export default function NewsCard(props) {

    return (
        <div className="p-3 m-3 relative shadow-lg rounded-lg">
            <div className="md:flex md:flex-nowrap sm:flex-wrap justify-evenly gap-5" >
                <div className="md:w-[30%] sm:w-full">
                    <img className=" h-full min-h-full object-cover" src={props.urlToImage} alt="" />
                </div>
                <div className=" md:px-3 md:w-[70%] sm:w-full">
                    <h1 className="font-bold text-2xl" >{props.title}</h1>
                    <p className="text-gray-600">By <span >{props.author}</span> on <span > {props.source}</span></p>
                    <p className="w-[90%]">{props.description}</p>
                    <p className="hidden">{props.content}</p>
                    <a className="lg:absolute bottom-3 right-4 " href={props.url}><button className="border p-2 rounded-md bg-blue-300 shadow-md hover:bg-black hover:text-white" >Read More..</button></a>
                </div>
            </div>
        </div>
    )
}