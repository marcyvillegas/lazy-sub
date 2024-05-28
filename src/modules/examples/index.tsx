export default function Examples() {
    return (
        <div className="p-7">
            <div className="flex justify-center text-center text-main-white font-semibold">
                Check out some examples of text animations from LazySub 👀
            </div>

            <div className="h-full lg:h-screen lg:w-full p-6 flex flex-col lg:flex-row justify-center mb-10 gap-8 lg:gap-[80px]">
                <iframe
                    className="h-screen"
                    src="https://www.tiktok.com/embed/7373998409038040326"
                    scrolling="no"
                    allow="encrypted-media;"
                ></iframe>

                <iframe
                    className="h-screen"
                    src="https://www.tiktok.com/embed/7374000217386994950"
                    scrolling="no"
                    llow="encrypted-media;"
                ></iframe>
            </div>
        </div>
    )
}