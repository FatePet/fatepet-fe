import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
    upperText: string;
    lowerText: string;
    iconUrl: string;
    category: string;
}

function UserCategory({ upperText, lowerText, iconUrl, category }: Props) {
    const [themeColor, setThemeColor] = useState<string>('');
    useEffect(() => {
        switch (category) {
            case '장묘':
                setThemeColor('bg-[var(--p-brown)]');
                break;
            case '악세사리':
                setThemeColor('bg-[#DA7F4D]');
                break;
            case '브리더':
                setThemeColor('bg-[#F5AB49]');
                break;
            case '행동상담':
                setThemeColor('bg-[#9BB069]')
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
                router.push('user/main/ac');
                break;
            case '브리더':
                router.push('user/main/br');
                break;
            case '행동상담':
                router.push('user/main/act');
                break;
        }
    };

    return (
        <div className={`${themeColor} p-7 rounded-2xl font-bold`} onClick={handleCategoryClick}>
            {upperText}<br></br>{lowerText}
            {/* icon 배치로 수정 */}
            {iconUrl}
        </div>
    );
};

export default UserCategory;