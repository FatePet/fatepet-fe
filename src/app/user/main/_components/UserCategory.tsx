import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Props {
    upperText: string;
    lowerText: string;
    iconUrl: string;
    category: string;
}

function UserCategory({ upperText, lowerText, category }: Props) {
    const [themeColor, setThemeColor] = useState<string>('');
    const [iconUrl, setIconUrl] = useState<string>('');
    useEffect(() => {
        switch (category) {
            case '장묘':
                setThemeColor('bg-[var(--p-brown)]');
                setIconUrl('/icons/userCategory/icon-rainbow.png')
                break;
            case '악세사리':
                setThemeColor('bg-[#DA7F4D]');
                setIconUrl('/icons/userCategory/icon-acc.png')
                break;
            case '브리더':
                setThemeColor('bg-[#F5AB49]');
                setIconUrl('/icons/userCategory/icon-breeder.png')
                break;
            case '행동상담':
                setThemeColor('bg-[#9BB069]')
                setIconUrl('/icons/userCategory/icon-counsell.png')
                break;
        }
    }, [])



    const router = useRouter();
    const handleCategoryClick = () => {
        switch (category) {
            case '장묘':
                // 테스트용 값
                const businessId = 1;
                router.push(`/main/view-business/${category}/${businessId}`);
                break;
            case '악세사리':
                router.push('user/main/acc');
                break;
            case '브리더':
                router.push('user/main/bree');
                break;
            case '행동상담':
                router.push('user/main/counsell');
                break;
        }
    };

    return (
        <div className={`relative ${themeColor} p-7 rounded-2xl font-bold`} onClick={handleCategoryClick}>
            {upperText}<br></br>{lowerText}

            {iconUrl !== '' && (
                <Image
                    src={iconUrl}
                    alt={`${category} icon`}
                    width={76}
                    height={76}
                    className="absolute bottom-10 right-10"
                />
            )}


        </div>
    );
};

export default UserCategory;