import Link from "@/components/Link/Link";

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
                This project is inspired by {`devaslife's`} {`(Takuya Matsuyama)`} <Link link='https://www.youtube.com/watch?v=zu_vqAWHy_E&t=2s' text='video editing style' /> wherein he specifically uses a chat bubble text animation. He deserves the recognition so check out his two youtube channels: <Link link={'https://www.youtube.com/@devaslife'} text='devaslife' /> and <Link link='https://www.youtube.com/@craftzdog' text='Takuya Matsuyama' />
            </div>

            <div>
                I also created this because I hate manually typing the words in the video editor. I can just type all the words in this web app, choose an animation and screen record it. Basically, I hate spending too much time on a video editor when it comes to typing texts and animating it.
            </div>

            <div>
                I plan to polish this project and add more features in the future. <Link link='https://forms.gle/KkUyWqFiQkakFpPt8' text='Feel free to give suggestions, feedback, feature request or bug report!' /> You can also check the source code <Link link='https://github.com/marcyvillegas/lazy-sub' text='here' />
            </div>

            <div>
                Coded by <Link link='https://marcyvillegas.netlify.app/' text='Marcy Villegas' />
            </div>
        </div >
    )
}