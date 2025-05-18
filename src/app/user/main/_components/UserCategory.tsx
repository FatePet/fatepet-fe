import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Props {
    category: string;
}

function UserCategory({ category }: Props) {
    const [themeColor, setThemeColor] = useState<string>('');
    const [categoryContent, setCategoryContent] = useState<string>('');
    const [iconUrl, setIconUrl] = useState<string>('');
    useEffect(() => {
        switch (category) {
            case '장묘':
                setThemeColor('bg-[var(--p-brown)]');
                setCategoryContent('내 주변 장묘업체\n찾아보기');
                setIconUrl('/icons/userCategory/icon-rainbow.png');
                break;
            case '악세사리':
                setThemeColor('bg-[#DA7F4D]');
                setCategoryContent('추억할 수 있는\n악세사리 만들기');
                setIconUrl('/icons/userCategory/icon-acc.png');
                break;
            case '브리더':
                setThemeColor('bg-[#F5AB49]');
                setCategoryContent('새로운 만남을 위해\n브리더와 상담하기');
                setIconUrl('/icons/userCategory/icon-breeder.png');
                break;
            case '행동상담':
                setThemeColor('bg-[#9BB069]');
                setCategoryContent('펫로스 증후군\n전문 상담하기');
                setIconUrl('/icons/userCategory/icon-counsell.png');
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
        <div className={`relative ${themeColor} p-7 rounded-2xl font-bold whitespace-pre`} onClick={handleCategoryClick}>
            {categoryContent}

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