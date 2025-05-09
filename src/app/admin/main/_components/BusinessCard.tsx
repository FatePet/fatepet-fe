import Tag from "@/components/tag/Tag";
import Image from "next/image";

interface Props {
    businessName: string;
    businessAddress: string;
    businessImage: string;
    handleClick: () => void;
}

function BusinessCard({ businessName, businessAddress, businessImage, handleClick }: Props) {

    return (
        <div className="flex shadow-lg rounded-xl p-3" onClick={handleClick}>
            <div className="relative flex flex-shrink-0 w-32 h-32">
                <Image
                    src={businessImage}
                    alt={businessName}
                    fill
                    // priority
                    className="object-cover rounded-xl"
                />
            </div>
            <div className="flex flex-col justify-center ml-3">
                <div className="flex flex-row">
                    <div className="flex items-center pl-1 pr-3">
                        <Tag tagText="장묘" />
                    </div>
                    <div className="font-bold text-xl py-2">{businessName}</div>
                </div>
                <div className="text-gray-500 text-sm pb-1 ">{businessAddress}</div>
            </div>
        </div>
    )
}

export default BusinessCard