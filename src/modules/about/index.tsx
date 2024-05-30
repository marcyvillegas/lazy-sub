import Link from "next/link";

export default function About() {
    return (
        <div className="flex justify-center flex-col gap-5 mt-10 mb-12 lg:mt-14 px-10 lg:px-48 lg:text-lg text-main-white">
            <div className="font-semibold">Hello there! Welcome to LazySub! 👋</div>

            <div>How to use :</div>
            <div>
                👉 Type the text content <br></br>
                👉 Pick an animation and text design <br></br>
                👉 Screen record the text animation <br></br>
                👉 Remove the background when editing in a video editor
            </div>

            <hr />

            <div>Why I created LazySub?</div>
            <div>
                This project is inspired by {`devaslife's`} {`(Takuya Matsuyama)`} <Link href={'https://www.youtube.com/watch?v=zu_vqAWHy_E&t=2s'} target="_blank"><span className="underline decoration-logo-green decoration-2">video editing style</span></Link> wherein he specifically uses a chat bubble text animation. He deserves the recognition so check out his two youtube channels: <Link href={'https://www.youtube.com/@devaslife'} target="_blank"><span className="underline decoration-logo-green decoration-2">devaslife</span></Link> and <Link href={'https://www.youtube.com/@craftzdog'}><span className="underline decoration-logo-green decoration-2">Takuya Matsuyama</span></Link>
            </div>

            <div>
                I also created this because I hate manually typing the words in the video editor. I can just type all the words in this web app, choose an animation and screen record it. Basically, I hate spending too much time on a video editor when it comes to typing texts and animating it.
            </div>

            <div>
                I plan to add more features in the future.  <Link href={'https://forms.gle/KkUyWqFiQkakFpPt8'} target="_blank"><span className="underline decoration-logo-green decoration-2">Feel free to give suggestions, feedback, feature request or bug report!</span></Link> You can also check the source code <Link href={'https://github.com/marcyvillegas/lazy-sub'} target="_blank"><span className="underline decoration-logo-green decoration-2">here</span></Link>
            </div>

            <div>
                Coded by <Link href={'https://marcyvillegas.netlify.app/'} target="_blank"><span className="underline decoration-logo-green decoration-2">Marcy Villegas</span></Link>
            </div>
        </div >
    )
}