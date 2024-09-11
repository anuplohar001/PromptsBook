import Image from "next/image";
const Loader = () => {
    return (
        <div>
            <div className="m-[10vw]">
                <div className="animate-spin h-[5vw] w-[5vw] rounded-full border-[5px] border-blue-500 border-t-white">
                </div>
            </div>
        </div>
    );
};

export default Loader;
