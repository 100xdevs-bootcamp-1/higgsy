

export function Video({url, title}: {url: string, title: string}) {
    return <div className="p-4 rounded m-4 bg-black text-white text-xl"> 
        <video src={url} style={{height: 300}} />
        <div>
            {title}
        </div>
    </div>
}