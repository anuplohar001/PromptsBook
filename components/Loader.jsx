import Image from "next/image";
import load from "@public/assets/loader.svg"
const Loader = () => {
    return (
        <div className="mt-10">
            <Image
                src={load}
                width={70}
                height={70}
                alt='loader'
            />
        </div>
    );
};

export default Loader;
