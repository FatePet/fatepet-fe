import Tag from "@/components/tag/Tag";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
    adminBusinessItem: IAdminBusinessItemType;
}

function AdminBusinessCard({ adminBusinessItem }: Props) {
    const route = useRouter();

    const handleClickFn = () => {
        route.push(`/admin/view-business/${adminBusinessItem.businessId}`)
    }

    return (
			<div
				className='flex shadow-lg rounded-xl p-3 gap-[14px]'
				onClick={handleClickFn}
			>
				<div className='relative flex flex-shrink-0 w-32 h-32'>
					<Image
						src={adminBusinessItem.thumbnailUrl}
						alt={adminBusinessItem.name}
						fill
						className='object-cover rounded-xl'
					/>
				</div>
				<div className='flex flex-col justify-center gap-[8px]'>
					<div className='flex flex-row gap-[10px]'>
						<div className='flex items-center'>
							<Tag tagText={adminBusinessItem.category} />
						</div>
						<div className='font-black text-xl'>{adminBusinessItem.name}</div>
					</div>
					<div className='text-[#47576A] text-sm'>
						{adminBusinessItem.address}
					</div>
				</div>
			</div>
		);
}

export default AdminBusinessCard