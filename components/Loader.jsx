import Image from "next/image";
const Loader = () => {
    return (
        <div className="mt-10 text-center">
            <Image
                src={'/assets/loader.svg'}
                width={70}
                height={70}
                alt='loader'
            />
            <b>If loading continues just RELOAD the page</b>
        </div>
    );
};

export default Loader;
