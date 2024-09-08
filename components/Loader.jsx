import Image from "next/image";
const Loader = () => {
    return (
        <div className="mt-10 flex flex-col justify-center items-center w-[25vw]">
            <Image
                src={'/assets/loader.svg'}
                width={70}
                height={70}
                alt='loader'
                className="text-center"
            />
            <b>If loading continues just RELOAD the page</b>
        </div>
    );
};

export default Loader;
