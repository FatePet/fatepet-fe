import Tag from "@/components/tag/Tag";
import Image from "next/image";

interface Props {
    adminBusinessItem: IAdminBusinessItemType
}

function AdminBusinessCard({ adminBusinessItem }: Props) {
    const handleClickFn = () => {
        // Logic
    }

    return (
        <div className="flex shadow-lg rounded-xl p-3" onClick={handleClickFn}>
            <div className="relative flex flex-shrink-0 w-32 h-32">
                <Image
                    src={adminBusinessItem.thumbnailUrl}
                    alt={adminBusinessItem.name}
                    fill
                    className="object-cover rounded-xl"
                />
            </div>
            <div className="flex flex-col justify-center ml-3">
                <div className="flex flex-row">
                    <div className="flex items-center pl-1 pr-3">
                        <Tag
                            tagText={adminBusinessItem.category}
                        />
                    </div>
                    <div className="font-bold text-xl py-2">{adminBusinessItem.name}</div>
                </div>
                <div className="text-gray-500 text-sm pb-1 ">{adminBusinessItem.address}</div>
            </div>
        </div>
    )
}

export default AdminBusinessCard